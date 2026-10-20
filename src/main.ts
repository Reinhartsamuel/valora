import './style.css';
import { Router } from './router.ts';
import { Header } from './components/Header.ts';
import { Footer } from './components/Footer.ts';
import { renderLanding } from './pages/Landing.ts';
import { renderPricing } from './pages/Pricing.ts';
import { renderBacktest } from './pages/Backtest.ts';
import { renderTrust } from './pages/Trust.ts';
import { renderMigration } from './pages/Migration.ts';
import { renderDocs } from './pages/Docs.ts';

const app = document.querySelector<HTMLDivElement>('#app')!;

const header = new Header();
const footer = new Footer();
const router = new Router();

app.appendChild(header.element);
app.appendChild(router.element);
app.appendChild(footer.element);

// Register all routes
router.register('/', renderLanding);
router.register('/pricing', renderPricing);
router.register('/backtest', renderBacktest);
router.register('/trust', renderTrust);
router.register('/migration', renderMigration);
router.register('/docs', renderDocs);

// 404 fallback
router.register('/404', async () => {
  const page = document.createElement('div');
  page.style.cssText = 'display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; text-align: center; padding: var(--space-8);';
  page.innerHTML = `
    <h1 style="font-size: 6rem; font-weight: 600; color: var(--text-subtle); line-height: 1; margin-bottom: var(--space-4);">404</h1>
    <h2 style="font-size: 1.5rem; font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-3);">Page not found</h2>
    <p style="color: var(--text-secondary); margin-bottom: var(--space-6); max-width: 400px;">The page you're looking for doesn't exist or has been moved.</p>
    <a href="/" data-link id="home-link"></a>
  `;
  const homeBtn = document.createElement('button');
  homeBtn.style.cssText = `
    padding: var(--space-2) var(--space-4);
    font-family: var(--font-sans);
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: var(--radius-md);
    background: var(--accent);
    color: white;
    border: 1px solid var(--accent);
    cursor: pointer;
    transition: all 0.15s ease;
  `;
  homeBtn.textContent = 'Go home';
  homeBtn.addEventListener('click', () => router.navigate('/'));
  page.querySelector('#home-link')!.appendChild(homeBtn);
  return page;
});

router.init();

declare global {
  interface Window {
    router: Router;
  }
}
window.router = router;