export type IconName =
  | 'arrowRight'
  | 'check'
  | 'x'
  | 'alertTriangle'
  | 'fileText'
  | 'upload'
  | 'chart'
  | 'download'
  | 'shield'
  | 'externalLink'
  | 'barChart'
  | 'settings'
  | 'plus'
  | 'minus'
  | 'chevronDown';

export function createButton(
  variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary',
  size: 'sm' | 'md' | 'lg' = 'md',
): HTMLButtonElement {
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
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
    white-space: nowrap;
    border: 1px solid transparent;
    letter-spacing: -0.005em;
  `;

  const sizeStyles = {
    sm: 'height: 28px; padding: 0 var(--space-3); font-size: 0.8125rem;',
    md: 'height: 34px; padding: 0 var(--space-4); font-size: 0.875rem;',
    lg: 'height: 40px; padding: 0 var(--space-5); font-size: 0.875rem;',
  };

  const variantStyles = {
    primary: `
      background: var(--text-primary);
      color: var(--ink-on-light);
      border-color: var(--text-primary);
    `,
    secondary: `
      background: transparent;
      color: var(--text-primary);
      border-color: var(--border-strong);
    `,
    ghost: `
      background: transparent;
      color: var(--text-secondary);
      border-color: transparent;
    `,
    danger: `
      background: var(--danger);
      color: #ffffff;
      border-color: var(--danger);
    `,
  };

  const hoverStyles = {
    primary: 'background: #ffffff; border-color: #ffffff;',
    secondary: 'background: var(--bg-hover); border-color: var(--border-strong);',
    ghost: 'background: var(--bg-hover); color: var(--text-primary);',
    danger: 'filter: brightness(1.08);',
  };

  btn.style.cssText = baseStyles + sizeStyles[size] + variantStyles[variant];

  btn.addEventListener('mouseenter', () => {
    if (!btn.disabled) btn.style.cssText += hoverStyles[variant];
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.cssText =
      baseStyles + sizeStyles[size] + variantStyles[variant] + (btn.disabled ? 'opacity: 0.5; cursor: not-allowed;' : '');
  });

  return btn;
}

export function createIcon(name: IconName = 'arrowRight', size = 16): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.6');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');

  const el = (tag: string, attrs: Record<string, string>) => {
    const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
    svg.appendChild(node);
    return node;
  };

  switch (name) {
    case 'arrowRight':
      el('path', { d: 'M5 12h14' });
      el('path', { d: 'm12 5 7 7-7 7' });
      break;
    case 'check':
      el('path', { d: 'M20 6 9 17l-5-5' });
      break;
    case 'x':
      el('path', { d: 'M18 6 6 18' });
      el('path', { d: 'm6 6 12 12' });
      break;
    case 'alertTriangle':
      el('path', { d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z' });
      el('path', { d: 'M12 9v4' });
      el('path', { d: 'M12 17h.01' });
      break;
    case 'fileText':
      el('path', { d: 'M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z' });
      el('polyline', { points: '14,2 14,8 20,8' });
      el('line', { x1: '16', y1: '13', x2: '8', y2: '13' });
      el('line', { x1: '16', y1: '17', x2: '8', y2: '17' });
      break;
    case 'upload':
      el('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' });
      el('polyline', { points: '17,8 12,3 7,8' });
      el('line', { x1: '12', y1: '3', x2: '12', y2: '15' });
      break;
    case 'chart':
      el('path', { d: 'M3 3v18h18' });
      el('path', { d: 'm7 15 4-5 3 3 5-7' });
      break;
    case 'download':
      el('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' });
      el('polyline', { points: '7,10 12,15 17,10' });
      el('line', { x1: '12', y1: '3', x2: '12', y2: '15' });
      break;
    case 'shield':
      el('path', { d: 'M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z' });
      el('path', { d: 'm9 12 2 2 4-4' });
      break;
    case 'externalLink':
      el('path', { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' });
      el('polyline', { points: '15,3 21,3 21,9' });
      el('line', { x1: '10', y1: '14', x2: '21', y2: '3' });
      break;
    case 'barChart':
      el('line', { x1: '12', y1: '20', x2: '12', y2: '10' });
      el('line', { x1: '18', y1: '20', x2: '18', y2: '4' });
      el('line', { x1: '6', y1: '20', x2: '6', y2: '16' });
      break;
    case 'settings':
      el('circle', { cx: '12', cy: '12', r: '3' });
      el('path', { d: 'M12 1v6m0 6v6m11-7h-6m-6 0H1' });
      break;
    case 'plus':
      el('line', { x1: '12', y1: '5', x2: '12', y2: '19' });
      el('line', { x1: '5', y1: '12', x2: '19', y2: '12' });
      break;
    case 'minus':
      el('line', { x1: '5', y1: '12', x2: '19', y2: '12' });
      break;
    case 'chevronDown':
      el('polyline', { points: '6 9 12 15 18 9' });
      break;
  }

  return svg;
}

export function createCard(elevated = false): HTMLDivElement {
  const card = document.createElement('div');
  card.style.cssText = `
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    ${elevated ? 'box-shadow: var(--shadow-md);' : ''}
    transition: border-color 0.15s ease;
  `;
  card.addEventListener('mouseenter', () => {
    card.style.borderColor = 'var(--border-strong)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.borderColor = 'var(--border)';
  });
  return card;
}

export function createInput(placeholder = '', type = 'text'): HTMLInputElement {
  const input = document.createElement('input');
  input.type = type;
  input.placeholder = placeholder;
  input.style.cssText = `
    width: 100%;
    height: 34px;
    padding: 0 var(--space-3);
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--text-primary);
    background: var(--bg-inset);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
    outline: none;
  `;
  input.addEventListener('focus', () => {
    input.style.borderColor = 'var(--accent)';
    input.style.boxShadow = '0 0 0 2px var(--focus)';
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
    height: 34px;
    padding: 0 var(--space-3);
    font-family: var(--font-sans);
    font-size: 0.8125rem;
    color: var(--text-primary);
    background: var(--bg-inset);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
    outline: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236e747e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    padding-right: 32px;
    cursor: pointer;
  `;
  select.addEventListener('focus', () => {
    select.style.borderColor = 'var(--accent)';
    select.style.boxShadow = '0 0 0 2px var(--focus)';
  });
  select.addEventListener('blur', () => {
    select.style.borderColor = 'var(--border)';
    select.style.boxShadow = 'none';
  });
  return select;
}

