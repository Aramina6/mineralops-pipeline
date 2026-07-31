# Business Requirements Document (BRD)

## Critical Minerals Idea Pipeline

| Field | Value |
|-------|--------|
| **Document** | BRD-CMP-001 |
| **Product** | Critical Minerals Idea Pipeline |
| **Owner** | Product / Manufacturing Excellence |
| **Status** | Approved for MVP |
| **Version** | 1.0 |
| **Date** | 2026-07-31 |

---

## 1. Executive Summary

Critical minerals manufacturers operate under tight margins, complex process chemistry, volatile supply chains, and rising ESG pressure. High-value improvement ideas often die in email threads, local spreadsheets, or hallway conversations. There is no single place to **capture**, **prioritize**, and **advance** ideas from shop floor insight to production impact.

The **Critical Minerals Idea Pipeline** is a lightweight collaboration tool that lets employees submit ideas, vote on them, assign ownership (team, location, lead), and move each idea through a clear lifecycle—from analytics screening to core manufacturing phases such as process efficiency, supply chain resolution, and waste management.

**Business outcome:** higher idea conversion rate, transparent prioritization, and faster time-to-value on initiatives that improve yield, recovery, cost, and compliance.

---

## 2. Business Context

### 2.1 Industry drivers (critical minerals)

| Driver | Why it matters |
|--------|----------------|
| **Yield & recovery** | Small gains in recovery of lithium, rare earths, cobalt, nickel, graphite, etc. drive large P&L impact |
| **Process intensity** | Hydromet, pyromet, leaching, flotation, and refining are multi-step and sensitive to feedstock |
| **Supply chain risk** | Feedstock quality, logistics, and geopolitical concentration create operational risk |
| **Waste & ESG** | Tailings, reagents, water, and energy are regulated and reputationally material |
| **Knowledge silos** | Plant, process engineering, supply chain, and analytics teams rarely share one idea system |

### 2.2 Current state problems

- Ideas are scattered (email, chat, whiteboards, site-specific trackers).
- No shared scoring or voting → loudest voice wins, not highest impact.
- Unclear stage gates: analytics pilots and plant trials look the same on a Kanban board.
- Ownership is vague (who leads? which site? which function?).
- Leadership cannot see portfolio health: backlog vs. in pilot vs. realized value.

### 2.3 Desired future state

A single, simple portal where:

1. Anyone can submit an idea in under two minutes.
2. Peers vote so demand and impact surface early.
3. Ideas move through **explicit phases** (screening analytics → technical manufacturing workstreams).
4. Every idea has a **category**, **location**, **team**, and **lead**.
5. Managers filter by site, category, phase, and priority for reviews and capital allocation.

---

## 3. Business Objectives

| ID | Objective | Success measure |
|----|-----------|-----------------|
| BO-1 | Capture more improvement ideas from all sites | ≥ 2× ideas logged vs. prior quarter baseline |
| BO-2 | Prioritize with transparent community signal | ≥ 60% of promoted ideas have peer votes |
| BO-3 | Shorten idea-to-pilot cycle | Median days from Submit → Pilot ↓ 25% |
| BO-4 | Balance portfolio across analytics and plant work | Visible mix of Analytics vs. Process / Supply Chain / Waste |
| BO-5 | Create accountability | 100% of active ideas have Lead + Location + Team |

---

## 4. Stakeholders

| Stakeholder | Interest |
|-------------|----------|
| Plant operators & technicians | Fast submit, see status of their ideas |
| Process engineers | Technical phases, process efficiency track |
| Supply chain / procurement | Logistics and feedstock risk ideas |
| EHS / ESG / waste teams | Waste, water, emissions, tailings initiatives |
| Data & analytics | Feasibility screening, KPI impact models |
| Site leadership | Portfolio view by location and phase |
| Manufacturing excellence / CI | Program ownership, stage-gate discipline |
| Executive sponsors | Realized value narrative, capital prioritization |

---

## 5. Business Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| BR-1 | System shall allow authenticated-style self-service idea submission (name + idea fields for MVP static) | Must |
| BR-2 | System shall support peer voting on ideas | Must |
| BR-3 | System shall track ideas through defined lifecycle phases (see BRD §6) | Must |
| BR-4 | System shall require category, location, team, and lead for managed ideas | Must |
| BR-5 | System shall distinguish **analytics / screening** phases from **core manufacturing** phases | Must |
| BR-6 | System shall support filtering and search for portfolio reviews | Must |
| BR-7 | System shall present a kanban / board view by phase | Should |
| BR-8 | System shall work as a static site (GitHub Pages) for pilot with no backend | Must (MVP) |
| BR-9 | System shall be domain-tuned for critical minerals manufacturing language | Must |

