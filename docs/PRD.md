# Product Requirements Document (PRD)

## MineralOps Pipeline v2 — Manufacturing E2E MVP

| Field | Value |
|-------|--------|
| **Document** | PRD-MOP-002 |
| **Platform** | Static HTML/CSS/JS · GitHub Pages |
| **Related** | BRD-MOP-002 |
| **Date** | 2026-07-31 |

---

## 1. Vision

A **data- and process-driven** portfolio for mineral manufacturing: every business domain has a process track (phases) and a KPI set, from MES production to CRM offtake and treasury hedges.

---

## 2. Views

| View | Purpose |
|------|---------|
| **Portfolio** | Board (by selected module’s phases) + list; filters; vote; CRUD |
| **Business modules** | 18 module cards: ERP analog, process, phases, KPI preview |
| **KPI hub** | Focus module: avg actual vs target; status; full catalog |
| **Process map** | Phase flow for a module + records on each stage |

---

## 3. Data model

```
Record {
  id, title, problem, solution, impact,
  module,          // business module id
  phase,           // id from THAT module’s phases[]
  recordType,      // idea | process | project | commercial | finance
  priority, location, team, lead, submitter,
  kpis: { [kpiId]: { actual, target, unit, name, better } },
  votes, voted, createdAt, updatedAt
}
```

---

## 4. Features (MVP)

| Feature | Status |
|---------|--------|
| 18 business modules with ERP analog | Done |
| Module-specific phase tracks | Done |
| KPI catalog + actuals on records | Done |
| KPI hub (avg vs target, status) | Done |
| Process map | Done |
| Finance, hedging, marketing, CRM modules | Done |
| Filters, board, list, vote | Done |
| Seed demo across modules | Done |
| localStorage persistence | Done |
| BRD / PRD / in-app Docs | Done |

---

## 5. UX notes

- Filter **Module** on portfolio → board columns become that module’s phases  
- Cross-module records with non-matching phase ids appear under **Other module phases**  
- Form rebuilds phase dropdown and KPI inputs when module changes  
- Module detail: phase counts, KPI averages, jump to portfolio filter  

---

## 6. Technical

| Item | Choice |
|------|--------|
| Files | `index.html`, `styles.css`, `data.js`, `app.js` |
| Storage | `localStorage` key `mineralops-pipeline-v2` |
| Host | https://aramina6.github.io/mineralops-pipeline/ |
| Repo | https://github.com/Aramina6/mineralops-pipeline |

---

## 7. Non-goals

Backend ERP connectors, real-time multi-user, auth, file uploads.

---

## 8. Run locally

Open `index.html` or:

```bash
python -m http.server 8080
```

Then http://localhost:8080  
