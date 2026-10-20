import { createButton, createBadge, createIcon } from '../components/UI';

function cpcvChartSvg(): string {
  const w = 340;
  const h = 150;
  const windows: string[] = [];
  // Deterministic pseudo-random walks for 6 out-of-sample windows
  const seeds = [0.32, 0.58, 0.41, 0.66, 0.24, 0.49];
  seeds.forEach((seed, i) => {
    const points: string[] = [];
    let x = 0;
    let y = h * 0.55;
    for (let s = 0; s <= 24; s++) {
      x = (s / 24) * w;
      y = h * (0.35 + seed * 0.25) + Math.sin(s * 0.55 + i * 1.7) * (h * 0.14) + Math.cos(s * 0.9 + i) * (h * 0.08);
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    windows.push(`<polyline points="${points.join(' ')}" fill="none" stroke="rgba(155,161,171,0.22)" stroke-width="1"/>`);
  });
  const meanPoints: string[] = [];
  for (let s = 0; s <= 24; s++) {
    const x = (s / 24) * w;
    const y = h * 0.5 - s * (h * 0.011) + Math.sin(s * 0.4) * 6;
    meanPoints.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const grid = [0.25, 0.5, 0.75].map(f => `<line x1="0" y1="${h * f}" x2="${w}" y2="${h * f}" stroke="rgba(35,37,43,0.8)" stroke-width="1"/>`).join('');
  return `<svg width="100%" height="${h}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" role="img" aria-label="CPCV out-of-sample equity windows">${grid}${windows.join('')}<polyline points="${meanPoints.join(' ')}" fill="none" stroke="#f0f1f3" stroke-width="1.5"/></svg>`;
}

export function renderLanding(): HTMLDivElement {
  const page = document.createElement('div');
  page.className = 'container';
  page.style.cssText = `
    padding-top: 0;
    padding-bottom: 0;
    min-height: calc(100vh - var(--header-height) - 280px);
    display: flex;
    flex-direction: column;
  `;

  // ── Hero: left-aligned copy + dense report preview ──
  const hero = document.createElement('section');
  hero.setAttribute('aria-label', 'Overview');
  hero.style.cssText = `
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    gap: var(--space-16);
    align-items: center;
    padding: var(--space-20) 0 var(--space-16);
  `;

  const heroLeft = document.createElement('div');
  const kicker = document.createElement('div');
  kicker.className = 'section-kicker';
  kicker.textContent = 'Strategy validation engine';

  const h1 = document.createElement('h1');
  h1.textContent = 'Proof before profit.';
  h1.style.cssText = `
    margin-top: var(--space-5);
    font-size: clamp(2.5rem, 5.2vw, 4rem);
    font-weight: 600;
    line-height: 1.04;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    max-width: 16ch;
  `;

  const sub = document.createElement('p');
  sub.textContent =
    'Valora stress-tests trading strategies against out-of-sample regimes, adversarial resampling, and transaction-cost models — then publishes an auditable trust report. No more curve-fitted backtests that evaporate in live trading.';
  sub.style.cssText = `
    margin-top: var(--space-5);
    font-size: 1rem;
    line-height: 1.65;
    color: var(--text-secondary);
    max-width: 52ch;
  `;

  const ctaRow = document.createElement('div');
  ctaRow.style.cssText = 'display: flex; gap: var(--space-3); margin-top: var(--space-8);';
  const primaryBtn = createButton('primary', 'lg');
  primaryBtn.textContent = 'Validate your strategy';
  primaryBtn.appendChild(createIcon('arrowRight', 14));
  primaryBtn.addEventListener('click', () => window.location.href = '/register');
  const secondaryBtn = createButton('secondary', 'lg');
  secondaryBtn.textContent = 'View a trust report';
  secondaryBtn.addEventListener('click', () => window.location.href = '/trust');
  ctaRow.appendChild(primaryBtn);
  ctaRow.appendChild(secondaryBtn);

  const specLine = document.createElement('div');
  specLine.style.cssText = `
    margin-top: var(--space-8);
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2) 0;
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    letter-spacing: 0.08em;
    color: var(--text-subtle);
  `;
  const specs = ['CPCV', 'DSR', 'PBO', 'REGIME ATTRIBUTION', 'COST MODELS'];
  specs.forEach((s, i) => {
    const span = document.createElement('span');
    span.textContent = s;
    span.style.cssText = 'padding: 0 12px; border-left: 1px solid var(--border);';
    if (i === 0) span.style.borderLeft = 'none';
    specLine.appendChild(span);
  });

  heroLeft.appendChild(kicker);
  heroLeft.appendChild(h1);
  heroLeft.appendChild(sub);
  heroLeft.appendChild(ctaRow);
  heroLeft.appendChild(specLine);

  // Report preview panel
  const panel = document.createElement('div');
  panel.style.cssText = `
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  `;

  const panelHead = document.createElement('div');
  panelHead.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 12px var(--space-5); border-bottom: 1px solid var(--border);';
  panelHead.innerHTML = `<span style="font-family: var(--font-mono); font-size: 0.6875rem; color: var(--text-muted); letter-spacing: 0.08em;">TR-2024-001089</span>`;
  panelHead.appendChild(createBadge('Passed', 'success'));

  const panelBody = document.createElement('div');
  panelBody.style.cssText = 'padding: var(--space-5);';
  const stratName = document.createElement('div');
  stratName.style.cssText = 'font-size: 0.9375rem; font-weight: 500; color: var(--text-primary);';
  stratName.textContent = 'MACD Trend Follow';
  const stratMeta = document.createElement('div');
  stratMeta.style.cssText = 'font-family: var(--font-mono); font-size: 0.6875rem; color: var(--text-subtle); margin-top: 4px; letter-spacing: 0.04em;';
  stratMeta.textContent = 'BTC/USDT · VectorBT PRO · 1h bars';
  panelBody.appendChild(stratName);
  panelBody.appendChild(stratMeta);

  const metricGrid = document.createElement('div');
  metricGrid.style.cssText = 'display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); margin-top: var(--space-5);';
  const metrics: [string, string, string][] = [
    ['CPCV SHARPE', '2.15', 'var(--text-primary)'],
    ['DSR', '1.78', 'var(--text-primary)'],
    ['PBO', '0.008', 'var(--text-primary)'],
    ['MAX DD', '-8.9%', 'var(--danger)'],
  ];
  metrics.forEach(([label, value, color]) => {
    const cell = document.createElement('div');
    cell.style.cssText = `background: var(--bg-inset); padding: 10px 12px;`;
    cell.innerHTML = `
      <div style="font-family: var(--font-mono); font-size: 0.5625rem; letter-spacing: 0.14em; color: var(--text-subtle); margin-bottom: 4px;">${label}</div>
      <div style="font-family: var(--font-mono); font-size: 0.875rem; font-weight: 600; font-variant-numeric: tabular-nums; color: ${color};">${value}</div>
    `;
    metricGrid.appendChild(cell);
  });
  panelBody.appendChild(metricGrid);

  const chartWrap = document.createElement('div');
  chartWrap.style.cssText = 'margin-top: var(--space-5);';
  const chartLabel = document.createElement('div');
  chartLabel.className = 'mono-label';
  chartLabel.textContent = 'CPCV — out-of-sample windows';
  chartWrap.innerHTML = cpcvChartSvg();
  chartWrap.prepend(chartLabel);
  panelBody.appendChild(chartWrap);

  const verdict = document.createElement('div');
  verdict.style.cssText = 'margin-top: var(--space-4); font-family: var(--font-mono); font-size: 0.6875rem; color: var(--text-muted); line-height: 1.6;';
  verdict.innerHTML = `<span style="color: var(--success);">PASS</span> — 0.2% probability of beating random under 384 resamples (target 0.5%).`;
  panelBody.appendChild(verdict);

  panel.appendChild(panelHead);
  panel.appendChild(panelBody);
  hero.appendChild(heroLeft);
  hero.appendChild(panel);

  // ── Spec strip (fact-based, replaces fabricated trust logos) ──
  const strip = document.createElement('section');
  strip.setAttribute('aria-label', 'Engine capabilities');
  strip.style.cssText = 'border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); background: var(--bg-inset);';
  const stripInner = document.createElement('div');
  stripInner.className = 'container';
  stripInner.style.cssText = 'display: flex; align-items: center; justify-content: space-between; gap: var(--space-6); flex-wrap: wrap; padding-top: var(--space-4); padding-bottom: var(--space-4);';
  const stripTitle = document.createElement('span');
  stripTitle.className = 'mono-label';
  stripTitle.textContent = 'Engine';
  const stripItems = [
    'VectorBT PRO + NautilusTrader',
    '5 execution venues',
    '1m – 1d bars',
    '10-year market data',
  ];
  const stripSpans: HTMLSpanElement[] = [];
  stripItems.forEach(item => {
    const s = document.createElement('span');
    s.textContent = item;
    s.style.cssText = 'font-family: var(--font-mono); font-size: 0.6875rem; color: var(--text-muted); letter-spacing: 0.04em;';
    stripInner.appendChild(s);
    stripSpans.push(s);
  });
  stripInner.insertBefore(stripTitle, stripSpans[0]);
  strip.appendChild(stripInner);

  // ── Stats row ──
  const stats = document.createElement('section');
  stats.setAttribute('aria-label', 'Key metrics');
  stats.style.cssText = 'padding: var(--space-16) 0;';
  const statsGrid = document.createElement('div');
  statsGrid.className = 'container';
  statsGrid.style.cssText = 'display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border);';
  const statItems: [string, string][] = [
    ['250+', 'backtests per day'],
    ['10 yrs', 'market data coverage'],
    ['5', 'execution venues'],
    ['100%', 'audit coverage'],
  ];
  statItems.forEach(([value, label]) => {
    const cell = document.createElement('div');
    cell.style.cssText = 'background: var(--bg); padding: var(--space-6);';
    const v = document.createElement('div');
    v.textContent = value;
    v.style.cssText = 'font-size: 2rem; font-weight: 600; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; color: var(--text-primary);';
    const l = document.createElement('div');
    l.textContent = label;
    l.style.cssText = 'font-family: var(--font-mono); font-size: 0.6875rem; color: var(--text-muted); margin-top: 6px; letter-spacing: 0.06em; text-transform: uppercase;';
    cell.appendChild(v);
    cell.appendChild(l);
    statsGrid.appendChild(cell);
  });
  stats.appendChild(statsGrid);

  // ── Features: dense bordered grid ──
  const features = document.createElement('section');
  features.setAttribute('aria-label', 'Features');
  features.style.cssText = 'padding: var(--space-16) 0;';
  const featHead = document.createElement('div');
  featHead.className = 'container';
  featHead.style.cssText = 'margin-bottom: var(--space-8);';
  const featKicker = document.createElement('div');
  featKicker.className = 'section-kicker';
  featKicker.textContent = 'Capabilities';
  const featTitle = document.createElement('h2');
  featTitle.textContent = 'Built for the skeptics.';
  featTitle.style.cssText = 'font-size: 1.75rem; font-weight: 600; letter-spacing: -0.02em; margin-top: var(--space-3); color: var(--text-primary);';
  featHead.appendChild(featKicker);
  featHead.appendChild(featTitle);

  const featGrid = document.createElement('div');
  featGrid.className = 'container';
  featGrid.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); border: 1px solid var(--border);';
  const featItems: [string, string, string][] = [
    ['cpcv', 'Combinatorial Purged Cross-Validation', 'Time-ordered resampling with embargo and purge intervals. No look-ahead bias, no overlapping samples, no survivorship shortcuts — the protocol was designed by López de Prado for exactly this failure mode.'],
    ['deflatedSharpe', 'Deflated Sharpe Ratio', 'Measures the probability that your best backtest is a lucky resample out of N attempts. The more configurations you tested, the higher the hurdle. Valora prices that luck for you.'],
    ['pbo', 'Probability of Backtest Overfitting', 'Quantifies how likely your in-sample edge is a statistical artifact. Reported per strategy, not buried in a footnote.'],
    ['regimes', 'Regime Attribution', 'Splits performance by volatility regime, trend state, and correlation structure. You see exactly which conditions your strategy profits from — and which it bleeds in.'],
    ['costs', 'Transaction-Cost Modeling', 'Slippage, spread, and commission models calibrated to your venue and size. No more frictionless backtests that die at $2M notional.'],
    ['audit', 'Audit-Grade Reports', 'Every metric, dataset version, and code revision is hashed and signed. Your investor, auditor, or LP gets a verifiable artifact — not a PDF you had to trust.'],
  ];
  featItems.forEach(([id, title, desc], i) => {
    void id;
    const cell = document.createElement('div');
    cell.style.cssText = 'background: var(--bg); padding: var(--space-6);';
    const num = document.createElement('div');
    num.textContent = String(i + 1).padStart(2, '0');
    num.style.cssText = 'font-family: var(--font-mono); font-size: 0.6875rem; color: var(--text-subtle); margin-bottom: var(--space-4); letter-spacing: 0.1em;';
    const t = document.createElement('h3');
    t.textContent = title;
    t.style.cssText = 'font-size: 1rem; font-weight: 600; letter-spacing: -0.01em; color: var(--text-primary); margin-bottom: var(--space-2);';
    const d = document.createElement('p');
    d.textContent = desc;
    d.style.cssText = 'font-size: 0.8125rem; line-height: 1.65; color: var(--text-muted);';
    cell.appendChild(num);
    cell.appendChild(t);
    cell.appendChild(d);
    featGrid.appendChild(cell);
  });
  features.appendChild(featHead);
  features.appendChild(featGrid);

  // ── How it works ──
  const how = document.createElement('section');
  how.setAttribute('aria-label', 'How it works');
  how.style.cssText = 'padding: var(--space-16) 0;';
  const howHead = document.createElement('div');
  howHead.className = 'container';
  howHead.style.cssText = 'margin-bottom: var(--space-8);';
  const howKicker = document.createElement('div');
  howKicker.className = 'section-kicker';
  howKicker.textContent = 'Workflow';
  const howTitle = document.createElement('h2');
  howTitle.textContent = 'Three steps to a verdict.';
  howTitle.style.cssText = 'font-size: 1.75rem; font-weight: 600; letter-spacing: -0.02em; margin-top: var(--space-3); color: var(--text-primary);';
  howHead.appendChild(howKicker);
  howHead.appendChild(howTitle);

  const stepsGrid = document.createElement('div');
  stepsGrid.className = 'container';
  stepsGrid.style.cssText = 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border);';
  const steps: [string, string][] = [
    ['Upload strategy code', 'Connect VectorBT or NautilusTrader strategies. Valora pins your exact code revision, data version, and parameter set — a hash for every input.'],
    ['Run the full suite', 'CPCV, DSR, PBO, regime splits, and cost models run in parallel across the data warehouse. Most strategies finish in under 20 minutes.'],
    ['Read the verdict', 'A single pass/fail score, per-regime attribution, and a signed trust report you can share with your LPs, auditors, or yourself.'],
  ];
  steps.forEach(([title, desc], i) => {
    const cell = document.createElement('div');
    cell.style.cssText = 'background: var(--bg); padding: var(--space-6);';
    const n = document.createElement('div');
    n.textContent = `0${i + 1}`;
    n.style.cssText = 'font-family: var(--font-mono); font-size: 0.75rem; font-weight: 600; color: var(--text-subtle); margin-bottom: var(--space-4); letter-spacing: 0.1em;';
    const t = document.createElement('h3');
    t.textContent = title;
    t.style.cssText = 'font-size: 1rem; font-weight: 600; letter-spacing: -0.01em; color: var(--text-primary); margin-bottom: var(--space-2);';
    const d = document.createElement('p');
    d.textContent = desc;
    d.style.cssText = 'font-size: 0.8125rem; line-height: 1.65; color: var(--text-muted);';
    cell.appendChild(n);
    cell.appendChild(t);
    cell.appendChild(d);
    stepsGrid.appendChild(cell);
  });
  how.appendChild(howHead);
  how.appendChild(stepsGrid);

  // ── Final CTA: plain band, no gradient, no glow ──
  const ctaSection = document.createElement('section');
  ctaSection.setAttribute('aria-label', 'Call to action');
  ctaSection.style.cssText = 'padding: var(--space-16) 0 var(--space-20);';
  const ctaInner = document.createElement('div');
  ctaInner.className = 'container';
  ctaInner.style.cssText = 'text-align: center;';
  const ctaKicker = document.createElement('div');
  ctaKicker.className = 'section-kicker';
  ctaKicker.textContent = 'Get started';
  ctaKicker.style.cssText += ' margin-bottom: var(--space-5);';
  const ctaTitle = document.createElement('h2');
  ctaTitle.textContent = 'Stop trusting backtests. Start verifying them.';
  ctaTitle.style.cssText = 'font-size: 2rem; font-weight: 600; letter-spacing: -0.02em; color: var(--text-primary);';
  const ctaSub = document.createElement('p');
  ctaSub.textContent = 'Start with a free trust report on your first strategy. No credit card, no lock-in.';
  ctaSub.style.cssText = 'margin-top: var(--space-4); font-size: 1rem; color: var(--text-secondary);';
  const ctaBtn = createButton('primary', 'lg');
  ctaBtn.textContent = 'Validate your first strategy';
  ctaBtn.appendChild(createIcon('arrowRight', 14));
  ctaBtn.addEventListener('click', () => window.location.href = '/register');
  ctaInner.appendChild(ctaKicker);
  ctaInner.appendChild(ctaTitle);
  ctaInner.appendChild(ctaSub);
  const ctaBtnWrap = document.createElement('div');
  ctaBtnWrap.style.cssText = 'margin-top: var(--space-8);';
  ctaBtnWrap.appendChild(ctaBtn);
  ctaInner.appendChild(ctaBtnWrap);
  ctaSection.appendChild(ctaInner);

  page.appendChild(hero);
  page.appendChild(strip);
  page.appendChild(stats);
  page.appendChild(features);
  page.appendChild(how);
  page.appendChild(ctaSection);

  // Responsive
  const mq = window.matchMedia('(max-width: 860px)');
  const apply = (matches: boolean) => {
    hero.style.gridTemplateColumns = matches ? '1fr' : '1.15fr 1fr';
    statsGrid.style.gridTemplateColumns = matches ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)';
    featGrid.style.gridTemplateColumns = matches ? '1fr' : '1fr 1fr';
    stepsGrid.style.gridTemplateColumns = matches ? '1fr' : 'repeat(3, 1fr)';
  };
  apply(mq.matches);
  mq.addEventListener('change', e => apply(e.matches));

  return page;
}
