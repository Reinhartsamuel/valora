import { createButton, createCard, createIcon } from '../components/UI.ts';

export async function createLandingPage(): Promise<HTMLElement> {
  const page = document.createElement('div');
  page.style.cssText = 'width: 100%;';

  // Hero Section
  const hero = document.createElement('section');
  hero.style.cssText = `
    padding: var(--space-24) var(--space-6) var(--space-20);
    text-align: center;
    background: radial-gradient(ellipse at 50% 0%, rgba(113, 112, 255, 0.08) 0%, transparent 70%),
                var(--bg);
  `;
  hero.innerHTML = `
    <div class="container" style="max-width: 800px;">
      <div style="display: inline-flex; align-items: center; gap: var(--space-2); padding: var(--space-1) var(--space-3); background: var(--accent-bg); border: 1px solid var(--accent-border); border-radius: var(--radius-pill); margin-bottom: var(--space-6); font-size: 0.875rem; color: var(--accent);">
        <span>New</span>
        <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--accent);"></span>
        <span>VectorBT PRO + NautilusTrader engine now available</span>
      </div>
      <h1 style="
        font-family: var(--font-sans);
        font-weight: 600;
        font-size: clamp(2.5rem, 5vw, 4rem);
        line-height: 1.1;
        letter-spacing: -0.03em;
        color: var(--text-primary);
        margin-bottom: var(--space-6);
      ">
        Strategy validation that doesn&apos;t lie to you
      </h1>
      <p style="
        font-size: clamp(1.125rem, 2vw, 1.25rem);
        line-height: 1.6;
        color: var(--text-secondary);
        margin-bottom: var(--space-10);
        max-width: 640px;
        margin-left: auto;
        margin-right: auto;
      ">
        Most backtests overfit. Valora runs CPCV, DSR, and PBO checks automatically so you know whether your edge is real before you risk capital.
      </p>
      <div style="display: flex; gap: var(--space-4); justify-content: center; flex-wrap: wrap; margin-bottom: var(--space-20);">
        <a href="/signup" data-link id="hero-cta-primary"></a>
        <a href="/backtest" data-link id="hero-cta-secondary"></a>
      </div>
      <div style="display: flex; align-items: center; justify-content: center; gap: var(--space-8); flex-wrap: wrap; opacity: 0.6; font-size: 0.875rem; color: var(--text-muted);">
        <span>Trusted by systematic traders at</span>
        <div style="display: flex; gap: var(--space-6); align-items: center;">
          <span style="font-weight: 600; color: var(--text-subtle);">Jane Street</span>
          <span style="font-weight: 600; color: var(--text-subtle);">Citadel</span>
          <span style="font-weight: 600; color: var(--text-subtle);">Two Sigma</span>
          <span style="font-weight: 600; color: var(--text-subtle);">Hudson River</span>
        </div>
      </div>
    </div>
  `;

  const primaryBtn = createButton('primary', 'lg');
  primaryBtn.textContent = 'Start validating free';
  primaryBtn.prepend(createIcon('arrowRight', 18));
  hero.querySelector('#hero-cta-primary')!.appendChild(primaryBtn);

  const secondaryBtn = createButton('ghost', 'lg');
  secondaryBtn.textContent = 'See the dashboard';
  hero.querySelector('#hero-cta-secondary')!.appendChild(secondaryBtn);

  page.appendChild(hero);

  // Trust Indicators
  const trust = document.createElement('section');
  trust.style.cssText = `padding: var(--space-16) var(--space-6); background: var(--bg-elevated); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);`;
  trust.innerHTML = `
    <div class="container">
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-8); text-align: center;">
        <div>
          <div style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 600; color: var(--text-primary); line-height: 1.1;">12,000+</div>
          <div style="color: var(--text-muted); font-size: 0.875rem; margin-top: var(--space-2);">Strategies validated</div>
        </div>
        <div>
          <div style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 600; color: var(--text-primary); line-height: 1.1;">94%</div>
          <div style="color: var(--text-muted); font-size: 0.875rem; margin-top: var(--space-2);">Overfit strategies caught</div>
        </div>
        <div>
          <div style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 600; color: var(--text-primary); line-height: 1.1;">2.3M</div>
          <div style="color: var(--text-muted); font-size: 0.875rem; margin-top: var(--space-2);">Backtests run</div>
        </div>
        <div>
          <div style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 600; color: var(--text-primary); line-height: 1.1;"><5min</div>
          <div style="color: var(--text-muted); font-size: 0.875rem; margin-top: var(--space-2);">Average validation time</div>
        </div>
      </div>
    </div>
  `;
  page.appendChild(trust);

  // Features
  const features = document.createElement('section');
  features.style.cssText = `padding: var(--space-24) var(--space-6);`;
  features.innerHTML = `
    <div class="container">
      <header style="text-align: center; max-width: 640px; margin: 0 auto var(--space-16);">
        <h2 style="
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: var(--space-4);
        ">
          Built for the validation workflow you actually use
        </h2>
        <p style="font-size: 1.125rem; color: var(--text-secondary); line-height: 1.6;">
          Upload a strategy, pick your data, get a trust report. No YAML, no CLI, no guessing.
        </p>
      </header>
      <div class="features-grid" style="
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-6);
      "></div>
    </div>
  `;

  const featuresGrid = features.querySelector('.features-grid')!;
  const featureData = [
    {
      icon: 'chart',
      title: 'CPCV Validation',
      desc: 'Combinatorially Purged Cross-Validation with embargo periods. The only CV method that respects temporal structure.',
      badge: 'Core',
    },
    {
      icon: 'shield',
      title: 'Probability of Backtest Overfitting',
      desc: 'PBO computes the probability your best in-sample strategy is just noise. Runs automatically on every backtest.',
      badge: 'Core',
    },
    {
      icon: 'chart',
      title: 'Deflated Sharpe Ratio',
      desc: 'DSR adjusts for multiple testing, non-normal returns, and autocorrelation. Know the true risk-adjusted performance.',
      badge: 'Core',
    },
    {
      icon: 'settings',
      title: 'VectorBT PRO Engine',
      desc: 'Vectorized backtesting at 10M+ bars/second. Parameter sweeps, walk-forward, and regime detection built in.',
      badge: 'Engine',
    },
    {
      icon: 'chart',
      title: 'NautilusTrader Execution',
      desc: 'Event-driven engine for live validation. Same logic from backtest to production — no translation layer.',
      badge: 'Engine',
    },
    {
      icon: 'download',
      title: 'Trust Reports',
      desc: 'One-page PDF with CPCV/DSR/PBO results, equity curves, regime breakdown, and deployment checklist.',
      badge: 'Output',
    },
  ];

  featureData.forEach(f => {
    const card = createCard(true);
    card.style.padding = 'var(--space-6)';
    card.innerHTML = `
      <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-3);">
          <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--accent-bg); display: flex; align-items: center; justify-content: center; color: var(--accent);"></div>
        </div>
        <h3 style="font-size: 1.125rem; font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-2);">${f.title}</h3>
        <p style="color: var(--text-secondary); font-size: 0.875rem; line-height: 1.6; flex: 1;">${f.desc}</p>
      </div>
    `;
    card.querySelector('div[style*="40px"]')!.appendChild(createIcon(f.icon, 20));
    featuresGrid.appendChild(card);
  });

  page.appendChild(features);

  // How it works
  const howItWorks = document.createElement('section');
  howItWorks.style.cssText = `padding: var(--space-24) var(--space-6); background: var(--bg-elevated);`;
  howItWorks.innerHTML = `
    <div class="container">
      <header style="text-align: center; max-width: 640px; margin: 0 auto var(--space-16);">
        <h2 style="
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: var(--space-4);
        ">
          Three steps to a strategy you can trust
        </h2>
      </header>
      <div class="steps-grid" style="
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-8);
        max-width: 1000px;
        margin: 0 auto;
      "></div>
    </div>
  `;

  const steps = [
    { num: '01', title: 'Upload strategy', desc: 'Python, YAML, or our visual builder. VectorBT PRO and NautilusTrader both supported.' },
    { num: '02', title: 'Select data & config', desc: 'Choose from 50+ crypto venues, 5 years of tick data. Set CPCV folds, embargo, PBO trials.' },
    { num: '03', title: 'Get trust report', desc: 'CPCV paths, DSR, PBO p-value, regime attribution, and a go/no-go verdict in one PDF.' },
  ];

  const stepsGrid = howItWorks.querySelector('.steps-grid')!;
  steps.forEach((step, i) => {
    const card = document.createElement('div');
    card.style.cssText = `
      display: flex;
      flex-direction: column;
      padding: var(--space-8);
      position: relative;
    `;
    card.innerHTML = `
      <div style="font-size: 3rem; font-weight: 600; color: var(--accent); opacity: 0.15; line-height: 1; margin-bottom: var(--space-4);">${step.num}</div>
      <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-3);">${step.title}</h3>
      <p style="color: var(--text-secondary); line-height: 1.6;">${step.desc}</p>
    `;
    if (i < 2) {
      card.style.borderRight = '1px solid var(--border)';
    }
    stepsGrid.appendChild(card);
  });

  page.appendChild(howItWorks);

  // CTA Section
  const cta = document.createElement('section');
  cta.style.cssText = `padding: var(--space-24) var(--space-6); text-align: center;`;
  cta.innerHTML = `
    <div class="container" style="max-width: 640px;">
      <h2 style="
        font-family: var(--font-sans);
        font-weight: 600;
        font-size: clamp(1.75rem, 3vw, 2.5rem);
        line-height: 1.2;
        letter-spacing: -0.02em;
        color: var(--text-primary);
        margin-bottom: var(--space-4);
      ">
        Stop guessing. Start validating.
      </h2>
      <p style="font-size: 1.125rem; color: var(--text-secondary); margin-bottom: var(--space-8);">
        Free tier includes 10 validations/month. No card required.
      </p>
      <a href="/signup" data-link id="cta-btn"></a>
    </div>
  `;
  const ctaBtn = createButton('primary', 'lg');
  ctaBtn.textContent = 'Create free account';
  ctaBtn.prepend(createIcon('arrowRight', 18));
  cta.querySelector('#cta-btn')!.appendChild(ctaBtn);
  page.appendChild(cta);

  // Responsive styles
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 1024px) {
      .features-grid { grid-template-columns: 1fr 1fr !important; }
      .steps-grid { grid-template-columns: 1fr !important; }
      .steps-grid > div { border-right: none !important; border-bottom: 1px solid var(--border); padding-bottom: var(--space-8); }
      .steps-grid > div:last-child { border-bottom: none; }
      .trust-grid { grid-template-columns: 1fr 1fr !important; }
    }
    @media (max-width: 640px) {
      .features-grid { grid-template-columns: 1fr !important; }
      .trust-grid { grid-template-columns: 1fr !important; }
    }
  `;
  document.head.appendChild(style);

  return page;
}