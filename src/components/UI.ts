export function createButton(variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary', size: 'sm' | 'md' | 'lg' = 'md'): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';

  const baseStyles = `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    font-family: var(--font-sans);
    font-weight: 500;
    border-radius: var(--radius-md);
    transition: all 0.15s ease;
    white-space: nowrap;
    border: 1px solid transparent;
  `;

  const sizeStyles = {
    sm: 'padding: var(--space-1) var(--space-3); font-size: 0.8125rem; height: 32px;',
    md: 'padding: var(--space-2) var(--space-4); font-size: 0.875rem; height: 40px;',
    lg: 'padding: var(--space-3) var(--space-6); font-size: 1rem; height: 48px;',
  };

  const variantStyles = {
    primary: `
      background: var(--accent);
      color: white;
      border-color: var(--accent);
    `,
    secondary: `
      background: var(--bg-elevated);
      color: var(--text-primary);
      border-color: var(--border);
    `,
    ghost: `
      background: transparent;
      color: var(--text-secondary);
      border-color: transparent;
    `,
    danger: `
      background: var(--danger);
      color: white;
      border-color: var(--danger);
    `,
  };

  const hoverStyles = {
    primary: 'background: var(--accent-hover); border-color: var(--accent-hover);',
    secondary: 'background: var(--bg-hover); border-color: var(--border-strong);',
    ghost: 'background: var(--bg-hover); color: var(--text-primary);',
    danger: 'background: #dc2626; border-color: #dc2626;',
  };

  btn.style.cssText = baseStyles + sizeStyles[size] + variantStyles[variant];

  btn.addEventListener('mouseenter', () => {
    btn.style.cssText += hoverStyles[variant];
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.cssText = baseStyles + sizeStyles[size] + variantStyles[variant];
  });
  btn.addEventListener('mousedown', () => {
    btn.style.transform = 'scale(0.98)';
  });
  btn.addEventListener('mouseup', () => {
    btn.style.transform = 'scale(1)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
  });

  return btn;
}

export function createInput(placeholder = '', type = 'text'): HTMLInputElement {
  const input = document.createElement('input');
  input.type = type;
  input.placeholder = placeholder;
  input.style.cssText = `
    width: 100%;
    padding: var(--space-2) var(--space-3);
    font-family: var(--font-sans);
    font-size: 0.875rem;
    color: var(--text-primary);
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
    outline: none;
  `;
  input.addEventListener('focus', () => {
    input.style.borderColor = 'var(--accent)';
    input.style.boxShadow = '0 0 0 3px var(--accent-bg)';
  });
  input.addEventListener('blur', () => {
    input.style.borderColor = 'var(--border)';
    input.style.boxShadow = 'none';
  });
  return input;
}

export function createSelect(options: { value: string; label: string }[]): HTMLSelectElement {
  const select = document.createElement('select');
  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = opt.label;
    select.appendChild(option);
  });
  select.style.cssText = `
    width: 100%;
    padding: var(--space-2) var(--space-3);
    font-family: var(--font-sans);
    font-size: 0.875rem;
    color: var(--text-primary);
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
    outline: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238a8f98' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right var(--space-3) center;
    padding-right: var(--space-10);
  `;
  select.addEventListener('focus', () => {
    select.style.borderColor = 'var(--accent)';
    select.style.boxShadow = '0 0 0 3px var(--accent-bg)';
  });
  select.addEventListener('blur', () => {
    select.style.borderColor = 'var(--border)';
    select.style.boxShadow = 'none';
  });
  return select;
}

export function createCard(elevated = false): HTMLDivElement {
  const card = document.createElement('div');
  card.style.cssText = `
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    ${elevated ? 'box-shadow: var(--shadow-md);' : ''}
    transition: box-shadow 0.15s ease, border-color 0.15s ease;
  `;
  card.addEventListener('mouseenter', () => {
    if (elevated) {
      card.style.boxShadow = 'var(--shadow-lg)';
    }
    card.style.borderColor = 'var(--border-strong)';
  });
  card.addEventListener('mouseleave', () => {
    if (elevated) {
      card.style.boxShadow = 'var(--shadow-md)';
    }
    card.style.borderColor = 'var(--border)';
  });
  return card;
}

export function createBadge(text: string, variant: 'default' | 'success' | 'warning' | 'danger' | 'accent' = 'default'): HTMLSpanElement {
  const badge = document.createElement('span');
  badge.textContent = text;
  const variantStyles = {
    default: 'background: var(--bg-hover); color: var(--text-secondary); border: 1px solid var(--border);',
    success: 'background: var(--success-bg); color: var(--success); border: 1px solid rgba(16, 185, 129, 0.3);',
    warning: 'background: var(--warning-bg); color: var(--warning); border: 1px solid rgba(245, 158, 11, 0.3);',
    danger: 'background: var(--danger-bg); color: var(--danger); border: 1px solid rgba(239, 68, 68, 0.3);',
    accent: 'background: var(--accent-bg); color: var(--accent); border: 1px solid var(--accent-border);',
  };
  badge.style.cssText = `
    display: inline-flex;
    align-items: center;
    padding: var(--space-1) var(--space-2);
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 500;
    border-radius: var(--radius-pill);
    ${variantStyles[variant]}
  `;
  return badge;
}

