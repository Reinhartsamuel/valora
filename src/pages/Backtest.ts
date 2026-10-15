import { createButton, createCard, createIcon, createTabs, createInput, createSelect } from '../components/UI.ts';

export async function createBacktestPage(): Promise<HTMLElement> {
  const page = document.createElement('div');
  page.style.cssText = 'width: 100%; display: flex; flex-direction: column; min-height: calc(100vh - var(--header-height) - 280px);';

  // Toolbar
  const toolbar = document.createElement('section');
  toolbar.style.cssText = `
    padding: var(--space-4) var(--space-6);
    border-bottom: 1px solid var(--border);
    background: var(--bg-elevated);
    display: flex;
    align-items: center;
    gap: var(--space-4);
    flex-wrap: wrap;
  `;
  toolbar.innerHTML = `
    <div style="display: flex; align-items: center; gap: var(--space-3); flex: 1; min-width: 300px;">
      <div style="display: flex; align-items: center; gap: var(--space-2);">
        <span style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-subtle);">Strategy</span>
        <div id="strategy-select"></div>
      </div>
      <div style="display: flex; align-items: center; gap: var(--space-2);">
        <span style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-subtle);">Venue</span>
        <div id="venue-select"></div>
      </div>
      <div style="display: flex; align-items: center; gap: var(--space-2);">
        <span style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-subtle);">Timeframe</span>
        <div id="timeframe-select"></div>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: var(--space-3);">
      <div id="run-btn"></div>
      <div id="export-btn"></div>
    </div>
  `;

  const strategySelect = createSelect([
    { value: 'ema-cross', label: 'EMA Crossover (9/21)' },
    { value: 'rsi-mean-rev', label: 'RSI Mean Reversion (14, 30/70)' },
    { value: 'bb-breakout', label: 'Bollinger Band Breakout (20, 2)' },
    { value: 'macd-trend', label: 'MACD Trend Follow (12, 26, 9)' },
    { value: 'custom', label: 'Custom Strategy...' },
  ]);
  toolbar.querySelector('#strategy-select')!.appendChild(strategySelect);

  const venueSelect = createSelect([
    { value: 'binance', label: 'Binance' },
    { value: 'bybit', label: 'Bybit' },
    { value: 'okx', label: 'OKX' },
    { value: 'coinbase', label: 'Coinbase' },
    { value: 'kraken', label: 'Kraken' },
  ]);
  toolbar.querySelector('#venue-select')!.appendChild(venueSelect);

  const timeframeSelect = createSelect([
    { value: '1m', label: '1 Minute' },
    { value: '5m', label: '5 Minutes' },
    { value: '15m', label: '15 Minutes' },
    { value: '1h', label: '1 Hour' },
    { value: '4h', label: '4 Hours' },
    { value: '1d', label: '1 Day' },
  ]);
  toolbar.querySelector('#timeframe-select')!.appendChild(timeframeSelect);

  const runBtn = createButton('primary', 'md');
  runBtn.textContent = 'Run Backtest';
  runBtn.prepend(createIcon('chart', 16));
  toolbar.querySelector('#run-btn')!.appendChild(runBtn);

  const exportBtn = createButton('secondary', 'md');
  exportBtn.textContent = 'Export';
  exportBtn.prepend(createIcon('download', 16));
  toolbar.querySelector('#export-btn')!.appendChild(exportBtn);

  page.appendChild(toolbar);

  // Main content area
  const main = document.createElement('main');
  main.style.cssText = `
    flex: 1;
    padding: var(--space-6);
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: var(--space-6);
    max-width: var(--container-max);
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  `;

  // Left panel - Chart
  const chartPanel = document.createElement('div');
  chartPanel.style.cssText = `
    display: flex;
    flex-direction: column;
    min-height: 0;
  `;
  chartPanel.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-4);">
      <h2 style="font-size: 1rem; font-weight: 600; color: var(--text-primary);">Equity Curve</h2>
      <div style="display: flex; gap: var(--space-1); background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-md); padding: var(--space-1);" id="chart-tabs"></div>
    </div>
    <div id="chart-container" style="flex: 1; min-height: 400px; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-lg); position: relative; overflow: hidden;"></div>
  `;
  main.appendChild(chartPanel);

  // Right panel - Metrics & Config
  const rightPanel = document.createElement('div');
  rightPanel.style.cssText = `
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    min-height: 0;
  `;

  // Validation Summary Card
  const validationCard = createCard(true);
  validationCard.style.padding = 'var(--space-5)';
  validationCard.innerHTML = `
    <h3 style="font-size: 0.875rem; font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-4); display: flex; align-items: center; gap: var(--space-2);">
      ${createIcon('shield', 16).outerHTML} Validation Summary
    </h3>
    <div id="validation-metrics" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3) var(--space-4);"></div>
  `;
  rightPanel.appendChild(validationCard);

  // CPCV Results Card
  const cvCard = createCard();
  cvCard.style.padding = 'var(--space-5)';
  cvCard.style.flex = '1';
  cvCard.style.minHeight = '200px';
  cvCard.innerHTML = `
    <h3 style="font-size: 0.875rem; font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-4); display: flex; align-items: center; gap: var(--space-2);">
      ${createIcon('chart', 16).outerHTML} CPCV Paths
    </h3>
    <div id="cv-container" style="height: 200px; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-md); position: relative;"></div>
    <div style="margin-top: var(--space-3); font-size: 0.75rem; color: var(--text-muted);">
      <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-1);">
        <span style="width: 12px; height: 12px; border-radius: 2px; background: var(--accent);"></span>
        <span>In-sample</span>
      </div>
      <div style="display: flex; align-items: center; gap: var(--space-2);">
        <span style="width: 12px; height: 12px; border-radius: 2px; background: var(--success);"></span>
        <span>Out-of-sample</span>
      </div>
    </div>
  `;
  rightPanel.appendChild(cvCard);

  // Configuration Card
  const configCard = createCard();
  configCard.style.padding = 'var(--space-5)';
  configCard.innerHTML = `
    <h3 style="font-size: 0.875rem; font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-4);">Validation Config</h3>
    <div style="display: flex; flex-direction: column; gap: var(--space-3);">
      <div>
        <label style="font-size: 0.75rem; font-weight: 500; color: var(--text-subtle); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-1); display: block;">CPCV Folds</label>
        <div id="folds-input"></div>
      </div>
      <div>
        <label style="font-size: 0.75rem; font-weight: 500; color: var(--text-subtle); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-1); display: block;">Embargo (bars)</label>
        <div id="embargo-input"></div>
      </div>
      <div>
        <label style="font-size: 0.75rem; font-weight: 500; color: var(--text-subtle); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-1); display: block;">PBO Trials</label>
        <div id="pbo-input"></div>
      </div>
      <div>
        <label style="font-size: 0.75rem; font-weight: 500; color: var(--text-subtle); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-1); display: block;">Lookback Window</label>
        <div id="lookback-select"></div>
      </div>
    </div>
  `;

  const foldsInput = createInput('10', 'number');
  foldsInput.style.width = '80px';
  configCard.querySelector('#folds-input')!.appendChild(foldsInput);

  const embargoInput = createInput('100', 'number');
  embargoInput.style.width = '80px';
  configCard.querySelector('#embargo-input')!.appendChild(embargoInput);

  const pboInput = createInput('1000', 'number');
  pboInput.style.width = '80px';
  configCard.querySelector('#pbo-input')!.appendChild(pboInput);

  const lookbackSelect = createSelect([
    { value: '1y', label: '1 Year' },
    { value: '3y', label: '3 Years' },
    { value: '5y', label: '5 Years' },
    { value: '10y', label: '10 Years (Team)' },
  ]);
  configCard.querySelector('#lookback-select')!.appendChild(lookbackSelect);

  rightPanel.appendChild(configCard);

  main.appendChild(rightPanel);
  page.appendChild(main);

  // Initialize chart tabs
  const chartTabs = createTabs([
    { id: 'equity', label: 'Equity' },
    { id: 'drawdown', label: 'Drawdown' },
    { id: 'regime', label: 'Regimes' },
    { id: 'trades', label: 'Trades' },
  ]);
  chartPanel.querySelector('#chart-tabs')!.appendChild(chartTabs.container);

  // Render initial metrics
  renderValidationMetrics(validationCard.querySelector('#validation-metrics')!);
  renderCVChart(cvCard.querySelector('#cv-container')!);

  // Event handlers
  runBtn.addEventListener('click', () => {
    runBtn.textContent = 'Running...';
    runBtn.disabled = true;
    setTimeout(() => {
      runBtn.textContent = 'Run Backtest';
      runBtn.prepend(createIcon('chart', 16));
      runBtn.disabled = false;
      renderValidationMetrics(validationCard.querySelector('#validation-metrics')!);
      renderCVChart(cvCard.querySelector('#cv-container')!);
    }, 1500);
  });

  // Responsive
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 1200px) {
      main {
        grid-template-columns: 1fr !important;
      }
      .right-panel {
        grid-template-columns: 1fr 1fr !important;
      }
    }
    @media (max-width: 768px) {
      main {
        padding: var(--space-4);
        gap: var(--space-4);
      }
      .toolbar {
        flex-direction: column;
        align-items: stretch;
      }
      .toolbar > div:first-child {
        flex-direction: column;
        align-items: stretch;
      }
      .validation-card .metrics-grid {
        grid-template-columns: 1fr !important;
      }
    }
  `;
  document.head.appendChild(style);

  return page;
}

