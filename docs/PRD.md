# Product Requirements Document (PRD)

## Critical Minerals Idea Pipeline — MVP

| Field | Value |
|-------|--------|
| **Document** | PRD-CMP-001 |
| **Product** | Critical Minerals Idea Pipeline |
| **Version** | 1.0 MVP |
| **Platform** | Static web app (GitHub Pages) |
| **Related** | BRD-CMP-001 |
| **Date** | 2026-07-31 |

---

## 1. Product vision

> Give every person in a critical minerals manufacturing organization a simple place to **add ideas, vote, and track progress** from analytics screening through process efficiency, supply chain, and waste management—with clear **team, location, and lead**.

**MVP goal:** A polished, self-contained demo site that proves UX, phase model, and portfolio views—publishable on GitHub Pages with no backend.

---

## 2. Target users (personas)

| Persona | Needs |
|---------|--------|
| **Plant contributor** | Submit idea fast; vote on peers; see if idea moved |
| **Process / supply chain lead** | Own ideas; advance phase; filter by site |
| **Analytics reviewer** | Screen impact; validate data readiness |
| **CI / manufacturing excellence** | Portfolio board; phase distribution; review cadence |
| **Site manager** | Filter by location; ensure every active idea has a lead |

---

## 3. Problem statement

Ideas that improve recovery, reduce waste, or de-risk supply chains are not systematically captured or progressed. Existing tools are either generic (no manufacturing phase language) or heavy (enterprise PLM). We need a **focused MVP** that models our real stages and ownership model.

---

## 4. Goals & non-goals

### Goals (MVP)

- Submit and edit ideas with manufacturing-relevant fields
- Upvote / remove vote (toggle)
- Move ideas across **10 defined phases**
- Assign **category, team, location, lead, priority**
- Board + list views with filters and search
- Dashboard stats (by phase family, category, votes)
- Seed data for critical minerals scenarios
- Persist in browser `localStorage`
- Deploy on GitHub Pages

### Non-goals (MVP)

- User authentication / SSO
- Real-time multi-user sync (server)
- File attachments / photos
- Email or Slack notifications
- Role-based permissions
- Export to Excel (nice-to-have later)
- Mobile native app

---

## 5. Scope — key features

### 5.1 Feature map

| Feature | Description | Priority |
|---------|-------------|----------|
| F1 Idea capture form | Title, problem, proposed solution, expected impact, category, location, team, lead, priority | P0 |
| F2 Voting | One vote toggle per idea per browser; vote count visible | P0 |
| F3 Phase tracking | Advance / set phase from defined list; visual stage indicator | P0 |
| F4 Ownership fields | Team, location, lead always visible on cards | P0 |
| F5 Filters | Phase, category, location, team, priority, search | P0 |
| F6 Board view | Kanban columns by phase (grouped) | P0 |
| F7 List / detail view | Sortable list + detail drawer/modal | P0 |
| F8 Dashboard | Counts: total, open, in manufacturing phases, top voted | P0 |
| F9 Seed demo data | Critical minerals sample ideas | P0 |
| F10 Reset demo | Restore seed data | P1 |
| F11 UI polish | Dropdowns, badges, empty states, responsive layout | P0 |

### 5.2 Data model (MVP)

```
Idea {
  id: string
  title: string
  problem: string
  solution: string
  impact: string              // expected benefit narrative
  category: enum              // see taxonomy
  phase: enum                 // see phases
  priority: Low | Medium | High | Critical
  location: enum              // plant / site
  team: enum                  // function
  lead: string                // person name
  submitter: string
  votes: number
  voted: boolean              // local browser vote state
  createdAt: ISO string
  updatedAt: ISO string
}
```

### 5.3 Categories (dropdown)

1. Process Efficiency  
2. Supply Chain Problem  
3. Waste Management  
4. Quality & Yield  
5. Energy & Utilities  
6. Safety & Compliance  
7. Digital & Analytics  
8. Critical Minerals Recovery  

### 5.4 Phases (dropdown + board)

| Code | Phase label | Family | UI accent |
|------|-------------|--------|-----------|
| submitted | Submitted | Analytics | Neutral |
| impact_screening | Impact Screening | Analytics | Blue |
| data_validation | Data Validation | Analytics | Blue |
| technical_feasibility | Technical Feasibility | Manufacturing | Copper |
| process_efficiency | Process Efficiency | Manufacturing | Copper |
| supply_chain | Supply Chain Resolution | Manufacturing | Amber |
| waste_esg | Waste & ESG Alignment | Manufacturing | Green |
| pilot | Pilot Execution | Manufacturing | Purple |
| scale_up | Scale-Up / Production | Manufacturing | Purple |
| realized | Realized / Closed | Closed | Gray |

### 5.5 Locations (dropdown — example network)

- Lithium Hydroxide Plant — Nevada  
- REE Separation — Texas  
- Cobalt Refinery — Louisiana  
- Graphite Anode — Michigan  
- Central Lab / Pilot Plant  
- Corporate / Multi-site  

### 5.6 Teams (dropdown)

