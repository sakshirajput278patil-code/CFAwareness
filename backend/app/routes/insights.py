from fastapi import APIRouter, Request
from pydantic import BaseModel
from typing import List
from app.models.carbon_models import CarbonCalculationBreakdown
from app.services.gemini_service import generate_personalized_insights
from app.core.security import limiter

router = APIRouter(prefix="/insights", tags=["Insights"])

class InsightsRequest(BaseModel):
    breakdown: CarbonCalculationBreakdown

class InsightsResponse(BaseModel):
    insights: List[str]

@router.post("/", response_model=InsightsResponse)
@limiter.limit("10/minute")
async def get_insights(request: Request, payload: InsightsRequest):
    """
    Generates personalized reduction insights based on the carbon footprint breakdown.
    Uses Gemini if enabled, with a strict deterministic fallback on timeout or failure.
    Rate limited to 10 requests per minute per IP.
    """
    insights = await generate_personalized_insights(payload.breakdown)
    return InsightsResponse(insights=insights)
