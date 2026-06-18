import logging
import json
from typing import Dict, Any
from app.core.config import settings

logger = logging.getLogger(__name__)


def publish_event(topic_id: str, event_data: Dict[str, Any]):
    """
    Publishes an event to Pub/Sub on every calculation/quiz completion.
    """
    if not settings.USE_PUBSUB:
        logger.info(f"Mock Pub/Sub publish to {topic_id}: {event_data}")
        return

    try:
        from google.cloud import pubsub_v1

        publisher = pubsub_v1.PublisherClient()
        topic_path = publisher.topic_path(settings.GCP_PROJECT_ID, topic_id)
        data = json.dumps(event_data).encode("utf-8")
        future = publisher.publish(topic_path, data)
        future.result()  # Wait for completion
    except Exception as e:
        logger.error(f"Pub/Sub publish failed: {e}")
