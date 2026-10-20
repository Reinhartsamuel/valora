export function renderDocs(): HTMLDivElement {
  const page = document.createElement('div');
  page.style.cssText = `
    padding-top: 0;
    padding-bottom: 0;
    min-height: calc(100vh - var(--header-height) - 280px);
    display: flex;
    flex-direction: column;
  `;

  const layout = document.createElement('div');
  layout.className = 'container';
  layout.style.cssText = 'display: grid; grid-template-columns: 220px 1fr; gap: var(--space-12); padding-top: var(--space-12); padding-bottom: var(--space-16);';

  // ── Sidebar ──
  const sidebar = document.createElement('nav');
  sidebar.setAttribute('aria-label', 'Documentation');
  sidebar.style.cssText = 'align-self: start; position: sticky; top: calc(var(--header-height) + var(--space-6));';

  const groups: { title: string; links: { label: string; active?: boolean }[] }[] = [
    {
      title: 'Getting started',
      links: [
        { label: 'Introduction', active: true },
        { label: 'Quickstart' },
        { label: 'Strategy templates' },
      ],
    },
    {
      title: 'Validation',
      links: [
        { label: 'CPCV protocol' },
        { label: 'Deflated Sharpe' },
        { label: 'PBO' },
        { label: 'Regime attribution' },
      ],
    },
    {
      title: 'Reference',
      links: [
        { label: 'API' },
        { label: 'Webhooks' },
        { label: 'CLI' },
        { label: 'Data formats' },
      ],
    },
  ];

  groups.forEach(group => {
    const gLabel = document.createElement('div');
    gLabel.className = 'mono-label';
    gLabel.textContent = group.title;
    gLabel.style.cssText += ' margin-top: var(--space-6); margin-bottom: var(--space-2);';
    sidebar.appendChild(gLabel);
    group.links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.active ? '/docs' : '/docs';
      a.textContent = link.label;
      a.style.cssText = `
        display: block;
        font-size: 0.8125rem;
        color: ${link.active ? 'var(--text-primary)' : 'var(--text-secondary)'};
        background: ${link.active ? 'var(--bg-hover)' : 'transparent'};
        padding: 6px 10px;
        border-radius: var(--radius-md);
        transition: color 0.15s ease, background 0.15s ease;
      `;
      if (!link.active) {
        a.addEventListener('mouseenter', () => {
          a.style.color = 'var(--text-primary)';
          a.style.background = 'var(--bg-hover)';
        });
        a.addEventListener('mouseleave', () => {
          a.style.color = 'var(--text-secondary)';
          a.style.background = 'transparent';
        });
      } else {
        a.setAttribute('aria-current', 'page');
      }
      sidebar.appendChild(a);
    });
  });

  // ── Content ──
  const content = document.createElement('main');
  content.setAttribute('aria-label', 'Documentation content');
  content.style.cssText = 'max-width: 760px;';

  const kicker = document.createElement('div');
  kicker.className = 'section-kicker';
  kicker.textContent = 'Getting started';

  const h1 = document.createElement('h1');
  h1.textContent = 'Introduction';
  h1.style.cssText = 'font-size: 2.25rem; font-weight: 600; letter-spacing: -0.03em; color: var(--text-primary); margin-top: var(--space-4);';

  const lead = document.createElement('p');
  lead.textContent = 'Valora is a validation layer for trading strategies. You bring the logic; we bring the stress, the cost model, and the audit trail. This guide covers the full flow from strategy upload to signed trust report.';
  lead.style.cssText = 'margin-top: var(--space-4); font-size: 1rem; line-height: 1.7; color: var(--text-secondary);';

  content.appendChild(kicker);
  content.appendChild(h1);
  content.appendChild(lead);

  const h2 = (text: string) => {
    const el = document.createElement('h2');
    el.textContent = text;
    el.style.cssText = 'font-size: 1.25rem; font-weight: 600; letter-spacing: -0.02em; color: var(--text-primary); margin-top: var(--space-10); margin-bottom: var(--space-3);';
    return el;
  };

  const p = (text: string) => {
    const el = document.createElement('p');
    el.textContent = text;
    el.style.cssText = 'font-size: 0.9375rem; line-height: 1.7; color: var(--text-secondary); margin-bottom: var(--space-4);';
    return el;
  };

  content.appendChild(h2('What Valora checks'));
  content.appendChild(p(
    'Every run executes the full validation suite: combinatorial purged cross-validation with embargo and purge intervals, the Deflated Sharpe Ratio across all tested configurations, the Probability of Backtest Overfitting, regime attribution, and transaction-cost modeling calibrated to your venue and notional size.',
  ));

  content.appendChild(h2('Connecting a strategy'));
  content.appendChild(p('VectorBT and NautilusTrader strategies are supported out of the box. Pin the exact code revision you want validated — Valora records a hash of the file so the report is always reproducible.'));

  const codeBlock = document.createElement('pre');
  codeBlock.textContent = `valora run \\
  --strategy src/strategies/macd_trend.py \\
  --venue binance \\
  --bars 1h \\
  --from 2019-01-01 --to 2024-12-31 \\
  --capital 100000 \\
  --slippage 2.0 --commission 4.5`;
  codeBlock.style.cssText = `
    background: var(--bg-inset);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-5);
    overflow-x: auto;
    font-size: 0.8125rem;
    line-height: 1.7;
    color: var(--text-secondary);
    margin: 0 0 var(--space-6);
  `;
  const codeLabel = document.createElement('div');
  codeLabel.className = 'mono-label';
  codeLabel.textContent = 'cli';
  codeLabel.style.cssText += ' margin-bottom: var(--space-3);';
  content.appendChild(codeLabel);
  content.appendChild(codeBlock);

  content.appendChild(h2('Reading a trust report'));
  content.appendChild(p('Each report opens with a single verdict — PASS, FAIL, or CONDITIONAL — followed by per-regime attribution and the full metric table. A conditional verdict tells you exactly which regimes, cost structures, or resampling windows broke the strategy, so the fix is scoped, not guessed.'));

  // Feature table
  content.appendChild(h2('Metrics at a glance'));
  const metricsTable = document.createElement('table');
  metricsTable.style.cssText = 'width: 100%; border-collapse: collapse; font-size: 0.8125rem; margin-bottom: var(--space-8);';
  const metricRows: [string, string, string][] = [
    ['CPCV Sharpe', 'Out-of-sample Sharpe under purged combinatorial resampling.', '≥ 1.0'],
    ['Deflated Sharpe', 'Adjusts your best Sharpe for the number of attempts made.', '≥ 1.5'],
    ['PBO', 'Probability the in-sample edge is a statistical artifact.', '≤ 0.25'],
    ['Max DD', 'Worst peak-to-trough across all out-of-sample windows.', 'site-specific'],
  ];
  const thead = document.createElement('thead');
  const trHead = document.createElement('tr');
  ['Metric', 'What it measures', 'Typical target'].forEach(h => {
    const th = document.createElement('th');
    th.textContent = h;
    th.style.cssText = 'text-align: left; padding: 8px 12px; font-family: var(--font-mono); font-size: 0.625rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-subtle); border-bottom: 1px solid var(--border-strong);';
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  metricsTable.appendChild(thead);
  const tbody = document.createElement('tbody');
  metricRows.forEach(([metric, desc, target], i) => {
    const tr = document.createElement('tr');
    tr.style.cssText = 'border-bottom: 1px solid var(--border);';
    const c1 = document.createElement('td');
    c1.textContent = metric;
    c1.style.cssText = 'padding: 10px 12px; color: var(--text-primary); font-weight: 500;';
    const c2 = document.createElement('td');
    c2.textContent = desc;
    c2.style.cssText = 'padding: 10px 12px; color: var(--text-secondary);';
    const c3 = document.createElement('td');
    c3.textContent = target;
    c3.style.cssText = 'padding: 10px 12px; color: var(--text-muted); font-family: var(--font-mono); font-size: 0.75rem;';
    tr.appendChild(c1);
    tr.appendChild(c2);
    tr.appendChild(c3);
    tbody.appendChild(tr);
    void i;
  });
  metricsTable.appendChild(tbody);
  content.appendChild(metricsTable);

  // Next steps
  content.appendChild(h2('Next'));
  const nextGrid = document.createElement('div');
  nextGrid.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);';
  const nextItems: [string, string, string][] = [
    ['Quickstart', 'Validate a strategy in under 10 minutes, from a template.', '/docs'],
    ['CPCV protocol', 'The exact resampling scheme, embargo windows, and why they matter.', '/docs'],
    ['API reference', 'Everything the dashboard does, as endpoints.', '/docs'],
    ['Data formats', 'Accepted market-data schemas and venue feed specs.', '/docs'],
  ];
  nextItems.forEach(([title, desc, href]) => {
    const a = document.createElement('a');
    a.href = href;
    a.style.cssText = 'display: block; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: var(--space-5); transition: border-color 0.15s ease;';
    a.innerHTML = `
      <div style="font-size: 0.9375rem; font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">${title}</div>
      <div style="font-size: 0.8125rem; color: var(--text-muted); line-height: 1.5;">${desc}</div>
    `;
    a.addEventListener('mouseenter', () => { a.style.borderColor = 'var(--border-strong)'; });
    a.addEventListener('mouseleave', () => { a.style.borderColor = 'var(--border)'; });
    nextGrid.appendChild(a);
  });
  content.appendChild(nextGrid);

  layout.appendChild(sidebar);
  layout.appendChild(content);
  page.appendChild(layout);

  // Responsive
  const mq = window.matchMedia('(max-width: 860px)');
  const apply = (matches: boolean) => {
    layout.style.gridTemplateColumns = matches ? '1fr' : '220px 1fr';
    sidebar.style.position = matches ? 'static' : 'sticky';
    nextGrid.style.gridTemplateColumns = matches ? '1fr' : '1fr 1fr';
  };
  apply(mq.matches);
  mq.addEventListener('change', e => apply(e.matches));

  return page;
}
