export class Footer {
  element: HTMLElement;

  constructor() {
    this.element = this.buildFooter();
  }

  private buildFooter(): HTMLElement {
    const footer = document.createElement('div');
    footer.setAttribute('role', 'contentinfo');
  footer.style.cssText = `
    background: var(--bg-inset);
    border-top: 1px solid var(--border);
  `;

  const container = document.createElement('div');
  container.className = 'container';
  container.style.cssText = 'padding-top: var(--space-16); padding-bottom: var(--space-10);';

  const grid = document.createElement('div');
  grid.style.cssText = 'display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: var(--space-12);';

  // Brand column
  const brand = document.createElement('div');
  brand.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: var(--space-4);">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="color: var(--text-primary);" aria-hidden="true">
        <rect x="1.5" y="1.5" width="21" height="21" rx="5" stroke="currentColor" stroke-width="1.5"/>
        <path d="M7 8l5 8 5-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span style="font-size: 0.875rem; font-weight: 600; color: var(--text-primary); letter-spacing: -0.01em;">valora</span>
    </div>
    <p style="font-size: 0.8125rem; color: var(--text-muted); line-height: 1.6; max-width: 32ch; margin-bottom: var(--space-4);">
      Validation infrastructure for trading strategies. Prove your edge before you risk a dime.
    </p>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="width: 6px; height: 6px; border-radius: 1px; background: var(--success);"></span>
      <span style="font-family: var(--font-mono); font-size: 0.6875rem; color: var(--text-muted); letter-spacing: 0.06em;">ALL SYSTEMS OPERATIONAL</span>
    </div>
  `;

  const columns: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: 'Product',
      links: [
        { label: 'Pricing', href: '/pricing' },
        { label: 'Trust Center', href: '/trust' },
        { label: 'Backtest Runner', href: '/backtest' },
        { label: 'Migration', href: '/migration' },
      ],
    },
    {
      title: 'Developers',
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'API Reference', href: '/docs' },
        { label: 'Changelog', href: '/docs' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ];

  columns.forEach(col => {
    const colEl = document.createElement('div');
    const h = document.createElement('div');
    h.textContent = col.title;
    h.className = 'mono-label';
    h.style.marginBottom = 'var(--space-4)';
    colEl.appendChild(h);
    col.links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.label;
      a.style.cssText = `
        display: block;
        font-size: 0.8125rem;
        color: var(--text-secondary);
        padding: 4px 0;
        transition: color 0.15s ease;
      `;
      a.addEventListener('mouseenter', () => { a.style.color = 'var(--text-primary)'; });
      a.addEventListener('mouseleave', () => { a.style.color = 'var(--text-secondary)'; });
      colEl.appendChild(a);
    });
    grid.appendChild(colEl);
  });

  grid.appendChild(brand);

  const bottom = document.createElement('div');
  bottom.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--space-12);
    padding-top: var(--space-5);
    border-top: 1px solid var(--border);
  `;
  const copyright = document.createElement('span');
  copyright.textContent = '© 2026 Valora Labs, Inc. All rights reserved.';
  copyright.style.cssText = 'font-size: 0.75rem; color: var(--text-subtle); font-family: var(--font-mono);';

  const legal = document.createElement('div');
  legal.style.cssText = 'display: flex; gap: var(--space-5);';
  const legalLinks = [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Security', href: '/security' },
  ];
  legalLinks.forEach(l => {
    const a = document.createElement('a');
    a.href = l.href;
    a.textContent = l.label;
    a.style.cssText = 'font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);';
    a.addEventListener('mouseenter', () => { a.style.color = 'var(--text-primary)'; });
    a.addEventListener('mouseleave', () => { a.style.color = 'var(--text-muted)'; });
    legal.appendChild(a);
  });

  bottom.appendChild(copyright);
  bottom.appendChild(legal);

  container.appendChild(grid);
  container.appendChild(bottom);
  footer.appendChild(container);

  const mq = window.matchMedia('(max-width: 720px)');
  const apply = (matches: boolean) => {
    grid.style.gridTemplateColumns = matches ? '1fr 1fr' : '2fr 1fr 1fr 1fr';
    if (matches) grid.style.rowGap = 'var(--space-8)';
  };
  apply(mq.matches);
  mq.addEventListener('change', e => apply(e.matches));

  return footer;
  }
}
