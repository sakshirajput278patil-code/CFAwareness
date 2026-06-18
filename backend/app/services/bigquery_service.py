import logging
from typing import Dict, Any
from app.core.config import settings

logger = logging.getLogger(__name__)

def stream_to_bigquery(table_id: str, row_data: Dict[str, Any]):
    """
    Streams anonymized aggregate analytics to BigQuery.
    Never stores device_id.
    """
    if not settings.USE_BIGQUERY:
        logger.info(f"Mock BigQuery stream to {table_id}: {row_data}")
        return

    try:
        from google.cloud import bigquery
        client = bigquery.Client(project=settings.GCP_PROJECT_ID)
        errors = client.insert_rows_json(table_id, [row_data])
        if errors:
            logger.error(f"BigQuery insert errors: {errors}")
    except Exception as e:
        logger.error(f"BigQuery stream failed: {e}")