---

## 6. Idea Lifecycle Phases (business definition)

Phases are **stage gates**, not free-form labels. Two families:

### 6.1 Analytics & decision phases

| Phase | Purpose | Typical exit criteria |
|-------|---------|------------------------|
| **1. Submitted** | Intake complete | Required fields present |
| **2. Impact Screening** | Analytics: rough ROI, risk, strategic fit | Scorecard complete; go / no-go |
| **3. Data Validation** | Analytics: data available, baseline KPI defined | Baseline metrics agreed |

### 6.2 Core technical manufacturing phases

| Phase | Purpose | Typical exit criteria |
|-------|---------|------------------------|
| **4. Technical Feasibility** | Process / metallurgy / engineering feasibility | Feasible path documented |
| **5. Process Efficiency** | Plant process, recovery, throughput, quality | Pilot SOP / trial plan ready |
| **6. Supply Chain Resolution** | Feedstock, logistics, inventory, vendor risk | Mitigations defined or trial planned |
| **7. Waste & ESG Alignment** | Tailings, reagents, water, energy, compliance | EHS/ESG sign-off for pilot |
| **8. Pilot Execution** | Controlled plant or lab pilot | Results vs. baseline recorded |
| **9. Scale-Up / Production** | Rollout to line or multi-site | Production adoption plan |
| **10. Realized / Closed** | Value captured or idea retired | Benefits logged or archive reason |

> **Note:** Not every idea visits every manufacturing phase. A pure supply-chain idea may skip Process Efficiency; a pure analytics dashboard may stop after Data Validation or go to Realized after a light pilot. Phase path is category-guided, not forced linearly for all types.

---

## 7. Idea categories (product taxonomy)

Aligned to manufacturing reality for critical minerals:

| Category | Focus |
|----------|--------|
| Process Efficiency | Recovery, throughput, downtime, recipe / control |
| Supply Chain Problem | Feedstock quality, logistics, dual sourcing, inventory |
| Waste Management | Tailings, effluent, scrap, circular recovery |
| Quality & Yield | Spec compliance, grade variability, reject rate |
| Energy & Utilities | Power, heat, water intensity |
| Safety & Compliance | Process safety, permits, audit findings |
| Digital & Analytics | Sensors, models, dashboards, predictive quality |
| Critical Minerals Recovery | Selective recovery, by-product valorization |

---

## 8. Scope of this BRD vs. out of scope

### In scope (business)

- Idea capture, vote, phase tracking, ownership fields
- Portfolio visibility for manufacturing excellence
- Critical minerals language and phase model
- Static MVP for demo / pilot adoption

### Out of scope (business — later)

- Full ERP / MES / LIMS integration
- Automated financial benefits calculation in SAP
- Formal stage-gate workflow with electronic signatures
- Mobile native apps
- Multi-tenant SaaS billing

---

## 9. Assumptions & constraints

- Pilot users accept browser-based local persistence (static MVP) until a backend is funded.
- Single-organization use; no external supplier portal in MVP.
- English UI for v1.
- GitHub Pages hosting is acceptable for internal demo and public portfolio showcase.

---

## 10. Risks & mitigations

| Risk | Mitigation |
|------|------------|
| Low adoption | One-click submit, pre-filled examples, champion at each site |
| Phase model too rigid | Category-aware guidance; allow skip with reason in later versions |
| Duplicate ideas | Search + title similarity in filters (MVP: search) |
| Data loss on static site | Document localStorage limits; roadmap backend |

---

## 11. Why this product exists (one paragraph)

Critical minerals manufacturing wins on **recovery, cost, and compliance**—all of which improve when the best ideas from every site are visible, voted, owned, and progressed through the right technical path. This pipeline turns tribal knowledge into a managed portfolio so analytics screening and plant execution stay aligned, and leadership can invest where impact is proven—not just proposed.

---

## 12. Approval

| Role | Name | Date |
|------|------|------|
| Product Manager | — | 2026-07-31 |
| Manufacturing Excellence | — | — |
| Site Leadership | — | — |