- Process Engineering  
- Operations  
- Supply Chain  
- EHS / Waste  
- Quality  
- Data & Analytics  
- Continuous Improvement  
- R&D / Metallurgy  

### 5.7 Priority (dropdown)

Low · Medium · High · Critical  

---

## 6. User stories

| ID | Story | Acceptance |
|----|-------|------------|
| US-1 | As a contributor, I can submit an idea with category, location, team, and lead so ownership is clear from day one. | All required fields validated; idea appears on board in Submitted |
| US-2 | As a peer, I can vote on an idea so popular / high-signal ideas rise. | Vote count increments; toggle removes vote |
| US-3 | As a lead, I can change phase so progress is visible to leadership. | Phase updates on card and board column |
| US-4 | As a site manager, I can filter by location and phase for reviews. | Filter reduces visible set correctly |
| US-5 | As CI, I can see analytics vs manufacturing phase mix on the dashboard. | Counts match data |
| US-6 | As a visitor on GitHub Pages, I can explore seeded critical minerals ideas without login. | Demo loads with sample data |

---

## 7. UI / UX requirements

### 7.1 Design principles

1. **Industrial clarity** — dense but readable; status always scannable.  
2. **Phase literacy** — analytics vs manufacturing visually distinct.  
3. **Fast capture** — primary CTA always visible: “Add idea”.  
4. **Portfolio first** — board + filters for weekly reviews.  
5. **Accessible controls** — native-feeling dropdowns, keyboard focus, labels.

### 7.2 Layout (desktop)

```
┌──────────────────────────────────────────────────────────┐
│ Header: logo · product name · Add Idea · Reset demo      │
├──────────────────────────────────────────────────────────┤
│ KPI strip: Total | Open | In mfg phases | Top voted      │
├──────────────────────────────────────────────────────────┤
│ Filters: Search · Phase · Category · Location · Team ·   │
│          Priority · View toggle (Board | List)           │
├──────────────────────────────────────────────────────────┤
│ Main: Board columns OR List table                        │
└──────────────────────────────────────────────────────────┘
│ Modal: Add / Edit idea · Detail view                     │
```

### 7.3 Controls (dropdowns & interactions)

| Control | Type | Behavior |
|---------|------|----------|
| Category | Select | Required on create |
| Phase | Select | Changeable from card & detail |
| Location | Select | Required |
| Team | Select | Required |
| Priority | Select | Default Medium |
| Lead | Text | Required |
| Search | Text input | Filters title/problem/lead |
| View | Segmented control | Board / List |
| Vote | Button | Heart/upvote toggle |
| Phase chips | Badge | Color by family |

### 7.4 Card content (board)

- Title  
- Category badge + Priority badge  
- Phase badge (family-colored)  
- Location · Team · Lead  
- Vote count + Vote button  
- Short impact snippet  

### 7.5 Empty & error states

- No results after filter → “No ideas match. Clear filters or add one.”  
- Validation errors inline under required fields  

### 7.6 Responsive

- Desktop: multi-column board (horizontal scroll OK)  
- Tablet/mobile: stacked filters; board becomes vertical phase sections or list default  

---

## 8. Sample seed ideas (critical minerals)

1. Improve leach recovery of lithium via temperature profile control — Process Efficiency  
2. Dual-source spodumene to cut single-mine risk — Supply Chain Problem  
3. Recover cobalt from process sludge — Waste Management / Critical Minerals Recovery  
4. Predictive model for flotation reagent dosing — Digital & Analytics  
5. Reduce process water intensity in separation circuit — Energy & Utilities / Waste  

---

## 9. Technical requirements (MVP)

| Area | Choice |
|------|--------|
| Stack | HTML + CSS + vanilla JS (no build step) |
| Hosting | GitHub Pages (`/docs` or root `index.html`) |
| State | `localStorage` key `cm-idea-pipeline-v1` |
| Browser | Modern Chromium, Firefox, Safari |
| Repo | Public under github.com/Aramina6 |

---

## 10. Success metrics (product)

| Metric | Target (pilot month) |
|--------|----------------------|
| Ideas created in demo sessions | ≥ 10 organic beyond seed |
| Time to first idea submit | < 90 seconds |
| Phase changes per week (pilot team) | ≥ 5 |
| Qualitative: “phases match how we work” | ≥ 4/5 stakeholder score |

---

## 11. Release plan

| Milestone | Deliverable |
|-----------|-------------|
| M1 | BRD + PRD |
| M2 | Static UI + full CRUD-like local flow |
| M3 | Seed data + docs + README |
| M4 | GitHub Pages live URL |

---

## 12. Open questions (post-MVP)

- Backend (Supabase / Azure) for multi-user sync?  
- SSO with corporate IdP?  
- Link ideas to CAPEX request IDs?  
- Attach pilot result metrics automatically?

---

## 13. Traceability

| BRD req | PRD feature |
|---------|-------------|
| BR-1 | F1 |
| BR-2 | F2 |
| BR-3 | F3 |
| BR-4 | F1, F4 |
| BR-5 | F3, F8, phase family UI |
| BR-6 | F5 |
| BR-7 | F6 |
| BR-8 | Technical requirements |
| BR-9 | Categories, seed data, copy |
