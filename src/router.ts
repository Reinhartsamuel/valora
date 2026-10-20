export class Router {
  element: HTMLElement;
  private routes: Map<string, () => HTMLElement | Promise<HTMLElement>> = new Map();
  private currentRoute: string = '/';
  private currentView: HTMLElement | null = null;

  constructor() {
    this.element = document.createElement('main');
    this.element.id = 'router-outlet';
    this.element.style.flex = '1';
    this.element.style.minHeight = 'calc(100vh - 56px - 280px)';
  }

  register(path: string, loader: () => HTMLElement | Promise<HTMLElement>) {
    this.routes.set(path, loader);
  }

  async init() {
    window.addEventListener('popstate', () => this.navigate(window.location.pathname));
    document.body.addEventListener('click', (e) => {
      const link = (e.target as HTMLElement).closest('a[data-link]');
      if (link) {
        e.preventDefault();
        this.navigate((link as HTMLAnchorElement).getAttribute('href')!);
      }
    });
    await this.navigate(window.location.pathname);
  }

  async navigate(path: string) {
    const normalizedPath = path || '/';
    const loader = this.routes.get(normalizedPath);

    if (!loader) {
      await this.navigate('/404');
      return;
    }

    window.history.pushState({}, '', normalizedPath);
    this.currentRoute = normalizedPath;

    if (this.currentView) {
      this.currentView.remove();
    }

    this.currentView = await loader();
    this.element.appendChild(this.currentView);

    window.scrollTo(0, 0);
  }

  getCurrentRoute(): string {
    return this.currentRoute;
  }
}