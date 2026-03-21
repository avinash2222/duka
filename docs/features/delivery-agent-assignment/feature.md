# Feature: Delivery Agent Assignment (Phase-1)

- Feature ID: `FEAT-001`
- Slug: `delivery-agent-assignment`
- Status: `draft`
- Owner: `product + ops`
- Last Updated: `2026-03-21`

## 1) Business context

In phase-1, operations are simple. Orders are assigned to delivery agents, and agents must complete deliveries with minimal app complexity.

## 2) Scope

### In scope
- Agent receives assigned orders.
- Agent sees only job-critical fields (address/location, due time, comments).
- Agent marks order delivered or not delivered.
- Operations can track which agent handled which order.

### Out of scope
- Advanced real-time streams.
- Automatic route optimization.

## 3) User roles impacted

- Delivery agent
- Admin / operations

## 4) Functional requirements

| Req ID | Requirement | Priority |
|---|---|---|
| REQ-001 | Assigned orders are visible only to assigned agent. | Must |
| REQ-002 | Agent can update delivery status: delivered / not delivered. | Must |
| REQ-003 | Agent receives simple alert for new assignment. | Must |

## 5) Acceptance criteria

- [ ] AC-001: Agent home shows assigned orders only.
- [ ] AC-002: Agent can mark each assigned order delivered or not delivered.
- [ ] AC-003: Admin can view per-agent delivery outcomes.

## 6) UX notes

Use large, simple labels and avoid extra detail in agent mode.

## 7) Risks and fallback

- Risk: Notification missed by agent.
- Fallback: Ops phone call confirmation.
