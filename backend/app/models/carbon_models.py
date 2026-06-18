from pydantic import BaseModel, Field
from enum import Enum


class DietType(str, Enum):
    VEGAN = "vegan"
    VEGETARIAN = "vegetarian"
    OMNIVORE_LOW_MEAT = "omnivore_low_meat"
    OMNIVORE_HIGH_MEAT = "omnivore_high_meat"


class ConsumptionType(str, Enum):
    MINIMALIST = "minimalist"
    AVERAGE = "average"
    HIGH = "high"


class TransportInput(BaseModel):
    car_km_per_week: float = Field(default=0.0, ge=0)
    bus_km_per_week: float = Field(default=0.0, ge=0)
    train_km_per_week: float = Field(default=0.0, ge=0)
    short_haul_flights_per_year: int = Field(default=0, ge=0)
    long_haul_flights_per_year: int = Field(default=0, ge=0)


class EnergyInput(BaseModel):
    electricity_kwh_per_month: float = Field(default=0.0, ge=0)
    natural_gas_kwh_per_month: float = Field(default=0.0, ge=0)


class DietInput(BaseModel):
    diet_type: DietType = Field(default=DietType.OMNIVORE_LOW_MEAT)


class ConsumptionInput(BaseModel):
    consumption_type: ConsumptionType = Field(default=ConsumptionType.AVERAGE)


class CarbonCalculationInput(BaseModel):
    transport: TransportInput
    energy: EnergyInput
    diet: DietInput
    consumption: ConsumptionInput


class CarbonCalculationBreakdown(BaseModel):
    transport_kg_co2e: float
    energy_kg_co2e: float
    diet_kg_co2e: float
    consumption_kg_co2e: float


class CarbonCalculationResult(BaseModel):
    total_kg_co2e: float
    breakdown: CarbonCalculationBreakdown
    global_average_comparison_percent: float
    paris_target_comparison_percent: float
