# Security Threat Model and Policies

## Zero PII Policy
EcoTrack intentionally avoids user authentication for its core features to minimize PII exposure. Sessions are tracked via an anonymous `device_id` (UUID generated on the client). No names, emails, or IPs are stored in Firestore or BigQuery. 

## Cloud Infrastructure Security
- **Secret Manager**: All sensitive credentials (API keys) are injected at runtime via Secret Manager. Zero secrets exist in source control.
- **Service Accounts**: The Cloud Run service operates under a principle-of-least-privilege service account scoped solely to the required GCP services (Firestore, Pub/Sub, Vertex AI).

## Application Security
- **Rate Limiting**: Implemented via `slowapi` on FastAPI to prevent abuse:
  - `/calculate`: 30 req/min
  - `/insights`: 10 req/min
  - `/quiz`: 20 req/min
- **Validation**: Strict boundary validation using Pydantic v2 (server-side) and Zod (client-side).
- **Headers**: Helmet-style security headers are injected globally via FastAPI middleware (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
- **CORS**: Explicit allowlist rather than wildcard `*`.

## Dependency Auditing
`pip-audit` and `npm audit` are executed automatically via GitHub Actions on every push to prevent supply chain vulnerabilities.
