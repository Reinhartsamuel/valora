import { createButton, createToast, createIcon } from '../components/UI';

export function renderMigration(): HTMLDivElement {
  const page = document.createElement('div');
  page.className = 'container';
  page.style.cssText = `
    padding-top: 0;
    padding-bottom: 0;
    min-height: calc(100vh - var(--header-height) - 280px);
    display: flex;
    flex-direction: column;
  `;

  // ── Header ──
  const header = document.createElement('section');
  header.setAttribute('aria-label', 'Migration header');
  header.style.cssText = 'padding: var(--space-12) 0 var(--space-6);';
  const h1 = document.createElement('h1');
  h1.textContent = 'Migration';
  h1.style.cssText = 'font-size: 2.25rem; font-weight: 600; letter-spacing: -0.03em; color: var(--text-primary);';
  const sub = document.createElement('p');
  sub.textContent = 'Move your strategy into the Valora validation pipeline in four steps.';
  sub.style.cssText = 'margin-top: var(--space-2); font-size: 0.9375rem; color: var(--text-secondary);';
  header.appendChild(h1);
  header.appendChild(sub);

  // ── Step rail ──
  const steps: { label: string; desc: string }[] = [
    { label: 'Engine', desc: 'Pick your strategy engine' },
    { label: 'Code', desc: 'Upload or link strategy code' },
    { label: 'Costs', desc: 'Data, slippage, commission' },
    { label: 'Run', desc: 'Execute and export the report' },
  ];
  let step = 0;

  const rail = document.createElement('div');
  rail.style.cssText = 'display: flex; gap: 0; border: 1px solid var(--border); border-radius: var(--radius-lg); background: var(--bg-elevated); margin-bottom: var(--space-8); overflow: hidden;';
  const stepEls: HTMLButtonElement[] = [];

  steps.forEach((s, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.dataset.stepIndex = String(i);
    btn.style.cssText = `
      flex: 1;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px var(--space-5);
      text-align: left;
      border-right: ${i < steps.length - 1 ? '1px solid var(--border)' : 'none'};
      transition: background 0.15s ease;
    `;
    const num = document.createElement('span');
    num.textContent = `0${i + 1}`;
    num.style.cssText = `font-family: var(--font-mono); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em;`;
    const label = document.createElement('span');
    label.textContent = s.label;
    label.style.cssText = 'font-size: 0.8125rem; font-weight: 500;';
    btn.appendChild(num);
    btn.appendChild(label);
    btn.addEventListener('click', () => goTo(i));
    rail.appendChild(btn);
    stepEls.push(btn);
  });

  // ── Body: all step panels, one visible ──
  const body = document.createElement('div');
  body.style.cssText = 'flex: 1;';

  // Step 1 — Engine
  const engineStep = document.createElement('div');
  engineStep.style.cssText = 'max-width: 640px;';
  const eTitle = document.createElement('h2');
  eTitle.textContent = 'Which engine does your strategy run on?';
  eTitle.style.cssText = 'font-size: 1.25rem; font-weight: 600; letter-spacing: -0.02em; color: var(--text-primary); margin-bottom: var(--space-5);';
  engineStep.appendChild(eTitle);

  const engines = [
    { id: 'vbt', name: 'VectorBT PRO', desc: 'Numba-accelerated backtesting. Best for dense parameter sweeps and fast CPCV resampling.' },
    { id: 'nautilus', name: 'NautilusTrader', desc: 'Event-driven, exchange-grade simulation. Best for realistic fills and multi-asset strategies.' },
  ];
  const engineEls: Map<string, HTMLDivElement> = new Map();
  engines.forEach((eng, i) => {
    void i;
    const card = document.createElement('div');
    card.dataset.engineId = eng.id;
    card.style.cssText = `
      display: flex;
      align-items: flex-start;
      gap: var(--space-4);
      padding: var(--space-5);
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      cursor: pointer;
      margin-bottom: var(--space-4);
      transition: border-color 0.15s ease, background 0.15s ease;
    `;
    card.innerHTML = `
      <span style="width: 4px; height: 4px; border-radius: 1px; background: var(--border-strong); margin-top: 9px; flex-shrink: 0;" class="eng-dot"></span>
      <div>
        <div style="font-size: 0.9375rem; font-weight: 600; color: var(--text-primary);">${eng.name}</div>
        <div style="font-size: 0.8125rem; color: var(--text-muted); line-height: 1.55; margin-top: 4px;">${eng.desc}</div>
      </div>
    `;
    const select = () => {
      engineEls.forEach(el => {
        el.style.borderColor = 'var(--border)';
        const d = el.querySelector('.eng-dot')!;
        (d as HTMLElement).style.background = 'var(--border-strong)';
      });
      card.style.borderColor = 'var(--text-primary)';
      const dot = card.querySelector('.eng-dot')!;
      (dot as HTMLElement).style.background = 'var(--text-primary)';
    };
    card.addEventListener('click', select);
    card.addEventListener('mouseenter', () => { if (card.style.borderColor !== 'var(--text-primary)') card.style.borderColor = 'var(--border-strong)'; });
    card.addEventListener('mouseleave', () => { if (card.style.borderColor !== 'var(--text-primary)') card.style.borderColor = 'var(--border)'; });
    engineStep.appendChild(card);
    engineEls.set(eng.id, card);
    if (eng.id === 'vbt') select();
  });

  // Step 2 — Code upload
  const codeStep = document.createElement('div');
  codeStep.style.cssText = 'max-width: 640px;';
  const cTitle = document.createElement('h2');
  cTitle.textContent = 'Upload your strategy code';
  cTitle.style.cssText = 'font-size: 1.25rem; font-weight: 600; letter-spacing: -0.02em; color: var(--text-primary); margin-bottom: var(--space-3);';
  const cSub = document.createElement('p');
  cSub.textContent = 'A single file or zip. Valora pins the exact revision and records its hash — the report is reproducible down to the byte.';
  cSub.style.cssText = 'font-size: 0.875rem; color: var(--text-muted); margin-bottom: var(--space-6); line-height: 1.6;';

  const dropzone = document.createElement('div');
  dropzone.style.cssText = `
    border: 1px dashed var(--border-strong);
    border-radius: var(--radius-lg);
    padding: var(--space-12) var(--space-6);
    text-align: center;
    background: var(--bg-inset);
    cursor: pointer;
    transition: border-color 0.15s ease, background 0.15s ease;
  `;
  dropzone.innerHTML = `
    <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); letter-spacing: 0.06em;">
      Drag &amp; drop, or <span style="color: var(--text-primary); text-decoration: underline;">browse</span>
    </div>
    <div style="font-family: var(--font-mono); font-size: 0.6875rem; color: var(--text-subtle); margin-top: var(--space-3); letter-spacing: 0.04em;">.py .ipynb .zip · max 25 MB</div>
  `;
  dropzone.addEventListener('click', () => {
    const file = document.createElement('div');
    file.style.cssText = 'margin-top: var(--space-5); display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: var(--radius-md);';
    file.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-muted);"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14,2 14,8 20,8"/></svg><span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-primary);">macd_trend.py · 14.2 KB</span>`;
    dropzone.appendChild(file);
    createToast('Strategy file hashed and pinned', 'success');
  });
  dropzone.addEventListener('dragover', e => {
    e.preventDefault();
    dropzone.style.borderColor = 'var(--accent)';
    dropzone.style.background = 'var(--accent-bg)';
  });
  dropzone.addEventListener('dragleave', () => {
    dropzone.style.borderColor = 'var(--border-strong)';
    dropzone.style.background = 'var(--bg-inset)';
  });
  codeStep.appendChild(cTitle);
  codeStep.appendChild(cSub);
  codeStep.appendChild(dropzone);

  // Step 3 — Costs
  const costsStep = document.createElement('div');
  costsStep.style.cssText = 'max-width: 640px;';
  const cstTitle = document.createElement('h2');
  cstTitle.textContent = 'Cost & data settings';
  cstTitle.style.cssText = 'font-size: 1.25rem; font-weight: 600; letter-spacing: -0.02em; color: var(--text-primary); margin-bottom: var(--space-5);';

  const fields: [string, string, string][] = [
    ['Initial capital', '$', '100000'],
    ['Slippage', 'bps', '2.0'],
    ['Commission', 'bps', '4.5'],
    ['Data window', '', '2019-01-01 → 2024-12-31'],
    ['Venue', '', 'Binance'],
    ['Bars', '', '1h'],
  ];
  const fieldGrid = document.createElement('div');
  fieldGrid.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);';
  fields.forEach(([lbl, unit, val]) => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display: flex; flex-direction: column; gap: 6px;';
    const l = document.createElement('label');
    l.textContent = lbl;
    l.style.cssText = 'font-family: var(--font-mono); font-size: 0.625rem; color: var(--text-subtle); letter-spacing: 0.1em; text-transform: uppercase;';
    const input = document.createElement('input');
    input.type = 'text';
    input.value = val;
    if (unit) {
      const unitWrap = document.createElement('div');
      unitWrap.style.cssText = 'position: relative;';
      input.style.cssText = `
        width: 100%;
        height: 34px;
        padding: 0 32px 0 var(--space-3);
        font-family: var(--font-mono);
        font-size: 0.8125rem;
        color: var(--text-primary);
        background: var(--bg-inset);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        outline: none;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      `;
      input.addEventListener('focus', () => { input.style.borderColor = 'var(--accent)'; input.style.boxShadow = '0 0 0 2px var(--focus)'; });
      input.addEventListener('blur', () => { input.style.borderColor = 'var(--border)'; input.style.boxShadow = 'none'; });
      const u = document.createElement('span');
      u.textContent = unit;
      u.style.cssText = 'position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-family: var(--font-mono); font-size: 0.6875rem; color: var(--text-subtle); pointer-events: none;';
      unitWrap.appendChild(input);
      unitWrap.appendChild(u);
      wrap.appendChild(l);
      wrap.appendChild(unitWrap);
    } else {
      input.style.cssText = `
        width: 100%;
        height: 34px;
        padding: 0 var(--space-3);
        font-family: var(--font-mono);
        font-size: 0.8125rem;
        color: var(--text-primary);
        background: var(--bg-inset);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        outline: none;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      `;
      input.addEventListener('focus', () => { input.style.borderColor = 'var(--accent)'; input.style.boxShadow = '0 0 0 2px var(--focus)'; });
      input.addEventListener('blur', () => { input.style.borderColor = 'var(--border)'; input.style.boxShadow = 'none'; });
      wrap.appendChild(l);
      wrap.appendChild(input);
    }
    fieldGrid.appendChild(wrap);
  });
  costsStep.appendChild(cstTitle);
  costsStep.appendChild(fieldGrid);

  // Step 4 — Run
  const runStep = document.createElement('div');
  runStep.style.cssText = 'max-width: 640px;';
  const rTitle = document.createElement('h2');
  rTitle.textContent = 'Run the suite';
  rTitle.style.cssText = 'font-size: 1.25rem; font-weight: 600; letter-spacing: -0.02em; color: var(--text-primary); margin-bottom: var(--space-3);';
  const rSub = document.createElement('p');
  rSub.textContent = 'The full validation suite — CPCV, DSR, PBO, regime attribution, and cost models — runs in parallel. Most strategies finish in under 20 minutes.';
  rSub.style.cssText = 'font-size: 0.875rem; color: var(--text-muted); line-height: 1.6; margin-bottom: var(--space-6);';
  const runNow = createButton('primary', 'md');
  runNow.textContent = 'Run full suite';
  runNow.appendChild(createIcon('chart', 14));
  runNow.addEventListener('click', () => createToast('Suite submitted — 384 resamples in flight', 'info'));
  const exportBtn = createButton('secondary', 'md');
  exportBtn.textContent = 'Export template report';
  exportBtn.appendChild(createIcon('download', 14));
  exportBtn.addEventListener('click', () => createToast('Sample trust report downloaded', 'success'));
  const btnRow = document.createElement('div');
  btnRow.style.cssText = 'display: flex; gap: var(--space-3);';
  btnRow.appendChild(runNow);
  btnRow.appendChild(exportBtn);
  runStep.appendChild(rTitle);
  runStep.appendChild(rSub);
  runStep.appendChild(btnRow);

  const panels = [engineStep, codeStep, costsStep, runStep];
  panels.forEach((panel, i) => {
    panel.style.display = i === 0 ? 'block' : 'none';
    body.appendChild(panel);
  });

  // ── Footer nav ──
  const footerNav = document.createElement('div');
  footerNav.style.cssText = 'display: flex; align-items: center; justify-content: space-between; margin-top: var(--space-8); padding-top: var(--space-5); border-top: 1px solid var(--border);';
  const stepCounter = document.createElement('span');
  stepCounter.style.cssText = 'font-family: var(--font-mono); font-size: 0.6875rem; color: var(--text-subtle); letter-spacing: 0.1em;';

  const backBtn = createButton('ghost', 'md');
  backBtn.textContent = 'Back';
  const nextBtn = createButton('secondary', 'md');
  const nextIcon = createIcon('arrowRight', 14);
  nextBtn.textContent = 'Continue';
  nextBtn.appendChild(nextIcon);

  const navRow = document.createElement('div');
  navRow.style.cssText = 'display: flex; gap: var(--space-3);';
  navRow.appendChild(backBtn);
  navRow.appendChild(nextBtn);
  footerNav.appendChild(stepCounter);
  footerNav.appendChild(navRow);

  function goTo(i: number) {
    step = Math.max(0, Math.min(steps.length - 1, i));
    panels.forEach((panel, idx) => {
      panel.style.display = idx === step ? 'block' : 'none';
    });
    stepEls.forEach((el, idx) => {
      const num = el.querySelector('span')!;
      if (idx === step) {
        num.style.color = 'var(--text-primary)';
        num.style.fontWeight = '600';
        el.style.background = 'var(--bg-hover)';
        const lb = el.querySelectorAll('span')[1];
        lb.style.color = 'var(--text-primary)';
      } else if (idx < step) {
        num.style.color = 'var(--text-subtle)';
        num.style.fontWeight = '400';
        el.style.background = 'transparent';
        const lb = el.querySelectorAll('span')[1];
        lb.style.color = 'var(--text-muted)';
      } else {
        num.style.color = 'var(--text-subtle)';
        num.style.fontWeight = '400';
        el.style.background = 'transparent';
        const lb = el.querySelectorAll('span')[1];
        lb.style.color = 'var(--text-secondary)';
      }
    });
    stepCounter.textContent = `STEP ${step + 1} OF ${steps.length}`;
    backBtn.style.visibility = step === 0 ? 'hidden' : 'visible';
    nextBtn.textContent = step === steps.length - 1 ? 'Finish' : 'Continue';
    nextBtn.appendChild(nextIcon);
  }

  backBtn.addEventListener('click', () => goTo(step - 1));
  nextBtn.addEventListener('click', () => {
    if (step === steps.length - 1) {
      createToast('Migration complete — TR report queued', 'success');
    } else {
      goTo(step + 1);
    }
  });
  goTo(0);

  page.appendChild(header);
  page.appendChild(rail);
  page.appendChild(body);
  page.appendChild(footerNav);

  return page;
}