export function createTabs(tabs: { id: string; label: string }[]): { container: HTMLDivElement; tabs: HTMLButtonElement[]; setActive: (id: string) => void } {
  const container = document.createElement('div');
  container.style.cssText = `
    display: inline-flex;
    gap: 2px;
    padding: 3px;
    background: var(--bg-inset);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
  `;
  const tabButtons: HTMLButtonElement[] = [];
  tabs.forEach(tab => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.dataset.tabId = tab.id;
    btn.textContent = tab.label;
    btn.style.cssText = `
      padding: 4px 12px;
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-muted);
      border-radius: var(--radius-sm);
      transition: background 0.15s ease, color 0.15s ease;
    `;
    btn.addEventListener('click', () => {
      setActive(tab.id);
      btn.dispatchEvent(new CustomEvent('tabchange', { detail: { id: tab.id } }));
    });
    container.appendChild(btn);
    tabButtons.push(btn);
  });
  function setActive(id: string) {
    tabButtons.forEach(btn => {
      if (btn.dataset.tabId === id) {
        btn.style.background = 'var(--bg-hover)';
        btn.style.color = 'var(--text-primary)';
      } else {
        btn.style.background = 'transparent';
        btn.style.color = 'var(--text-muted)';
      }
    });
  }
  if (tabs.length > 0) setActive(tabs[0].id);
  return { container, tabs: tabButtons, setActive };
}

