export class Header {
  element: HTMLElement;
  private mobileMenuOpen = false;

  constructor() {
    this.element = this.createHeader();
  }

  private createHeader(): HTMLElement {
    const header = document.createElement('header');
    header.style.cssText = `
      position: sticky;
      top: 0;
      z-index: 100;
      height: var(--header-height);
      background: rgba(10, 11, 12, 0.85);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--border);
    `;

    header.innerHTML = `
      <div class="header-inner" style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        max-width: var(--container-max);
        margin: 0 auto;
        padding: 0 var(--space-6);
      ">
        <a href="/" data-link class="logo" style="
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 1.0625rem;
          letter-spacing: -0.01em;
          color: var(--text-primary);
          text-decoration: none;
        ">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style="flex-shrink: 0;">
            <path d="M4.5 19 L12 5 L19.5 19" stroke="#f5a623" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          valora
        </a>

        <nav class="nav-desktop" style="display: none;" aria-label="Main navigation">
          <ul style="
            display: flex;
            align-items: center;
            gap: var(--space-1);
            list-style: none;
          ">
            <li><a href="/pricing" data-link class="nav-link">Pricing</a></li>
            <li><a href="/backtest" data-link class="nav-link">Backtest</a></li>
            <li><a href="/trust" data-link class="nav-link">Trust Reports</a></li>
            <li><a href="/docs" data-link class="nav-link">Docs</a></li>
          </ul>
        </nav>

        <div class="header-actions" style="
          display: flex;
          align-items: center;
          gap: var(--space-2);
        ">
          <a href="/login" data-link class="btn btn-ghost" style="display: none;">Sign in</a>
          <a href="/signup" data-link class="btn btn-primary">Get Started</a>
          <button class="mobile-menu-btn" aria-label="Toggle menu" aria-expanded="false" style="
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: var(--radius-md);
            background: transparent;
            color: var(--text-primary);
            border: 1px solid transparent;
          ">
            <svg class="menu-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <svg class="close-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display: none;">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <nav class="nav-mobile" style="
        display: none;
        padding: var(--space-4) var(--space-6);
        border-top: 1px solid var(--border);
        background: var(--bg);
      " aria-label="Mobile navigation">
        <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-1);">
          <li><a href="/pricing" data-link class="nav-link mobile">Pricing</a></li>
          <li><a href="/backtest" data-link class="nav-link mobile">Backtest</a></li>
          <li><a href="/trust" data-link class="nav-link mobile">Trust Reports</a></li>
          <li><a href="/docs" data-link class="nav-link mobile">Docs</a></li>
          <li style="padding-top: var(--space-3); border-top: 1px solid var(--border);">
            <a href="/signup" data-link class="btn btn-primary mobile" style="width: 100%; text-align: center;">Get Started</a>
          </li>
          <li><a href="/login" data-link class="btn btn-ghost mobile" style="width: 100%; text-align: center;">Sign in</a></li>
        </ul>
      </nav>
    `;

    this.bindEvents(header);
    return header;
  }

  private bindEvents(header: HTMLElement) {
    const mobileBtn = header.querySelector('.mobile-menu-btn') as HTMLButtonElement;
    const mobileNav = header.querySelector('.nav-mobile') as HTMLElement;
    const menuIcon = header.querySelector('.menu-icon') as HTMLElement;
    const closeIcon = header.querySelector('.close-icon') as HTMLElement;

    mobileBtn?.addEventListener('click', () => {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      mobileNav.style.display = this.mobileMenuOpen ? 'block' : 'none';
      mobileBtn.setAttribute('aria-expanded', String(this.mobileMenuOpen));
      if (menuIcon && closeIcon) {
        menuIcon.style.display = this.mobileMenuOpen ? 'none' : 'block';
        closeIcon.style.display = this.mobileMenuOpen ? 'block' : 'none';
      }
    });

    mobileNav?.querySelectorAll('a[data-link]').forEach(link => {
      link.addEventListener('click', () => {
        this.mobileMenuOpen = false;
        mobileNav.style.display = 'none';
        mobileBtn.setAttribute('aria-expanded', 'false');
        if (menuIcon && closeIcon) {
          menuIcon.style.display = 'block';
          closeIcon.style.display = 'none';
        }
      });
    });

    const style = document.createElement('style');
    style.textContent = `
      @media (min-width: 768px) {
        .nav-desktop { display: block !important; }
        .header-actions .btn-ghost { display: inline-flex !important; }
        .mobile-menu-btn { display: none !important; }
        .nav-mobile { display: none !important; }
      }
      @media (max-width: 767px) {
        .nav-desktop { display: none !important; }
        .header-actions .btn-ghost { display: none !important; }
        .header-actions .btn-primary { display: none !important; }
        .mobile-menu-btn { display: flex !important; }
      }
      .nav-link {
        display: block;
        padding: var(--space-2) var(--space-3);
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-secondary);
        border-radius: var(--radius-md);
        transition: color 0.15s ease, background 0.15s ease;
      }
      .nav-link:hover {
        color: var(--text-primary);
        background: var(--bg-hover);
      }
      .nav-link.mobile {
        padding: var(--space-3) var(--space-4);
        font-size: 1rem;
      }
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-2);
        padding: var(--space-2) var(--space-4);
        font-size: 0.875rem;
        font-weight: 600;
        border-radius: var(--radius-md);
        transition: all 0.15s ease;
        white-space: nowrap;
        text-decoration: none;
      }
      .btn-primary {
        background: var(--accent);
        color: #14100a;
        border: 1px solid var(--accent);
      }
      .btn-primary:hover {
        background: var(--accent-hover);
        border-color: var(--accent-hover);
        color: #14100a;
      }
      .btn-ghost {
        color: var(--text-secondary);
        border: 1px solid transparent;
      }
      .btn-ghost:hover {
        color: var(--text-primary);
        background: var(--bg-hover);
        border-color: var(--border);
      }
      .mobile-menu-btn:hover {
        background: var(--bg-hover);
        border-color: var(--border);
      }
    `;
    document.head.appendChild(style);
  }
}
