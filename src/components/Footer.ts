export class Footer {
  element: HTMLElement;

  constructor() {
    this.element = this.createFooter();
  }

  private createFooter(): HTMLElement {
    const footer = document.createElement('footer');
    footer.style.cssText = `
      background: var(--bg-elevated);
      border-top: 1px solid var(--border);
      padding: var(--space-20) var(--space-6) var(--space-8);
      margin-top: auto;
    `;

    const currentYear = new Date().getFullYear();

    footer.innerHTML = `
      <div style="max-width: var(--container-max); margin: 0 auto;">
        <div class="footer-grid" style="
          display: grid;
          grid-template-columns: 2fr repeat(3, 1fr);
          gap: var(--space-10);
          margin-bottom: var(--space-16);
        ">
          <div class="footer-brand">
            <a href="/" data-link class="logo" style="
              display: inline-flex;
              align-items: center;
              gap: var(--space-2);
              font-family: var(--font-sans);
              font-weight: 600;
              font-size: 1.125rem;
              letter-spacing: -0.02em;
              color: var(--text-primary);
              text-decoration: none;
              margin-bottom: var(--space-4);
            ">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink: 0;">
                <rect width="28" height="28" rx="6" fill="var(--accent)"/>
                <path d="M8 14L12 18L20 10" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Valora
            </a>
            <p style="
              color: var(--text-muted);
              font-size: 0.875rem;
              line-height: 1.6;
              max-width: 280px;
            ">
              Strategy validation for serious traders. Backtest, verify, and deploy with confidence.
            </p>
            <div class="social-links" style="display: flex; gap: var(--space-3); margin-top: var(--space-6);">
              <a href="https://github.com/Reinhartsamuel/valora" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style="
                display: flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 36px;
                border-radius: var(--radius-md);
                background: var(--bg-hover);
                border: 1px solid var(--border);
                color: var(--text-muted);
                transition: all 0.15s ease;
              ">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://twitter.com/valora" target="_blank" rel="noopener noreferrer" aria-label="Twitter" style="
                display: flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 36px;
                border-radius: var(--radius-md);
                background: var(--bg-hover);
                border: 1px solid var(--border);
                color: var(--text-muted);
                transition: all 0.15s ease;
              ">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 9.24-3.308 3.486-9.396-10.226H4.417l7.471-8.76zm-11.044 13.552h-3.337l7.584-8.482-7.773-8.773h3.425l-7.334 9.31 7.436 7.946z"/>
                </svg>
              </a>
              <a href="https://discord.gg/valora" target="_blank" rel="noopener noreferrer" aria-label="Discord" style="
                display: flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 36px;
                border-radius: var(--radius-md);
                background: var(--bg-hover);
                border: 1px solid var(--border);
                color: var(--text-muted);
                transition: all 0.15s ease;
              ">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 .077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.675 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.083.083 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-.062.077.077 0 0 0 .041-.106 13.107 13.107 0 0 0-.085-.578 13.2 13.2 0 0 0-.367-.454.076.076 0 0 0-.105-.013c-.615-.062-1.252-.09-1.888-.09-.73 0-1.46.04-2.071.12a.077.077 0 0 0-.106.012 13.27 13.27 0 0 0-.372.467.075.075 0 0 0-.04.105 14.43 14.43 0 0 0 .085.572 15.67 15.67 0 0 0 3.973-.31.078.078 0 0 0 .077.104c.853.204 1.734.32 2.61.32.967 0 1.896-.13 2.815-.357a.077.077 0 0 0 .031-.103 13.24 13.24 0 0 0-.215-.865.074.074 0 0 0-.068-.064 20.46 20.46 0 0 0-3.276-1.528.077.077 0 0 0-.079-.037c-1.104-.093-2.22-.054-3.247.135a.076.076 0 0 0-.03.13 18.56 18.56 0 0 0 1.674 6.157.07.07 0 0 0 .09.012 19.83 19.83 0 0 0 6.049-2.997.077.077 0 0 0 .019-.117c.308-3.428-.13-7.719-1.187-11.096a.061.061 0 0 0-.013-.065.079.079 0 0 0-.046-.034zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.212 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.212 0 2.176 1.096 2.157 2.42 0 1.333-.945 2.418-2.157 2.418z"/>
                </svg>
              </a>
            </div>
          </div>

          <div class="footer-column">
            <h4 style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-subtle); margin-bottom: var(--space-4);">Product</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-2);">
              <li><a href="/features" data-link style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">Features</a></li>
              <li><a href="/pricing" data-link style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">Pricing</a></li>
              <li><a href="/backtest" data-link style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">Backtest Dashboard</a></li>
              <li><a href="/trust" data-link style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">Trust Reports</a></li>
              <li><a href="/migration" data-link style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">Migration Wizard</a></li>
              <li><a href="/changelog" data-link style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">Changelog</a></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4 style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-subtle); margin-bottom: var(--space-4);">Developers</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-2);">
              <li><a href="/docs" data-link style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">Documentation</a></li>
              <li><a href="/api" data-link style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">API Reference</a></li>
              <li><a href="/sdk" data-link style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">SDKs</a></li>
              <li><a href="/integrations" data-link style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">Integrations</a></li>
              <li><a href="/status" data-link style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">System Status</a></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4 style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-subtle); margin-bottom: var(--space-4);">Company</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-2);">
              <li><a href="/about" data-link style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">About</a></li>
              <li><a href="/blog" data-link style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">Blog</a></li>
              <li><a href="/careers" data-link style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">Careers</a></li>
              <li><a href="/contact" data-link style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">Contact</a></li>
              <li><a href="/press" data-link style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">Press</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom" style="
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-4);
          padding-top: var(--space-8);
          border-top: 1px solid var(--border);
        ">
          <p style="color: var(--text-subtle); font-size: 0.8125rem;">
            &copy; ${currentYear} Valora. All rights reserved.
          </p>
          <div class="footer-legal" style="display: flex; gap: var(--space-6);">
            <a href="/privacy" data-link style="color: var(--text-subtle); font-size: 0.8125rem; transition: color 0.15s;">Privacy</a>
            <a href="/terms" data-link style="color: var(--text-subtle); font-size: 0.8125rem; transition: color 0.15s;">Terms</a>
            <a href="/security" data-link style="color: var(--text-subtle); font-size: 0.8125rem; transition: color 0.15s;">Security</a>
            <a href="/cookies" data-link style="color: var(--text-subtle); font-size: 0.8125rem; transition: color 0.15s;">Cookies</a>
          </div>
        </div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      .footer-column h4 { margin-bottom: var(--space-4); }
      .footer-column a:hover { color: var(--text-primary) !important; }
      .social-links a:hover { background: var(--accent-bg); border-color: var(--accent-border); color: var(--accent) !important; }
      .footer-legal a:hover { color: var(--text-primary) !important; }
      @media (max-width: 1024px) {
        .footer-grid { grid-template-columns: 1fr 1fr !important; }
      }
      @media (max-width: 640px) {
        .footer-grid { grid-template-columns: 1fr !important; }
        .footer-bottom { flex-direction: column; text-align: center; }
        .footer-legal { flex-wrap: wrap; justify-content: center; }
      }
    `;
    document.head.appendChild(style);

    return footer;
  }
}