from pydantic import BaseModel, EmailStr


class ContactSubmission(BaseModel):
    name: str
    email: EmailStr
    message: str
