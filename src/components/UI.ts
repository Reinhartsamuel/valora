export function createButton(variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary', size: 'sm' | 'md' | 'lg' = 'md'): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';

  const baseStyles = `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    font-family: var(--font-sans);
    font-weight: 600;
    border-radius: var(--radius-pill);
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    white-space: nowrap;
    border: 1px solid transparent;
    letter-spacing: -0.01em;
    will-change: transform;
  `;

  const sizeStyles = {
    sm: 'padding: 2px var(--space-3); font-size: 0.8125rem; height: 30px;',
    md: 'padding: var(--space-2) var(--space-4); font-size: 0.875rem; height: 40px;',
    lg: 'padding: var(--space-2) var(--space-6); font-size: 0.9375rem; height: 48px;',
  };

  const variantStyles = {
    primary: `
      background: radial-gradient(circle at 50% 0%, var(--accent-hover) 0%, var(--accent) 100%);
      color: #0a0803;
      border-color: rgba(251, 191, 36, 0.5);
      box-shadow: 0 1px 0 rgba(255, 255, 255, 0.25) inset, 0 0 0 1px rgba(255, 255, 255, 0.08) inset, var(--glow);
    `,
    secondary: `
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent), var(--bg-elevated);
      color: var(--text-primary);
      border-color: var(--border);
      backdrop-filter: blur(8px);
    `,
    ghost: `
      background: transparent;
      color: var(--text-secondary);
      border-color: transparent;
    `,
    danger: `
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, transparent 100%), var(--danger);
      color: #ffffff;
      border-color: var(--danger-border);
    `,
  };

  const hoverStyles = {
    primary: 'transform: translateY(-1px); filter: brightness(1.05);',
    secondary: 'background: var(--bg-hover); border-color: var(--border-strong); transform: translateY(-1px);',
    ghost: 'background: var(--bg-hover); color: var(--text-primary);',
    danger: 'transform: translateY(-1px); filter: brightness(1.05);',
  };

  btn.style.cssText = baseStyles + sizeStyles[size] + variantStyles[variant];

  btn.addEventListener('mouseenter', () => {
    if (!btn.disabled) btn.style.cssText += hoverStyles[variant];
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.cssText = baseStyles + sizeStyles[size] + variantStyles[variant] + (btn.disabled ? 'opacity: 0.5; cursor: not-allowed;' : '');
  });

  return btn;
}

export function createIcon(name: 'arrowRight' | 'check' | 'x' | 'alertTriangle' | 'fileText' | 'upload' | 'barChart' | 'settings' | 'plus' | 'minus' | 'chevronDown' = 'arrowRight', size = 16): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.8');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  
  if (name === 'arrowRight') {
    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M5 12h14');
    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'm12 5 7 7-7 7');
    svg.appendChild(path1);
    svg.appendChild(path2);
  } else if (name === 'check') {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M20 6 9 17l-5-5');
    svg.appendChild(path);
  } else if (name === 'x') {
    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M18 6 6 18');
    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'm6 6 12 12');
    svg.appendChild(path1);
    svg.appendChild(path2);
  } else if (name === 'alertTriangle') {
    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z');
    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M12 9v4');
    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path3.setAttribute('d', 'M12 17h.01');
    svg.appendChild(path1);
    svg.appendChild(path2);
    svg.appendChild(path3);
  } else if (name === 'fileText') {
    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z');
    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    path2.setAttribute('points', '14,2 14,8 20,8');
    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    path3.setAttribute('x1', '16');
    path3.setAttribute('y1', '13');
    path3.setAttribute('x2', '8');
    path3.setAttribute('y2', '13');
    const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    path4.setAttribute('x1', '16');
    path4.setAttribute('y1', '17');
    path4.setAttribute('x2', '8');
    path4.setAttribute('y2', '17');
    const path5 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    path5.setAttribute('x1', '10');
    path5.setAttribute('y1', '9');
    path5.setAttribute('x2', '8');
    path5.setAttribute('y2', '9');
    svg.appendChild(path1); svg.appendChild(path2); svg.appendChild(path3); svg.appendChild(path4); svg.appendChild(path5);
  } else if (name === 'upload') {
    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4');
    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    path2.setAttribute('points', '17,8 12,3 7,8');
    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    path3.setAttribute('x1', '12');
    path3.setAttribute('y1', '3');
    path3.setAttribute('x2', '12');
    path3.setAttribute('y2', '15');
    svg.appendChild(path1); svg.appendChild(path2); svg.appendChild(path3);
  } else if (name === 'barChart') {
    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    path1.setAttribute('x1', '12');
    path1.setAttribute('y1', '20');
    path1.setAttribute('x2', '12');
    path1.setAttribute('y2', '10');
    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    path2.setAttribute('x1', '18');
    path2.setAttribute('y1', '20');
    path2.setAttribute('x2', '18');
    path2.setAttribute('y2', '4');
    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    path3.setAttribute('x1', '6');
    path3.setAttribute('y1', '20');
    path3.setAttribute('x2', '6');
    path3.setAttribute('y2', '16');
    svg.appendChild(path1); svg.appendChild(path2); svg.appendChild(path3);
  } else if (name === 'settings') {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '12');
    circle.setAttribute('cy', '12');
    circle.setAttribute('r', '3');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M12 1v6m0 6v6m11-7h-6m-6 0H1');
    svg.appendChild(circle); svg.appendChild(path);
  } else if (name === 'plus') {
    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    path1.setAttribute('x1', '12');
    path1.setAttribute('y1', '5');
    path1.setAttribute('x2', '12');
    path1.setAttribute('y2', '19');
    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    path2.setAttribute('x1', '5');
    path2.setAttribute('y1', '12');
    path2.setAttribute('x2', '19');
    path2.setAttribute('y2', '12');
    svg.appendChild(path1); svg.appendChild(path2);
  } else if (name === 'minus') {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    path.setAttribute('x1', '5');
    path.setAttribute('y1', '12');
    path.setAttribute('x2', '19');
    path.setAttribute('y2', '12');
    svg.appendChild(path);
  } else if (name === 'chevronDown') {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    path.setAttribute('points', '6 9 12 15 18 9');
    svg.appendChild(path);
  }
  
  return svg;
}

