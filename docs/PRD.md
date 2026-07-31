# Product Requirements Document (PRD)

## MineralOps Pipeline — MVP

| Field | Value |
|-------|--------|
| **Document** | PRD-MOP-001 |
| **Product** | MineralOps Pipeline |
| **Users** | Mineral manufacturing project developers & plant operators |
| **Version** | 2.0 MVP |
| **Platform** | Static web (GitHub Pages) |
| **Related** | BRD-MOP-001 |
| **Date** | 2026-07-31 |

---

## 1. Vision

> Give project developers and plant operators a simple place to **add ideas, vote, and track progress** through analytics screening and manufacturing phases (process efficiency, supply chain, waste & ESG)—with clear **team, location, and lead**.

---

## 2. Goals & non-goals

### Goals

- Submit/edit ideas with manufacturing fields  
- Upvote toggle  
- 10-phase lifecycle  
- Category, team, location, lead, priority  
- Board + list + filters  
- KPI strip (analytics vs manufacturing)  
- Seed demo data  
- `localStorage` persistence  
- GitHub Pages deploy  

### Non-goals

Auth/SSO, multi-user sync server, attachments, notifications, native mobile  

---

## 3. Key features

| Feature | Priority |
|---------|----------|
| Idea capture form | P0 |
| Voting | P0 |
| Phase tracking | P0 |
| Ownership fields (team, location, lead) | P0 |
| Filters + search | P0 |
| Board & list views | P0 |
| Dashboard KPIs | P0 |
| Seed + reset demo | P0 |
| Docs / UI guide | P0 |

---

## 4. Data model

```
Idea {
  id, title, problem, solution, impact,
  category, phase, priority,
  location, team, lead, submitter,
  votes, voted, createdAt, updatedAt
}
```

### Dropdowns

- **Categories:** Process Efficiency, Supply Chain Problem, Waste Management, Quality & Yield, Energy & Utilities, Safety & Compliance, Digital & Analytics, Mineral Recovery  
- **Phases:** 10 stage gates (see BRD)  
- **Locations:** Site A–D plants, Central Lab, Project Development / Multi-site  
- **Teams:** Project Development, Process Engineering, Operations, Supply Chain, EHS/Waste, Quality, Data & Analytics, CI, R&D  
- **Priority:** Low · Medium · High · Critical  

---

## 5. User stories

| ID | Story |
|----|-------|
| US-1 | As an operator, I submit an idea with location and lead in under two minutes. |
| US-2 | As a project developer, I filter multi-site ideas by phase and category. |
| US-3 | As a peer, I vote so high-signal ideas rise. |
| US-4 | As a lead, I advance phase so progress is visible. |
| US-5 | As CI, I see analytics vs manufacturing mix on the KPI strip. |

---

## 6. UI / UX

| Area | Behavior |
|------|----------|
| Header | Brand, Docs, Reset demo, Add idea |
| KPI strip | Total, open, analytics count, manufacturing count, votes |
| Filters | Phase, Category, Location, Team, Priority, search |
| Board | Kanban by phase; family color bands |
| List | Table sorted by votes |
| Form | Required ownership; phase family hint |
| Detail | Narrative, phase select, advance, edit, delete |

**Design:** dark industrial theme; blue = analytics; copper = manufacturing; green = waste/ESG; purple = pilot/scale.

---

## 7. Technical

| Area | Choice |
|------|--------|
| Stack | HTML + CSS + vanilla JS |
| Hosting | GitHub Pages |
| State | localStorage `mineralops-pipeline-v1` |
| Repo | github.com/Aramina6/mineralops-pipeline |

---

## 8. Traceability

BR-1→form · BR-2→vote · BR-3→phases · BR-4→ownership · BR-5→family UI · BR-6→filters · BR-7→board · BR-8→static · BR-9→copy/seed  
