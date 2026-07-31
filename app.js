/**
 * Critical Minerals Idea Pipeline — MVP
 * Static app for GitHub Pages. State in localStorage.
 */

(function () {
  "use strict";

  const STORAGE_KEY = "cm-idea-pipeline-v1";

  // ─── Taxonomy (product model) ───────────────────────────────────────────

  const CATEGORIES = [
    "Process Efficiency",
    "Supply Chain Problem",
    "Waste Management",
    "Quality & Yield",
    "Energy & Utilities",
    "Safety & Compliance",
    "Digital & Analytics",
    "Critical Minerals Recovery",
  ];

  const PHASES = [
    { id: "submitted", label: "Submitted", family: "analytics", familyLabel: "Analytics" },
    { id: "impact_screening", label: "Impact Screening", family: "analytics", familyLabel: "Analytics" },
    { id: "data_validation", label: "Data Validation", family: "analytics", familyLabel: "Analytics" },
    { id: "technical_feasibility", label: "Technical Feasibility", family: "mfg", familyLabel: "Manufacturing" },
    { id: "process_efficiency", label: "Process Efficiency", family: "mfg", familyLabel: "Manufacturing" },
    { id: "supply_chain", label: "Supply Chain Resolution", family: "supply", familyLabel: "Manufacturing" },
    { id: "waste_esg", label: "Waste & ESG Alignment", family: "waste", familyLabel: "Manufacturing" },
    { id: "pilot", label: "Pilot Execution", family: "pilot", familyLabel: "Manufacturing" },
    { id: "scale_up", label: "Scale-Up / Production", family: "pilot", familyLabel: "Manufacturing" },
    { id: "realized", label: "Realized / Closed", family: "closed", familyLabel: "Closed" },
  ];

  const LOCATIONS = [
    "Lithium Hydroxide Plant — Nevada",
    "REE Separation — Texas",
    "Cobalt Refinery — Louisiana",
    "Graphite Anode — Michigan",
    "Central Lab / Pilot Plant",
    "Corporate / Multi-site",
  ];

  const TEAMS = [
    "Process Engineering",
    "Operations",
    "Supply Chain",
    "EHS / Waste",
    "Quality",
    "Data & Analytics",
    "Continuous Improvement",
    "R&D / Metallurgy",
  ];

  const PRIORITIES = ["Low", "Medium", "High", "Critical"];

  const ANALYTICS_PHASES = new Set(["submitted", "impact_screening", "data_validation"]);
  const MFG_PHASES = new Set([
    "technical_feasibility",
    "process_efficiency",
    "supply_chain",
    "waste_esg",
    "pilot",
    "scale_up",
  ]);

  // ─── Seed data (critical minerals scenarios) ────────────────────────────

  function seedIdeas() {
    const now = Date.now();
    const day = 86400000;
    return [
      {
        id: uid(),
        title: "Raise lithium leach recovery via temperature profile control",
        problem:
          "Leach recovery varies ±3% week-to-week. Operators lack a validated temperature ramp SOP; overheating raises impurity load and reagent cost.",
        solution:
          "Deploy staged temperature profile with inline sensors, update control recipe, and train ops on a single golden batch curve.",
        impact: "+1.2–1.8% Li recovery; lower acid consumption; more stable impurity profile",
        category: "Process Efficiency",
        phase: "process_efficiency",
        priority: "High",
        location: "Lithium Hydroxide Plant — Nevada",
        team: "Process Engineering",
        lead: "Maya Chen",
        submitter: "J. Ortiz",
        votes: 14,
        voted: false,
        createdAt: new Date(now - 18 * day).toISOString(),
        updatedAt: new Date(now - 2 * day).toISOString(),
      },
      {
        id: uid(),
        title: "Dual-source spodumene to cut single-mine feedstock risk",
        problem:
          "80% of concentrate volume comes from one mine. Grade swings force unplanned blend changes and idle time on the calciner.",
        solution:
          "Qualify a second supplier, define blend windows by Li2O and impurity, and build 21-day safety stock policy for critical grades.",
        impact: "Lower stockout risk; reduce unplanned downtime; stabilize grade into leach",
        category: "Supply Chain Problem",
        phase: "supply_chain",
        priority: "Critical",
        location: "Lithium Hydroxide Plant — Nevada",
        team: "Supply Chain",
        lead: "Priya Nair",
        submitter: "Priya Nair",
        votes: 22,
        voted: false,
        createdAt: new Date(now - 30 * day).toISOString(),
        updatedAt: new Date(now - 1 * day).toISOString(),
      },
      {
        id: uid(),
        title: "Recover cobalt from process sludge instead of landfill",
        problem:
          "Sludge streams still carry recoverable Co. Disposal cost is rising and ESG reporting flags material intensity.",
        solution:
          "Pilot selective leach + precipitation on sludge; quantify recovery vs. opex and integrate with waste permit pathway.",
        impact: "New Co units recovered; lower disposal volume; stronger ESG narrative",
        category: "Critical Minerals Recovery",
        phase: "waste_esg",
        priority: "High",
        location: "Cobalt Refinery — Louisiana",
        team: "EHS / Waste",
        lead: "Andre Brooks",
        submitter: "S. Kim",
        votes: 18,
        voted: false,
        createdAt: new Date(now - 22 * day).toISOString(),
        updatedAt: new Date(now - 4 * day).toISOString(),
      },
      {
        id: uid(),
        title: "Predictive model for flotation reagent dosing (REE)",
        problem:
          "Reagent dosing is operator-dependent. Overdosing raises cost; underdosing loses rare earth recovery.",
        solution:
          "Build supervised model using feed assays, pH, and froth camera features; recommend dose band in control room UI.",
        impact: "−8–12% reagent cost; +0.5–1% REE recovery; less grade variability",
        category: "Digital & Analytics",
        phase: "data_validation",
        priority: "Medium",
        location: "REE Separation — Texas",
        team: "Data & Analytics",
        lead: "Elena Volkov",
        submitter: "Elena Volkov",
        votes: 11,
        voted: false,
        createdAt: new Date(now - 10 * day).toISOString(),
        updatedAt: new Date(now - 3 * day).toISOString(),
      },
      {
        id: uid(),
        title: "Cut process water intensity in REE separation circuit",
        problem:
          "Water use per tonne is above peer benchmark. Freshwater constraints threaten permit headroom for expansion.",
        solution:
          "Closed-loop rinse recycle with ion-exchange polish; meter each stage and set water KPI on shift boards.",
        impact: "−15% freshwater draw; support expansion without new water rights",
        category: "Energy & Utilities",
        phase: "impact_screening",
        priority: "High",
        location: "REE Separation — Texas",
        team: "Continuous Improvement",
        lead: "Tom Hale",
        submitter: "Ops night shift",
        votes: 9,
        voted: false,
        createdAt: new Date(now - 7 * day).toISOString(),
        updatedAt: new Date(now - 7 * day).toISOString(),
      },
      {
        id: uid(),
        title: "Graphite anode moisture control to cut scrap rate",
        problem:
          "Moisture excursions after drying cause coating defects and scrap. Root cause spans dryer and ambient humidity.",
        solution:
          "Add dew-point control, SPC on moisture, and automatic hold when out of band before coating.",
        impact: "−30% moisture-related scrap; higher first-pass yield",
        category: "Quality & Yield",
        phase: "pilot",
        priority: "High",
        location: "Graphite Anode — Michigan",
        team: "Quality",
        lead: "Rachel Cho",
        submitter: "M. Diaz",
        votes: 7,
        voted: false,
        createdAt: new Date(now - 14 * day).toISOString(),
        updatedAt: new Date(now - 1 * day).toISOString(),
      },
      {
        id: uid(),
        title: "Interlock upgrade on high-pressure autoclave feed",
        problem:
          "Near-miss: feed pump continued during partial vent event. Existing interlocks do not cover all failure modes.",
        solution:
          "SIL review, dual transmitters, and hard interlock on pump trip; update SOP and training.",
        impact: "Reduced process safety risk; audit-ready documentation",
        category: "Safety & Compliance",
        phase: "technical_feasibility",
        priority: "Critical",
        location: "Cobalt Refinery — Louisiana",
        team: "Operations",
        lead: "Derek Walsh",
        submitter: "Safety committee",
        votes: 16,
        voted: false,
        createdAt: new Date(now - 12 * day).toISOString(),
        updatedAt: new Date(now - 5 * day).toISOString(),
      },
      {
        id: uid(),
        title: "By-product gypsum valorization from neutralization",
        problem:
          "Neutralization gypsum is landfilled. Local construction market may accept treated material if specs are met.",
        solution:
          "Characterize composition, pilot wash/grade, and engage offtake partners with EHS permit path.",
        impact: "Divert waste from landfill; potential secondary revenue",
        category: "Waste Management",
        phase: "submitted",
        priority: "Low",
        location: "Central Lab / Pilot Plant",
        team: "R&D / Metallurgy",
        lead: "TBD",
        submitter: "Lab tech pool",
        votes: 4,
        voted: false,
        createdAt: new Date(now - 3 * day).toISOString(),
        updatedAt: new Date(now - 3 * day).toISOString(),
      },
      {
        id: uid(),
        title: "Multi-site KPI dashboard for recovery and waste intensity",
        problem:
          "Leadership reviews use inconsistent spreadsheets. Cross-site comparison of recovery and waste kg/t is manual.",
        solution:
          "Standardize definitions, connect plant historians, and publish weekly portfolio dashboard for CI reviews.",
        impact: "Faster decisions; comparable KPIs across Nevada, Texas, Louisiana, Michigan",
        category: "Digital & Analytics",
        phase: "scale_up",
        priority: "Medium",
        location: "Corporate / Multi-site",
        team: "Data & Analytics",
        lead: "Sofia Reyes",
        submitter: "CI PMO",
        votes: 13,
        voted: false,
        createdAt: new Date(now - 45 * day).toISOString(),
        updatedAt: new Date(now - 6 * day).toISOString(),
      },
      {
        id: uid(),
        title: "Standardize reagent vendor specs for cobalt precipitation",
        problem:
          "Different reagent lots change crystal morphology and filterability, causing batch time spikes.",
        solution:
          "Tighten vendor CoA requirements, incoming QC, and dual-approve critical lots before use.",
        impact: "More stable batch cycle time; fewer reworks",
        category: "Supply Chain Problem",
        phase: "realized",
        priority: "Medium",
        location: "Cobalt Refinery — Louisiana",
        team: "Supply Chain",
        lead: "Priya Nair",
        submitter: "Process eng",
        votes: 8,
        voted: false,
        createdAt: new Date(now - 90 * day).toISOString(),
        updatedAt: new Date(now - 20 * day).toISOString(),
      },
    ];
  }

  // ─── State ──────────────────────────────────────────────────────────────

  let ideas = [];
  let viewMode = "board";
  let editingId = null;
  let detailId = null;

  function uid() {
    return "id_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) {
          ideas = parsed;
          return;
        }
      }
    } catch (_) {
      /* ignore */
    }
    ideas = seedIdeas();
    save();
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
  }

  function phaseById(id) {
    return PHASES.find((p) => p.id === id) || PHASES[0];
  }

  function nextPhaseId(currentId) {
    const idx = PHASES.findIndex((p) => p.id === currentId);
    if (idx < 0 || idx >= PHASES.length - 1) return currentId;
    return PHASES[idx + 1].id;
  }

  // ─── DOM helpers ────────────────────────────────────────────────────────

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function fillSelect(el, options, { valueKey, labelKey, includeEmpty, emptyLabel } = {}) {
    if (!el) return;
    const html = [];
    if (includeEmpty) {
      html.push(`<option value="">${emptyLabel || "All"}</option>`);
    }
    options.forEach((opt) => {
      if (typeof opt === "string") {
        html.push(`<option value="${escapeAttr(opt)}">${escapeHtml(opt)}</option>`);
      } else {
        const v = opt[valueKey || "id"];
        const l = opt[labelKey || "label"];
        html.push(`<option value="${escapeAttr(v)}">${escapeHtml(l)}</option>`);
      }
    });
    el.innerHTML = html.join("");
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, "&#39;");
  }

  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.remove("hidden");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.add("hidden"), 2600);
  }

  // ─── Filters ────────────────────────────────────────────────────────────

  function getFilters() {
    return {
      search: ($("#filter-search").value || "").trim().toLowerCase(),
      phase: $("#filter-phase").value,
      category: $("#filter-category").value,
      location: $("#filter-location").value,
      team: $("#filter-team").value,
      priority: $("#filter-priority").value,
    };
  }

  function filteredIdeas() {
    const f = getFilters();
    return ideas.filter((idea) => {
      if (f.phase && idea.phase !== f.phase) return false;
      if (f.category && idea.category !== f.category) return false;
      if (f.location && idea.location !== f.location) return false;
      if (f.team && idea.team !== f.team) return false;
      if (f.priority && idea.priority !== f.priority) return false;
      if (f.search) {
        const blob = [idea.title, idea.problem, idea.solution, idea.lead, idea.submitter, idea.impact]
          .join(" ")
          .toLowerCase();
        if (!blob.includes(f.search)) return false;
      }
      return true;
    });
  }

  // ─── KPIs ───────────────────────────────────────────────────────────────

  function renderKpis() {
    const total = ideas.length;
    const open = ideas.filter((i) => i.phase !== "realized").length;
    const analytics = ideas.filter((i) => ANALYTICS_PHASES.has(i.phase)).length;
    const mfg = ideas.filter((i) => MFG_PHASES.has(i.phase)).length;
    const votes = ideas.reduce((s, i) => s + (i.votes || 0), 0);

    $("#kpi-total").textContent = total;
    $("#kpi-open").textContent = open;
    $("#kpi-analytics").textContent = analytics;
    $("#kpi-mfg").textContent = mfg;
    $("#kpi-votes").textContent = votes;
  }

  // ─── Board ──────────────────────────────────────────────────────────────

  function renderBoard() {
    const list = filteredIdeas();
    const board = $("#board-view");
    const empty = $("#empty-state");

    if (!list.length) {
      board.innerHTML = "";
      empty.classList.remove("hidden");
      return;
    }
    empty.classList.add("hidden");

    board.innerHTML = PHASES.map((phase) => {
      const cards = list.filter((i) => i.phase === phase.id);
      const familyClass = "family-" + phase.family;
      return `
        <section class="board-column ${familyClass}" data-phase="${phase.id}">
          <header class="board-column-header">
            <h3 class="board-column-title">
              ${escapeHtml(phase.label)}
              <span class="family">${escapeHtml(phase.familyLabel)}</span>
            </h3>
            <span class="col-count">${cards.length}</span>
          </header>
          <div class="board-column-cards">
            ${cards.map(cardHtml).join("") || `<p class="card-impact" style="padding:8px;margin:0">No ideas</p>`}
          </div>
        </section>
      `;
    }).join("");

    bindCardEvents(board);
  }

  function cardHtml(idea) {
    const impact = idea.impact || idea.problem;
    return `
      <article class="idea-card" data-id="${escapeAttr(idea.id)}" tabindex="0" role="button">
        <div class="card-top">
          <span class="badge badge-category">${escapeHtml(idea.category)}</span>
          <span class="badge badge-priority-${idea.priority.toLowerCase()}">${escapeHtml(idea.priority)}</span>
        </div>
        <h4 class="card-title">${escapeHtml(idea.title)}</h4>
        <p class="card-impact">${escapeHtml(impact)}</p>
        <div class="card-meta">
          <span><strong>Loc</strong> ${escapeHtml(shortLocation(idea.location))}</span>
          <span><strong>Team</strong> ${escapeHtml(idea.team)}</span>
          <span><strong>Lead</strong> ${escapeHtml(idea.lead)}</span>
        </div>
        <div class="card-footer">
          <button type="button" class="vote-btn ${idea.voted ? "voted" : ""}" data-vote="${escapeAttr(idea.id)}" aria-label="Vote">
            ▲ ${idea.votes || 0}
          </button>
          <span class="card-phase-mini">${escapeHtml(phaseById(idea.phase).label)}</span>
        </div>
      </article>
    `;
  }

  function shortLocation(loc) {
    if (!loc) return "—";
    const parts = loc.split("—");
    return parts.length > 1 ? parts[1].trim() : loc;
  }

  // ─── List ───────────────────────────────────────────────────────────────

  function renderList() {
    const list = filteredIdeas().slice().sort((a, b) => (b.votes || 0) - (a.votes || 0));
    const container = $("#list-view");
    const empty = $("#empty-state");

    if (!list.length) {
      container.innerHTML = "";
      empty.classList.remove("hidden");
      return;
    }
    empty.classList.add("hidden");

    container.innerHTML = `
      <table class="list-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Phase</th>
            <th>Priority</th>
            <th>Location</th>
            <th>Team</th>
            <th>Lead</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          ${list
            .map(
              (idea) => `
            <tr data-id="${escapeAttr(idea.id)}" tabindex="0">
              <td class="list-title">${escapeHtml(idea.title)}</td>
              <td class="list-meta-cell">${escapeHtml(idea.category)}</td>
              <td class="list-meta-cell">${escapeHtml(phaseById(idea.phase).label)}</td>
              <td><span class="badge badge-priority-${idea.priority.toLowerCase()}">${escapeHtml(idea.priority)}</span></td>
              <td class="list-meta-cell">${escapeHtml(shortLocation(idea.location))}</td>
              <td class="list-meta-cell">${escapeHtml(idea.team)}</td>
              <td class="list-meta-cell">${escapeHtml(idea.lead)}</td>
              <td>
                <button type="button" class="vote-btn ${idea.voted ? "voted" : ""}" data-vote="${escapeAttr(idea.id)}">
                  ▲ ${idea.votes || 0}
                </button>
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;

    bindCardEvents(container);
  }

  function bindCardEvents(root) {
    root.querySelectorAll("[data-vote]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleVote(btn.getAttribute("data-vote"));
      });
    });

    root.querySelectorAll("[data-id]").forEach((el) => {
      if (el.classList.contains("vote-btn")) return;
      const open = () => openDetail(el.getAttribute("data-id"));
      el.addEventListener("click", (e) => {
        if (e.target.closest("[data-vote]")) return;
        open();
      });
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });
  }

  // ─── Detail ─────────────────────────────────────────────────────────────

  function openDetail(id) {
    const idea = ideas.find((i) => i.id === id);
    if (!idea) return;
    detailId = id;
    const phase = phaseById(idea.phase);
    const familyClass =
      phase.family === "analytics" ? "analytics" : phase.family === "closed" ? "closed" : "mfg";

    $("#detail-title").textContent = idea.title;
    $("#detail-body").innerHTML = `
      <div class="detail-badges">
        <span class="badge badge-category">${escapeHtml(idea.category)}</span>
        <span class="badge badge-priority-${idea.priority.toLowerCase()}">${escapeHtml(idea.priority)}</span>
        <span class="badge badge-category">${escapeHtml(phase.label)}</span>
        <span class="phase-family-tag ${familyClass}">${escapeHtml(phase.familyLabel)} phase</span>
      </div>
      <div class="detail-section">
        <h3>Problem</h3>
        <p>${escapeHtml(idea.problem)}</p>
      </div>
      <div class="detail-section">
        <h3>Proposed solution</h3>
        <p>${escapeHtml(idea.solution)}</p>
      </div>
      <div class="detail-section">
        <h3>Expected impact</h3>
        <p>${escapeHtml(idea.impact || "—")}</p>
      </div>
      <div class="detail-grid">
        <div class="detail-stat"><label>Location</label><span>${escapeHtml(idea.location)}</span></div>
        <div class="detail-stat"><label>Team</label><span>${escapeHtml(idea.team)}</span></div>
        <div class="detail-stat"><label>Lead</label><span>${escapeHtml(idea.lead)}</span></div>
        <div class="detail-stat"><label>Submitter</label><span>${escapeHtml(idea.submitter || "—")}</span></div>
        <div class="detail-stat"><label>Votes</label><span>${idea.votes || 0}</span></div>
        <div class="detail-stat"><label>Updated</label><span>${formatDate(idea.updatedAt)}</span></div>
      </div>
      <div class="detail-section" style="margin-top:16px">
        <h3>Move phase</h3>
        <select id="detail-phase-select" style="width:100%;max-width:320px;margin-top:6px">
          ${PHASES.map(
            (p) =>
              `<option value="${p.id}" ${p.id === idea.phase ? "selected" : ""}>${escapeHtml(p.label)} (${escapeHtml(p.familyLabel)})</option>`
          ).join("")}
        </select>
      </div>
    `;

    $("#detail-phase-select").addEventListener("change", (e) => {
      updateIdea(idea.id, { phase: e.target.value });
      toast("Phase updated → " + phaseById(e.target.value).label);
      openDetail(idea.id);
      render();
    });

    $("#modal-detail").classList.remove("hidden");
  }

  function closeDetail() {
    $("#modal-detail").classList.add("hidden");
    detailId = null;
  }

  function formatDate(iso) {
    if (!iso) return "—";
    try {
      return new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return iso;
    }
  }

  // ─── Form ───────────────────────────────────────────────────────────────

  function openForm(idea) {
    editingId = idea ? idea.id : null;
    $("#modal-form-title").textContent = idea ? "Edit idea" : "Add idea";
    $("#field-id").value = idea ? idea.id : "";
    $("#field-title").value = idea ? idea.title : "";
    $("#field-problem").value = idea ? idea.problem : "";
    $("#field-solution").value = idea ? idea.solution : "";
    $("#field-impact").value = idea ? idea.impact || "" : "";
    $("#field-category").value = idea ? idea.category : CATEGORIES[0];
    $("#field-phase").value = idea ? idea.phase : "submitted";
    $("#field-priority").value = idea ? idea.priority : "Medium";
    $("#field-location").value = idea ? idea.location : LOCATIONS[0];
    $("#field-team").value = idea ? idea.team : TEAMS[0];
    $("#field-lead").value = idea ? idea.lead : "";
    $("#field-submitter").value = idea ? idea.submitter || "" : "";
    $$(".field-error").forEach((e) => (e.textContent = ""));
    updatePhaseHint();
    $("#modal-form").classList.remove("hidden");
    $("#field-title").focus();
  }

  function closeForm() {
    $("#modal-form").classList.add("hidden");
    editingId = null;
  }

  function updatePhaseHint() {
    const p = phaseById($("#field-phase").value);
    const hint = $("#phase-family-hint");
    if (hint) {
      hint.textContent =
        p.familyLabel === "Analytics"
          ? "Analytics & decision phase"
          : p.familyLabel === "Closed"
            ? "Closed / realized"
            : "Core technical manufacturing phase";
      hint.style.color =
        p.family === "analytics" ? "var(--analytics)" : p.family === "closed" ? "var(--closed)" : "var(--mfg)";
    }
  }

  function validateForm() {
    let ok = true;
    const required = [
      ["field-title", "Title is required"],
      ["field-problem", "Problem statement is required"],
      ["field-solution", "Proposed solution is required"],
      ["field-lead", "Lead (owner) is required"],
    ];
    required.forEach(([id, msg]) => {
      const el = $("#" + id);
      const err = document.querySelector(`.field-error[data-for="${id}"]`);
      if (!el.value.trim()) {
        if (err) err.textContent = msg;
        el.style.borderColor = "var(--danger)";
        ok = false;
      } else {
        if (err) err.textContent = "";
        el.style.borderColor = "";
      }
    });
    return ok;
  }

  function readForm() {
    return {
      title: $("#field-title").value.trim(),
      problem: $("#field-problem").value.trim(),
      solution: $("#field-solution").value.trim(),
      impact: $("#field-impact").value.trim(),
      category: $("#field-category").value,
      phase: $("#field-phase").value,
      priority: $("#field-priority").value,
      location: $("#field-location").value,
      team: $("#field-team").value,
      lead: $("#field-lead").value.trim(),
      submitter: $("#field-submitter").value.trim(),
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) {
      toast("Please fill required fields");
      return;
    }
    const data = readForm();
    const now = new Date().toISOString();

    if (editingId) {
      updateIdea(editingId, { ...data, updatedAt: now });
      toast("Idea updated");
    } else {
      ideas.unshift({
        id: uid(),
        ...data,
        votes: 0,
        voted: false,
        createdAt: now,
        updatedAt: now,
      });
      save();
      toast("Idea added to pipeline");
    }
    closeForm();
    render();
  }

  function updateIdea(id, patch) {
    const idx = ideas.findIndex((i) => i.id === id);
    if (idx < 0) return;
    ideas[idx] = {
      ...ideas[idx],
      ...patch,
      updatedAt: patch.updatedAt || new Date().toISOString(),
    };
    save();
  }

  function toggleVote(id) {
    const idea = ideas.find((i) => i.id === id);
    if (!idea) return;
    if (idea.voted) {
      idea.votes = Math.max(0, (idea.votes || 0) - 1);
      idea.voted = false;
      toast("Vote removed");
    } else {
      idea.votes = (idea.votes || 0) + 1;
      idea.voted = true;
      toast("Vote recorded");
    }
    idea.updatedAt = new Date().toISOString();
    save();
    render();
    if (detailId === id) openDetail(id);
  }

  function deleteIdea(id) {
    if (!confirm("Delete this idea permanently from local data?")) return;
    ideas = ideas.filter((i) => i.id !== id);
    save();
    closeDetail();
    toast("Idea deleted");
    render();
  }

  function advancePhase(id) {
    const idea = ideas.find((i) => i.id === id);
    if (!idea) return;
    if (idea.phase === "realized") {
      toast("Already at Realized / Closed");
      return;
    }
    const next = nextPhaseId(idea.phase);
    updateIdea(id, { phase: next });
    toast("Advanced → " + phaseById(next).label);
    openDetail(id);
    render();
  }

  // ─── Render ─────────────────────────────────────────────────────────────

  function render() {
    renderKpis();
    if (viewMode === "board") {
      $("#board-view").classList.remove("hidden");
      $("#list-view").classList.add("hidden");
      renderBoard();
    } else {
      $("#board-view").classList.add("hidden");
      $("#list-view").classList.remove("hidden");
      renderList();
    }
  }

  function setView(mode) {
    viewMode = mode;
    $("#view-board").classList.toggle("active", mode === "board");
    $("#view-list").classList.toggle("active", mode === "list");
    render();
  }

  function resetDemo() {
    if (!confirm("Reset all local ideas to the critical minerals demo seed data?")) return;
    ideas = seedIdeas();
    save();
    toast("Demo data restored");
    render();
  }

  // ─── Init ───────────────────────────────────────────────────────────────

  function initSelects() {
    fillSelect($("#filter-phase"), PHASES, {
      includeEmpty: true,
      emptyLabel: "All phases",
      valueKey: "id",
      labelKey: "label",
    });
    // Rebuild filter phase with family hints
    const fp = $("#filter-phase");
    fp.innerHTML =
      `<option value="">All phases</option>` +
      PHASES.map(
        (p) =>
          `<option value="${p.id}">${escapeHtml(p.label)} · ${escapeHtml(p.familyLabel)}</option>`
      ).join("");

    fillSelect($("#filter-category"), CATEGORIES, { includeEmpty: true, emptyLabel: "All categories" });
    fillSelect($("#filter-location"), LOCATIONS, { includeEmpty: true, emptyLabel: "All locations" });
    fillSelect($("#filter-team"), TEAMS, { includeEmpty: true, emptyLabel: "All teams" });
    fillSelect($("#filter-priority"), PRIORITIES, { includeEmpty: true, emptyLabel: "All priorities" });

    fillSelect($("#field-category"), CATEGORIES);
    fillSelect($("#field-phase"), PHASES, { valueKey: "id", labelKey: "label" });
    // richer phase labels
    $("#field-phase").innerHTML = PHASES.map(
      (p) =>
        `<option value="${p.id}">${escapeHtml(p.label)} (${escapeHtml(p.familyLabel)})</option>`
    ).join("");
    fillSelect($("#field-priority"), PRIORITIES);
    fillSelect($("#field-location"), LOCATIONS);
    fillSelect($("#field-team"), TEAMS);
  }

  function bindUI() {
    $("#btn-add").addEventListener("click", () => openForm(null));
    $("#btn-add-empty").addEventListener("click", () => openForm(null));
    $("#btn-reset").addEventListener("click", resetDemo);
    $("#btn-docs").addEventListener("click", () => $("#modal-docs").classList.remove("hidden"));
    $("#modal-docs-close").addEventListener("click", () => $("#modal-docs").classList.add("hidden"));

    $("#modal-form-close").addEventListener("click", closeForm);
    $("#btn-cancel-form").addEventListener("click", closeForm);
    $("#idea-form").addEventListener("submit", handleSubmit);
    $("#field-phase").addEventListener("change", updatePhaseHint);

    $("#modal-detail-close").addEventListener("click", closeDetail);
    $("#btn-edit").addEventListener("click", () => {
      const idea = ideas.find((i) => i.id === detailId);
      closeDetail();
      if (idea) openForm(idea);
    });
    $("#btn-delete").addEventListener("click", () => {
      if (detailId) deleteIdea(detailId);
    });
    $("#btn-advance").addEventListener("click", () => {
      if (detailId) advancePhase(detailId);
    });

    $("#view-board").addEventListener("click", () => setView("board"));
    $("#view-list").addEventListener("click", () => setView("list"));

    ["filter-search", "filter-phase", "filter-category", "filter-location", "filter-team", "filter-priority"].forEach(
      (id) => {
        const el = $("#" + id);
        el.addEventListener(id === "filter-search" ? "input" : "change", render);
      }
    );

    $("#btn-clear-filters").addEventListener("click", () => {
      $("#filter-search").value = "";
      $("#filter-phase").value = "";
      $("#filter-category").value = "";
      $("#filter-location").value = "";
      $("#filter-team").value = "";
      $("#filter-priority").value = "";
      render();
    });

    // Close modals on backdrop click
    ["modal-form", "modal-detail", "modal-docs"].forEach((id) => {
      const backdrop = $("#" + id);
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) {
          backdrop.classList.add("hidden");
          if (id === "modal-detail") detailId = null;
          if (id === "modal-form") editingId = null;
        }
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeForm();
        closeDetail();
        $("#modal-docs").classList.add("hidden");
      }
    });
  }

  function init() {
    initSelects();
    bindUI();
    load();
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
