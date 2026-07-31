# Business Requirements Document (BRD)

## MineralOps Pipeline — Manufacturing E2E

| Field | Value |
|-------|--------|
| **Document** | BRD-MOP-002 |
| **Product** | MineralOps Pipeline |
| **Audience** | Project developers & plant operators |
| **Version** | 2.0 |
| **Date** | 2026-07-31 |

---

## 1. Executive summary

Mineral manufacturing needs one place to run **end-to-end business and plant work**: production process tracks, quality, maintenance, supply chain, procurement, inventory, waste/ESG, safety, energy, metallurgy, capital projects, **finance & cost control**, **commodity hedging**, **marketing**, **CRM**, digital/MES analytics, and S&OP.

**MineralOps Pipeline** is a static MVP (GitHub Pages) that models these as **business modules**. Each module has:

1. An **ERP / CRM / process analog** (e.g. MES, P2P, QMS, Treasury, Order-to-Cash)  
2. Its **own phase track** (stage gates differ by domain)  
3. A catalog of **key KPIs** with targets and portfolio actuals  

Users capture **records** (ideas, process tracks, projects, commercial deals, finance/hedge actions), **vote**, assign **team / location / lead**, and advance **module-specific phases**.

---

## 2. Why

| Gap | Impact |
|-----|--------|
| Generic idea boards ignore ERP process stages | Ops cannot track production/QC/maintenance paths |
| Finance, hedging, marketing missing | Commercial & risk work invisible to plant portfolio |
| One phase list for all work | Analytics and plant workstreams collide |
| No KPI catalog per domain | Not data-driven; hard to prioritize |

---

## 3. Business modules (scope)

| Module | ERP / system analog | Example phases | Example KPIs |
|--------|---------------------|----------------|--------------|
| Production & Process | MES / Production Order | Plan → Execute → Ship-Ready → Closed | OEE, Recovery, Throughput, Downtime, FPY |
| Process Efficiency | CI / Process Eng | Baseline → Pilot → SOP → Realized | Δ Recovery, Reagent kg/t, Energy/t |
| Supply Chain & Logistics | SCM | Demand → Source → Inbound → Deliver | OTIF, Lead time, Stockouts, Freight $/t |
| Procurement | Procure-to-Pay | Req → RFQ → PO → GRN → 3-way match | Savings %, Maverick spend, PR→PO days |
| Inventory & Warehouse | WMS | Receive → Putaway → Pick → Adjust | Accuracy %, Turns, WIP days |
| Quality & Yield | QMS / LIMS | Sample → Assay → Disposition → CAPA | FPY, Defect ppm, CoA on-time |
| Maintenance & Reliability | CMMS / EAM | Notify → Plan → Execute → Close | MTBF, MTTR, PM compliance |
| Waste & ESG | EHS Environmental | Identify → Permit → Implement → Audit | Waste t, Water m³/t, CO₂e, Excursions |
| Safety & Compliance | EHS Process Safety | Report → Investigate → Actions → Verify | TRIR, Training %, Open actions |
| Energy & Utilities | Energy Mgmt | Meter → Project → M&V → Sustain | kWh/t, Peak MW, Energy $/t |
| Mineral Recovery & Metallurgy | Met accounting | Lab → Pilot → Commission → Steady | Recovery %, Grade, By-product $ |
| Project Development | Project / CapEx | FEL-1 → FEL-3 → Execute → Handover | CPI, SPI, CapEx variance |
| **Finance & Cost Control** | FI / CO / Costing | Budget → Actual → Variance → Action | Cash cost $/t, Margin %, WC days |
| **Hedging & Commodity Risk** | Treasury / Risk | Policy → Exposure → Execute → MtM → Settle | Hedge ratio, VaR, MtM P&L |
| **Marketing & Commercial** | Pricing / Commercial | Insight → Campaign → Contract → Review | Realized price vs index, Pipeline $ |
| **CRM & Customer Ops** | CRM / O2C | Lead → Opportunity → Order → Support | NPS, Customer OTIF, DSO |
| Digital, MES & Analytics | MES / Historian / BI | Use case → Model → Adopt → Value | Data uptime, Model acc., Adoption |
| Production Planning & S&OP | PP / S&OP | Demand → Supply → Commit → Dispatch | Plan accuracy, ATP, Utilization |

---

## 4. Record types

- Improvement Idea  
- Process / Work Order Track  
- CapEx / Project  
- Commercial / CRM Deal  
- Finance / Hedge Action  

---

## 5. Business requirements

| ID | Requirement |
|----|-------------|
| BR-1 | Module taxonomy covering plant + commercial + finance/risk |
| BR-2 | **Different phase tracks per module** |
| BR-3 | **Key KPIs per module** with target and actual on records |
| BR-4 | Portfolio board/list with filters (module, phase, type, location, team, priority) |
| BR-5 | Module explorer, KPI hub, process map views |
| BR-6 | Vote, lead, team, location ownership |
| BR-7 | Static deploy on GitHub Pages (MVP) |

---

## 6. Out of scope (MVP)

Live ERP integration, SSO, multi-user server sync, formal e-signature, native mobile.

---

## 7. Success

- Stakeholders see finance, hedging, marketing, CRM alongside plant modules  
- Operators use module-correct phases  
- KPI hub shows on/off track vs targets from seeded and user data  
