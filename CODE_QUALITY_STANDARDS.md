# Code Quality Standards

## TypeScript (Frontend)
- **Strict Mode**: `tsconfig.json` enforces `strict: true`. Implicit `any` is forbidden.
- **Component Structure**: Functional components only. Business logic extracted to Zustand stores.
- **Styling**: Tailwind utility classes only. No inline styles. Variables mapped in `tailwind.config.js`.
- **Linting**: ESLint with standard React hooks rules. Zero warnings allowed.

## Python (Backend)
- **Typing**: 100% type hints required on all function signatures. `mypy` is used for static analysis.
- **Formatting**: Code must be formatted using `black` and linted with `ruff`.
- **Separation of Concerns**: 
  - `app/carbon/`: Pure, side-effect-free calculation logic (highly testable).
  - `app/routes/`: Thin API handlers.
  - `app/services/`: Cloud integrations and heavy lifting.
- **Error Handling**: No bare `except:` blocks. All failures (e.g., Gemini timeouts) must gracefully degrade using deterministic fallbacks.
