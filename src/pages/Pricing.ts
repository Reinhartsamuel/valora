import { createButton, createIcon } from '../components/UI';

export function renderPricing(): HTMLDivElement {
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
  header.setAttribute('aria-label', 'Pricing header');
  header.style.cssText = 'text-align: center; padding: var(--space-16) 0 var(--space-10);';
  const kicker = document.createElement('div');
  kicker.className = 'section-kicker';
  kicker.textContent = 'Pricing';
  kicker.style.cssText += ' margin-bottom: var(--space-4);';
  const h1 = document.createElement('h1');
  h1.textContent = 'Pricing';
  h1.style.cssText = 'font-size: 2.75rem; font-weight: 600; letter-spacing: -0.03em; color: var(--text-primary);';
  const sub = document.createElement('p');
  sub.textContent = 'Flat rates. No per-seat games. Every plan includes the full validation suite.';
  sub.style.cssText = 'margin-top: var(--space-4); font-size: 1rem; color: var(--text-secondary);';
  header.appendChild(kicker);
  header.appendChild(h1);
  header.appendChild(sub);

  // ── Billing toggle ──
  const billingToggle = document.createElement('div');
  billingToggle.style.cssText = 'display: flex; align-items: center; justify-content: center; gap: var(--space-3); margin-bottom: var(--space-12);';
  const annualLabel = document.createElement('span');
  annualLabel.textContent = 'Annual';
  annualLabel.style.cssText = 'font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-primary);';
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.setAttribute('aria-label', 'Toggle billing period');
  toggle.style.cssText = `
    width: 44px;
    height: 24px;
    border-radius: var(--radius-pill);
    background: var(--bg-hover);
    border: 1px solid var(--border-strong);
    position: relative;
    transition: background 0.15s ease;
  `;
  const knob = document.createElement('span');
  knob.style.cssText = `
    position: absolute;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    border-radius: var(--radius-pill);
    background: var(--text-primary);
    transition: transform 0.15s ease;
  `;
  toggle.appendChild(knob);
  const monthlyLabel = document.createElement('span');
  monthlyLabel.textContent = 'Monthly';
  monthlyLabel.style.cssText = 'font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);';
  billingToggle.appendChild(annualLabel);
  billingToggle.appendChild(toggle);
  billingToggle.appendChild(monthlyLabel);

  // ── Plans ──
  const plansSection = document.createElement('section');
  plansSection.setAttribute('aria-label', 'Plans');
  plansSection.style.cssText = 'flex: 1;';
  const plansGrid = document.createElement('div');
  plansGrid.style.cssText = 'display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-5);';

  interface Plan {
    name: string;
    priceMonthly: number;
    priceAnnual: number;
    desc: string;
    features: string[];
    cta: string;
    popular: boolean;
  }

  const plans: Plan[] = [
    {
      name: 'Solo',
      priceMonthly: 49,
      priceAnnual: 39,
      desc: 'For individual developers validating their first strategies.',
      features: [
        '5 active strategies',
        'CPCV + DSR + PBO suite',
        '1 venue: Binance',
        '30 days of market data',
        'Email support',
      ],
      cta: 'Start free',
      popular: false,
    },
    {
      name: 'Fund',
      priceMonthly: 199,
      priceAnnual: 159,
      desc: 'For small funds and serious retail quant teams.',
      features: [
        '50 active strategies',
        'All validation metrics',
        '5 venues: Binance, OKX, Bybit, Coinbase, Kraken',
        '2 years of market data',
        'Regime attribution',
        'Priority support',
      ],
      cta: 'Start 14-day trial',
      popular: true,
    },
    {
      name: 'Institutional',
      priceMonthly: 1999,
      priceAnnual: 1599,
      desc: 'For funds, market makers, and prop desks.',
      features: [
        'Unlimited strategies',
        'All validation metrics',
        'All venues + custom feeds',
        'Full market data history',
        'SLA + SSO/SAML',
        'Dedicated engineer',
        'API access',
      ],
      cta: 'Contact sales',
      popular: false,
    },
  ];

  let billing = 'annual';

  function renderPrice(plan: Plan): string {
    const price = billing === 'annual' ? plan.priceAnnual : plan.priceMonthly;
    return `${price}`;
  }

  function renderPeriod(): string {
    return billing === 'annual' ? '/mo · billed annually' : '/mo';
  }

  function renderPlans() {
    plansGrid.innerHTML = '';
    plans.forEach(plan => {
      const card = document.createElement('div');
      card.style.cssText = `
        position: relative;
        background: var(--bg-elevated);
        border: 1px solid ${plan.popular ? 'var(--border-strong)' : 'var(--border)'};
        border-radius: var(--radius-lg);
        padding: var(--space-6);
        display: flex;
        flex-direction: column;
      `;

      if (plan.popular) {
        const badge = document.createElement('div');
        badge.textContent = 'Most popular';
        badge.style.cssText = `
          position: absolute;
          top: 0;
          right: var(--space-6);
          transform: translateY(-50%);
          background: var(--bg-elevated);
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-sm);
          padding: 3px 8px;
          font-family: var(--font-mono);
          font-size: 0.5625rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-secondary);
        `;
        card.appendChild(badge);
      }

      const name = document.createElement('div');
      name.textContent = plan.name;
      name.style.cssText = 'font-size: 0.9375rem; font-weight: 600; color: var(--text-primary);';

      const priceWrap = document.createElement('div');
      priceWrap.style.cssText = 'margin-top: var(--space-5); display: flex; align-items: baseline; gap: 4px;';
      const priceEl = document.createElement('span');
      priceEl.textContent = renderPrice(plan);
      priceEl.dataset.role = 'price';
      priceEl.dataset.plan = plan.name;
      priceEl.style.cssText = 'font-size: 2.5rem; font-weight: 600; letter-spacing: -0.03em; color: var(--text-primary); font-variant-numeric: tabular-nums;';
      const currencyEl = document.createElement('span');
      currencyEl.textContent = '$';
      currencyEl.style.cssText = 'font-size: 1.25rem; font-weight: 500; color: var(--text-muted);';
      const periodEl = document.createElement('span');
      periodEl.textContent = renderPeriod();
      periodEl.dataset.role = 'period';
      periodEl.dataset.plan = plan.name;
      periodEl.style.cssText = 'font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);';
      priceWrap.appendChild(currencyEl);
      priceWrap.appendChild(priceEl);
      priceWrap.appendChild(periodEl);

      const desc = document.createElement('p');
      desc.textContent = plan.desc;
      desc.style.cssText = 'margin-top: var(--space-3); font-size: 0.8125rem; color: var(--text-muted); line-height: 1.5;';

      const featuresList = document.createElement('ul');
      featuresList.style.cssText = 'list-style: none; margin-top: var(--space-6); display: flex; flex-direction: column; gap: var(--space-3); flex: 1;';
      plan.features.forEach(f => {
        const li = document.createElement('li');
        li.style.cssText = 'display: flex; align-items: flex-start; gap: 10px; font-size: 0.8125rem; color: var(--text-secondary);';
        const check = createIcon('check', 14);
        check.style.cssText = 'color: var(--text-subtle); flex-shrink: 0; margin-top: 3px;';
        li.appendChild(check);
        const span = document.createElement('span');
        span.textContent = f;
        li.appendChild(span);
        featuresList.appendChild(li);
      });

      const btn = createButton(plan.popular ? 'primary' : 'secondary', 'md');
      btn.textContent = plan.cta;
      btn.style.marginTop = 'var(--space-8)';
      btn.addEventListener('click', () => {
        window.location.href = plan.name === 'Institutional' ? '/contact-sales' : '/register';
      });

      card.appendChild(name);
      card.appendChild(priceWrap);
      card.appendChild(desc);
      card.appendChild(featuresList);
      card.appendChild(btn);
      plansGrid.appendChild(card);
    });
  }

  renderPlans();

  toggle.addEventListener('click', () => {
    billing = billing === 'annual' ? 'monthly' : 'annual';
    knob.style.transform = billing === 'annual' ? 'translateX(0)' : 'translateX(20px)';
    annualLabel.style.color = billing === 'annual' ? 'var(--text-primary)' : 'var(--text-muted)';
    monthlyLabel.style.color = billing === 'monthly' ? 'var(--text-primary)' : 'var(--text-muted)';
    plansGrid.querySelectorAll<HTMLElement>('[data-plan]').forEach(el => {
      const plan = plans.find(p => p.name === el.dataset.plan);
      if (!plan) return;
      el.textContent = el.dataset.role === 'period' ? renderPeriod() : renderPrice(plan);
    });
  });

  plansSection.appendChild(plansGrid);

  // ── FAQ ──
  const faq = document.createElement('section');
  faq.setAttribute('aria-label', 'Frequently asked questions');
  faq.style.cssText = 'padding: var(--space-16) 0 var(--space-8);';
  const faqTitle = document.createElement('h2');
  faqTitle.textContent = 'Frequently asked questions';
  faqTitle.style.cssText = 'font-size: 1.5rem; font-weight: 600; letter-spacing: -0.02em; text-align: center; margin-bottom: var(--space-8); color: var(--text-primary);';

  const faqs: [string, string][] = [
    ['Do I need to be a VectorBT expert?', 'No. Valora ships with templates for common strategy types — trend following, mean reversion, momentum. You paste your logic, or start from a template and tune parameters.'],
    ['What venues are supported?', 'Binance, OKX, Bybit, Coinbase, and Kraken on the Fund plan. Institutional plans add custom venue feeds and institutional-grade market data.'],
    ['Can I export the trust report?', 'Yes. Every report is available as a signed PDF and JSON with full metric detail, dataset hashes, and code revision.'],
    ['What if my strategy fails?', 'That is the point. A failing report tells you exactly which regime, cost structure, or resampling method broke — so you can fix it before losing real money.'],
  ];

  const faqList = document.createElement('div');
  faqList.style.cssText = 'display: flex; flex-direction: column; gap: 0; max-width: 720px; margin: 0 auto;';
  faqs.forEach(([q, a], i) => {
    const details = document.createElement('details');
    details.style.cssText = `
      border-top: ${i === 0 ? 'none' : '1px solid var(--border)'};
      border-bottom: 1px solid var(--border);
    `;
    const summary = document.createElement('summary');
    summary.textContent = q;
    summary.style.cssText = `
      list-style: none;
      cursor: pointer;
      padding: var(--space-4) var(--space-5);
      font-size: 0.9375rem;
      font-weight: 500;
      color: var(--text-primary);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-4);
    `;
    const chevron = document.createElement('span');
    chevron.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-subtle); transition: transform 0.15s ease;"><polyline points="6 9 12 15 18 9"/></svg>`;
    summary.appendChild(chevron);
    summary.addEventListener('click', e => {
      e.preventDefault();
      const open = !details.open;
      details.open = open;
      const chev = summary.querySelector('svg');
      if (chev) chev.style.transform = open ? 'rotate(180deg)' : 'none';
    });
    const answer = document.createElement('div');
    answer.textContent = a;
    answer.style.cssText = 'padding: 0 var(--space-5) var(--space-4); font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.65;';
    details.appendChild(summary);
    details.appendChild(answer);
    faqList.appendChild(details);
  });

  faq.appendChild(faqTitle);
  faq.appendChild(faqList);

  page.appendChild(header);
  page.appendChild(billingToggle);
  page.appendChild(plansSection);
  page.appendChild(faq);

  // Responsive
  const mq = window.matchMedia('(max-width: 860px)');
  const apply = (matches: boolean) => {
    plansGrid.style.gridTemplateColumns = matches ? '1fr' : 'repeat(3, 1fr)';
  };
  apply(mq.matches);
  mq.addEventListener('change', e => apply(e.matches));

  return page;
}