export function createCard(elevated = false): HTMLDivElement {
  const card = document.createElement('div');
  card.style.cssText = `
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.01), transparent), var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    ${elevated ? 'box-shadow: var(--shadow-md);' : ''}
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  `;
  card.addEventListener('mouseenter', () => {
    card.style.borderColor = 'var(--border-strong)';
    card.style.transform = 'translateY(-1px)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.borderColor = 'var(--border)';
    card.style.transform = 'translateY(0)';
  });
  return card;
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
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    outline: none;
  `;
  input.addEventListener('focus', () => {
    input.style.borderColor = 'var(--accent-border)';
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
    padding: var(--space-2) var(--space-3);
    font-family: var(--font-sans);
    font-size: 0.875rem;
    color: var(--text-primary);
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    outline: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%237a7f89' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right var(--space-3) center;
    padding-right: var(--space-10);
  `;
  select.addEventListener('focus', () => {
    select.style.borderColor = 'var(--accent-border)';
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
    gap: var(--space-1);
    padding: 4px;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--radius-pill);
  `;
  const tabButtons: HTMLButtonElement[] = [];
  tabs.forEach((tab) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.dataset.tabId = tab.id;
    btn.textContent = tab.label;
    btn.style.cssText = `
      padding: 6px 16px;
      font-family: var(--font-sans);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-secondary);
      border-radius: var(--radius-pill);
      transition: all 0.2s ease;
    `;
    btn.addEventListener('click', () => {
      setActive(tab.id);
      btn.dispatchEvent(new CustomEvent('tabchange', { detail: { id: tab.id } }));
    });
    container.appendChild(btn);
    tabButtons.push(btn);
  });
  function setActive(id: string) {
    tabButtons.forEach((btn) => {
      if (btn.dataset.tabId === id) {
        btn.style.background = 'var(--bg-hover)';
        btn.style.color = 'var(--text-primary)';
      } else {
        btn.style.background = 'transparent';
        btn.style.color = 'var(--text-secondary)';
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
    padding: 2px 10px;
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border-radius: var(--radius-pill);
    background: ${c.bg};
    color: ${c.color};
    border: 1px solid ${c.border};
  `;
  return badge;
}

export function createTable(headers: string[], rows: string[][]): HTMLTableElement {
  const table = document.createElement('table');
  table.style.cssText = `
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
  `;
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  headers.forEach((h) => {
    const th = document.createElement('th');
    th.textContent = h;
    th.style.cssText = `
      text-align: left;
      padding: var(--space-3) var(--space-4);
      font-family: var(--font-mono);
      font-size: 0.6875rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text-subtle);
      border-bottom: 1px solid var(--border);
      font-weight: 500;
    `;
    tr.appendChild(th);
  });
  thead.appendChild(tr);
  table.appendChild(thead);
  const tbody = document.createElement('tbody');
  rows.forEach((row) => {
    const tr = document.createElement('tr');
    tr.style.cssText = `border-bottom: 1px solid var(--border); transition: background 0.15s ease;`;
    tr.addEventListener('mouseenter', () => { tr.style.background = 'var(--bg-hover)'; });
    tr.addEventListener('mouseleave', () => { tr.style.background = 'transparent'; });
    row.forEach((cell) => {
      const td = document.createElement('td');
      td.textContent = cell;
      td.style.cssText = `padding: var(--space-3) var(--space-4); color: var(--text-secondary);`;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  return table;
}

export function createToast(message: string, variant: 'info' | 'success' | 'error' = 'info'): HTMLDivElement {
  const toast = document.createElement('div');
  const colors = {
    info: { bg: 'var(--bg-elevated)', color: 'var(--text-primary)', border: 'var(--border)' },
    success: { bg: 'var(--success-bg)', color: 'var(--success)', border: 'var(--success-border)' },
    error: { bg: 'var(--danger-bg)', color: 'var(--danger)', border: 'var(--danger-border)' },
  };
  const c = colors[variant];
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: var(--space-6);
    right: var(--space-6);
    padding: var(--space-3) var(--space-5);
    background: ${c.bg};
    color: ${c.color};
    border: 1px solid ${c.border};
    border-radius: var(--radius-lg);
    font-size: 0.875rem;
    box-shadow: var(--shadow-lg);
    z-index: 1000;
    animation: slideUp 0.3s ease;
  `;
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideUp {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
  document.body.appendChild(toast);
  return toast;
}
