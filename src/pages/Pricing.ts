import { createButton, createCard, createBadge } from '../components/UI.ts';

export async function createPricingPage(): Promise<HTMLElement> {
  const page = document.createElement('div');
  page.style.cssText = 'width: 100%;';

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
        Simple, transparent pricing
      </h1>
      <p style="font-size: 1.125rem; color: var(--text-secondary); line-height: 1.6;">
        Pay for validations, not seats. Every plan includes the full engine.
      </p>
    </div>
  `;
  page.appendChild(hero);

  // Billing Toggle
  const billingToggle = document.createElement('section');
  billingToggle.style.cssText = `padding: 0 var(--space-6) var(--space-12); text-align: center;`;
  billingToggle.innerHTML = `
    <div class="container" style="max-width: 400px; margin: 0 auto;">
      <div style="display: inline-flex; align-items: center; gap: var(--space-4); background: var(--bg-elevated); border: 1px solid var(--border); border-radius: var(--radius-pill); padding: var(--space-1);">
        <span id="monthly-label" style="font-weight: 500; color: var(--text-primary); cursor: pointer; padding: var(--space-2) var(--space-4); border-radius: var(--radius-pill);">Monthly</span>
        <span id="yearly-label" style="font-weight: 400; color: var(--text-muted); cursor: pointer; padding: var(--space-2) var(--space-4); border-radius: var(--radius-pill);">Yearly <span style="color: var(--success); font-size: 0.75rem; font-weight: 600;">Save 20%</span></span>
      </div>
    </div>
  `;
  page.appendChild(billingToggle);

  // Pricing Cards
  const pricing = document.createElement('section');
  pricing.style.cssText = `padding: 0 var(--space-6) var(--space-20);`;
  pricing.innerHTML = `
    <div class="container">
      <div class="pricing-grid" style="
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-6);
        align-items: start;
      "></div>
    </div>
  `;

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'For hobbyists and learning',
      validations: 10,
      features: [
        '10 validations/month',
        'VectorBT PRO engine',
        'CPCV + DSR + PBO',
        '1-year lookback data',
        'PDF trust reports',
        'Community support',
      ],
      cta: 'Start free',
      popular: false,
    },
    {
      name: 'Pro',
      price: { monthly: 49, yearly: 39 },
      description: 'For serious independent traders',
      validations: 500,
      features: [
        '500 validations/month',
        'VectorBT PRO + NautilusTrader',
        'Walk-forward + regime detection',
        '5-year tick data access',
        'Custom report branding',
        'Priority email support',
        'API access',
      ],
      cta: 'Get Pro',
      popular: true,
    },
    {
      name: 'Team',
      price: { monthly: 199, yearly: 159 },
      description: 'For quant teams and funds',
      validations: 'Unlimited',
      features: [
        'Unlimited validations',
        'Dedicated compute workers',
        '10-year institutional data',
        'SSO + audit logs',
        'Custom validation pipelines',
        'Dedicated Slack channel',
        'SLA & compliance reports',
      ],
      cta: 'Contact sales',
      popular: false,
    },
  ];

  let isYearly = false;
  const pricingGrid = pricing.querySelector('.pricing-grid')!;
  const monthlyLabel = billingToggle.querySelector('#monthly-label') as HTMLElement;
  const yearlyLabel = billingToggle.querySelector('#yearly-label') as HTMLElement;

  function renderCards() {
    pricingGrid.innerHTML = '';
    plans.forEach(plan => {
      const card = createCard(plan.popular);
      if (plan.popular) {
        card.style.borderColor = 'var(--accent-border)';
        card.style.boxShadow = 'var(--shadow-lg), 0 0 0 1px var(--accent-border)';
      }
      card.style.padding = 'var(--space-6)';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.height = '100%';

      const price = isYearly ? plan.price.yearly : plan.price.monthly;
      const period = isYearly ? '/year' : '/month';

      let priceHtml = '';
      if (price === 0) {
        priceHtml = `<div style="font-size: 3rem; font-weight: 600; color: var(--text-primary); line-height: 1;">Free</div>`;
      } else {
        priceHtml = `<div style="display: flex; align-items: baseline; gap: var(--space-1); margin-bottom: var(--space-1);">
          <span style="font-size: 3rem; font-weight: 600; color: var(--text-primary); line-height: 1;">$${price}</span>
          <span style="font-size: 1rem; color: var(--text-muted);">${period}</span>
        </div>`;
      }

      card.innerHTML = `
        ${plan.popular ? `<div style="text-align: center; margin-bottom: var(--space-4);">${createBadge('Most popular', 'accent').outerHTML}</div>` : ''}
        <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-1);">${plan.name}</h3>
        <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: var(--space-4);">${plan.description}</p>
        ${priceHtml}
        <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-6); flex: 1;">
          ${plan.features.map(f => `
            <li style="display: flex; align-items: flex-start; gap: var(--space-3); color: var(--text-secondary); font-size: 0.875rem; line-height: 1.5;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; margin-top: 2px;"><path d="M20 6L9 17l-5-5"/></svg>
              ${f}
            </li>
          `).join('')}
        </ul>
        <div id="plan-cta-${plan.name}"></div>
      `;

      const ctaBtn = createButton(plan.popular ? 'primary' : 'secondary', 'lg');
      ctaBtn.textContent = plan.cta;
      ctaBtn.style.width = '100%';
      card.querySelector(`#plan-cta-${plan.name}`)!.appendChild(ctaBtn);

      pricingGrid.appendChild(card);
    });
  }

  monthlyLabel.addEventListener('click', () => {
    if (!isYearly) return;
    isYearly = false;
    monthlyLabel.style.fontWeight = '500';
    monthlyLabel.style.color = 'var(--text-primary)';
    yearlyLabel.style.fontWeight = '400';
    yearlyLabel.style.color = 'var(--text-muted)';
    renderCards();
  });

  yearlyLabel.addEventListener('click', () => {
    if (isYearly) return;
    isYearly = true;
    monthlyLabel.style.fontWeight = '400';
    monthlyLabel.style.color = 'var(--text-muted)';
    yearlyLabel.style.fontWeight = '500';
    yearlyLabel.style.color = 'var(--text-primary)';
    renderCards();
  });

  renderCards();
  page.appendChild(pricing);

  // FAQ
  const faq = document.createElement('section');
  faq.style.cssText = `padding: var(--space-20) var(--space-6); background: var(--bg-elevated);`;
  faq.innerHTML = `
    <div class="container" style="max-width: 800px;">
      <h2 style="
        font-family: var(--font-sans);
        font-weight: 600;
        font-size: clamp(1.5rem, 3vw, 2rem);
        text-align: center;
        color: var(--text-primary);
        margin-bottom: var(--space-12);
      ">
        Common questions
      </h2>
      <div class="faq-grid" style="display: flex; flex-direction: column; gap: var(--space-4);"></div>
    </div>
  `;

  const faqs = [
    { q: 'What counts as a validation?', a: 'One backtest run with CPCV, DSR, and PBO checks. A parameter sweep of 50 configs counts as 50 validations.' },
    { q: 'Can I upgrade or downgrade anytime?', a: 'Yes. Upgrades take effect immediately. Downgrades apply at the next billing cycle.' },
    { q: 'What data is included?', a: 'Free gets 1 year of 1m OHLCV from major venues. Pro gets 5 years of tick data. Team gets 10 years of institutional-grade data.' },
    { q: 'Do you offer a trial?', a: 'The Free plan is effectively a forever trial. No card, no time limit, 10 validations/month.' },
    { q: 'What is VectorBT PRO vs NautilusTrader?', a: 'VectorBT PRO is vectorized for research speed. NautilusTrader is event-driven for production fidelity. Pro and Team plans include both.' },
    { q: 'How does the Trust Report work?', a: 'Every validation generates a one-page PDF: CPCV equity paths, DSR value, PBO p-value, regime attribution, and a go/no-go verdict. Ready to share with allocators.' },
  ];

  const faqGrid = faq.querySelector('.faq-grid')!;
  faqs.forEach(faqItem => {
    const item = document.createElement('details');
    item.style.cssText = `
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      overflow: hidden;
    `;
    item.innerHTML = `
      <summary style="
        padding: var(--space-4) var(--space-5);
        font-weight: 500;
        color: var(--text-primary);
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        list-style: none;
      ">
        ${faqItem.q}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; transition: transform 0.2s;">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </summary>
      <div style="padding: 0 var(--space-5) var(--space-4); color: var(--text-secondary); line-height: 1.6; border-top: 1px solid var(--border);">${faqItem.a}</div>
    `;
    const summary = item.querySelector('summary')!;
    const icon = summary.querySelector('svg')!;
    item.addEventListener('toggle', () => {
      icon.style.transform = item.open ? 'rotate(180deg)' : 'rotate(0deg)';
    });
    faqGrid.appendChild(item);
  });

  page.appendChild(faq);

  // Responsive
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 1024px) {
      .pricing-grid { grid-template-columns: 1fr 1fr !important; }
    }
    @media (max-width: 640px) {
      .pricing-grid { grid-template-columns: 1fr !important; }
    }
  `;
  document.head.appendChild(style);

  return page;
}