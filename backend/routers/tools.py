from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def list_tools():
    """Placeholder — add tool integrations here."""
    return []
