from app.models.carbon_models import (
    CarbonCalculationInput,
    CarbonCalculationResult,
    CarbonCalculationBreakdown,
    DietType,
    ConsumptionType,
)

# Constants & Emission Factors
# All factors are converted to kg CO2e per unit

# Transport: UK DEFRA 2023 & ICAO Carbon Calculator 2023
CAR_KG_CO2E_PER_KM = 0.17  # Average petrol car
BUS_KG_CO2E_PER_KM = 0.09  # Average local bus
TRAIN_KG_CO2E_PER_KM = 0.04  # National rail
SHORT_HAUL_FLIGHT_KG_CO2E = 150.0  # Approx per flight (< 1500km)
LONG_HAUL_FLIGHT_KG_CO2E = 600.0   # Approx per flight (> 1500km)
WEEKS_PER_YEAR = 52.14

# Energy: US EPA eGRID 2023 & UK DEFRA 2023
ELECTRICITY_KG_CO2E_PER_KWH = 0.38  # US Average
NATURAL_GAS_KG_CO2E_PER_KWH = 0.18  # Global Average
MONTHS_PER_YEAR = 12

# Diet: Our World in Data 2023 (Poore & Nemecek 2018)
DIET_KG_CO2E_PER_YEAR = {
    DietType.VEGAN: 912.0,            # ~2.5 kg/day
    DietType.VEGETARIAN: 1168.0,      # ~3.2 kg/day
    DietType.OMNIVORE_LOW_MEAT: 1642.0, # ~4.5 kg/day
    DietType.OMNIVORE_HIGH_MEAT: 2628.0 # ~7.2 kg/day
}

# Consumption: IPCC AR6 WG3 Chapter 5
CONSUMPTION_KG_CO2E_PER_YEAR = {
    ConsumptionType.MINIMALIST: 1000.0,
    ConsumptionType.AVERAGE: 2500.0,
    ConsumptionType.HIGH: 4000.0
}

# Benchmarks
GLOBAL_AVERAGE_KG_CO2E = 4000.0  # Our World in Data 2023
PARIS_1_5C_TARGET_KG_CO2E = 2000.0 # IPCC SR1.5 2018


def calculate_transport(input_data: CarbonCalculationInput) -> float:
    """Calculates yearly transport emissions in kg CO2e."""
    t = input_data.transport
    weekly_ground_emissions = (
        t.car_km_per_week * CAR_KG_CO2E_PER_KM +
        t.bus_km_per_week * BUS_KG_CO2E_PER_KM +
        t.train_km_per_week * TRAIN_KG_CO2E_PER_KM
    )
    yearly_ground = weekly_ground_emissions * WEEKS_PER_YEAR
    yearly_flights = (
        t.short_haul_flights_per_year * SHORT_HAUL_FLIGHT_KG_CO2E +
        t.long_haul_flights_per_year * LONG_HAUL_FLIGHT_KG_CO2E
    )
    return yearly_ground + yearly_flights


def calculate_energy(input_data: CarbonCalculationInput) -> float:
    """Calculates yearly home energy emissions in kg CO2e."""
    e = input_data.energy
    monthly_emissions = (
        e.electricity_kwh_per_month * ELECTRICITY_KG_CO2E_PER_KWH +
        e.natural_gas_kwh_per_month * NATURAL_GAS_KG_CO2E_PER_KWH
    )
    return monthly_emissions * MONTHS_PER_YEAR


def calculate_diet(input_data: CarbonCalculationInput) -> float:
    """Calculates yearly diet emissions in kg CO2e."""
    return DIET_KG_CO2E_PER_YEAR[input_data.diet.diet_type]


def calculate_consumption(input_data: CarbonCalculationInput) -> float:
    """Calculates yearly consumption emissions in kg CO2e."""
    return CONSUMPTION_KG_CO2E_PER_YEAR[input_data.consumption.consumption_type]


def calculate_total_carbon_footprint(input_data: CarbonCalculationInput) -> CarbonCalculationResult:
    """
    Core calculation engine: Pure function taking an input model and returning a detailed result.
    """
    transport_emissions = calculate_transport(input_data)
    energy_emissions = calculate_energy(input_data)
    diet_emissions = calculate_diet(input_data)
    consumption_emissions = calculate_consumption(input_data)

    total_emissions = transport_emissions + energy_emissions + diet_emissions + consumption_emissions

    global_avg_comparison = (total_emissions / GLOBAL_AVERAGE_KG_CO2E) * 100
    paris_target_comparison = (total_emissions / PARIS_1_5C_TARGET_KG_CO2E) * 100

    return CarbonCalculationResult(
        total_kg_co2e=round(total_emissions, 2),
        breakdown=CarbonCalculationBreakdown(
            transport_kg_co2e=round(transport_emissions, 2),
            energy_kg_co2e=round(energy_emissions, 2),
            diet_kg_co2e=round(diet_emissions, 2),
            consumption_kg_co2e=round(consumption_emissions, 2),
        ),
        global_average_comparison_percent=round(global_avg_comparison, 2),
        paris_target_comparison_percent=round(paris_target_comparison, 2),
    )
