import { createButton, createBadge, createIcon, createTable, createSelect } from '../components/UI.ts';

export async function createTrustPage(): Promise<HTMLElement> {
  const page = document.createElement('div');
  page.style.cssText = 'width: 100%; display: flex; flex-direction: column; min-height: calc(100vh - var(--header-height) - 280px);';

  // Header toolbar
  const toolbar = document.createElement('section');
  toolbar.style.cssText = `
    padding: var(--space-4) var(--space-6);
    border-bottom: 1px solid var(--border);
    background: var(--bg-elevated);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    flex-wrap: wrap;
  `;
  toolbar.innerHTML = `
    <div style="display: flex; align-items: center; gap: var(--space-4);">
      <h2 style="font-size: 1.125rem; font-weight: 600; color: var(--text-primary);">Trust Reports</h2>
      <div style="display: flex; align-items: center; gap: var(--space-2); background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 0 var(--space-3);" id="filter-status"></div>
      <div style="display: flex; align-items: center; gap: var(--space-2); background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 0 var(--space-3);" id="filter-date"></div>
    </div>
    <div style="display: flex; align-items: center; gap: var(--space-3);">
      <div id="new-report-btn"></div>
    </div>
  `;

  const statusFilter = createSelect([
    { value: 'all', label: 'All Status' },
    { value: 'passed', label: 'Passed' },
    { value: 'failed', label: 'Failed' },
    { value: 'conditional', label: 'Conditional' },
  ]);
  toolbar.querySelector('#filter-status')!.appendChild(statusFilter);

  const dateFilter = createSelect([
    { value: 'all', label: 'All Time' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
  ]);
  toolbar.querySelector('#filter-date')!.appendChild(dateFilter);

  const newReportBtn = createButton('primary', 'md');
  newReportBtn.textContent = 'Generate Report';
  newReportBtn.prepend(createIcon('chart', 16));
  toolbar.querySelector('#new-report-btn')!.appendChild(newReportBtn);

  page.appendChild(toolbar);

  // Report list
  const main = document.createElement('main');
  main.style.cssText = `
    flex: 1;
    padding: var(--space-6);
    max-width: var(--container-max);
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  `;

  const reports = [
    {
      id: 'tr-2024-001247',
      strategy: 'EMA Crossover BTC/USDT',
      venue: 'Binance',
      timeframe: '1h',
      status: 'passed',
      date: '2024-12-15',
      cpcvSharpe: 1.84,
      dsr: 1.42,
      pbo: 0.023,
      maxDD: -12.4,
      return: 247,
    },
    {
      id: 'tr-2024-001198',
      strategy: 'RSI Mean Reversion ETH/USDT',
      venue: 'Bybit',
      timeframe: '15m',
      status: 'conditional',
      date: '2024-12-10',
      cpcvSharpe: 1.12,
      dsr: 0.87,
      pbo: 0.187,
      maxDD: -28.3,
      return: 89,
    },
    {
      id: 'tr-2024-001156',
      strategy: 'BB Breakout SOL/USDT',
      venue: 'OKX',
      timeframe: '4h',
      status: 'failed',
      date: '2024-12-05',
      cpcvSharpe: 0.34,
      dsr: 0.12,
      pbo: 0.623,
      maxDD: -45.7,
      return: -12,
    },
    {
      id: 'tr-2024-001089',
      strategy: 'MACD Trend Follow BTC/USDT',
      venue: 'Coinbase',
      timeframe: '1d',
      status: 'passed',
      date: '2024-11-28',
      cpcvSharpe: 2.15,
      dsr: 1.78,
      pbo: 0.008,
      maxDD: -8.9,
      return: 312,
    },
    {
      id: 'tr-2024-001043',
      strategy: 'Custom: Volume-Weighted Momentum',
      venue: 'Kraken',
      timeframe: '1h',
      status: 'passed',
      date: '2024-11-22',
      cpcvSharpe: 1.67,
      dsr: 1.31,
      pbo: 0.041,
      maxDD: -15.2,
      return: 198,
    },
  ];

  const table = createTable(
    ['Report ID', 'Strategy', 'Venue', 'TF', 'Status', 'CPCV Sharpe', 'DSR', 'PBO', 'Max DD', 'Return', 'Date', 'Actions'],
    reports.map(r => [
      r.id,
      r.strategy,
      r.venue,
      r.timeframe,
      `<span class="badge-${r.status}"></span>`,
      r.cpcvSharpe.toFixed(2),
      r.dsr.toFixed(2),
      r.pbo.toFixed(3),
      `${r.maxDD}%`,
      `${r.return > 0 ? '+' : ''}${r.return}%`,
      r.date,
      '',
    ]),
    { striped: true, hoverable: true }
  );

  // Replace status cells with badges
  const tbody = table.querySelector('tbody')!;
  reports.forEach((r, i) => {
    const row = tbody.rows[i];
    const statusCell = row.cells[4];
    const actionsCell = row.cells[11];
    
    const badge = createBadge(
      r.status === 'passed' ? 'Passed' : r.status === 'failed' ? 'Failed' : 'Conditional',
      r.status === 'passed' ? 'success' : r.status === 'failed' ? 'danger' : 'warning'
    );
    statusCell.innerHTML = '';
    statusCell.appendChild(badge);

    const viewBtn = createButton('ghost', 'sm');
    viewBtn.textContent = 'View';
    viewBtn.prepend(createIcon('externalLink', 12));
    actionsCell.appendChild(viewBtn);

    const downloadBtn = createButton('ghost', 'sm');
    downloadBtn.textContent = 'PDF';
    downloadBtn.prepend(createIcon('download', 12));
    actionsCell.appendChild(downloadBtn);
  });

  main.appendChild(table);
  page.appendChild(main);

  // Report Detail Modal (hidden by default)
  const modal = document.createElement('div');
  modal.id = 'report-modal';
  modal.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    z-index: 1000;
    display: none;
    align-items: center;
    justify-content: center;
    padding: var(--space-6);
    overflow-y: auto;
  `;
  modal.innerHTML = `
    <div style="
      width: 100%;
      max-width: 900px;
      max-height: 90vh;
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-lg);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    ">
      <div style="
        padding: var(--space-5) var(--space-6);
        border-bottom: 1px solid var(--border);
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: var(--space-4);
      ">
        <div>
          <h3 id="modal-title" style="font-size: 1.125rem; font-weight: 600; color: var(--text-primary);"></h3>
          <p id="modal-meta" style="font-size: 0.8125rem; color: var(--text-muted); margin-top: var(--space-1);"></p>
        </div>
        <div style="display: flex; gap: var(--space-2);">
          <button id="modal-download" class="btn btn-secondary" style="display: flex; align-items: center; gap: var(--space-2); padding: var(--space-2) var(--space-4); font-size: 0.875rem; font-weight: 500; border-radius: var(--radius-md); background: var(--bg); color: var(--text-primary); border: 1px solid var(--border); cursor: pointer;">
            ${createIcon('download', 16).outerHTML} Download PDF
          </button>
          <button id="modal-close" style="width: 40px; height: 40px; border-radius: var(--radius-md); background: transparent; border: 1px solid var(--border); color: var(--text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center;">
            ${createIcon('x', 20).outerHTML}
          </button>
        </div>
      </div>
      <div id="modal-content" style="flex: 1; overflow-y: auto; padding: var(--space-6);"></div>
    </div>
  `;
  document.body.appendChild(modal);

  // Event handlers
  const viewButtons = table.querySelectorAll('button:has(svg):first-child');
  viewButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => openModal(reports[idx]));
  });

  modal.querySelector('#modal-close')!.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  function openModal(report: typeof reports[0]) {
    const statusLabel = report.status === 'passed' ? 'Passed' : report.status === 'failed' ? 'Failed' : 'Conditional';
    const statusVariant = report.status === 'passed' ? 'success' : report.status === 'failed' ? 'danger' : 'warning';
    
    modal.querySelector('#modal-title')!.textContent = report.strategy;
    modal.querySelector('#modal-meta')!.textContent = `${report.id} • ${report.venue} • ${report.timeframe} • ${report.date}`;
    
    modal.querySelector('#modal-content')!.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-6); margin-bottom: var(--space-8);">
        <div>
          <h4 style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-subtle); margin-bottom: var(--space-4);">Validation Results</h4>
          <div style="display: flex; flex-direction: column; gap: var(--space-3);">
            ${renderMetricRow('CPCV Sharpe Ratio', report.cpcvSharpe.toFixed(2), report.cpcvSharpe > 1 ? 'success' : 'warning')}
            ${renderMetricRow('Deflated Sharpe Ratio', report.dsr.toFixed(2), report.dsr > 1 ? 'success' : 'warning')}
            ${renderMetricRow('PBO p-value', report.pbo.toFixed(3), report.pbo < 0.05 ? 'success' : report.pbo < 0.2 ? 'warning' : 'danger')}
            ${renderMetricRow('Max Drawdown', `${report.maxDD}%`, report.maxDD > -20 ? 'success' : report.maxDD > -35 ? 'warning' : 'danger')}
            ${renderMetricRow('Total Return', `${report.return > 0 ? '+' : ''}${report.return}%`, report.return > 0 ? 'success' : 'danger')}
            ${renderMetricRow('Verdict', statusLabel, statusVariant)}
          </div>
        </div>
        <div>
          <h4 style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-subtle); margin-bottom: var(--space-4);">CPCV Equity Paths</h4>
          <div id="modal-cv-chart" style="height: 280px; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-md);"></div>
        </div>
      </div>
      
      <div style="border-top: 1px solid var(--border); padding-top: var(--space-6);">
        <h4 style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-subtle); margin-bottom: var(--space-4);">Regime Attribution</h4>
        <div id="modal-regime" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4);"></div>
      </div>

      <div style="border-top: 1px solid var(--border); padding-top: var(--space-6); margin-top: var(--space-6);">
        <h4 style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-subtle); margin-bottom: var(--space-4);">Trade Statistics</h4>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-4);">
          ${renderStatCard('Total Trades', '247')}
          ${renderStatCard('Win Rate', '54.2%')}
          ${renderStatCard('Profit Factor', '1.68')}
          ${renderStatCard('Avg Holding', '2.3 days')}
        </div>
      </div>
    `;

    renderModalCVChart(modal.querySelector('#modal-cv-chart')!);
    renderRegimeAttribution(modal.querySelector('#modal-regime')!);
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  function renderMetricRow(label: string, value: string, status: 'success' | 'warning' | 'danger') {
    const colors = { success: 'var(--success)', warning: 'var(--warning)', danger: 'var(--danger)' };
    return `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-3); background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-md);">
        <span style="color: var(--text-secondary); font-size: 0.875rem;">${label}</span>
        <div style="display: flex; align-items: center; gap: var(--space-2);">
          <span style="font-family: var(--font-mono); font-size: 1rem; font-weight: 600; color: var(--text-primary);">${value}</span>
          <span style="width: 8px; height: 8px; border-radius: 50%; background: ${colors[status]};"></span>
        </div>
      </div>
    `;
  }

  function renderStatCard(label: string, value: string) {
    return `
      <div style="background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-md); padding: var(--space-4); text-align: center;">
        <div style="font-family: var(--font-mono); font-size: 1.5rem; font-weight: 600; color: var(--text-primary);">${value}</div>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: var(--space-1);">${label}</div>
      </div>
    `;
  }

  function renderModalCVChart(container: HTMLElement) {
    const paths = 10;
    const points = 80;
    const width = 860;
    const height = 280;
    const padding = 30;

    let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="display: block;">`;
    
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i / 5) * (height - 2 * padding);
      svg += `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="var(--border)" stroke-width="0.5"/>`;
    }

    for (let p = 0; p < paths; p++) {
      let isInSample = p < 6;
      const color = isInSample ? 'var(--accent)' : 'var(--success)';
      const opacity = isInSample ? '0.35' : '0.55';
      const strokeWidth = isInSample ? '1' : '1.5';
      
      let pathData = `M${padding},${height - padding}`;
      for (let i = 1; i <= points; i++) {
        const x = padding + (i / points) * (width - 2 * padding);
        const baseY = height - padding - (i / points) * (height - 2 * padding) * 0.65;
        const noise = (Math.sin(i * 0.4 + p * 0.7) * 0.35 + Math.random() * 0.15 - 0.075) * (height - 2 * padding) * 0.18;
        const y = baseY + noise;
        pathData += ` L${x},${y}`;
      }
      svg += `<path d="${pathData}" stroke="${color}" stroke-width="${strokeWidth}" fill="none" opacity="${opacity}" stroke-linecap="round" stroke-linejoin="round"/>`;
    }

    let meanPath = `M${padding},${height - padding}`;
    for (let i = 1; i <= points; i++) {
      const x = padding + (i / points) * (width - 2 * padding);
      const y = height - padding - (i / points) * (height - 2 * padding) * 0.65;
      meanPath += ` L${x},${y}`;
    }
    svg += `<path d="${meanPath}" stroke="var(--text-primary)" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;

    svg += '</svg>';
    container.innerHTML = svg;
  }

  function renderRegimeAttribution(container: HTMLElement) {
    const regimes = [
      { name: 'Bull Trend', trades: 89, winRate: 62.9, avgReturn: '+1.8%', contribution: '+42.3%' },
      { name: 'Bear Trend', trades: 67, winRate: 41.8, avgReturn: '-0.9%', contribution: '-18.7%' },
      { name: 'Sideways', trades: 91, winRate: 52.7, avgReturn: '+0.3%', contribution: '+5.4%' },
    ];

    container.innerHTML = regimes.map(r => `
      <div style="background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-md); padding: var(--space-4);">
        <div style="font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-3);">${r.name}</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2) var(--space-3); font-size: 0.8125rem;">
          <span style="color: var(--text-muted);">Trades</span>
          <span style="color: var(--text-primary); font-family: var(--font-mono); font-weight: 500;">${r.trades}</span>
          <span style="color: var(--text-muted);">Win Rate</span>
          <span style="color: var(--text-primary); font-family: var(--font-mono); font-weight: 500;">${r.winRate}%</span>
          <span style="color: var(--text-muted);">Avg Return</span>
          <span style="color: var(--text-primary); font-family: var(--font-mono); font-weight: 500;">${r.avgReturn}</span>
          <span style="color: var(--text-muted);">Contribution</span>
          <span style="color: ${r.contribution.startsWith('+') ? 'var(--success)' : 'var(--danger)'}; font-family: var(--font-mono); font-weight: 500;">${r.contribution}</span>
        </div>
      </div>
    `).join('');
  }

  // Responsive
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 1024px) {
      main { padding: var(--space-4); }
      table { font-size: 0.8125rem; }
      th, td { padding: var(--space-2) var(--space-3) !important; }
    }
    @media (max-width: 768px) {
      #modal-content { padding: var(--space-4); }
      #modal-content > div:first-child { grid-template-columns: 1fr !important; }
      #modal-regime { grid-template-columns: 1fr !important; }
      .modal-stats { grid-template-columns: 1fr 1fr !important; }
    }
  `;
  document.head.appendChild(style);

  return page;
}