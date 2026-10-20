import { createButton, createCard, createIcon } from '../components/UI.ts';

export async function createLandingPage(): Promise<HTMLElement> {
  const page = document.createElement('div');
  page.style.cssText = 'width: 100%;';

  // ── Hero ───────────────────────────────────────────────────────────────
  const hero = document.createElement('section');
  hero.style.cssText = `
    position: relative;
    padding: calc(var(--header-height) + var(--space-24)) var(--space-6) var(--space-24);
    overflow: hidden;
  `;
  hero.innerHTML = `
    <div class="container" style="position: relative; z-index: 1;">
      <div style="max-width: 980px; margin: 0 auto; text-align: center; display: flex; flex-direction: column; align-items: center;">
        <div class="eyebrow" style="margin-bottom: var(--space-8);">
          <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 6px rgba(251, 191, 36, 0.12);"></span>
          Strategy Validation Engine
        </div>
        <h1 style="
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: clamp(3.5rem, 9vw, 8rem);
          line-height: 0.98;
          letter-spacing: -0.08em;
          color: var(--text-primary);
          margin-bottom: var(--space-8);
        ">
          Proof before profit
        </h1>
        <p style="
          font-size: clamp(1.125rem, 2vw, 1.375rem);
          line-height: 1.8;
          color: var(--text-secondary);
          margin-bottom: var(--space-10);
          max-width: 720px;
        ">
          Valora stress-tests every edge with Combinatorial Purged Cross-Validation, Deflated Sharpe Ratio and Probability of Backtest Overfitting. If it can't hold up out of sample, it won't make it past the gate.
        </p>
        <div style="display: flex; gap: var(--space-3); flex-wrap: wrap; justify-content: center; margin-bottom: var(--space-16);">
          <a href="/signup" data-link id="hero-cta-primary"></a>
          <a href="/backtest" data-link id="hero-cta-secondary"></a>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: var(--space-8); justify-content: center; font-family: var(--font-mono); font-size: 0.6875rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--text-subtle);">
          <span>CPCV</span>
          <span>•</span>
          <span>DSR</span>
          <span>•</span>
          <span>PBO</span>
          <span>•</span>
          <span>REGIME ATTRIBUTION</span>
        </div>
      </div>
    </div>
    <div aria-hidden="true" style="position: absolute; inset: 0; background: radial-gradient(60% 60% at 50% 0%, rgba(251, 191, 36, 0.14), transparent 70%); z-index: 0;"></div>
    <div aria-hidden="true" style="position: absolute; inset: auto 0 -40% 0; height: 60%; background: radial-gradient(60% 60% at 50% 100%, rgba(251, 191, 36, 0.08), transparent 70%); filter: blur(120px); opacity: 0.8;"></div>
  `;

  const primaryBtn = createButton('primary', 'lg');
  primaryBtn.textContent = 'Validate your strategy';
  primaryBtn.prepend(createIcon('arrowRight', 18));
  hero.querySelector('#hero-cta-primary')!.appendChild(primaryBtn);

  const secondaryBtn = createButton('secondary', 'lg');
  secondaryBtn.textContent = 'View trust report sample';
  hero.querySelector('#hero-cta-secondary')!.appendChild(secondaryBtn);

  page.appendChild(hero);

  // ── Trust strip ─────────────────────────────────────────────────────────
  const trust = document.createElement('section');
  trust.style.cssText = `
    padding: var(--space-8) var(--space-6);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.01) 0%, transparent 100%);
    backdrop-filter: blur(8px);
  `;
  trust.innerHTML = `
    <div class="container" style="display: flex; align-items: center; justify-content: space-between; gap: var(--space-8); flex-wrap: wrap;">
      <span class="section-kicker">Built for systematic trading</span>
      <div style="display: flex; gap: clamp(var(--space-6), 4vw, var(--space-12)); align-items: center; flex-wrap: wrap; justify-content: center;">
        <span style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 500; color: var(--text-subtle); letter-spacing: 0.4em;">JANE STREET</span>
        <span style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 500; color: var(--text-subtle); letter-spacing: 0.4em;">CITADEL</span>
        <span style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 500; color: var(--text-subtle); letter-spacing: 0.4em;">TWO SIGMA</span>
        <span style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 500; color: var(--text-subtle); letter-spacing: 0.4em;">FLOW TRADERS</span>
      </div>
    </div>
  `;
  page.appendChild(trust);

  // ── Stats ──────────────────────────────────────────────────────────────
  const stats = document.createElement('section');
  stats.style.cssText = `
    padding: var(--space-24) var(--space-6);
    border-bottom: 1px solid var(--border);
  `;
  stats.innerHTML = `
    <div class="container">
      <div class="stats-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-8);">
        <div style="display: flex; flex-direction: column; gap: var(--space-2);">
          <div class="num" style="font-size: clamp(2.5rem, 4vw, 3.25rem); font-weight: 600; letter-spacing: -0.06em; color: var(--text-primary); line-height: 1;">12,000+</div>
          <div class="mono-label">Strategies validated</div>
        </div>
        <div style="display: flex; flex-direction: column; gap: var(--space-2); border-left: 1px solid var(--border); padding-left: var(--space-8);">
          <div class="num" style="font-size: clamp(2.5rem, 4vw, 3.25rem); font-weight: 600; letter-spacing: -0.06em; color: var(--text-primary); line-height: 1;">94%</div>
          <div class="mono-label">False positives blocked</div>
        </div>
        <div style="display: flex; flex-direction: column; gap: var(--space-2); border-left: 1px solid var(--border); padding-left: var(--space-8);">
          <div class="num" style="font-size: clamp(2.5rem, 4vw, 3.25rem); font-weight: 600; letter-spacing: -0.06em; color: var(--text-primary); line-height: 1;">5.2B</div>
          <div class="mono-label">Bar samples processed</div>
        </div>
        <div style="display: flex; flex-direction: column; gap: var(--space-2); border-left: 1px solid var(--border); padding-left: var(--space-8);">
          <div class="num" style="font-size: clamp(2.5rem, 4vw, 3.25rem); font-weight: 600; letter-spacing: -0.06em; color: var(--text-primary); line-height: 1;">p < 0.05</div>
          <div class="mono-label">Statistical threshold enforced</div>
        </div>
      </div>
    </div>
  `;
  page.appendChild(stats);

  // ── Features ────────────────────────────────────────────────────────────
  const features = document.createElement('section');
  features.style.cssText = `
    padding: var(--space-32) var(--space-6);
    border-bottom: 1px solid var(--border);
  `;
  features.innerHTML = `
    <div class="container">
      <div style="display: flex; flex-direction: column; gap: var(--space-6); margin-bottom: var(--space-16); max-width: 880px;">
        <span class="section-kicker">Rigor by design</span>
        <h2 style="font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 600; letter-spacing: -0.08em; line-height: 0.98;">Validation that separates signal from noise</h2>
        <p style="font-size: clamp(1.0625rem, 1.6vw, 1.25rem); color: var(--text-secondary); max-width: 720px;">Every report is built to answer one question: would this edge survive the harshest, realistic test?</p>
      </div>
      <div class="features-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: var(--radius-xl); overflow: hidden;">
      </div>
    </div>
  `;
  page.appendChild(features);

  const featureCards = [
    { title: 'Combinatorial Purged CV', desc: 'Time-series aware splits with purge/embargo to kill lookahead. See the full distribution, not a single path.' },
    { title: 'Deflated Sharpe Ratio', desc: 'Account for trial counts and non-normal returns. Only strategies with defensible DSR make the grade.' },
    { title: 'Probability of Backtest Overfitting', desc: 'CSC/IS separation against a randomized trial set. Get a calibrated p-value on overfit risk.' },
    { title: 'Regime Attribution', desc: 'Decompose performance by volatility, trend and liquidity regimes. Know when it breaks.' },
    { title: 'VectorBT PRO Engine', desc: 'Vectorized, correct, and fast. 5 years of data in minutes with institutional-grade execution models.' },
    { title: 'Audit-ready Trust Report', desc: 'One PDF with every test, plot and verdict. Share with partners or keep in your research log.' },
  ];

  const grid = features.querySelector('.features-grid')!;
  featureCards.forEach((card) => {
    const el = document.createElement('article');
    el.style.cssText = `
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
      padding: clamp(var(--space-6), 4vw, var(--space-10));
      background: radial-gradient(140% 140% at 50% 0%, rgba(251, 191, 36, 0.08), transparent 60%), var(--bg-elevated);
    `;
    el.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <span class="mono-label">Validation</span>
        <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 10px rgba(251, 191, 36, 0.08);"></span>
      </div>
      <h3 style="font-size: 1.5rem; font-weight: 600; letter-spacing: -0.05em;">${card.title}</h3>
      <p style="color: var(--text-secondary); max-width: 320px;">${card.desc}</p>
    `;
    grid.appendChild(el);
  });

  // ── How it works ───────────────────────────────────────────────────────
  const howItWorks = document.createElement('section');
  howItWorks.style.cssText = `
    padding: var(--space-32) var(--space-6);
    border-bottom: 1px solid var(--border);
  `;
  howItWorks.innerHTML = `
    <div class="container">
      <div style="display: flex; flex-direction: column; gap: var(--space-6); margin-bottom: var(--space-16); max-width: 880px;">
        <span class="section-kicker">Three steps to certainty</span>
        <h2 style="font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 600; letter-spacing: -0.08em; line-height: 0.98;">From strategy to defensible proof</h2>
        <p style="font-size: clamp(1.0625rem, 1.6vw, 1.25rem); color: var(--text-secondary); max-width: 720px;">No YAML gymnastics. Upload your logic, run the gauntlet, get the answer in minutes.</p>
      </div>
      <div class="steps-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: var(--radius-xl); overflow: hidden;">
      </div>
    </div>
  `;
  page.appendChild(howItWorks);

  const steps = [
    { num: '01', title: 'Upload strategy', desc: 'Python, YAML, or our visual builder. VectorBT PRO and NautilusTrader both supported.' },
    { num: '02', title: 'Configure the gauntlet', desc: 'Choose venue and data, set CPCV folds, purge/embargo, PBO trials. Lock down every guardrail.' },
    { num: '03', title: 'Get your trust report', desc: 'Full distribution, DSR, PBO p-value, regime attribution, and an unambiguous GO/NO-GO verdict.' },
  ];

  const stepsGrid = howItWorks.querySelector('.steps-grid')!;
  steps.forEach((step, i) => {
    const card = document.createElement('article');
    card.style.cssText = `
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
      padding: clamp(var(--space-6), 4vw, var(--space-10));
      background: radial-gradient(140% 140% at 50% 0%, rgba(251, 191, 36, 0.08), transparent 60%), var(--bg-elevated);
    `;
    card.innerHTML = `
      <div style="display: flex; align-items: baseline; justify-content: space-between;">
        <div style="font-family: var(--font-mono); font-size: 0.875rem; font-weight: 600; color: var(--accent-text); letter-spacing: 0.4em;">${step.num}</div>
        ${i < 2 ? '' : ''}
      </div>
      <h3 style="font-size: 1.5rem; font-weight: 600; letter-spacing: -0.05em;">${step.title}</h3>
      <p style="color: var(--text-secondary); max-width: 320px;">${step.desc}</p>
    `;
    stepsGrid.appendChild(card);
  });

  page.appendChild(howItWorks);

  // ── CTA ─────────────────────────────────────────────────────────────────
  const cta = document.createElement('section');
  cta.style.cssText = `
    position: relative;
    padding: var(--space-32) var(--space-6);
    text-align: center;
    overflow: hidden;
  `;
  cta.innerHTML = `
    <div class="container" style="position: relative; z-index: 1; max-width: 880px;">
      <span class="section-kicker" style="margin-bottom: var(--space-8); display: inline-flex;">Stop guessing</span>
      <h2 style="
        font-family: var(--font-sans);
        font-weight: 600;
        font-size: clamp(3rem, 7vw, 6rem);
        line-height: 0.98;
        letter-spacing: -0.08em;
        color: var(--text-primary);
        margin-bottom: var(--space-8);
      ">
        Prove your edge before you risk a dime
      </h2>
      <p style="font-size: clamp(1.125rem, 2vw, 1.375rem); color: var(--text-secondary); margin-bottom: var(--space-12); max-width: 680px; margin-left: auto; margin-right: auto;">
        Free tier includes 10 validations/month. No card required. Just upload your strategy and see if it passes.
      </p>
      <a href="/signup" data-link id="cta-btn"></a>
    </div>
    <div aria-hidden="true" style="position: absolute; inset: auto 0 -50% 0; height: 80%; background: radial-gradient(60% 60% at 50% 100%, rgba(251, 191, 36, 0.16), transparent 70%); filter: blur(160px); opacity: 0.9;"></div>
  `;
  const ctaBtn = createButton('primary', 'lg');
  ctaBtn.textContent = 'Create free account';
  ctaBtn.prepend(createIcon('arrowRight', 18));
  cta.querySelector('#cta-btn')!.appendChild(ctaBtn);
  page.appendChild(cta);

  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 1024px) {
      .features-grid { grid-template-columns: 1fr 1fr !important; }
      .steps-grid { grid-template-columns: 1fr !important; }
      .stats-grid { grid-template-columns: 1fr 1fr !important; gap: var(--space-10) !important; }
      .stats-grid > div:nth-child(3) { border-left: none !important; padding-left: 0 !important; }
    }
    @media (max-width: 640px) {
      .features-grid { grid-template-columns: 1fr !important; }
      .stats-grid { grid-template-columns: 1fr !important; }
      .stats-grid > div { border-left: none !important; padding-left: 0 !important; padding-bottom: var(--space-6); border-bottom: 1px solid var(--border); }
      .stats-grid > div:last-child { border-bottom: none; }
    }
  `;
  document.head.appendChild(style);

  return page;
}
