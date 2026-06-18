from fastapi import APIRouter, Request
from app.models.carbon_models import CarbonCalculationInput, CarbonCalculationResult
from app.carbon.engine import calculate_total_carbon_footprint
from app.core.security import limiter

router = APIRouter(prefix="/calculate", tags=["Carbon Calculator"])


@router.post("/", response_model=CarbonCalculationResult)
@limiter.limit("30/minute")
def calculate_footprint(request: Request, payload: CarbonCalculationInput):
    """
    Calculates the user's carbon footprint based on transport, energy, diet, and consumption habits.
    Rate limited to 30 requests per minute per IP.
    """
    result = calculate_total_carbon_footprint(payload)
    return result
