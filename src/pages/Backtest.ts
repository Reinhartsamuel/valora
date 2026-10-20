import { createButton, createTabs, createTable, createIcon, createToast } from '../components/UI';

export function renderBacktest(): HTMLDivElement {
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
  header.setAttribute('aria-label', 'Backtest runner header');
  header.style.cssText = 'padding: var(--space-12) 0 var(--space-6);';
  const headRow = document.createElement('div');
  headRow.style.cssText = 'display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: var(--space-4);';
  const h1Block = document.createElement('div');
  const h1 = document.createElement('h1');
  h1.textContent = 'Backtest Runner';
  h1.style.cssText = 'font-size: 2.25rem; font-weight: 600; letter-spacing: -0.03em; color: var(--text-primary);';
  const sub = document.createElement('p');
  sub.textContent = 'Configure a run, execute the full validation suite, and inspect the verdict.';
  sub.style.cssText = 'margin-top: var(--space-2); font-size: 0.9375rem; color: var(--text-secondary);';
  h1Block.appendChild(h1);
  h1Block.appendChild(sub);

  const runBtn = createButton('primary', 'md');
  runBtn.textContent = 'Run suite';
  runBtn.appendChild(createIcon('chart', 14));
  runBtn.addEventListener('click', () => {
    createToast('Suite submitted — 384 resamples across 5 venues…', 'info');
    setTimeout(() => createToast('Run TR-2024-001090 complete — verdict: PASS', 'success'), 1800);
  });
  headRow.appendChild(h1Block);
  headRow.appendChild(runBtn);
  header.appendChild(headRow);

  // ── Toolbar ──
  const toolbar = document.createElement('div');
  toolbar.style.cssText = 'display: flex; gap: var(--space-3); align-items: center; flex-wrap: wrap;';

  const strategySelect = document.createElement('select');
  strategySelect.innerHTML = [
    'MACD Trend Follow — BTC/USDT',
    'Mean Reversion — SPX',
    'Momentum Basket — ETH/USDT',
    'Carry + Vol Target — SOL/USDT',
  ].map(s => `<option>${s}</option>`).join('');

  const venueSelect = document.createElement('select');
  venueSelect.innerHTML = ['Binance', 'OKX', 'Bybit', 'Coinbase', 'Kraken'].map(s => `<option>${s}</option>`).join('');

  const tfSelect = document.createElement('select');
  tfSelect.innerHTML = ['1m', '5m', '1h', '4h', '1d'].map(s => `<option>${s}</option>`).join('');
  tfSelect.selectedIndex = 2;

  const periodInput = document.createElement('input');
  periodInput.type = 'text';
  periodInput.value = '2019-01-01 → 2024-12-31';
  periodInput.readOnly = true;

  const selStyle = `
    height: 34px;
    padding: 0 var(--space-3);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-primary);
    background: var(--bg-inset);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    outline: none;
    cursor: pointer;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  `;
  [strategySelect, venueSelect, tfSelect].forEach(s => {
    s.style.cssText = selStyle;
    s.addEventListener('focus', () => { s.style.borderColor = 'var(--accent)'; s.style.boxShadow = '0 0 0 2px var(--focus)'; });
    s.addEventListener('blur', () => { s.style.borderColor = 'var(--border)'; s.style.boxShadow = 'none'; });
  });
  periodInput.style.cssText = `
    height: 34px;
    padding: 0 var(--space-3);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-muted);
    background: var(--bg-inset);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    outline: none;
    width: 200px;
  `;

  const label = (text: string) => {
    const l = document.createElement('span');
    l.className = 'mono-label';
    l.textContent = text;
    return l;
  };
  const toolbarItems: [string, HTMLElement][] = [
    ['Strategy', strategySelect],
    ['Venue', venueSelect],
    ['Bars', tfSelect],
    ['Window', periodInput],
  ];
  toolbarItems.forEach(([lbl, el]) => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display: flex; flex-direction: column; gap: 4px;';
    wrap.appendChild(label(lbl));
    wrap.appendChild(el);
    toolbar.appendChild(wrap);
  });

  // ── Main grid: config + results ──
  const grid = document.createElement('section');
  grid.style.cssText = 'display: grid; grid-template-columns: 300px 1fr; gap: var(--space-5); margin-top: var(--space-8); flex: 1;';

  // Config panel
  const configPanel = document.createElement('div');
  configPanel.style.cssText = 'background: var(--bg-elevated); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: var(--space-5); align-self: start;';
  const cfgTitle = document.createElement('div');
  cfgTitle.className = 'mono-label';
  cfgTitle.textContent = 'Cost & sizing';
  cfgTitle.style.cssText += ' margin-bottom: var(--space-5);';

  const cfgFields: [string, string, number][] = [
    ['Initial capital ($)', '100000', 0],
    ['Slippage (bps)', '2.0', 1],
    ['Commission (bps)', '4.5', 2],
    ['Max leverage', '3.0', 3],
  ];
  cfgFields.forEach(([lbl, val, i]) => {
    void i;
    const field = document.createElement('div');
    field.style.cssText = 'margin-bottom: var(--space-4);';
    const fLabel = document.createElement('label');
    fLabel.textContent = lbl;
    fLabel.style.cssText = 'display: block; font-family: var(--font-mono); font-size: 0.625rem; color: var(--text-subtle); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px;';
    const input = document.createElement('input');
    input.type = 'text';
    input.value = val;
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
    field.appendChild(fLabel);
    field.appendChild(input);
    configPanel.appendChild(field);
  });

  const resetBtn = createButton('ghost', 'sm');
  resetBtn.textContent = 'Reset defaults';
  resetBtn.addEventListener('click', () => createToast('Defaults restored', 'info'));
  configPanel.appendChild(cfgTitle);
  configPanel.appendChild(resetBtn);

  // Results panel
  const resultsPanel = document.createElement('div');
  resultsPanel.style.cssText = 'background: var(--bg-elevated); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden;';

  const runMeta = document.createElement('div');
  runMeta.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 12px var(--space-5); border-bottom: 1px solid var(--border);';
  runMeta.innerHTML = `
    <span style="font-family: var(--font-mono); font-size: 0.6875rem; color: var(--text-muted); letter-spacing: 0.08em;">TR-2024-001090 · COMPLETED IN 11M 42S</span>
    <span style="display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 0.625rem; letter-spacing: 0.08em; color: var(--success);">
      <span style="width: 5px; height: 5px; border-radius: 1px; background: var(--success);"></span>PASS
    </span>
  `;
  resultsPanel.appendChild(runMeta);

  // Metrics grid
  const metricsGrid = document.createElement('div');
  metricsGrid.style.cssText = 'display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border);';
  const metrics: [string, string, string?][] = [
    ['SHARPE', '2.31'],
    ['CPCV SHARPE', '2.15'],
    ['DEFLATED SHARPE', '1.78'],
    ['PBO', '0.008'],
    ['MAX DRAWDOWN', '-8.9%', 'var(--danger)'],
    ['TOTAL RETURN', '+312.4%', 'var(--success)'],
    ['WIN RATE', '54.2%'],
    ['PROFIT FACTOR', '1.61'],
  ];
  metrics.forEach(([lbl, value, color]) => {
    const cell = document.createElement('div');
    cell.style.cssText = 'background: var(--bg-elevated); padding: var(--space-4);';
    cell.innerHTML = `
      <div style="font-family: var(--font-mono); font-size: 0.5625rem; letter-spacing: 0.14em; color: var(--text-subtle); margin-bottom: 6px;">${lbl}</div>
      <div style="font-family: var(--font-mono); font-size: 1.125rem; font-weight: 600; font-variant-numeric: tabular-nums; color: ${color ?? 'var(--text-primary)'};">${value}</div>
    `;
    metricsGrid.appendChild(cell);
  });
  resultsPanel.appendChild(metricsGrid);

  // CV chart card with tabs
  const cvSection = document.createElement('div');
  cvSection.style.cssText = 'padding: var(--space-5); border-top: 1px solid var(--border);';
  const cvHead = document.createElement('div');
  cvHead.style.cssText = 'display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-4);';
  const cvTitle = document.createElement('div');
  cvTitle.className = 'mono-label';
  cvTitle.textContent = 'Equity — in-sample vs out-of-sample';
  cvHead.appendChild(cvTitle);

  const tabs = createTabs([
    { id: 'all', label: 'All windows' },
    { id: 'best', label: 'Best 25%' },
    { id: 'worst', label: 'Worst 25%' },
  ]);
  cvHead.appendChild(tabs.container);
  cvSection.appendChild(cvHead);

  const cvChart = document.createElement('div');
  const cvSvg = () => `<svg width="100%" height="180" viewBox="0 0 480 180" preserveAspectRatio="none">
    <line x1="0" y1="45" x2="480" y2="45" stroke="var(--border)" stroke-width="1"/>
    <line x1="0" y1="90" x2="480" y2="90" stroke="var(--border)" stroke-width="1"/>
    <line x1="0" y1="135" x2="480" y2="135" stroke="var(--border)" stroke-width="1"/>
    <line x1="240" y1="0" x2="240" y2="180" stroke="var(--border-strong)" stroke-width="1" stroke-dasharray="4 4"/>
    <polyline points="0,160 60,148 120,120 180,104 240,72 300,60 360,44 420,30 480,16" fill="none" stroke="var(--text-subtle)" stroke-width="1.5"/>
    <polyline points="240,72 270,80 300,64 330,76 360,52 390,64 420,40 450,52 480,30" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
  </svg>`;
  cvChart.innerHTML = cvSvg();
  cvSection.appendChild(cvChart);

  const legend = document.createElement('div');
  legend.style.cssText = 'display: flex; gap: var(--space-5); margin-top: var(--space-3);';
  [
    ['In-sample mean', 'var(--text-subtle)'],
    ['Out-of-sample mean', 'var(--accent)'],
  ].forEach(([lbl, color]) => {
    const item = document.createElement('span');
    item.innerHTML = `<span style="display: inline-block; width: 12px; height: 2px; background: ${color}; margin-right: 6px; vertical-align: middle;"></span><span style="font-family: var(--font-mono); font-size: 0.625rem; color: var(--text-muted); letter-spacing: 0.06em;">${lbl}</span>`;
    legend.appendChild(item);
  });
  cvSection.appendChild(legend);

  // Regime table
  const regimeSection = document.createElement('div');
  regimeSection.style.cssText = 'padding: 0 var(--space-5) var(--space-5); border-top: 1px solid var(--border);';
  const regimeHead = document.createElement('div');
  regimeHead.className = 'mono-label';
  regimeHead.textContent = 'Regime attribution';
  regimeHead.style.cssText += ' padding-top: var(--space-5); margin-bottom: var(--space-4);';
  regimeSection.appendChild(regimeHead);

  const regimeTable = createTable(
    ['Regime', 'Pct of time', 'Sharpe', 'Max DD', 'Verdict'],
    [
      [
        '<span style="color: var(--text-primary); font-weight: 500;">High volatility</span>',
        '<span style="font-family: var(--font-mono);">22%</span>',
        '<span style="font-family: var(--font-mono);">1.94</span>',
        '<span style="font-family: var(--font-mono); color: var(--danger);">-8.9%</span>',
        '<span style="font-family: var(--font-mono); font-size: 0.6875rem; letter-spacing: 0.08em; color: var(--success);">PASS</span>',
      ],
      [
        '<span style="color: var(--text-primary); font-weight: 500;">Low volatility</span>',
        '<span style="font-family: var(--font-mono);">41%</span>',
        '<span style="font-family: var(--font-mono);">0.88</span>',
        '<span style="font-family: var(--font-mono); color: var(--danger);">-3.1%</span>',
        '<span style="font-family: var(--font-mono); font-size: 0.6875rem; letter-spacing: 0.08em; color: var(--warning);">WEAK</span>',
      ],
      [
        '<span style="color: var(--text-primary); font-weight: 500;">Trending</span>',
        '<span style="font-family: var(--font-mono);">37%</span>',
        '<span style="font-family: var(--font-mono);">3.02</span>',
        '<span style="font-family: var(--font-mono); color: var(--danger);">-5.4%</span>',
        '<span style="font-family: var(--font-mono); font-size: 0.6875rem; letter-spacing: 0.08em; color: var(--success);">PASS</span>',
      ],
    ],
    { striped: false, hoverable: true },
  );
  regimeSection.appendChild(regimeTable);

  resultsPanel.appendChild(cvSection);
  resultsPanel.appendChild(regimeSection);

  grid.appendChild(configPanel);
  grid.appendChild(resultsPanel);

  page.appendChild(header);
  page.appendChild(toolbar);
  page.appendChild(grid);

  // Responsive
  const mq = window.matchMedia('(max-width: 860px)');
  const apply = (matches: boolean) => {
    grid.style.gridTemplateColumns = matches ? '1fr' : '300px 1fr';
    metricsGrid.style.gridTemplateColumns = matches ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)';
  };
  apply(mq.matches);
  mq.addEventListener('change', e => apply(e.matches));

  return page;
}
