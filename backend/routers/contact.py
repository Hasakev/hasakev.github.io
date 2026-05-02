import json
import smtplib
import os
from datetime import datetime, timezone
from email.mime.text import MIMEText
from pathlib import Path

from fastapi import APIRouter
from models import ContactSubmission

router = APIRouter()

SUBMISSIONS_FILE = Path(__file__).parent.parent / "submissions.json"


def _append_submission(data: dict) -> None:
    submissions = []
    if SUBMISSIONS_FILE.exists():
        submissions = json.loads(SUBMISSIONS_FILE.read_text())
    submissions.append(data)
    SUBMISSIONS_FILE.write_text(json.dumps(submissions, indent=2))


def _send_email(submission: ContactSubmission) -> None:
    host = os.getenv("SMTP_HOST")
    port = int(os.getenv("SMTP_PORT", "587"))
    user = os.getenv("SMTP_USER")
    password = os.getenv("SMTP_PASS")
    notify = os.getenv("NOTIFY_EMAIL")

    if not all([host, user, password, notify]):
        return

    body = f"Name: {submission.name}\nEmail: {submission.email}\n\n{submission.message}"
    msg = MIMEText(body)
    msg["Subject"] = f"Portfolio contact from {submission.name}"
    msg["From"] = user
    msg["To"] = notify

    with smtplib.SMTP(host, port) as smtp:
        smtp.starttls()
        smtp.login(user, password)
        smtp.send_message(msg)


@router.post("/")
def submit_contact(submission: ContactSubmission):
    record = {
        "name": submission.name,
        "email": submission.email,
        "message": submission.message,
        "received_at": datetime.now(timezone.utc).isoformat(),
    }
    _append_submission(record)
    try:
        _send_email(submission)
    except Exception:
        pass  # don't fail the request if email is misconfigured
    return {"ok": True}
