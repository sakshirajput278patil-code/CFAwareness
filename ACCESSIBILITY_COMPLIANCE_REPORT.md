# Accessibility Compliance Report (WCAG 2.1 AA)

Target: 100/100 Accessibility Score.

## Implemented Features
- **Color Contrast**: The custom Tailwind theme was rigorously selected. The dark slate green text (`#1F2D24`) against the light sage background (`#F7FAF7`) provides a contrast ratio exceeding 7:1, surpassing the WCAG AA requirement of 4.5:1.
- **Semantic HTML & Forms**: 
  - All `<input>` fields possess an explicit associated `<label>` using `htmlFor`.
  - Radio button groups (in the Quiz) are wrapped in `<fieldset>` with descriptive `<legend>` tags.
- **Aria Live Regions**: `aria-live="polite"` is used on the Insights Panel and Quiz Results to ensure screen readers announce dynamic state changes. Errors use `role="alert"` and `aria-live="assertive"`.
- **Keyboard Navigation**: Focus rings are visible (`focus:ring-2 focus:ring-primary`). Every interactive element (buttons, inputs) is reachable via the `Tab` key without traps.
- **Charts**: The Recharts historical trend line uses `role="img"` with an `aria-label`, accompanied by a visually hidden `<table className="sr-only">` to ensure screen reader users can consume the same data.
- **Automated Testing**: `jest-axe` (via Vitest) is integrated into the CI pipeline to automatically fail the build on any Axe accessibility violations.
