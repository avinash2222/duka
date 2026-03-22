# Frontend Flow (Phase-1, Draft)

This is a simple, high-level flow for the mobile app.  
We will expand each step later with detailed screens and edge cases.

## Scope (for now)

- Mobile number login
- Role handling (customer default, role choice for multi-role users)
- Location gate (5 km service radius)
- Simple landing pages for each role

## Main user flow

```mermaid
flowchart TD
  A([Open App]) --> B([Login with Mobile Number])
  B --> C{Multiple active roles?}

  C -- No --> D([Customer Home])
  C -- Yes --> E([Show Role Picker])
  E --> F{Selected role}

  F -- Customer --> D
  F -- Delivery Agent --> G([Agent Home<br/>Assigned Orders Only])

  D --> I([Ask Location Permission])
  I --> J{Inside 5 km radius?}
  J -- Yes --> K([Allow Browse and Order])
  J -- No --> L([Show Service Unavailable - Coming Soon])
```

Flow summary:
- Customer-only users go straight to customer home.
- Multi-role users select mode first (customer / delivery agent).
- Customer mode always passes through location + 5 km serviceability check.

## Notes

- Keep all role flows simple and easy to read.
- Agent mode should show only job-critical information.
- Detailed screen behavior will be documented later.
