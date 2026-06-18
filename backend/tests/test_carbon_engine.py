from app.models.carbon_models import (
    CarbonCalculationInput,
    TransportInput,
    EnergyInput,
    DietInput,
    ConsumptionInput,
    DietType,
    ConsumptionType,
)
from app.carbon.engine import calculate_total_carbon_footprint


def test_calculate_total_carbon_footprint_zero():
    input_data = CarbonCalculationInput(
        transport=TransportInput(
            car_km_per_week=0,
            bus_km_per_week=0,
            train_km_per_week=0,
            short_haul_flights_per_year=0,
            long_haul_flights_per_year=0,
        ),
        energy=EnergyInput(electricity_kwh_per_month=0, natural_gas_kwh_per_month=0),
        diet=DietInput(diet_type=DietType.VEGAN),
        consumption=ConsumptionInput(consumption_type=ConsumptionType.MINIMALIST),
    )

    result = calculate_total_carbon_footprint(input_data)

    # 0 for transport + 0 for energy + 912.0 for vegan diet + 1000.0 for minimalist consumption
    expected_total = 1912.0
    assert result.total_kg_co2e == expected_total
    assert result.breakdown.transport_kg_co2e == 0.0
    assert result.breakdown.energy_kg_co2e == 0.0
    assert result.breakdown.diet_kg_co2e == 912.0
    assert result.breakdown.consumption_kg_co2e == 1000.0


def test_calculate_total_carbon_footprint_average():
    input_data = CarbonCalculationInput(
        transport=TransportInput(
            car_km_per_week=100,  # 100 * 0.17 * 52.14 = 886.38
            bus_km_per_week=20,  # 20 * 0.09 * 52.14 = 93.85
            train_km_per_week=0,
            short_haul_flights_per_year=1,  # 1 * 150 = 150
            long_haul_flights_per_year=0,
        ),
        energy=EnergyInput(
            electricity_kwh_per_month=200,  # 200 * 0.38 * 12 = 912
            natural_gas_kwh_per_month=500,  # 500 * 0.18 * 12 = 1080
        ),
        diet=DietInput(diet_type=DietType.OMNIVORE_LOW_MEAT),  # 1642.0
        consumption=ConsumptionInput(
            consumption_type=ConsumptionType.AVERAGE
        ),  # 2500.0
    )

    result = calculate_total_carbon_footprint(input_data)

    transport_expected = round(100 * 0.17 * 52.14 + 20 * 0.09 * 52.14 + 150, 2)
    energy_expected = round(200 * 0.38 * 12 + 500 * 0.18 * 12, 2)
    diet_expected = 1642.0
    consumption_expected = 2500.0

    total_expected = round(
        transport_expected + energy_expected + diet_expected + consumption_expected, 2
    )

    assert result.total_kg_co2e == total_expected
    assert result.breakdown.transport_kg_co2e == transport_expected
    assert result.breakdown.energy_kg_co2e == energy_expected

    # Check percentages
    assert result.global_average_comparison_percent == round(
        (total_expected / 4000.0) * 100, 2
    )
    assert result.paris_target_comparison_percent == round(
        (total_expected / 2000.0) * 100, 2
    )
