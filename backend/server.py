from fastapi import FastAPI, APIRouter, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone
import secrets
import resend
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Configure Resend API
resend.api_key = "re_123456789_DEMO_KEY_FOR_TESTING"


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class EmailVerification(BaseModel):
    email: EmailStr
    name: str
    verification_code: str = Field(default_factory=lambda: secrets.token_urlsafe(32))
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    verified: bool = False

class EmailSendRequest(BaseModel):
    email: EmailStr
    name: str

# Email sending function
async def send_verification_email(email: str, name: str, verification_code: str):
    """Send verification email using Resend API"""
    
    # Verification link
    verification_link = f"http://localhost:3000/?verified=true"
    
    # HTML email template
    html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #6e0ad6; font-size: 36px;">OLX</h1>
          </div>
          <h2 style="color: #333;">Olá, {name}!</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Obrigado por se cadastrar! Para continuar com sua venda, precisamos confirmar seu e-mail.
          </p>
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Clique no botão abaixo para confirmar:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="{verification_link}" style="background: #6e0ad6; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-size: 18px; font-weight: bold; display: inline-block;">
              Confirmar E-mail
            </a>
          </div>
          <p style="color: #999; font-size: 14px; line-height: 1.6;">
            Se o botão não funcionar, copie e cole este link no seu navegador:<br>
            <a href="{verification_link}" style="color: #6e0ad6;">{verification_link}</a>
          </p>
          <p style="color: #999; font-size: 14px; margin-top: 30px;">
            Se você não se cadastrou na OLX, ignore este e-mail.
          </p>
          <p style="color: #999; font-size: 12px; margin-top: 40px; text-align: center;">
            © 2024 OLX - Todos os direitos reservados
          </p>
        </div>
      </body>
    </html>
    """
    
    # Send email using Resend
    try:
        params = {
            "from": "OLX Vendas <onboarding@resend.dev>",
            "to": [email],
            "subject": "Confirme seu e-mail - OLX Vendas",
            "html": html,
        }
        
        email_response = resend.Emails.send(params)
        logger.info(f"Email sent successfully to {email}: {email_response}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email to {email}: {str(e)}")
        return False

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/send-verification-email")
async def send_verification(request: EmailSendRequest, background_tasks: BackgroundTasks):
    """Send verification email"""
    try:
        # Generate verification code
        verification_code = secrets.token_urlsafe(32)
        
        # Save to database
        email_verification = EmailVerification(
            email=request.email,
            name=request.name,
            verification_code=verification_code
        )
        await db.email_verifications.insert_one(email_verification.dict())
        
        # Send email in background
        background_tasks.add_task(
            send_verification_email,
            request.email,
            request.name,
            verification_code
        )
        
        return {
            "success": True,
            "message": "E-mail de verificação enviado com sucesso!",
            "email": request.email
        }
    except Exception as e:
        logger.error(f"Error sending verification email: {str(e)}")
        return {
            "success": False,
            "message": f"Erro ao enviar e-mail: {str(e)}"
        }

@api_router.get("/verify-email/{code}")
async def verify_email(code: str):
    """Verify email with code"""
    try:
        verification = await db.email_verifications.find_one({"verification_code": code})
        if not verification:
            return {"success": False, "message": "Código de verificação inválido"}
        
        # Update verification status
        await db.email_verifications.update_one(
            {"verification_code": code},
            {"$set": {"verified": True}}
        )
        
        return {
            "success": True,
            "message": "E-mail verificado com sucesso!",
            "email": verification["email"]
        }
    except Exception as e:
        logger.error(f"Error verifying email: {str(e)}")
        return {"success": False, "message": "Erro ao verificar e-mail"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()