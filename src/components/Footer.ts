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
      padding: var(--space-16) var(--space-6) var(--space-6);
      margin-top: auto;
    `;

    const currentYear = new Date().getFullYear();

    footer.innerHTML = `
      <div style="max-width: var(--container-max); margin: 0 auto;">
        <div class="footer-grid" style="
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
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
              font-size: 1.0625rem;
              letter-spacing: -0.01em;
              color: var(--text-primary);
              text-decoration: none;
              margin-bottom: var(--space-4);
            ">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style="flex-shrink: 0;">
                <path d="M4.5 19 L12 5 L19.5 19" stroke="#f5a623" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              valora
            </a>
            <p style="
              color: var(--text-muted);
              font-size: 0.875rem;
              line-height: 1.6;
              max-width: 280px;
            ">
              Strategy validation for serious traders. Backtest, verify, and deploy with confidence.
            </p>
            <div style="display: flex; align-items: center; gap: var(--space-2); margin-top: var(--space-6); font-family: var(--font-mono); font-size: 0.6875rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted);">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--success);"></span>
              engine: operational
            </div>
            <div class="social-links" style="display: flex; gap: var(--space-2); margin-top: var(--space-4);">
              <a href="https://github.com/Reinhartsamuel/valora" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style="
                display: flex;
                align-items: center;
                justify-content: center;
                width: 34px;
                height: 34px;
                border-radius: var(--radius-md);
                background: var(--bg-hover);
                border: 1px solid var(--border);
                color: var(--text-muted);
                transition: all 0.15s ease;
              ">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://x.com/valora" target="_blank" rel="noopener noreferrer" aria-label="X" style="
                display: flex;
                align-items: center;
                justify-content: center;
                width: 34px;
                height: 34px;
                border-radius: var(--radius-md);
                background: var(--bg-hover);
                border: 1px solid var(--border);
                color: var(--text-muted);
                transition: all 0.15s ease;
              ">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 9.24-3.308 3.486-9.396-10.226H4.417l7.471-8.76zm-11.044 13.552h-3.337l7.584-8.482-7.773-8.773h3.425l-7.334 9.31 7.436 7.946z"/>
                </svg>
              </a>
            </div>
          </div>

          <div class="footer-column">
            <h4 style="font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-subtle); margin-bottom: var(--space-4);">Product</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-2);">
              <li><a href="/pricing" data-link style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">Pricing</a></li>
              <li><a href="/backtest" data-link style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">Backtest Dashboard</a></li>
              <li><a href="/trust" data-link style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">Trust Reports</a></li>
              <li><a href="/migration" data-link style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">Migration Wizard</a></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4 style="font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-subtle); margin-bottom: var(--space-4);">Developers</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-2);">
              <li><a href="/docs" data-link style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">Documentation</a></li>
              <li><a href="https://github.com/Reinhartsamuel/valora" target="_blank" rel="noopener noreferrer" style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">GitHub</a></li>
              <li><a href="https://x.com/valora" target="_blank" rel="noopener noreferrer" style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">X / Twitter</a></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4 style="font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-subtle); margin-bottom: var(--space-4);">Company</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-2);">
              <li><a href="/about" data-link style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">About</a></li>
              <li><a href="/blog" data-link style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">Blog</a></li>
              <li><a href="/contact" data-link style="color: var(--text-secondary); font-size: 0.875rem; transition: color 0.15s;">Contact</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom" style="
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-4);
          padding-top: var(--space-6);
          border-top: 1px solid var(--border);
        ">
          <p style="color: var(--text-subtle); font-size: 0.8125rem;">
            &copy; ${currentYear} Valora. All rights reserved.
          </p>
          <div class="footer-legal" style="display: flex; gap: var(--space-6);">
            <a href="/privacy" data-link style="color: var(--text-subtle); font-size: 0.8125rem; transition: color 0.15s;">Privacy</a>
            <a href="/terms" data-link style="color: var(--text-subtle); font-size: 0.8125rem; transition: color 0.15s;">Terms</a>
            <a href="/security" data-link style="color: var(--text-subtle); font-size: 0.8125rem; transition: color 0.15s;">Security</a>
          </div>
        </div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      .footer-column a:hover { color: var(--text-primary) !important; }
      .social-links a:hover { background: var(--bg-hover); border-color: var(--border-strong); color: var(--text-primary) !important; }
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
