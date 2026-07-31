# Critical Minerals Idea Pipeline

**Capture · Vote · Track** manufacturing improvement ideas across analytics screening and core plant phases—process efficiency, supply chain, waste & ESG—and assign **team, location, and lead**.

Live demo (GitHub Pages): after push, enable Pages on branch `main` / root (or `/docs`).

| Resource | Link |
|----------|------|
| **BRD** (why) | [docs/BRD.md](docs/BRD.md) |
| **PRD** (scope) | [docs/PRD.md](docs/PRD.md) |
| **GitHub** | [Aramina6](https://github.com/Aramina6) |

---

## Product snapshot (PM view)

### Problem
Critical minerals sites lose high-value ideas in email and spreadsheets. Analytics pilots and plant trials look the same on generic boards, so stage gates and ownership stay unclear.

### Solution
A lightweight **idea pipeline** tuned for critical minerals manufacturing:

1. Anyone **adds** an idea (problem, solution, impact).
2. Peers **vote** so signal rises.
3. Ideas move through **explicit phases** (analytics → manufacturing → realized).
4. Every idea has **category, location, team, lead, priority**.
5. Leadership reviews a **board or list** with filters.

### Phase model

| Family | Phases |
|--------|--------|
| **Analytics & decision** | Submitted → Impact Screening → Data Validation |
| **Core technical manufacturing** | Technical Feasibility → Process Efficiency → Supply Chain Resolution → Waste & ESG Alignment → Pilot → Scale-Up |
| **Closed** | Realized / Closed |

Categories include Process Efficiency, Supply Chain Problem, Waste Management, Quality & Yield, Energy & Utilities, Safety & Compliance, Digital & Analytics, Critical Minerals Recovery.

---

## UI / UX overview

| Area | What you get |
|------|----------------|
| **Header** | Product name, Docs guide, Reset demo, primary **Add idea** |
| **KPI strip** | Total, open pipeline, analytics vs manufacturing mix, total votes |
| **Dropdown filters** | Phase, Category, Location, Team, Priority + search |
| **Board view** | Kanban by phase; color band by phase family |
| **List view** | Dense table sorted by votes for reviews |
| **Idea form** | Required ownership fields; phase family hint under Phase dropdown |
| **Detail modal** | Full narrative, phase select, Advance, Edit, Delete |
| **Docs modal** | In-app BRD-aligned phase & dropdown reference |

**Design:** dark industrial theme, copper accent (minerals), blue for analytics, green for waste/ESG, purple for pilot/scale.

---

## Tech (MVP)

- Static **HTML + CSS + vanilla JS** (no build step)
- State in **`localStorage`** (`cm-idea-pipeline-v1`)
- Hosted on **GitHub Pages**
- Seeded with **10 critical minerals demo ideas**

---

## Run locally

Open `index.html` in a browser, or:

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Then visit `http://localhost:8080`.

---

## Publish to GitHub Pages (Aramina6)

### Option A — new public repo

```bash
cd critical-minerals-idea-pipeline
git init
git add .
git commit -m "Initial Critical Minerals Idea Pipeline MVP with BRD/PRD"
git branch -M main
git remote add origin https://github.com/Aramina6/critical-minerals-idea-pipeline.git
git push -u origin main
```

Then on GitHub:

1. **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / folder: **/ (root)**
4. Save → site at `https://aramina6.github.io/critical-minerals-idea-pipeline/`

### Option B — GitHub CLI (if installed)

```bash
gh repo create critical-minerals-idea-pipeline --public --source=. --remote=origin --push
# then enable Pages as above
```

---

## Repo structure

```
critical-minerals-idea-pipeline/
├── index.html          # App shell & modals
├── styles.css          # Design system
├── app.js              # Taxonomy, seed data, board/list, CRUD, votes
├── docs/
│   ├── BRD.md          # Business requirements (why)
│   └── PRD.md          # Product requirements (scope)
├── .nojekyll           # GitHub Pages: skip Jekyll
└── README.md
```

---

## Key features checklist

- [x] Add / edit ideas  
- [x] Vote toggle  
- [x] 10-phase lifecycle (analytics vs manufacturing)  
- [x] Category, location, team, lead, priority dropdowns  
- [x] Filters + search  
- [x] Board + list views  
- [x] KPI strip  
- [x] Seed demo + reset  
- [x] BRD + PRD  
- [x] In-app Docs / UI guide  

---

## License

Demo portfolio project. Use and adapt freely for internal manufacturing excellence pilots.
