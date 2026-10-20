import { createTable, createSelect, createButton, createBadge, createIcon, createToast } from '../components/UI';

export function renderTrust(): HTMLDivElement {
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
  header.setAttribute('aria-label', 'Trust center header');
  header.style.cssText = 'padding: var(--space-12) 0 var(--space-8);';
  const h1 = document.createElement('h1');
  h1.textContent = 'Trust Center';
  h1.style.cssText = 'font-size: 2.25rem; font-weight: 600; letter-spacing: -0.03em; color: var(--text-primary);';
  const sub = document.createElement('p');
  sub.textContent = 'Every strategy that has run through Valora, with its full validation verdict.';
  sub.style.cssText = 'margin-top: var(--space-2); font-size: 0.9375rem; color: var(--text-secondary);';
  header.appendChild(h1);
  header.appendChild(sub);

  // ── Toolbar ──
  const toolbar = document.createElement('div');
  toolbar.style.cssText = 'display: flex; gap: var(--space-3); align-items: center; flex-wrap: wrap;';

  const statusFilter = createSelect([
    { value: 'all', label: 'All statuses' },
    { value: 'passed', label: 'Passed' },
    { value: 'failed', label: 'Failed' },
    { value: 'conditional', label: 'Conditional' },
  ]);
  statusFilter.style.width = '140px';

  const venueFilter = createSelect([
    { value: 'all', label: 'All venues' },
    { value: 'binance', label: 'Binance' },
    { value: 'okx', label: 'OKX' },
    { value: 'bybit', label: 'Bybit' },
    { value: 'coinbase', label: 'Coinbase' },
  ]);
  venueFilter.style.width = '130px';

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Filter by strategy or symbol…';
  searchInput.style.cssText = `
    height: 34px;
    width: 260px;
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
  searchInput.addEventListener('focus', () => {
    searchInput.style.borderColor = 'var(--accent)';
    searchInput.style.boxShadow = '0 0 0 2px var(--focus)';
  });
  searchInput.addEventListener('blur', () => {
    searchInput.style.borderColor = 'var(--border)';
    searchInput.style.boxShadow = 'none';
  });

  const runBtn = createButton('primary', 'md');
  runBtn.textContent = 'Run new backtest';
  runBtn.appendChild(createIcon('upload', 14));
  runBtn.addEventListener('click', () => { window.location.href = '/backtest'; });

  toolbar.appendChild(statusFilter);
  toolbar.appendChild(venueFilter);
  toolbar.appendChild(searchInput);
  toolbar.appendChild(runBtn);

  // ── Trust table (dense) ──
  const tableWrap = document.createElement('div');
  tableWrap.style.cssText = 'margin-top: var(--space-6); background: var(--bg-elevated); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; flex: 1;';

  const table = createTable(
    ['Strategy', 'Symbol', 'Venue', 'Status', 'CPCV', 'DSR', 'PBO', 'Max DD', 'Actions'],
    [
      [
        '<span style="font-weight: 500; color: var(--text-primary);">MACD Trend Follow</span>',
        '<span style="font-family: var(--font-mono); font-size: 0.75rem;">BTC/USDT</span>',
        '<span style="font-family: var(--font-mono); font-size: 0.75rem;">Binance</span>',
        '<span class="status-badge" data-status="passed"></span>',
        '<span style="font-family: var(--font-mono); font-variant-numeric: tabular-nums;">2.15</span>',
        '<span style="font-family: var(--font-mono); font-variant-numeric: tabular-nums;">1.78</span>',
        '<span style="font-family: var(--font-mono); font-variant-numeric: tabular-nums;">0.008</span>',
        '<span style="font-family: var(--font-mono); font-variant-numeric: tabular-nums; color: var(--danger);">-8.9%</span>',
        '',
      ],
      [
        '<span style="font-weight: 500; color: var(--text-primary);">Mean Reversion SPX</span>',
        '<span style="font-family: var(--font-mono); font-size: 0.75rem;">SPX</span>',
        '<span style="font-family: var(--font-mono); font-size: 0.75rem;">Coinbase</span>',
        '<span class="status-badge" data-status="failed"></span>',
        '<span style="font-family: var(--font-mono); font-variant-numeric: tabular-nums;">0.42</span>',
        '<span style="font-family: var(--font-mono); font-variant-numeric: tabular-nums;">0.11</span>',
        '<span style="font-family: var(--font-mono); font-variant-numeric: tabular-nums;">0.23</span>',
        '<span style="font-family: var(--font-mono); font-variant-numeric: tabular-nums; color: var(--danger);">-22.4%</span>',
        '',
      ],
      [
        '<span style="font-weight: 500; color: var(--text-primary);">Momentum Basket</span>',
        '<span style="font-family: var(--font-mono); font-size: 0.75rem;">ETH/USDT</span>',
        '<span style="font-family: var(--font-mono); font-size: 0.75rem;">OKX</span>',
        '<span class="status-badge" data-status="conditional"></span>',
        '<span style="font-family: var(--font-mono); font-variant-numeric: tabular-nums;">1.31</span>',
        '<span style="font-family: var(--font-mono); font-variant-numeric: tabular-nums;">0.94</span>',
        '<span style="font-family: var(--font-mono); font-variant-numeric: tabular-nums;">0.12</span>',
        '<span style="font-family: var(--font-mono); font-variant-numeric: tabular-nums; color: var(--danger);">-14.2%</span>',
        '',
      ],
    ],
    { striped: true, hoverable: true },
  );

  const tableStyle = document.createElement('style');
  tableStyle.textContent = `
    .status-badge { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 0.625rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; }
    .status-badge .dot { width: 5px; height: 5px; border-radius: 1px; }
    .status-badge[data-status="passed"] { color: var(--success); }
    .status-badge[data-status="passed"] .dot { background: var(--success); }
    .status-badge[data-status="failed"] { color: var(--danger); }
    .status-badge[data-status="failed"] .dot { background: var(--danger); }
    .status-badge[data-status="conditional"] { color: var(--warning); }
    .status-badge[data-status="conditional"] .dot { background: var(--warning); }
  `;
  document.head.appendChild(tableStyle);

  // Fill status badges and action buttons by row index
  const tbody = table.querySelector('tbody')!;
  const statuses = ['Passed', 'Failed', 'Conditional'];
  const rows = tbody.querySelectorAll('tr');
  rows.forEach((row, i) => {
    const badgeEl = row.querySelector('.status-badge') as HTMLElement | null;
    if (badgeEl) {
      const dot = document.createElement('span');
      dot.className = 'dot';
      badgeEl.appendChild(dot);
      badgeEl.appendChild(document.createTextNode(statuses[i]));
    }
    const actionsCell = row.querySelector<HTMLElement>('td:last-child')!;
    const actions = document.createElement('div');

    const viewBtn = createButton('ghost', 'sm');
    viewBtn.textContent = 'View';
    viewBtn.addEventListener('click', () => openTrustModal(i));

    const pdfBtn = createButton('secondary', 'sm');
    pdfBtn.textContent = 'PDF';
    pdfBtn.appendChild(createIcon('download', 12));
    pdfBtn.addEventListener('click', () => {
      createToast(`Preparing TR-2024-0010${i + 1} export…`, 'info');
    });

    actions.appendChild(viewBtn);
    actions.appendChild(pdfBtn);
    actions.style.cssText = 'display: flex; gap: var(--space-2);';
    actionsCell.textContent = '';
    actionsCell.appendChild(actions);
    actionsCell.style.cssText = 'white-space: nowrap; vertical-align: middle;';
  });

  tableWrap.appendChild(table);

  // ── Modal ──
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(7, 8, 9, 0.72);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: var(--space-6);
  `;
  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    background: var(--bg-elevated);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-lg);
    width: 100%;
    max-width: 640px;
    box-shadow: var(--shadow-lg);
    overflow: hidden;
  `;

  function openTrustModal(rowIndex: number) {
    const strategyNames = ['MACD Trend Follow — BTC/USDT', 'Mean Reversion SPX', 'Momentum Basket — ETH/USDT'];
    const status = statuses[rowIndex];
    const statusVariant = rowIndex === 0 ? 'success' : rowIndex === 1 ? 'danger' : 'warning';

    const mHead = document.createElement('div');
    mHead.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: var(--space-5); border-bottom: 1px solid var(--border);';
    const mTitle = document.createElement('div');
    mTitle.innerHTML = `<div style="font-size: 1rem; font-weight: 600; color: var(--text-primary);">${strategyNames[rowIndex]}</div><div style="font-family: var(--font-mono); font-size: 0.6875rem; color: var(--text-subtle); margin-top: 2px;">TR-2024-0010${rowIndex + 1} · ${new Date().getFullYear()}</div>`;
    mHead.appendChild(mTitle);
    mHead.appendChild(createBadge(status, statusVariant as 'success' | 'danger' | 'warning'));

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
    closeBtn.style.cssText = 'color: var(--text-subtle); padding: 6px; display: flex; align-items: center; margin-right: -6px;';
    closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
    mHead.appendChild(closeBtn);

    const mBody = document.createElement('div');
    mBody.style.cssText = 'padding: var(--space-5);';

    // Metrics rows
    const metricsData: [string, string, string][] = [
      ['CPCV Sharpe', '2.15', rowIndex === 0 ? 'var(--text-primary)' : 'var(--danger)'],
      ['Deflated Sharpe', '1.78', rowIndex === 0 ? 'var(--text-primary)' : 'var(--danger)'],
      ['PBO', '0.008', 'var(--text-primary)'],
      ['Max Drawdown', '-8.9%', 'var(--danger)'],
      ['Regime attribution', 'High-vol: PASS · Low-vol: FAIL', 'var(--text-secondary)'],
    ];
    metricsData.forEach(([label, value, color]) => {
      const rowEl = document.createElement('div');
      rowEl.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--border);';
      rowEl.innerHTML = `
        <span style="font-family: var(--font-mono); font-size: 0.6875rem; color: var(--text-muted); letter-spacing: 0.06em; text-transform: uppercase;">${label}</span>
        <span style="font-family: var(--font-mono); font-size: 0.8125rem; font-weight: 500; color: ${color}; font-variant-numeric: tabular-nums;">${value}</span>
      `;
      mBody.appendChild(rowEl);
    });

    // Regime breakdown
    const regimeTitle = document.createElement('div');
    regimeTitle.className = 'mono-label';
    regimeTitle.textContent = 'Regime attribution';
    regimeTitle.style.cssText += ' margin-top: var(--space-5); margin-bottom: var(--space-3);';
    mBody.appendChild(regimeTitle);

    const regimeGrid = document.createElement('div');
    regimeGrid.style.cssText = 'display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-3);';
    const regimes: [string, string, 'success' | 'danger' | 'warning'][] = [
      ['High volatility', rowIndex === 1 ? 'FAIL' : 'PASS', rowIndex === 1 ? 'danger' : 'success'],
      ['Low volatility', rowIndex === 0 ? 'PASS' : 'PASS', 'success'],
      ['Trending', rowIndex === 2 ? 'PASS' : 'PASS', 'success'],
    ];
    regimes.forEach(([name, verdict, variant]) => {
      const card = document.createElement('div');
      card.style.cssText = 'background: var(--bg-inset); border: 1px solid var(--border); border-radius: var(--radius-md); padding: var(--space-3);';
      card.innerHTML = `
        <div style="font-family: var(--font-mono); font-size: 0.625rem; color: var(--text-subtle); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 4px;">${name}</div>
        <div style="font-family: var(--font-mono); font-size: 0.875rem; font-weight: 600; color: var(--${variant === 'success' ? 'success' : variant === 'danger' ? 'danger' : 'warning'});">${verdict}</div>
      `;
      regimeGrid.appendChild(card);
    });
    mBody.appendChild(regimeGrid);

    // CV chart
    const cvLabel = document.createElement('div');
    cvLabel.className = 'mono-label';
    cvLabel.textContent = 'In-sample vs out-of-sample';
    cvLabel.style.cssText += ' margin-top: var(--space-5); margin-bottom: var(--space-3);';
    mBody.appendChild(cvLabel);

    const cvChart = document.createElement('div');
    cvChart.innerHTML = `<svg width="100%" height="120" viewBox="0 0 320 120" preserveAspectRatio="none">
      <line x1="0" y1="60" x2="320" y2="60" stroke="var(--border)" stroke-width="1"/>
      <polyline points="0,100 40,88 80,72 120,64 160,50 200,44 240,36 280,28 320,20" fill="none" stroke="var(--text-subtle)" stroke-width="1.5"/>
      <polyline points="160,50 180,54 200,48 220,56 240,44 260,52 280,38 300,46 320,34" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
      <line x1="160" y1="0" x2="160" y2="120" stroke="var(--border-strong)" stroke-width="1" stroke-dasharray="4 4"/>
    </svg>`;
    mBody.appendChild(cvChart);

    const legend = document.createElement('div');
    legend.style.cssText = 'display: flex; gap: var(--space-4); margin-top: var(--space-3);';
    const legendItems: [string, string][] = [
      ['In-sample', 'var(--text-subtle)'],
      ['Out-of-sample', 'var(--accent)'],
    ];
    legendItems.forEach(([label, color]) => {
      const item = document.createElement('span');
      item.innerHTML = `<span style="display: inline-block; width: 12px; height: 2px; background: ${color}; margin-right: 6px; vertical-align: middle;"></span><span style="font-family: var(--font-mono); font-size: 0.625rem; color: var(--text-muted); letter-spacing: 0.06em;">${label}</span>`;
      legend.appendChild(item);
    });
    mBody.appendChild(legend);

    modalContent.innerHTML = '';
    modalContent.appendChild(mHead);
    modalContent.appendChild(mBody);
    modal.style.display = 'flex';
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
  }

  // Move modal into page once
  modal.appendChild(modalContent);
  page.appendChild(header);
  page.appendChild(toolbar);
  page.appendChild(tableWrap);
  page.appendChild(modal);

  // Close modal on backdrop click
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  // ── Responsive ──
  const mq = window.matchMedia('(max-width: 720px)');
  const apply = (matches: boolean) => {
    if (matches) {
      tableWrap.style.overflowX = 'auto';
      table.style.minWidth = '960px';
    }
  };
  apply(mq.matches);
  mq.addEventListener('change', e => apply(e.matches));

  return page;
}