function renderValidationMetrics(container: HTMLElement) {
  const metrics = [
    { label: 'CPCV Sharpe', value: '1.84', status: 'good' },
    { label: 'Deflated Sharpe', value: '1.42', status: 'good' },
    { label: 'PBO p-value', value: '0.023', status: 'good' },
    { label: 'Max Drawdown', value: '-12.4%', status: 'warn' },
    { label: 'Total Return', value: '+247%', status: 'good' },
    { label: 'Win Rate', value: '54.2%', status: 'neutral' },
    { label: 'Profit Factor', value: '1.68', status: 'good' },
    { label: 'Avg Trade', value: '+0.31%', status: 'good' },
  ];

  container.innerHTML = metrics.map(m => `
    <div style="background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-md); padding: var(--space-3);">
      <div style="font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-subtle); margin-bottom: var(--space-1);">${m.label}</div>
      <div style="font-size: 1.125rem; font-weight: 600; color: var(--text-primary); font-family: var(--font-mono);">${m.value}</div>
    </div>
  `).join('');
}

function renderCVChart(container: HTMLElement) {
  // Simple SVG chart for CPCV paths
  const paths = 10;
  const points = 50;
  const width = container.clientWidth || 380;
  const height = 200;
  const padding = 20;

  let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="display: block;">`;
  
  // Grid lines
  for (let i = 0; i <= 4; i++) {
    const y = padding + (i / 4) * (height - 2 * padding);
    svg += `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="var(--border)" stroke-width="0.5"/>`;
  }

  // Generate mock paths
  for (let p = 0; p < paths; p++) {
    let isInSample = p < 6;
    const color = isInSample ? 'var(--accent)' : 'var(--success)';
    const opacity = isInSample ? '0.4' : '0.6';
    const strokeWidth = isInSample ? '1' : '1.5';
    
    let pathData = `M${padding},${height - padding}`;
    for (let i = 1; i <= points; i++) {
      const x = padding + (i / points) * (width - 2 * padding);
      const baseY = height - padding - (i / points) * (height - 2 * padding) * 0.7;
      const noise = (Math.sin(i * 0.5 + p) * 0.3 + Math.random() * 0.2 - 0.1) * (height - 2 * padding) * 0.15;
      const y = baseY + noise;
      pathData += ` L${x},${y}`;
    }
    
    svg += `<path d="${pathData}" stroke="${color}" stroke-width="${strokeWidth}" fill="none" opacity="${opacity}" stroke-linecap="round" stroke-linejoin="round"/>`;
  }

  // Mean path
  let meanPath = `M${padding},${height - padding}`;
  for (let i = 1; i <= points; i++) {
    const x = padding + (i / points) * (width - 2 * padding);
    const y = height - padding - (i / points) * (height - 2 * padding) * 0.7;
    meanPath += ` L${x},${y}`;
  }
  svg += `<path d="${meanPath}" stroke="var(--text-primary)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;

  svg += '</svg>';
  container.innerHTML = svg;
}