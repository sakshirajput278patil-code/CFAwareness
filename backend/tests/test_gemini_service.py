import pytest
import asyncio
from unittest.mock import patch
from app.models.carbon_models import CarbonCalculationBreakdown
from app.services.gemini_service import generate_personalized_insights
from app.core.config import settings


@pytest.mark.asyncio
async def test_generate_personalized_insights_fallback_disabled():
    # Test when USE_GEMINI is False
    settings.USE_GEMINI = False

    breakdown = CarbonCalculationBreakdown(
        transport_kg_co2e=1500,
        energy_kg_co2e=1500,
        diet_kg_co2e=2000,
        consumption_kg_co2e=1000,
    )

    insights = await generate_personalized_insights(breakdown)
    assert len(insights) == 3
    assert "Switching 2 car commutes/week" in insights[0]


@pytest.mark.asyncio
async def test_generate_personalized_insights_timeout():
    settings.USE_GEMINI = True

    breakdown = CarbonCalculationBreakdown(
        transport_kg_co2e=500,
        energy_kg_co2e=500,
        diet_kg_co2e=500,
        consumption_kg_co2e=500,
    )

    # Mock to simulate timeout
    with patch("asyncio.wait_for") as mock_wait:
        mock_wait.side_effect = asyncio.TimeoutError()
        insights = await generate_personalized_insights(breakdown)

        # It should hit default fallbacks since values are low
        assert len(insights) == 3
        assert "Buying second-hand instead of new clothing" in insights[0]
