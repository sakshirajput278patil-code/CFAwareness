# EcoTrack: Personal Carbon Footprint Platform
> Understand, Learn, Track, and Reduce your carbon footprint with actionable insights.

![CI Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen)
![Accessibility](https://img.shields.io/badge/accessibility-WCAG%20AA-blue)
![GCP Services](https://img.shields.io/badge/GCP_Services-8-blue)

## Chosen Vertical: The Carbon Lifecycle

| Phase | Description | Key Feature |
|-------|-------------|-------------|
| **Understand** | Scientifically grounded footprint calculator | Transport, Energy, Diet & Consumption inputs |
| **Learn** | Interactive Carbon Awareness Quiz & Articles | 10-question literacy quiz with facts |
| **Track** | Anonymous trend monitoring over time | Recharts trend line without storing PII |
| **Reduce** | Personalized emission reduction actions | Gemini AI deterministic rule-engine fallback |

## Architecture
```text
[ React Frontend ] ---> [ FastAPI Backend ]
                        |---> Vertex AI (Gemini Insights)
                        |---> Firestore (Anonymous History)
                        |---> BigQuery (Aggregate Analytics)
                        |---> Pub/Sub (Event Streaming)
```

## Google Cloud Services Used
| Service | Role in EcoTrack |
|---------|-----------------|
| **Vertex AI** | Generates personalized reduction insights via Gemini. |
| **Firestore** | Stores anonymous history per device ID. |
| **BigQuery** | Receives streamed aggregate data for global analytics. |
| **Pub/Sub** | Streams events asynchronously to decouple analytics. |
| **Secret Manager** | Securely manages all API keys and config. |
| **Cloud Run** | Serverless deployment target for the FastAPI backend. |
| **Cloud Build** | CI/CD pipeline and multi-stage Docker builds. |
| **Cloud Logging** | Structured request/error monitoring. |

## Tech Stack
- **Frontend**: React 18, Vite, TS (Strict), Tailwind CSS, Zustand, Recharts, Zod.
- **Backend**: Python 3.11, FastAPI, Pydantic v2, pytest.
- **DevOps**: Docker, GitHub Actions, Firebase Hosting.

## Emission Factor Sources
| Category | Source |
|----------|--------|
| Transport | UK DEFRA 2023 |
| Aviation | ICAO Carbon Calculator 2023 |
| Electricity | US EPA eGRID 2023 |
| Diet | Our World in Data (Poore & Nemecek 2018) |
| Global Avg | Our World in Data (4,000 kg CO2e) |
| Paris Target | IPCC SR1.5 (2,000 kg CO2e) |

## Quick Start (Local Dev)
EcoTrack is configured to run locally without needing GCP credentials out-of-the-box using mock fallbacks.

```bash
# Terminal 1: Backend
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```

## Deployment
The backend deploys to Cloud Run using the `Dockerfile`. The frontend deploys to Firebase Hosting using `firebase.json`.
