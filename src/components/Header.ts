export class Header {
  element: HTMLElement;
  private navLinks: { link: HTMLAnchorElement; path: string }[] = [];
  private mobileNavLinks: HTMLAnchorElement[] = [];
  private currentPath = '/';

  constructor() {
    this.element = this.buildHeader(document.location.pathname);
    window.addEventListener('routechange', e => {
      this.currentPath = (e as CustomEvent<string>).detail;
      this.updateActive();
    });
  }

  private buildHeader(activePath: string): HTMLElement {
    this.currentPath = activePath;
    const header = document.createElement('div');
    header.setAttribute('role', 'banner');
    header.style.cssText = `
      position: sticky;
      top: 0;
      z-index: 100;
      height: var(--header-height);
      display: flex;
      align-items: center;
      background: var(--bg);
      border-bottom: 1px solid var(--border);
    `;

    const container = document.createElement('div');
    container.className = 'container';
    container.style.cssText = 'display: flex; align-items: center; justify-content: space-between; height: 100%;';

    // Brand
    const brand = document.createElement('a');
    brand.href = '/';
    brand.setAttribute('data-link', '');
    brand.style.cssText = `display: flex; align-items: center; gap: 10px; color: var(--text-primary); text-decoration: none;`;
    brand.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="21" height="21" rx="5" stroke="currentColor" stroke-width="1.5"/>
        <path d="M7 8l5 8 5-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span style="font-size: 14px; font-weight: 600; letter-spacing: -0.01em;">valora</span>
    `;

    // Navigation
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Main navigation');
    nav.className = 'nav-desktop';
    nav.style.cssText = 'display: flex; align-items: center; gap: 2px;';

    const links: { path: string; label: string }[] = [
      { path: '/', label: 'Product' },
      { path: '/pricing', label: 'Pricing' },
      { path: '/trust', label: 'Trust Center' },
      { path: '/docs', label: 'Docs' },
      { path: '/migration', label: 'Migration' },
    ];

    this.navLinks = [];
    links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.path;
      a.setAttribute('data-link', '');
      a.textContent = link.label;
      a.style.cssText = `
        font-size: 0.8125rem;
        font-weight: 500;
        color: var(--text-secondary);
        padding: 6px 10px;
        border-radius: var(--radius-md);
        transition: color 0.15s ease, background 0.15s ease;
      `;
      const self = this;
      a.addEventListener('mouseenter', () => {
        a.style.color = 'var(--text-primary)';
        a.style.background = 'var(--bg-hover)';
      });
      a.addEventListener('mouseleave', () => {
        if (self.currentPath !== link.path) {
          a.style.color = 'var(--text-secondary)';
          a.style.background = 'transparent';
        }
      });
      nav.appendChild(a);
      this.navLinks.push({ link: a, path: link.path });
    });

    // Right side actions
    const actions = document.createElement('div');
    actions.style.cssText = 'display: flex; align-items: center; gap: 10px;';

    const signIn = document.createElement('a');
    signIn.href = '/signin';
    signIn.textContent = 'Sign in';
    signIn.style.cssText = `font-size: 0.8125rem; font-weight: 500; color: var(--text-secondary); transition: color 0.15s ease;`;
    signIn.addEventListener('mouseenter', () => { signIn.style.color = 'var(--text-primary)'; });
    signIn.addEventListener('mouseleave', () => { signIn.style.color = 'var(--text-secondary)'; });

    const cta = document.createElement('a');
    cta.href = '/register';
    cta.setAttribute('data-link', '');
    cta.textContent = 'Get started';
    cta.style.cssText = `
      display: inline-flex;
      align-items: center;
      height: 30px;
      padding: 0 14px;
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--ink-on-light);
      background: var(--text-primary);
      border-radius: var(--radius-md);
      transition: background 0.15s ease;
    `;
    cta.addEventListener('mouseenter', () => { cta.style.background = '#ffffff'; });
    cta.addEventListener('mouseleave', () => { cta.style.background = 'var(--text-primary)'; });

    actions.appendChild(signIn);
    actions.appendChild(cta);

    // Mobile menu button
    const menuBtn = document.createElement('button');
    menuBtn.type = 'button';
    menuBtn.setAttribute('aria-label', 'Toggle menu');
    menuBtn.style.cssText = `
      display: none;
      width: 34px;
      height: 34px;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-md);
      color: var(--text-secondary);
    `;
    menuBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    `;

    const mobileNav = document.createElement('div');
    mobileNav.style.cssText = `
      position: absolute;
      top: var(--header-height);
      left: 0;
      right: 0;
      background: var(--bg-elevated);
      border-bottom: 1px solid var(--border);
      padding: var(--space-4);
      display: none;
      flex-direction: column;
      gap: 2px;
      z-index: 99;
    `;
    this.mobileNavLinks = [];
    links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.path;
      a.setAttribute('data-link', '');
      a.textContent = link.label;
      a.style.cssText = `
        font-size: 0.9375rem;
        font-weight: 500;
        color: var(--text-secondary);
        padding: 10px 12px;
        border-radius: var(--radius-md);
      `;
      mobileNav.appendChild(a);
      this.mobileNavLinks.push(a);
    });
    const mobileActions = document.createElement('div');
    mobileActions.style.cssText = 'display: flex; gap: var(--space-3); padding: var(--space-3) 12px 0;';
    const mobileSignIn = document.createElement('a');
    mobileSignIn.href = '/signin';
    mobileSignIn.textContent = 'Sign in';
    mobileSignIn.style.cssText = 'font-size: 0.875rem; font-weight: 500; color: var(--text-secondary);';
    const mobileCta = document.createElement('a');
    mobileCta.href = '/register';
    mobileCta.setAttribute('data-link', '');
    mobileCta.textContent = 'Get started';
    mobileCta.style.cssText = `
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ink-on-light);
      background: var(--text-primary);
      padding: 8px 16px;
      border-radius: var(--radius-md);
    `;
    mobileActions.appendChild(mobileSignIn);
    mobileActions.appendChild(mobileCta);
    mobileNav.appendChild(mobileActions);

    menuBtn.addEventListener('click', () => {
      const open = mobileNav.style.display !== 'flex';
      mobileNav.style.display = open ? 'flex' : 'none';
      menuBtn.style.color = open ? 'var(--text-primary)' : 'var(--text-secondary)';
      if (open) this.updateActive();
    });

    container.appendChild(brand);
    container.appendChild(nav);
    container.appendChild(actions);
    container.appendChild(menuBtn);

    const self = this;
    const applyBreakpoint = (matches: boolean) => {
      if (matches) {
        nav.style.display = 'none';
        menuBtn.style.display = 'inline-flex';
      } else {
        nav.style.display = 'flex';
        menuBtn.style.display = 'none';
        mobileNav.style.display = 'none';
      }
    };
    const mq = window.matchMedia('(max-width: 860px)');
    applyBreakpoint(mq.matches);
    mq.addEventListener('change', e => applyBreakpoint(e.matches));
    void self;

    header.appendChild(container);
    header.appendChild(mobileNav);
    this.updateActive();

    return header;
  }

  private updateActive() {
    this.navLinks.forEach(({ link, path }) => {
      const active = this.currentPath === path;
      link.style.color = active ? 'var(--text-primary)' : 'var(--text-secondary)';
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    this.mobileNavLinks.forEach((a, i) => {
      const entry = this.navLinks[i];
      if (!entry) return;
      a.style.color = this.currentPath === entry.path ? 'var(--text-primary)' : 'var(--text-secondary)';
    });
  }
}
