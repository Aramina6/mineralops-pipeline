# Business Requirements Document (BRD)

## MineralOps Pipeline

| Field | Value |
|-------|--------|
| **Document** | BRD-MOP-001 |
| **Product** | MineralOps Pipeline |
| **Audience** | Mineral manufacturing project developers & plant operators |
| **Owner** | Product / Manufacturing Excellence |
| **Status** | Approved for MVP |
| **Version** | 2.0 |
| **Date** | 2026-07-31 |

---

## 1. Executive Summary

Mineral manufacturing organizations (concentration, hydromet, smelting, refining, downstream processing) generate high-value improvement ideas from **project developers** and **plant operators**. Those ideas often die in email, chat, or site spreadsheets. There is no shared place to capture, prioritize, and advance work from analytics screening into core plant phases.

**MineralOps Pipeline** is a lightweight tool to:

- Add ideas  
- Vote on them  
- Track them through **analytics** and **core technical manufacturing** phases (process efficiency, supply chain, waste management, pilot, scale-up)  
- Assign **team, location, and lead**

**Business outcome:** higher idea conversion, transparent prioritization, and faster time-to-value for developers and operators.

---

## 2. Business Context

### 2.1 Who uses it

| Persona | Need |
|---------|------|
| **Project developer** | Stage gates, multi-site view, feasibility → pilot → scale |
| **Plant operator** | Fast submit from the floor, clear status, named lead |
| **Process / supply chain / EHS** | Category-specific manufacturing phases |
| **CI / leadership** | Portfolio health by phase family and site |

### 2.2 Problems today

- Ideas scattered across tools  
- No peer signal (votes)  
- Analytics pilots and plant trials look the same on generic boards  
- Unclear ownership (who leads? which site? which team?)

### 2.3 Desired future state

One portal: submit in minutes → vote → assign team/location/lead → move through explicit phases → review on board or list.

---

## 3. Business Objectives

| ID | Objective | Success measure |
|----|-----------|-----------------|
| BO-1 | Capture more ideas from developers and operators | ≥ 2× ideas logged vs. baseline |
| BO-2 | Prioritize with transparent votes | ≥ 60% of promoted ideas have votes |
| BO-3 | Shorten idea-to-pilot cycle | Median Submit → Pilot ↓ 25% |
| BO-4 | Balance analytics vs manufacturing work | Visible mix of phase families |
| BO-5 | Clear accountability | Active ideas have Lead + Location + Team |

---

## 4. Lifecycle phases

### Analytics & decision

| Phase | Purpose |
|-------|---------|
| Submitted | Intake complete |
| Impact Screening | Rough ROI / strategic fit |
| Data Validation | Baseline KPIs & data ready |

### Core technical manufacturing

| Phase | Purpose |
|-------|---------|
| Technical Feasibility | Process / engineering path |
| **Process Efficiency** | Recovery, throughput, control |
| **Supply Chain Resolution** | Feedstock, logistics, vendors |
| **Waste & ESG Alignment** | Tailings, water, compliance |
| Pilot Execution | Controlled trial |
| Scale-Up / Production | Line or multi-site rollout |

### Closed

| Phase | Purpose |
|-------|---------|
| Realized / Closed | Value captured or retired |

Not every idea visits every manufacturing phase; category guides the path.

---

## 5. Categories

Process Efficiency · Supply Chain Problem · Waste Management · Quality & Yield · Energy & Utilities · Safety & Compliance · Digital & Analytics · Mineral Recovery  

---

## 6. Business requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| BR-1 | Self-service idea submission | Must |
| BR-2 | Peer voting | Must |
| BR-3 | Defined lifecycle phases | Must |
| BR-4 | Category, location, team, lead | Must |
| BR-5 | Distinguish analytics vs manufacturing phases | Must |
| BR-6 | Filters and search | Must |
| BR-7 | Board view by phase | Should |
| BR-8 | Static MVP (GitHub Pages) | Must |
| BR-9 | Language for mineral manufacturing ops & project development | Must |

---

## 7. Out of scope (MVP)

ERP/MES integration, SSO, native mobile, multi-tenant SaaS billing, formal e-signature stage gates.

---

## 8. Why this product exists

Mineral manufacturing improves when developers and operators share one pipeline: ideas are visible, voted, owned, and progressed through the right technical path—from analytics screening to process, supply chain, waste, pilot, and production.
