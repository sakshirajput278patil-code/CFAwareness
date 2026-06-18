import asyncio
import logging
from typing import List
from app.models.carbon_models import CarbonCalculationBreakdown
from app.core.config import settings

try:
    import vertexai
    from vertexai.generative_models import GenerativeModel

    VERTEXAI_AVAILABLE = True
except ImportError:
    VERTEXAI_AVAILABLE = False

logger = logging.getLogger(__name__)


# Fallback deterministic rules
def generate_deterministic_insights(breakdown: CarbonCalculationBreakdown) -> List[str]:
    insights = []

    # Analyze transport
    if breakdown.transport_kg_co2e > 1000:
        insights.append(
            "Switching 2 car commutes/week to transit could cut ~310 kg CO2e/year."
        )

    # Analyze diet
    if breakdown.diet_kg_co2e > 1500:
        insights.append(
            "Replacing meat with plant-based meals 3 days a week could reduce your emissions by ~400 kg CO2e/year."
        )

    # Analyze energy
    if breakdown.energy_kg_co2e > 1200:
        insights.append(
            "Lowering your thermostat by 1°C and upgrading to LED bulbs could save ~150 kg CO2e/year."
        )

    # Default fallbacks if none trigger
    if len(insights) < 3:
        insights.append(
            "Buying second-hand instead of new clothing can save ~200 kg CO2e/year."
        )
    if len(insights) < 3:
        insights.append("Unplugging standby devices can save ~50 kg CO2e/year.")
    if len(insights) < 3:
        insights.append("Washing clothes in cold water can save ~30 kg CO2e/year.")

    return insights[:3]


async def generate_personalized_insights(
    breakdown: CarbonCalculationBreakdown,
) -> List[str]:
    """
    Calls Vertex AI Gemini to generate insights with a strict 3s timeout fallback.
    If USE_GEMINI feature flag is disabled, it uses the deterministic fallback immediately.
    """
    if not settings.USE_GEMINI or not VERTEXAI_AVAILABLE:
        return generate_deterministic_insights(breakdown)

    try:
        vertexai.init(project=settings.GCP_PROJECT_ID, location=settings.GCP_REGION)
        model = GenerativeModel("gemini-1.5-flash-001")

        prompt = f"Given this annual carbon footprint breakdown (kg CO2e): {breakdown.model_dump_json()}, generate exactly 3 personalized, QUANTIFIED reduction actions. Format as a plain text list of 3 short sentences, starting with '- '."

        # Enforce 3s timeout
        response = await asyncio.wait_for(
            model.generate_content_async(prompt), timeout=3.0
        )

        text = response.text.strip()
        lines = [line.strip("- *").strip() for line in text.split("\n") if line.strip()]
        if len(lines) >= 3:
            return lines[:3]
        else:
            raise ValueError("Gemini returned fewer than 3 lines.")

    except asyncio.TimeoutError:
        logger.warning("Gemini API timed out. Using deterministic fallback.")
        return generate_deterministic_insights(breakdown)
    except Exception:  # noqa: BLE001
        logger.warning("Gemini API call failed. Using deterministic fallback.")
        return generate_deterministic_insights(breakdown)
