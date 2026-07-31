# MineralOps Pipeline

**Manufacturing end-to-end tool for project developers and plant operators.**

Static MVP on **GitHub Pages**: capture records, vote, track **module-specific phases**, and manage **key KPIs** across plant, commercial, and finance domains.

| | |
|--|--|
| **Live** | https://aramina6.github.io/mineralops-pipeline/ |
| **Repo** | https://github.com/Aramina6/mineralops-pipeline |
| **BRD** | [docs/BRD.md](docs/BRD.md) |
| **PRD** | [docs/PRD.md](docs/PRD.md) |

---

## What’s in the MVP

### Business modules (ERP / CRM / process analogs)

| Module | System analog | Sample KPIs |
|--------|---------------|-------------|
| Production & Process | MES | OEE, Recovery, Throughput |
| Process Efficiency | CI | Δ Recovery, Reagent kg/t |
| Supply Chain | SCM | OTIF, Lead time, Freight $/t |
| Procurement | P2P | Savings %, Maverick spend |
| Inventory | WMS | Accuracy %, Turns |
| Quality | QMS / LIMS | FPY, CoA on-time |
| Maintenance | CMMS | MTBF, MTTR, PM % |
| Waste & ESG | EHS | Waste t, Water m³/t, CO₂e |
| Safety | EHS | TRIR, Training % |
| Energy | Utilities | kWh/t, Peak MW |
| Metallurgy | Met accounting | Recovery, By-product $ |
| Project Development | CapEx / FEL | CPI, SPI |
| **Finance** | FI/CO | Cash cost $/t, Margin % |
| **Hedging** | Treasury | Hedge ratio, VaR |
| **Marketing** | Commercial | Price vs index, Pipeline $ |
| **CRM** | Order-to-Cash | NPS, DSO, Customer OTIF |
| Digital / Analytics | MES / BI | Model accuracy, Adoption |
| S&OP / Planning | PP | Plan accuracy, ATP |

Each module has its **own phase track** (e.g. Production: Plan→Execute→Ship-Ready; CRM: Lead→Opportunity→Order; Hedging: Policy→Execute→MtM→Settle).

### Views

1. **Portfolio** — board/list, filters, votes  
2. **Business modules** — catalog of domains + phases + KPIs  
3. **KPI hub** — actual vs target from portfolio data  
4. **Process map** — phase flow + records on the track  

### Record types

Improvement Idea · Process / WO Track · CapEx Project · Commercial / CRM Deal · Finance / Hedge Action  

---

## Stack

**HTML · CSS · vanilla JS · GitHub Pages · no build step**

Data in browser `localStorage` (`mineralops-pipeline-v2`).

---

## Run locally

Open `index.html`, or:

```bash
python -m http.server 8080
```

Visit `http://localhost:8080`.

---

## Repo layout

```
mineralops-pipeline/
├── index.html
├── styles.css
├── data.js      # modules, phases, KPIs, seed
├── app.js       # UI
├── docs/BRD.md
├── docs/PRD.md
└── README.md
```

---

## License

Demo / portfolio project — adapt freely for internal manufacturing pilots.
