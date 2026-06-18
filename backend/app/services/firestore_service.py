import logging
from typing import Dict, Any
from app.core.config import settings

logger = logging.getLogger(__name__)

async def save_history(device_id: str, data: Dict[str, Any]):
    """
    Saves calculation history or quiz results to Firestore.
    Linked to an anonymous random device ID. No PII.
    """
    if not settings.USE_FIRESTORE:
        logger.info(f"Mock Firestore save for {device_id}")
        return
        
    try:
        from google.cloud import firestore
        db = firestore.AsyncClient(project=settings.GCP_PROJECT_ID)
        doc_ref = db.collection("history").document(device_id).collection("entries").document()
        await doc_ref.set(data)
    except Exception as e:
        logger.error(f"Firestore save failed: {e}")
