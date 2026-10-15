import { createButton, createIcon } from '../components/UI.ts';

export async function createDocsPage(): Promise<HTMLElement> {
  const page = document.createElement('div');
  page.style.cssText = 'width: 100%; display: flex; flex-direction: column; min-height: calc(100vh - var(--header-height) - 280px);';

  // Hero
  const hero = document.createElement('section');
  hero.style.cssText = `padding: var(--space-20) var(--space-6) var(--space-12); text-align: center;`;
  hero.innerHTML = `
    <div class="container" style="max-width: 640px;">
      <h1 style="
        font-family: var(--font-sans);
        font-weight: 600;
        font-size: clamp(2rem, 4vw, 3rem);
        line-height: 1.1;
        letter-spacing: -0.02em;
        color: var(--text-primary);
        margin-bottom: var(--space-4);
      ">
        Documentation
      </h1>
      <p style="font-size: 1.125rem; color: var(--text-secondary); line-height: 1.6;">
        Everything you need to integrate, validate, and deploy with Valora.
      </p>
    </div>
  `;
  page.appendChild(hero);

  // Main content with sidebar
  const main = document.createElement('main');
  main.style.cssText = `
    flex: 1;
    padding: 0 var(--space-6) var(--space-20);
    max-width: var(--container-max);
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: var(--space-12);
    box-sizing: border-box;
  `;

  // Sidebar navigation
  const sidebar = document.createElement('aside');
  sidebar.style.cssText = `
    position: sticky;
    top: calc(var(--header-height) + var(--space-6));
    max-height: calc(100vh - var(--header-height) - var(--space-12));
    overflow-y: auto;
    padding-right: var(--space-6);
    border-right: 1px solid var(--border);
  `;
  
  const docSections = [
    { id: 'getting-started', title: 'Getting Started', items: ['Quickstart', 'Installation', 'Your first validation', 'Understanding Trust Reports'] },
    { id: 'engines', title: 'Engines', items: ['VectorBT PRO', 'NautilusTrader', 'Choosing an engine', 'Engine comparison'] },
    { id: 'validation', title: 'Validation Methods', items: ['CPCV', 'Deflated Sharpe Ratio', 'Probability of Backtest Overfitting', 'Walk-forward analysis', 'Regime detection'] },
    { id: 'data', title: 'Data', items: ['Supported venues', 'Timeframes & lookback', 'Data quality', 'Custom data upload'] },
    { id: 'api', title: 'API Reference', items: ['Authentication', 'REST endpoints', 'Webhooks', 'Rate limits', 'SDKs'] },
    { id: 'migration', title: 'Migration', items: ['From Pine Script', 'From Python', 'From YAML', 'Troubleshooting'] },
    { id: 'deployment', title: 'Deployment', items: ['Live trading', 'Risk management', 'Monitoring', 'Compliance'] },
  ];

  let sidebarHtml = '';
  docSections.forEach(section => {
    sidebarHtml += `
      <div style="margin-bottom: var(--space-6);">
        <h3 style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-subtle); margin-bottom: var(--space-3);">${section.title}</h3>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-1);">
          ${section.items.map((item, i) => `
            <li>
              <a href="#${section.id}-${i}" data-doc-link style="
                display: block;
                padding: var(--space-2) var(--space-3);
                font-size: 0.875rem;
                color: var(--text-secondary);
                border-radius: var(--radius-md);
                transition: all 0.15s ease;
              ">${item}</a>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  });
  sidebar.innerHTML = sidebarHtml;
  main.appendChild(sidebar);

  // Content area
  const content = document.createElement('div');
  content.style.cssText = `
    min-width: 0;
  `;

  // Quickstart content
  const quickstartContent = `
    <article style="max-width: 800px;">
      <header style="margin-bottom: var(--space-10);">
        <h1 style="
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: var(--space-4);
        ">Quickstart</h1>
        <p style="font-size: 1.125rem; color: var(--text-secondary); line-height: 1.6;">
          Get your first strategy validated in under 5 minutes.
        </p>
      </header>

      <section style="margin-bottom: var(--space-12);">
        <h2 style="font-size: 1.5rem; font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-4);">1. Create an account</h2>
        <p style="color: var(--text-secondary); margin-bottom: var(--space-4);">
          Sign up at <a href="/signup" data-link>valora.app</a>. The Free tier gives you 10 validations/month with no credit card required.
        </p>
      </section>

      <section style="margin-bottom: var(--space-12);">
        <h2 style="font-size: 1.5rem; font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-4);">2. Prepare your strategy</h2>
        <p style="color: var(--text-secondary); margin-bottom: var(--space-4);">
          Valora accepts strategies in multiple formats:
        </p>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-4);">
          <li style="display: flex; align-items: flex-start; gap: var(--space-3); padding: var(--space-4); background: var(--bg-elevated); border: 1px solid var(--border); border-radius: var(--radius-md);">
            ${createIcon('check', 20).outerHTML}
            <div>
              <div style="font-weight: 500; color: var(--text-primary);">Pine Script (.pine)</div>
              <div style="font-size: 0.875rem; color: var(--text-muted);">TradingView strategies — paste or upload</div>
            </div>
          </li>
          <li style="display: flex; align-items: flex-start; gap: var(--space-3); padding: var(--space-4); background: var(--bg-elevated); border: 1px solid var(--border); border-radius: var(--radius-md);">
            ${createIcon('check', 20).outerHTML}
            <div>
              <div style="font-weight: 500; color: var(--text-primary);">Python (.py)</div>
              <div style="font-size: 0.875rem; color: var(--text-muted);">VectorBT PRO or NautilusTrader strategies</div>
            </div>
          </li>
          <li style="display: flex; align-items: flex-start; gap: var(--space-3); padding: var(--space-4); background: var(--bg-elevated); border: 1px solid var(--border); border-radius: var(--radius-md);">
            ${createIcon('check', 20).outerHTML}
            <div>
              <div style="font-weight: 500; color: var(--text-primary);">YAML (.yaml/.yml)</div>
              <div style="font-size: 0.875rem; color: var(--text-muted);">Declarative strategy definitions</div>
            </div>
          </li>
        </ul>
      </section>

      <section style="margin-bottom: var(--space-12);">
        <h2 style="font-size: 1.5rem; font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-4);">3. Run your first validation</h2>
        <p style="color: var(--text-secondary); margin-bottom: var(--space-4);">
          Navigate to the <a href="/backtest" data-link>Backtest Dashboard</a>, select your strategy, pick a venue and timeframe, and click <strong>Run Backtest</strong>.
        </p>
        <div style="background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden;">
          <pre style="padding: var(--space-4); margin: 0; overflow-x: auto; font-family: var(--font-mono); font-size: 0.8125rem; line-height: 1.6; color: var(--text-primary);"><code># Example: Simple EMA Crossover in Python
import vectorbtpro as vbt

class EMACrossover:
    def run(self, close):
        fast = vbt.MA.run(close, window=9, ewm=True).ma
        slow = vbt.MA.run(close, window=21, ewm=True).ma
        entries = fast.vbt.crossed_above(slow)
        exits = fast.vbt.crossed_below(slow)
        return vbt.Portfolio.from_signals(close, entries, exits, fees=0.001)
</code></pre>
        </div>
      </section>

      <section style="margin-bottom: var(--space-12);">
        <h2 style="font-size: 1.5rem; font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-4);">4. Read the Trust Report</h2>
        <p style="color: var(--text-secondary); margin-bottom: var(--space-4);">
          Every validation generates a Trust Report with:
        </p>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-4);">
          ${[
            { icon: 'chart', title: 'CPCV Equity Paths', desc: 'In-sample vs out-of-sample performance across all folds' },
            { icon: 'shield', title: 'Deflated Sharpe Ratio', desc: 'Risk-adjusted return corrected for multiple testing' },
            { icon: 'chart', title: 'PBO p-value', desc: 'Probability your best result is statistical noise' },
            { icon: 'download', title: 'Regime Attribution', desc: 'Performance broken down by market regime' },
          ].map(item => `
            <div style="padding: var(--space-4); background: var(--bg-elevated); border: 1px solid var(--border); border-radius: var(--radius-md);">
              <div style="display: flex; align-items: flex-start; gap: var(--space-3);">
                <div style="width: 36px; height: 36px; border-radius: var(--radius-md); background: var(--accent-bg); display: flex; align-items: center; justify-content: center; color: var(--accent); flex-shrink: 0;">
                  ${createIcon(item.icon, 18).outerHTML}
                </div>
                <div>
                  <div style="font-weight: 600; color: var(--text-primary);">${item.title}</div>
                  <div style="font-size: 0.875rem; color: var(--text-muted);">${item.desc}</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <section style="margin-bottom: var(--space-12);">
        <h2 style="font-size: 1.5rem; font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-4);">5. Deploy or iterate</h2>
        <p style="color: var(--text-secondary); margin-bottom: var(--space-4);">
          If the report shows <span style="color: var(--success); font-weight: 500;">Passed</span>, you can export to NautilusTrader for live trading or push directly to your Valora workspace. If <span style="color: var(--warning); font-weight: 500;">Conditional</span> or <span style="color: var(--danger); font-weight: 500;">Failed</span>, adjust parameters and re-run.
        </p>
        <div style="display: flex; gap: var(--space-4); flex-wrap: wrap;">
          <a href="/backtest" data-link id="qs-backtest"></a>
          <a href="/migration" data-link id="qs-migration"></a>
        </div>
      </section>

      <hr style="border: none; border-top: 1px solid var(--border); margin: var(--space-16) 0;">
      
      <section>
        <h2 style="font-size: 1.5rem; font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-4);">Next steps</h2>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4);">
          <a href="#engines" data-doc-link style="padding: var(--space-6); background: var(--bg-elevated); border: 1px solid var(--border); border-radius: var(--radius-lg); text-decoration: none; color: inherit; transition: all 0.15s;">
            <div style="font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-2);">Choose an engine</div>
            <div style="font-size: 0.875rem; color: var(--text-muted);">VectorBT PRO vs NautilusTrader</div>
          </a>
          <a href="#validation" data-doc-link style="padding: var(--space-6); background: var(--bg-elevated); border: 1px solid var(--border); border-radius: var(--radius-lg); text-decoration: none; color: inherit; transition: all 0.15s;">
            <div style="font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-2);">Validation methods</div>
            <div style="font-size: 0.875rem; color: var(--text-muted);">CPCV, DSR, PBO explained</div>
          </a>
          <a href="#api" data-doc-link style="padding: var(--space-6); background: var(--bg-elevated); border: 1px solid var(--border); border-radius: var(--radius-lg); text-decoration: none; color: inherit; transition: all 0.15s;">
            <div style="font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-2);">API reference</div>
            <div style="font-size: 0.875rem; color: var(--text-muted);">Integrate Valora programmatically</div>
          </a>
        </div>
      </section>
    </article>
  `;

  content.innerHTML = quickstartContent;
  main.appendChild(content);
  page.appendChild(main);

  // Initialize CTA buttons
  const qsBacktest = content.querySelector('#qs-backtest');
  if (qsBacktest) {
    const btn = createButton('primary', 'md');
    btn.textContent = 'Open Backtest Dashboard';
    btn.prepend(createIcon('chart', 16));
    qsBacktest.appendChild(btn);
  }

  const qsMigration = content.querySelector('#qs-migration');
  if (qsMigration) {
    const btn = createButton('secondary', 'md');
    btn.textContent = 'Try Migration Wizard';
    btn.prepend(createIcon('upload', 16));
    qsMigration.appendChild(btn);
  }

  // Sidebar navigation handling
  const docLinks = content.querySelectorAll('a[data-doc-link]') as NodeListOf<HTMLAnchorElement>;
  docLinks.forEach((link: HTMLAnchorElement) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = (link as HTMLAnchorElement).getAttribute('href') || '';
      const targetId = href.replace('#', '');
      const target = content.querySelector(`#${targetId}`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Highlight active sidebar link on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        docLinks.forEach(link => {
          const href = link.getAttribute('href') || '';
          if (href.includes(id)) {
            link.style.background = 'var(--accent-bg)';
            link.style.color = 'var(--accent)';
            link.style.borderColor = 'var(--accent-border)';
          } else {
            link.style.background = '';
            link.style.color = 'var(--text-secondary)';
            link.style.borderColor = 'transparent';
          }
        });
      }
    });
  }, { rootMargin: '-20% 0px -80% 0px' });

  // Observe all sections with IDs
  setTimeout(() => {
    content.querySelectorAll('[id]').forEach(el => observer.observe(el));
  }, 100);

  // Responsive
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 1024px) {
      main {
        grid-template-columns: 1fr !important;
      }
      aside {
        position: static;
        max-height: none;
        border-right: none;
        border-bottom: 1px solid var(--border);
        padding: 0 0 var(--space-6);
        padding-right: 0;
      }
    }
    @media (max-width: 640px) {
      main { padding: 0 var(--space-4) var(--space-12); }
      .doc-nav { grid-template-columns: 1fr !important; }
    }
    a[data-doc-link]:hover {
      background: var(--bg-hover) !important;
      color: var(--text-primary) !important;
    }
  `;
  document.head.appendChild(style);

  return page;
}