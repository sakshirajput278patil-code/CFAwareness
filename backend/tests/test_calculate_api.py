from fastapi.testclient import TestClient
from app.main import app
from app.models.carbon_models import DietType, ConsumptionType

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_calculate_endpoint():
    payload = {
        "transport": {
            "car_km_per_week": 100,
            "bus_km_per_week": 0,
            "train_km_per_week": 0,
            "short_haul_flights_per_year": 1,
            "long_haul_flights_per_year": 0
        },
        "energy": {
            "electricity_kwh_per_month": 200,
            "natural_gas_kwh_per_month": 500
        },
        "diet": {
            "diet_type": DietType.OMNIVORE_LOW_MEAT
        },
        "consumption": {
            "consumption_type": ConsumptionType.AVERAGE
        }
    }
    
    response = client.post("/api/v1/calculate/", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "total_kg_co2e" in data
    assert "breakdown" in data
    assert "global_average_comparison_percent" in data
    assert "paris_target_comparison_percent" in data
    assert data["breakdown"]["diet_kg_co2e"] == 1642.0