export function createBadge(text: string, variant: 'default' | 'success' | 'warning' | 'danger' = 'default'): HTMLSpanElement {
  const badge = document.createElement('span');
  const colors = {
    default: { bg: 'var(--bg-hover)', color: 'var(--text-secondary)', border: 'var(--border)' },
    success: { bg: 'var(--success-bg)', color: 'var(--success)', border: 'var(--success-border)' },
    warning: { bg: 'var(--warning-bg)', color: 'var(--warning)', border: 'var(--warning-border)' },
    danger: { bg: 'var(--danger-bg)', color: 'var(--danger)', border: 'var(--danger-border)' },
  };
  const c = colors[variant];
  badge.textContent = text;
  badge.style.cssText = `
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 3px 8px;
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border-radius: var(--radius-sm);
    background: ${c.bg};
    color: ${c.color};
    border: 1px solid ${c.border};
    white-space: nowrap;
  `;
  const dot = document.createElement('span');
  dot.style.cssText = `width: 5px; height: 5px; border-radius: 1px; background: currentColor; flex-shrink: 0;`;
  badge.prepend(dot);
  return badge;
}

export interface TableOptions {
  striped?: boolean;
  hoverable?: boolean;
}

export function createTable(headers: string[], rows: string[][], options: TableOptions = {}): HTMLTableElement {
  const { striped = false, hoverable = true } = options;
  const table = document.createElement('table');
  table.style.cssText = `
    width: 100%;
    border-collapse: collapse;
    font-size: 0.8125rem;
  `;
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  headers.forEach(h => {
    const th = document.createElement('th');
    th.textContent = h;
    th.style.cssText = `
      text-align: left;
      padding: 8px 12px;
      font-family: var(--font-mono);
      font-size: 0.625rem;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text-subtle);
      border-bottom: 1px solid var(--border-strong);
      white-space: nowrap;
    `;
    tr.appendChild(th);
  });
  thead.appendChild(tr);
  table.appendChild(thead);
  const tbody = document.createElement('tbody');
  rows.forEach((row, i) => {
    const rowEl = document.createElement('tr');
    rowEl.style.cssText = `border-bottom: 1px solid var(--border); transition: background 0.1s ease;`;
    if (striped && i % 2 === 1) rowEl.style.background = 'var(--bg-panel)';
    if (hoverable) {
      rowEl.addEventListener('mouseenter', () => { rowEl.style.background = 'var(--bg-hover)'; });
      rowEl.addEventListener('mouseleave', () => { rowEl.style.background = striped && i % 2 === 1 ? 'var(--bg-panel)' : 'transparent'; });
    }
    row.forEach(cell => {
      const td = document.createElement('td');
      td.innerHTML = cell;
      td.style.cssText = `padding: 10px 12px; color: var(--text-secondary); white-space: nowrap; vertical-align: middle;`;
      rowEl.appendChild(td);
    });
    tbody.appendChild(rowEl);
  });
  table.appendChild(tbody);
  return table;
}

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export function createToast(message: string, variant: ToastVariant = 'info'): HTMLDivElement {
  const toast = document.createElement('div');
  const colors: Record<ToastVariant, { bg: string; color: string; border: string }> = {
    info: { bg: 'var(--bg-elevated)', color: 'var(--text-primary)', border: 'var(--border-strong)' },
    success: { bg: 'var(--success-bg)', color: 'var(--success)', border: 'var(--success-border)' },
    warning: { bg: 'var(--warning-bg)', color: 'var(--warning)', border: 'var(--warning-border)' },
    error: { bg: 'var(--danger-bg)', color: 'var(--danger)', border: 'var(--danger-border)' },
  };
  const c = colors[variant];
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: var(--space-6);
    right: var(--space-6);
    padding: 10px 16px;
    background: ${c.bg};
    color: ${c.color};
    border: 1px solid ${c.border};
    border-radius: var(--radius-md);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    box-shadow: var(--shadow-md);
    z-index: 1000;
    animation: valora-toast-in 0.2s ease;
  `;
  if (!document.getElementById('valora-toast-style')) {
    const style = document.createElement('style');
    style.id = 'valora-toast-style';
    style.textContent = `
      @keyframes valora-toast-in {
        from { transform: translateY(8px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
  document.body.appendChild(toast);
  return toast;
}