export function createIcon(name: string, size = 16): SVGElement {
  const icons: Record<string, string> = {
    check: '<path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    chevronDown: '<polyline points="6 9 12 15 18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    chevronRight: '<polyline points="9 18 15 12 9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    externalLink: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="15 3 21 3 21 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    github: '<path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>',
    chart: '<line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    arrowRight: '<line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="12 5 19 12 12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="7 10 12 15 17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="17 8 12 3 7 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    settings: '<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    search: '<circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    menu: '<line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    sun: '<circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    loader: '<path d="M21 12a9 9 0 1 1-6.219-8.56" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  };

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.style.cssText = 'flex-shrink: 0;';
  svg.innerHTML = icons[name] || icons.check;
  return svg;
}

export function createTable(headers: string[], rows: string[][], options: { striped?: boolean; hoverable?: boolean } = {}): HTMLTableElement {
  const table = document.createElement('table');
  table.style.cssText = `
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
    font-family: var(--font-sans);
  `;

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    th.style.cssText = `
      padding: var(--space-3) var(--space-4);
      text-align: left;
      font-weight: 600;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-subtle);
      border-bottom: 1px solid var(--border);
      background: var(--bg);
    `;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  rows.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');
    if (options.striped && rowIndex % 2 === 1) {
      tr.style.background = 'var(--bg)';
    }
    if (options.hoverable) {
      tr.style.transition = 'background 0.15s ease';
      tr.addEventListener('mouseenter', () => {
        tr.style.background = 'var(--bg-hover)';
      });
      tr.addEventListener('mouseleave', () => {
        tr.style.background = options.striped && rowIndex % 2 === 1 ? 'var(--bg)' : 'transparent';
      });
    }
    row.forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell;
      td.style.cssText = `
        padding: var(--space-3) var(--space-4);
        color: var(--text-secondary);
        border-bottom: 1px solid var(--border);
      `;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  return table;
}

export function createTabs(tabs: { id: string; label: string }[]): { container: HTMLDivElement; panels: Map<string, HTMLDivElement>; setActive: (id: string) => void } {
  const container = document.createElement('div');
  const panels = new Map<string, HTMLDivElement>();

  const tabList = document.createElement('div');
  tabList.style.cssText = `
    display: flex;
    gap: var(--space-1);
    background: var(--bg);
    padding: var(--space-1);
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    margin-bottom: var(--space-6);
  `;

  let activeId = tabs[0]?.id || '';

  tabs.forEach(tab => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = tab.label;
    btn.dataset.tabId = tab.id;
    btn.style.cssText = `
      padding: var(--space-2) var(--space-4);
      font-family: var(--font-sans);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-muted);
      background: transparent;
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    `;
    if (tab.id === activeId) {
      btn.style.background = 'var(--bg-elevated)';
      btn.style.color = 'var(--text-primary)';
      btn.style.boxShadow = 'var(--shadow-sm)';
    }
    btn.addEventListener('click', () => setActive(tab.id));
    btn.addEventListener('mouseenter', () => {
      if (tab.id !== activeId) {
        btn.style.color = 'var(--text-secondary)';
        btn.style.background = 'var(--bg-hover)';
      }
    });
    btn.addEventListener('mouseleave', () => {
      if (tab.id !== activeId) {
        btn.style.color = 'var(--text-muted)';
        btn.style.background = 'transparent';
      }
    });
    tabList.appendChild(btn);

    const panel = document.createElement('div');
    panel.id = `panel-${tab.id}`;
    panel.style.display = tab.id === activeId ? 'block' : 'none';
    panels.set(tab.id, panel);
    container.appendChild(panel);
  });

  container.insertBefore(tabList, container.firstChild);

  function setActive(id: string) {
    activeId = id;
    tabList.querySelectorAll('button').forEach(btn => {
      const isActive = btn.dataset.tabId === id;
      btn.style.background = isActive ? 'var(--bg-elevated)' : 'transparent';
      btn.style.color = isActive ? 'var(--text-primary)' : 'var(--text-muted)';
      btn.style.boxShadow = isActive ? 'var(--shadow-sm)' : 'none';
    });
    panels.forEach((panel, panelId) => {
      panel.style.display = panelId === id ? 'block' : 'none';
    });
  }

  return { container, panels, setActive };
}

export function createToast(message: string, variant: 'info' | 'success' | 'warning' | 'error' = 'info'): HTMLElement {
  const toast = document.createElement('div');
  const variantStyles = {
    info: 'border-left: 3px solid var(--accent); background: var(--accent-bg);',
    success: 'border-left: 3px solid var(--success); background: var(--success-bg);',
    warning: 'border-left: 3px solid var(--warning); background: var(--warning-bg);',
    error: 'border-left: 3px solid var(--danger); background: var(--danger-bg);',
  };
  toast.style.cssText = `
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    color: var(--text-primary);
    ${variantStyles[variant]}
    box-shadow: var(--shadow-lg);
    animation: slideIn 0.2s ease;
  `;
  toast.textContent = message;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(100%); }
      to { opacity: 1; transform: translateX(0); }
    }
  `;
  document.head.appendChild(style);

  return toast;
}