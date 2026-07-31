/**
 * MineralOps Pipeline — UI application
 * Manufacturing E2E portfolio with module-specific phases & KPIs
 */
(function () {
  "use strict";

  const D = window.MineralOpsData;
  const STORAGE_KEY = "mineralops-pipeline-v2";

  let records = [];
  let mainView = "portfolio";
  let layoutMode = "board";
  let editingId = null;
  let detailId = null;
  let boardModuleId = "production";

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  function escapeHtml(s) {
    return String(s ?? "")
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

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) {
          records = parsed;
          return;
        }
      }
    } catch (_) {}
    records = D.seedRecords();
    save();
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }

  function isClosedPhase(rec) {
    const p = (rec.phase || "").toLowerCase();
    return (
      p === "closed" ||
      p === "realized" ||
      p === "paid" ||
      p === "closed_won" ||
      p.includes("closed")
    );
  }

  // ─── Selects ────────────────────────────────────────────────────────────

  function fillOptions(el, items, getVal, getLabel, emptyLabel) {
    const opts = emptyLabel != null ? [`<option value="">${escapeHtml(emptyLabel)}</option>`] : [];
    items.forEach((it) => {
      const v = getVal(it);
      const l = getLabel(it);
      opts.push(`<option value="${escapeAttr(v)}">${escapeHtml(l)}</option>`);
    });
    el.innerHTML = opts.join("");
  }

  function initSelects() {
    fillOptions($("#filter-module"), D.MODULES, (m) => m.id, (m) => m.name, "All modules");
    fillOptions($("#filter-type"), D.RECORD_TYPES, (t) => t.id, (t) => t.label, "All types");
    fillOptions($("#filter-location"), D.LOCATIONS, (x) => x, (x) => x, "All locations");
    fillOptions($("#filter-team"), D.TEAMS, (x) => x, (x) => x, "All teams");
    fillOptions($("#filter-priority"), D.PRIORITIES, (x) => x, (x) => x, "All priorities");

    fillOptions($("#field-module"), D.MODULES, (m) => m.id, (m) => `${m.name} (${m.erp})`);
    fillOptions($("#field-type"), D.RECORD_TYPES, (t) => t.id, (t) => t.label);
    fillOptions($("#field-priority"), D.PRIORITIES, (x) => x, (x) => x);
    fillOptions($("#field-location"), D.LOCATIONS, (x) => x, (x) => x);
    fillOptions($("#field-team"), D.TEAMS, (x) => x, (x) => x);

    fillOptions($("#kpi-module-select"), D.MODULES, (m) => m.id, (m) => m.name);
    fillOptions($("#process-module-select"), D.MODULES, (m) => m.id, (m) => m.name);

    refreshPhaseFilter();
    refreshFormPhases();
  }

  function refreshPhaseFilter() {
    const modId = $("#filter-module").value || boardModuleId;
    const m = D.moduleById(modId);
    const phases = m.phases || [];
    fillOptions($("#filter-phase"), phases, (p) => p.id, (p) => p.label, "All phases");
  }

  function refreshFormPhases() {
    const m = D.moduleById($("#field-module").value || "production");
    fillOptions($("#field-phase"), m.phases || [], (p) => p.id, (p) => p.label);
    const hint = $("#module-erp-hint");
    if (hint) hint.textContent = `${m.erp} · ${m.processTrack}`;
    renderKpiInputs(m, null);
  }

  function renderKpiInputs(mod, existingKpis) {
    const wrap = $("#kpi-inputs");
    if (!wrap) return;
    wrap.innerHTML = (mod.kpis || [])
      .map((k) => {
        const val =
          existingKpis && existingKpis[k.id] && existingKpis[k.id].actual != null
            ? existingKpis[k.id].actual
            : "";
        return `
          <div class="kpi-input-row">
            <label for="kpi_${k.id}">${escapeHtml(k.name)} <span class="text-dim">(${escapeHtml(k.unit)}) target ${k.target}</span></label>
            <input type="number" step="any" id="kpi_${k.id}" data-kpi="${escapeAttr(k.id)}" value="${escapeAttr(val)}" placeholder="Actual" />
          </div>
        `;
      })
      .join("");
  }

  function readKpiInputs(mod) {
    const snap = {};
    (mod.kpis || []).forEach((k) => {
      const el = document.getElementById("kpi_" + k.id);
      const raw = el && el.value !== "" ? parseFloat(el.value) : null;
      snap[k.id] = {
        actual: raw != null && !Number.isNaN(raw) ? raw : null,
        target: k.target,
        unit: k.unit,
        name: k.name,
        better: k.better,
      };
    });
    return snap;
  }

  // ─── Filters ────────────────────────────────────────────────────────────

  function getFilters() {
    return {
      search: ($("#filter-search").value || "").trim().toLowerCase(),
      module: $("#filter-module").value,
      phase: $("#filter-phase").value,
      type: $("#filter-type").value,
      location: $("#filter-location").value,
      team: $("#filter-team").value,
      priority: $("#filter-priority").value,
    };
  }

  function filtered() {
    const f = getFilters();
    return records.filter((r) => {
      if (f.module && r.module !== f.module) return false;
      if (f.phase && r.phase !== f.phase) return false;
      if (f.type && r.recordType !== f.type) return false;
      if (f.location && r.location !== f.location) return false;
      if (f.team && r.team !== f.team) return false;
      if (f.priority && r.priority !== f.priority) return false;
      if (f.search) {
        const blob = [r.title, r.problem, r.solution, r.lead, r.submitter, r.impact].join(" ").toLowerCase();
        if (!blob.includes(f.search)) return false;
      }
      return true;
    });
  }

  // ─── Global KPIs ────────────────────────────────────────────────────────

  function renderGlobalKpis() {
    const open = records.filter((r) => !isClosedPhase(r)).length;
    const mods = new Set(records.map((r) => r.module)).size;
    const processN = records.filter((r) => r.recordType === "process" || r.module === "production").length;
    const votes = records.reduce((s, r) => s + (r.votes || 0), 0);
    $("#kpi-total").textContent = records.length;
    $("#kpi-open").textContent = open;
    $("#kpi-modules").textContent = mods;
    $("#kpi-process").textContent = processN;
    $("#kpi-votes").textContent = votes;
  }

  // ─── Portfolio board / list ─────────────────────────────────────────────

  function boardPhases() {
    const fMod = $("#filter-module").value;
    boardModuleId = fMod || "production";
    const m = D.moduleById(boardModuleId);
    const hint = $("#phase-track-hint");
    if (hint) {
      hint.innerHTML = fMod
        ? `Boarding by <strong>${escapeHtml(m.name)}</strong> phase track · ERP: ${escapeHtml(m.erp)} · ${escapeHtml(m.processTrack)}`
        : `No module filter — boarding by <strong>Production &amp; Process</strong> phases. Filter a module to use its track. Records in other modules still list under matching phase ids when present.`;
    }
    return m.phases || [];
  }

  function renderBoard() {
    const list = filtered();
    const phases = boardPhases();
    const board = $("#board-view");
    const empty = $("#empty-state");

    if (!list.length) {
      board.innerHTML = "";
      empty.classList.remove("hidden");
      return;
    }
    empty.classList.add("hidden");

    const modFilter = $("#filter-module").value;
    board.innerHTML = phases
      .map((phase) => {
        const cards = list.filter((r) => {
          if (modFilter) return r.phase === phase.id;
          // cross-module: match phase id OR show in first col if orphan when viewing production
          return r.phase === phase.id;
        });
        return `
          <section class="board-column family-mfg">
            <header class="board-column-header">
              <h3 class="board-column-title">${escapeHtml(phase.label)}<span class="family">Phase</span></h3>
              <span class="col-count">${cards.length}</span>
            </header>
            <div class="board-column-cards">
              ${cards.map(cardHtml).join("") || `<p class="card-impact" style="padding:8px;margin:0">No records</p>`}
            </div>
          </section>
        `;
      })
      .join("");

    // Orphans (records whose phase not in current board track)
    const phaseIds = new Set(phases.map((p) => p.id));
    const orphans = list.filter((r) => !phaseIds.has(r.phase));
    if (orphans.length) {
      board.innerHTML += `
        <section class="board-column family-analytics">
          <header class="board-column-header">
            <h3 class="board-column-title">Other module phases<span class="family">Cross-track</span></h3>
            <span class="col-count">${orphans.length}</span>
          </header>
          <div class="board-column-cards">${orphans.map(cardHtml).join("")}</div>
        </section>
      `;
    }

    bindCardEvents(board);
  }

  function cardHtml(r) {
    const mod = D.moduleById(r.module);
    const phase = D.phaseLabel(r.module, r.phase);
    const typeLabel = (D.RECORD_TYPES.find((t) => t.id === r.recordType) || {}).label || r.recordType;
    const kpiPeek = peekKpis(r, 2);
    return `
      <article class="idea-card" data-id="${escapeAttr(r.id)}" tabindex="0" role="button">
        <div class="card-top">
          <span class="badge badge-category" style="border-left:3px solid ${mod.color}">${escapeHtml(mod.short)}</span>
          <span class="badge badge-priority-${(r.priority || "medium").toLowerCase()}">${escapeHtml(r.priority)}</span>
        </div>
        <h4 class="card-title">${escapeHtml(r.title)}</h4>
        <p class="card-impact">${escapeHtml(r.impact || r.problem)}</p>
        <div class="card-meta">
          <span><strong>Type</strong> ${escapeHtml(typeLabel)}</span>
          <span><strong>Loc</strong> ${escapeHtml(shortLoc(r.location))}</span>
          <span><strong>Team</strong> ${escapeHtml(r.team)}</span>
          <span><strong>Lead</strong> ${escapeHtml(r.lead)}</span>
        </div>
        ${kpiPeek ? `<div class="card-kpis">${kpiPeek}</div>` : ""}
        <div class="card-footer">
          <button type="button" class="vote-btn ${r.voted ? "voted" : ""}" data-vote="${escapeAttr(r.id)}">▲ ${r.votes || 0}</button>
          <span class="card-phase-mini">${escapeHtml(phase)}</span>
        </div>
      </article>
    `;
  }

  function peekKpis(r, n) {
    if (!r.kpis) return "";
    const entries = Object.values(r.kpis).filter((k) => k && k.actual != null).slice(0, n);
    if (!entries.length) return "";
    return entries
      .map(
        (k) =>
          `<span class="kpi-chip"><em>${escapeHtml(k.name)}</em> ${escapeHtml(String(k.actual))}${escapeHtml(k.unit)} <span class="text-dim">/ ${escapeHtml(String(k.target))}</span></span>`
      )
      .join("");
  }

  function shortLoc(loc) {
    if (!loc) return "—";
    const p = loc.split("—");
    return p.length > 1 ? p[1].trim() : loc;
  }

  function renderList() {
    const list = filtered().slice().sort((a, b) => (b.votes || 0) - (a.votes || 0));
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
            <th>Title</th><th>Module</th><th>Phase</th><th>Type</th><th>Priority</th>
            <th>Location</th><th>Team</th><th>Lead</th><th>KPI snapshot</th><th>Votes</th>
          </tr>
        </thead>
        <tbody>
          ${list
            .map((r) => {
              const mod = D.moduleById(r.module);
              return `
              <tr data-id="${escapeAttr(r.id)}" tabindex="0">
                <td class="list-title">${escapeHtml(r.title)}</td>
                <td class="list-meta-cell">${escapeHtml(mod.short)}</td>
                <td class="list-meta-cell">${escapeHtml(D.phaseLabel(r.module, r.phase))}</td>
                <td class="list-meta-cell">${escapeHtml(r.recordType)}</td>
                <td><span class="badge badge-priority-${(r.priority || "").toLowerCase()}">${escapeHtml(r.priority)}</span></td>
                <td class="list-meta-cell">${escapeHtml(shortLoc(r.location))}</td>
                <td class="list-meta-cell">${escapeHtml(r.team)}</td>
                <td class="list-meta-cell">${escapeHtml(r.lead)}</td>
                <td class="list-meta-cell">${peekKpis(r, 2) || "—"}</td>
                <td><button type="button" class="vote-btn ${r.voted ? "voted" : ""}" data-vote="${escapeAttr(r.id)}">▲ ${r.votes || 0}</button></td>
              </tr>`;
            })
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

  // ─── Modules grid ───────────────────────────────────────────────────────

  function renderModules() {
    const grid = $("#modules-grid");
    grid.innerHTML = D.MODULES.map((m) => {
      const count = records.filter((r) => r.module === m.id).length;
      const open = records.filter((r) => r.module === m.id && !isClosedPhase(r)).length;
      return `
        <article class="module-card" data-module="${escapeAttr(m.id)}" style="--mod:${m.color}">
          <header class="module-card-head">
            <span class="module-icon">${m.icon}</span>
            <div>
              <h3>${escapeHtml(m.name)}</h3>
              <p class="module-erp">${escapeHtml(m.erp)}</p>
            </div>
          </header>
          <p class="module-desc">${escapeHtml(m.description)}</p>
          <p class="module-track"><strong>Process:</strong> ${escapeHtml(m.processTrack)}</p>
          <div class="module-stats">
            <span>${count} records</span>
            <span>${open} open</span>
            <span>${m.phases.length} phases</span>
            <span>${m.kpis.length} KPIs</span>
          </div>
          <div class="module-phases-preview">
            ${m.phases.map((p) => `<span class="phase-pill">${escapeHtml(p.label)}</span>`).join("")}
          </div>
          <div class="module-kpi-preview">
            ${m.kpis
              .slice(0, 4)
              .map((k) => `<span class="kpi-chip"><em>${escapeHtml(k.name)}</em> tgt ${k.target}${escapeHtml(k.unit)}</span>`)
              .join("")}
          </div>
          <button type="button" class="btn btn-ghost btn-sm module-open" data-module="${escapeAttr(m.id)}">Open module detail</button>
        </article>
      `;
    }).join("");

    grid.querySelectorAll(".module-open, .module-card").forEach((el) => {
      el.addEventListener("click", (e) => {
        const id = el.getAttribute("data-module") || e.currentTarget.getAttribute("data-module");
        if (e.target.classList.contains("module-open") || e.currentTarget.classList.contains("module-card")) {
          if (e.target.closest(".module-open") || e.currentTarget === el) openModuleDetail(id);
        }
      });
    });
    grid.querySelectorAll(".module-open").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        openModuleDetail(btn.getAttribute("data-module"));
      });
    });
  }

  function openModuleDetail(id) {
    const m = D.moduleById(id);
    $("#module-detail-title").textContent = m.name;
    const recs = records.filter((r) => r.module === id);
    $("#module-detail-body").innerHTML = `
      <p class="module-erp">${escapeHtml(m.erp)} · ${escapeHtml(m.processTrack)}</p>
      <p>${escapeHtml(m.description)}</p>
      <h3 class="detail-h">Phase track (${m.phases.length})</h3>
      <ol class="phase-ol">
        ${m.phases.map((p) => {
          const n = recs.filter((r) => r.phase === p.id).length;
          return `<li><strong>${escapeHtml(p.label)}</strong> <span class="text-dim">(${n} records)</span></li>`;
        }).join("")}
      </ol>
      <h3 class="detail-h">Key KPIs</h3>
      <table class="docs-table">
        <thead><tr><th>KPI</th><th>Unit</th><th>Target</th><th>Better</th><th>Portfolio avg actual</th></tr></thead>
        <tbody>
          ${m.kpis
            .map((k) => {
              const vals = recs.map((r) => r.kpis && r.kpis[k.id] && r.kpis[k.id].actual).filter((v) => v != null);
              const avg = vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 100) / 100 : "—";
              return `<tr><td>${escapeHtml(k.name)}</td><td>${escapeHtml(k.unit)}</td><td>${k.target}</td><td>${escapeHtml(k.better)}</td><td>${avg}</td></tr>`;
            })
            .join("")}
        </tbody>
      </table>
      <p style="margin-top:16px">
        <button type="button" class="btn btn-primary" id="filter-to-module">View in portfolio</button>
      </p>
    `;
    $("#modal-module").classList.remove("hidden");
    const btn = $("#filter-to-module");
    if (btn) {
      btn.addEventListener("click", () => {
        $("#modal-module").classList.add("hidden");
        setMainView("portfolio");
        $("#filter-module").value = id;
        refreshPhaseFilter();
        renderPortfolio();
      });
    }
  }

  // ─── KPI hub ────────────────────────────────────────────────────────────

  function renderKpiHub() {
    const modId = $("#kpi-module-select").value || D.MODULES[0].id;
    const m = D.moduleById(modId);
    const recs = records.filter((r) => r.module === modId);
    const hub = $("#kpi-hub");

    hub.innerHTML = `
      <div class="kpi-hub-header" style="border-color:${m.color}">
        <h3>${escapeHtml(m.name)}</h3>
        <p>${escapeHtml(m.erp)} · ${recs.length} records in portfolio</p>
      </div>
      <div class="kpi-hub-grid">
        ${(m.kpis || [])
          .map((k) => {
            const vals = recs.map((r) => r.kpis && r.kpis[k.id] && r.kpis[k.id].actual).filter((v) => v != null && !Number.isNaN(v));
            const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
            const avgR = avg != null ? Math.round(avg * 100) / 100 : null;
            const status = kpiStatus(avgR, k.target, k.better);
            const pct = avgR != null && k.target ? Math.min(120, Math.round((avgR / k.target) * 100)) : 0;
            return `
              <article class="kpi-hub-card status-${status}">
                <span class="kpi-label">${escapeHtml(k.name)}</span>
                <div class="kpi-hub-values">
                  <span class="kpi-actual">${avgR != null ? avgR : "—"}<small>${escapeHtml(k.unit)}</small></span>
                  <span class="kpi-target">Target ${k.target}${escapeHtml(k.unit)}</span>
                </div>
                <div class="kpi-bar"><div class="kpi-bar-fill" style="width:${Math.min(100, pct)}%"></div></div>
                <span class="kpi-status-label">${statusLabel(status)} · ${vals.length} data points · better ${escapeHtml(k.better)}</span>
              </article>
            `;
          })
          .join("")}
      </div>
      <div class="kpi-catalog">
        <h3>All module KPI catalogs (targets)</h3>
        <div class="kpi-catalog-grid">
          ${D.MODULES.map(
            (mod) => `
            <div class="kpi-catalog-card">
              <h4 style="color:${mod.color}">${escapeHtml(mod.short)}</h4>
              <ul>${mod.kpis.map((k) => `<li>${escapeHtml(k.name)}: <strong>${k.target}</strong> ${escapeHtml(k.unit)}</li>`).join("")}</ul>
            </div>
          `
          ).join("")}
        </div>
      </div>
    `;
  }

  function kpiStatus(actual, target, better) {
    if (actual == null || target == null) return "na";
    if (better === "higher") return actual >= target ? "good" : actual >= target * 0.9 ? "watch" : "bad";
    if (better === "lower") return actual <= target ? "good" : actual <= target * 1.1 ? "watch" : "bad";
    // target band
    const diff = Math.abs(actual - target) / (Math.abs(target) || 1);
    return diff <= 0.1 ? "good" : diff <= 0.2 ? "watch" : "bad";
  }

  function statusLabel(s) {
    return { good: "On track", watch: "Watch", bad: "Off track", na: "No data" }[s] || s;
  }

  // ─── Process map ────────────────────────────────────────────────────────

  function renderProcessMap() {
    const modId = $("#process-module-select").value || D.MODULES[0].id;
    const m = D.moduleById(modId);
    const recs = records.filter((r) => r.module === modId);
    const map = $("#process-map");
    map.innerHTML = `
      <div class="process-map-head">
        <h3>${escapeHtml(m.name)}</h3>
        <p>${escapeHtml(m.processTrack)} · ERP analog: <strong>${escapeHtml(m.erp)}</strong></p>
      </div>
      <div class="process-flow">
        ${m.phases
          .map((p, i) => {
            const n = recs.filter((r) => r.phase === p.id).length;
            return `
              <div class="process-step ${n ? "has-items" : ""}">
                <span class="step-num">${i + 1}</span>
                <span class="step-label">${escapeHtml(p.label)}</span>
                <span class="step-count">${n}</span>
              </div>
              ${i < m.phases.length - 1 ? '<span class="process-arrow">→</span>' : ""}
            `;
          })
          .join("")}
      </div>
    `;
    const list = $("#process-records");
    list.innerHTML = `
      <h3 class="detail-h">Records on this track</h3>
      <div class="process-rec-list">
        ${
          recs.length
            ? recs
                .map(
                  (r) => `
          <button type="button" class="process-rec-item" data-id="${escapeAttr(r.id)}">
            <span class="badge badge-category">${escapeHtml(D.phaseLabel(r.module, r.phase))}</span>
            <strong>${escapeHtml(r.title)}</strong>
            <span class="text-dim">${escapeHtml(r.lead)} · ${escapeHtml(r.priority)}</span>
          </button>`
                )
                .join("")
            : "<p class='text-dim'>No records in this module yet.</p>"
        }
      </div>
    `;
    list.querySelectorAll("[data-id]").forEach((el) => {
      el.addEventListener("click", () => openDetail(el.getAttribute("data-id")));
    });
  }

  // ─── Detail / form ──────────────────────────────────────────────────────

  function openDetail(id) {
    const r = records.find((x) => x.id === id);
    if (!r) return;
    detailId = id;
    const mod = D.moduleById(r.module);
    const typeLabel = (D.RECORD_TYPES.find((t) => t.id === r.recordType) || {}).label || r.recordType;

    $("#detail-title").textContent = r.title;
    $("#detail-body").innerHTML = `
      <div class="detail-badges">
        <span class="badge badge-category" style="border-left:3px solid ${mod.color}">${escapeHtml(mod.name)}</span>
        <span class="badge badge-priority-${(r.priority || "").toLowerCase()}">${escapeHtml(r.priority)}</span>
        <span class="badge badge-category">${escapeHtml(D.phaseLabel(r.module, r.phase))}</span>
        <span class="badge badge-category">${escapeHtml(typeLabel)}</span>
      </div>
      <p class="text-dim" style="margin-top:0">${escapeHtml(mod.erp)} · ${escapeHtml(mod.processTrack)}</p>
      <div class="detail-section"><h3>Problem / context</h3><p>${escapeHtml(r.problem)}</p></div>
      <div class="detail-section"><h3>Action / solution</h3><p>${escapeHtml(r.solution)}</p></div>
      <div class="detail-section"><h3>Expected impact</h3><p>${escapeHtml(r.impact || "—")}</p></div>
      <div class="detail-grid">
        <div class="detail-stat"><label>Location</label><span>${escapeHtml(r.location)}</span></div>
        <div class="detail-stat"><label>Team</label><span>${escapeHtml(r.team)}</span></div>
        <div class="detail-stat"><label>Lead</label><span>${escapeHtml(r.lead)}</span></div>
        <div class="detail-stat"><label>Submitter</label><span>${escapeHtml(r.submitter || "—")}</span></div>
        <div class="detail-stat"><label>Votes</label><span>${r.votes || 0}</span></div>
        <div class="detail-stat"><label>Updated</label><span>${formatDate(r.updatedAt)}</span></div>
      </div>
      <h3 class="detail-h">KPIs (actual vs target)</h3>
      <div class="detail-kpi-grid">
        ${
          r.kpis
            ? Object.values(r.kpis)
                .map((k) => {
                  const st = kpiStatus(k.actual, k.target, k.better);
                  return `<div class="kpi-hub-card status-${st}">
                    <span class="kpi-label">${escapeHtml(k.name)}</span>
                    <div class="kpi-hub-values">
                      <span class="kpi-actual">${k.actual != null ? k.actual : "—"}<small>${escapeHtml(k.unit)}</small></span>
                      <span class="kpi-target">Target ${k.target}</span>
                    </div>
                  </div>`;
                })
                .join("")
            : "<p class='text-dim'>No KPIs</p>"
        }
      </div>
      <div class="detail-section" style="margin-top:16px">
        <h3>Move phase (${escapeHtml(mod.name)} track)</h3>
        <select id="detail-phase-select" style="width:100%;max-width:360px;margin-top:6px">
          ${(mod.phases || [])
            .map(
              (p) =>
                `<option value="${p.id}" ${p.id === r.phase ? "selected" : ""}>${escapeHtml(p.label)}</option>`
            )
            .join("")}
        </select>
      </div>
    `;
    $("#detail-phase-select").addEventListener("change", (e) => {
      updateRecord(r.id, { phase: e.target.value });
      toast("Phase → " + D.phaseLabel(r.module, e.target.value));
      openDetail(r.id);
      renderAll();
    });
    $("#modal-detail").classList.remove("hidden");
  }

  function closeDetail() {
    $("#modal-detail").classList.add("hidden");
    detailId = null;
  }

  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    } catch {
      return iso || "—";
    }
  }

  function openForm(rec) {
    editingId = rec ? rec.id : null;
    $("#modal-form-title").textContent = rec ? "Edit record" : "Add record";
    $("#field-module").value = rec ? rec.module : "production";
    refreshFormPhases();
    $("#field-type").value = rec ? rec.recordType || "idea" : "idea";
    $("#field-title").value = rec ? rec.title : "";
    $("#field-problem").value = rec ? rec.problem : "";
    $("#field-solution").value = rec ? rec.solution : "";
    $("#field-impact").value = rec ? rec.impact || "" : "";
    $("#field-phase").value = rec ? rec.phase : D.moduleById($("#field-module").value).phases[0].id;
    $("#field-priority").value = rec ? rec.priority : "Medium";
    $("#field-location").value = rec ? rec.location : D.LOCATIONS[0];
    $("#field-team").value = rec ? rec.team : D.TEAMS[0];
    $("#field-lead").value = rec ? rec.lead : "";
    $("#field-submitter").value = rec ? rec.submitter || "" : "";
    renderKpiInputs(D.moduleById($("#field-module").value), rec ? rec.kpis : null);
    $$(".field-error").forEach((e) => (e.textContent = ""));
    $("#modal-form").classList.remove("hidden");
    $("#field-title").focus();
  }

  function closeForm() {
    $("#modal-form").classList.add("hidden");
    editingId = null;
  }

  function validateForm() {
    let ok = true;
    [
      ["field-title", "Title required"],
      ["field-problem", "Problem required"],
      ["field-solution", "Solution required"],
      ["field-lead", "Lead required"],
    ].forEach(([id, msg]) => {
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

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) {
      toast("Fill required fields");
      return;
    }
    const mod = D.moduleById($("#field-module").value);
    const data = {
      title: $("#field-title").value.trim(),
      problem: $("#field-problem").value.trim(),
      solution: $("#field-solution").value.trim(),
      impact: $("#field-impact").value.trim(),
      module: mod.id,
      phase: $("#field-phase").value,
      recordType: $("#field-type").value,
      priority: $("#field-priority").value,
      location: $("#field-location").value,
      team: $("#field-team").value,
      lead: $("#field-lead").value.trim(),
      submitter: $("#field-submitter").value.trim(),
      kpis: readKpiInputs(mod),
      updatedAt: new Date().toISOString(),
    };
    if (editingId) {
      updateRecord(editingId, data);
      toast("Record updated");
    } else {
      records.unshift({
        id: D.uid(),
        votes: 0,
        voted: false,
        createdAt: new Date().toISOString(),
        ...data,
      });
      save();
      toast("Record added");
    }
    closeForm();
    renderAll();
  }

  function updateRecord(id, patch) {
    const i = records.findIndex((r) => r.id === id);
    if (i < 0) return;
    records[i] = { ...records[i], ...patch, updatedAt: new Date().toISOString() };
    save();
  }

  function toggleVote(id) {
    const r = records.find((x) => x.id === id);
    if (!r) return;
    if (r.voted) {
      r.votes = Math.max(0, (r.votes || 0) - 1);
      r.voted = false;
      toast("Vote removed");
    } else {
      r.votes = (r.votes || 0) + 1;
      r.voted = true;
      toast("Vote recorded");
    }
    save();
    renderAll();
    if (detailId === id) openDetail(id);
  }

  function deleteRecord(id) {
    if (!confirm("Delete this record?")) return;
    records = records.filter((r) => r.id !== id);
    save();
    closeDetail();
    toast("Deleted");
    renderAll();
  }

  function advancePhase(id) {
    const r = records.find((x) => x.id === id);
    if (!r) return;
    const phases = D.moduleById(r.module).phases || [];
    const idx = phases.findIndex((p) => p.id === r.phase);
    if (idx < 0 || idx >= phases.length - 1) {
      toast("Already at last phase");
      return;
    }
    updateRecord(id, { phase: phases[idx + 1].id });
    toast("Advanced → " + phases[idx + 1].label);
    openDetail(id);
    renderAll();
  }

  // ─── Docs ───────────────────────────────────────────────────────────────

  function renderDocs() {
    $("#docs-body").innerHTML = `
      <h3>What this is</h3>
      <p><strong>MineralOps Pipeline</strong> is a static manufacturing E2E tool for <strong>project developers</strong> and <strong>plant operators</strong>. It models ERP-style process tracks, CRM commercial pipelines, and finance/hedging work — each with <strong>module-specific phases</strong> and <strong>key KPIs</strong>.</p>
      <h3>Views</h3>
      <ul class="docs-list">
        <li><strong>Portfolio</strong> — board/list of all records; filter by module to board on that module’s phase track</li>
        <li><strong>Business modules</strong> — 18 domains with ERP analog, process track, phases, KPI catalog</li>
        <li><strong>KPI hub</strong> — actual vs target from portfolio data + full catalog</li>
        <li><strong>Process map</strong> — visual phase flow + records on the track</li>
      </ul>
      <h3>Modules covered</h3>
      <table class="docs-table">
        <thead><tr><th>Module</th><th>ERP / system analog</th><th>Phases</th><th>Example KPIs</th></tr></thead>
        <tbody>
          ${D.MODULES.map(
            (m) =>
              `<tr>
                <td>${escapeHtml(m.name)}</td>
                <td>${escapeHtml(m.erp)}</td>
                <td>${m.phases.length}</td>
                <td>${escapeHtml(m.kpis.slice(0, 3).map((k) => k.name).join(", "))}</td>
              </tr>`
          ).join("")}
        </tbody>
      </table>
      <h3>Record types</h3>
      <p>Improvement Idea · Process / Work Order Track · CapEx / Project · Commercial / CRM Deal · Finance / Hedge Action</p>
      <p class="docs-links"><a href="docs/BRD.md" target="_blank">BRD</a> · <a href="docs/PRD.md" target="_blank">PRD</a> · <a href="https://github.com/Aramina6/mineralops-pipeline" target="_blank">GitHub</a></p>
    `;
  }

  // ─── Views ──────────────────────────────────────────────────────────────

  function setMainView(view) {
    mainView = view;
    $$(".nav-tab").forEach((t) => t.classList.toggle("active", t.getAttribute("data-view") === view));
    ["portfolio", "modules", "kpi", "process"].forEach((v) => {
      const el = $("#view-" + v);
      if (el) el.classList.toggle("hidden", v !== view);
    });
    if (view === "modules") renderModules();
    if (view === "kpi") renderKpiHub();
    if (view === "process") renderProcessMap();
    if (view === "portfolio") renderPortfolio();
  }

  function renderPortfolio() {
    renderGlobalKpis();
    if (layoutMode === "board") {
      $("#board-view").classList.remove("hidden");
      $("#list-view").classList.add("hidden");
      renderBoard();
    } else {
      $("#board-view").classList.add("hidden");
      $("#list-view").classList.remove("hidden");
      renderList();
    }
  }

  function renderAll() {
    renderGlobalKpis();
    if (mainView === "portfolio") renderPortfolio();
    if (mainView === "modules") renderModules();
    if (mainView === "kpi") renderKpiHub();
    if (mainView === "process") renderProcessMap();
  }

  function resetDemo() {
    if (!confirm("Reset to manufacturing E2E demo seed data?")) return;
    records = D.seedRecords();
    save();
    toast("Demo restored");
    renderAll();
  }

  function bindUI() {
    $$(".nav-tab").forEach((tab) => {
      tab.addEventListener("click", () => setMainView(tab.getAttribute("data-view")));
    });

    $("#btn-add").addEventListener("click", () => openForm(null));
    $("#btn-add-empty").addEventListener("click", () => openForm(null));
    $("#btn-reset").addEventListener("click", resetDemo);
    $("#btn-docs").addEventListener("click", () => {
      renderDocs();
      $("#modal-docs").classList.remove("hidden");
    });
    $("#modal-docs-close").addEventListener("click", () => $("#modal-docs").classList.add("hidden"));
    $("#modal-module-close").addEventListener("click", () => $("#modal-module").classList.add("hidden"));

    $("#modal-form-close").addEventListener("click", closeForm);
    $("#btn-cancel-form").addEventListener("click", closeForm);
    $("#idea-form").addEventListener("submit", handleSubmit);
    $("#field-module").addEventListener("change", refreshFormPhases);

    $("#modal-detail-close").addEventListener("click", closeDetail);
    $("#btn-edit").addEventListener("click", () => {
      const r = records.find((x) => x.id === detailId);
      closeDetail();
      if (r) openForm(r);
    });
    $("#btn-delete").addEventListener("click", () => detailId && deleteRecord(detailId));
    $("#btn-advance").addEventListener("click", () => detailId && advancePhase(detailId));

    $("#layout-board").addEventListener("click", () => {
      layoutMode = "board";
      $("#layout-board").classList.add("active");
      $("#layout-list").classList.remove("active");
      renderPortfolio();
    });
    $("#layout-list").addEventListener("click", () => {
      layoutMode = "list";
      $("#layout-list").classList.add("active");
      $("#layout-board").classList.remove("active");
      renderPortfolio();
    });

    $("#filter-module").addEventListener("change", () => {
      refreshPhaseFilter();
      renderPortfolio();
    });
    ["filter-search", "filter-phase", "filter-type", "filter-location", "filter-team", "filter-priority"].forEach(
      (id) => {
        const el = $("#" + id);
        el.addEventListener(id === "filter-search" ? "input" : "change", renderPortfolio);
      }
    );
    $("#btn-clear-filters").addEventListener("click", () => {
      $("#filter-search").value = "";
      $("#filter-module").value = "";
      $("#filter-phase").value = "";
      $("#filter-type").value = "";
      $("#filter-location").value = "";
      $("#filter-team").value = "";
      $("#filter-priority").value = "";
      refreshPhaseFilter();
      renderPortfolio();
    });

    $("#kpi-module-select").addEventListener("change", renderKpiHub);
    $("#process-module-select").addEventListener("change", renderProcessMap);

    ["modal-form", "modal-detail", "modal-docs", "modal-module"].forEach((id) => {
      const b = $("#" + id);
      b.addEventListener("click", (e) => {
        if (e.target === b) {
          b.classList.add("hidden");
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
        $("#modal-module").classList.add("hidden");
      }
    });
  }

  function init() {
    initSelects();
    bindUI();
    load();
    setMainView("portfolio");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
