import { createButton, createIcon, createToast } from '../components/UI.ts';

export async function createMigrationPage(): Promise<HTMLElement> {
  const page = document.createElement('div');
  page.style.cssText = 'width: 100%; display: flex; flex-direction: column; min-height: calc(100vh - var(--header-height) - 280px);';

  // Hero
  const hero = document.createElement('section');
  hero.style.cssText = `padding: var(--space-20) var(--space-6) var(--space-12); text-align: center;`;
  hero.innerHTML = `
    <div class="container" style="max-width: 640px;">
      <h1 style="
        font-family: var(--font-sans);
        font-weight: 600;
        font-size: clamp(2rem, 4vw, 3rem);
        line-height: 1.1;
        letter-spacing: -0.02em;
        color: var(--text-primary);
        margin-bottom: var(--space-4);
      ">
        Migration Wizard
      </h1>
      <p style="font-size: 1.125rem; color: var(--text-secondary); line-height: 1.6;">
        Move your strategies from other platforms into Valora. Upload a file, pick a target engine, get runnable code.
      </p>
    </div>
  `;
  page.appendChild(hero);

  // Step indicator
  const steps = document.createElement('section');
  steps.style.cssText = `padding: 0 var(--space-6) var(--space-12);`;
  steps.innerHTML = `
    <div class="container">
      <div style="display: flex; align-items: center; gap: var(--space-4); max-width: 800px; margin: 0 auto;">
        <div style="display: flex; align-items: center; gap: var(--space-2); flex: 1;">
          <div id="step-1" class="step active" style="display: flex; align-items: center; gap: var(--space-2);">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: var(--accent); color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.75rem;">1</div>
            <span style="font-weight: 500; color: var(--text-primary);">Upload</span>
          </div>
          <div style="flex: 1; height: 2px; background: var(--border);"></div>
          <div id="step-2" class="step" style="display: flex; align-items: center; gap: var(--space-2);">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: var(--border); color: var(--text-muted); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.75rem;">2</div>
            <span style="font-weight: 500; color: var(--text-muted);">Map</span>
          </div>
          <div style="flex: 1; height: 2px; background: var(--border);"></div>
          <div id="step-3" class="step" style="display: flex; align-items: center; gap: var(--space-2);">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: var(--border); color: var(--text-muted); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.75rem;">3</div>
            <span style="font-weight: 500; color: var(--text-muted);">Review</span>
          </div>
          <div style="flex: 1; height: 2px; background: var(--border);"></div>
          <div id="step-4" class="step" style="display: flex; align-items: center; gap: var(--space-2);">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: var(--border); color: var(--text-muted); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.75rem;">4</div>
            <span style="font-weight: 500; color: var(--text-muted);">Export</span>
          </div>
        </div>
      </div>
    </div>
  `;
  page.appendChild(steps);

  // Step content container
  const stepContent = document.createElement('section');
  stepContent.style.cssText = `padding: 0 var(--space-6) var(--space-20);`;
  stepContent.innerHTML = `
    <div class="container" style="max-width: 800px; margin: 0 auto;">
      <div id="step-panel-1" class="step-panel">
        <h2 style="font-size: 1.5rem; font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-4);">Upload your strategy</h2>
        <p style="color: var(--text-secondary); margin-bottom: var(--space-6);">Supported formats: Pine Script (.pine), Python (.py), YAML (.yaml), JSON (.json)</p>
        <div id="drop-zone" style="
          border: 2px dashed var(--border);
          border-radius: var(--radius-lg);
          padding: var(--space-16);
          text-align: center;
          background: var(--bg);
          transition: all 0.15s ease;
          cursor: pointer;
        ">
          ${createIcon('upload', 48).outerHTML}
          <p style="margin-top: var(--space-4); color: var(--text-secondary); font-size: 1.125rem;">Drag & drop a file here, or click to browse</p>
          <p style="margin-top: var(--space-2); color: var(--text-muted); font-size: 0.875rem;">Max file size: 10 MB</p>
          <input type="file" id="file-input" accept=".pine,.py,.yaml,.yml,.json" style="display: none;">
        </div>
        <div id="file-info" style="display: none; margin-top: var(--space-6); padding: var(--space-4); background: var(--bg-elevated); border: 1px solid var(--border); border-radius: var(--radius-md);"></div>
        <div style="margin-top: var(--space-6); display: flex; justify-content: flex-end;">
          <div id="step1-next"></div>
        </div>
      </div>

      <div id="step-panel-2" class="step-panel" style="display: none;">
        <h2 style="font-size: 1.5rem; font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-4);">Map to target engine</h2>
        <p style="color: var(--text-secondary); margin-bottom: var(--space-6);">Select which Valora engine should run your migrated strategy.</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
          <div id="engine-vbt" class="engine-option" style="
            padding: var(--space-6);
            border: 2px solid var(--border);
            border-radius: var(--radius-lg);
            cursor: pointer;
            transition: all 0.15s ease;
          ">
            <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-3);">
              <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background: var(--accent-bg); display: flex; align-items: center; justify-content: center; color: var(--accent);">
                ${createIcon('chart', 24).outerHTML}
              </div>
              <div>
                <div style="font-weight: 600; color: var(--text-primary);">VectorBT PRO</div>
                <div style="font-size: 0.875rem; color: var(--text-muted);">Vectorized backtesting</div>
              </div>
            </div>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-2); font-size: 0.875rem; color: var(--text-secondary);">
              <li>${createIcon('check', 16).outerHTML} 10M+ bars/second</li>
              <li>${createIcon('check', 16).outerHTML} Parameter sweeps</li>
              <li>${createIcon('check', 16).outerHTML} Walk-forward analysis</li>
              <li>${createIcon('check', 16).outerHTML} Regime detection</li>
            </ul>
          </div>
          <div id="engine-nautilus" class="engine-option" style="
            padding: var(--space-6);
            border: 2px solid var(--border);
            border-radius: var(--radius-lg);
            cursor: pointer;
            transition: all 0.15s ease;
          ">
            <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-3);">
              <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background: var(--success-bg); display: flex; align-items: center; justify-content: center; color: var(--success);">
                ${createIcon('shield', 24).outerHTML}
              </div>
              <div>
                <div style="font-weight: 600; color: var(--text-primary);">NautilusTrader</div>
                <div style="font-size: 0.875rem; color: var(--text-muted);">Event-driven execution</div>
              </div>
            </div>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-2); font-size: 0.875rem; color: var(--text-secondary);">
              <li>${createIcon('check', 16).outerHTML} Production fidelity</li>
              <li>${createIcon('check', 16).outerHTML} Live trading ready</li>
              <li>${createIcon('check', 16).outerHTML} Multi-venue support</li>
              <li>${createIcon('check', 16).outerHTML} Risk management</li>
            </ul>
          </div>
        </div>
        <div style="margin-top: var(--space-6); display: flex; justify-content: space-between;">
          <div id="step2-back"></div>
          <div id="step2-next"></div>
        </div>
      </div>

      <div id="step-panel-3" class="step-panel" style="display: none;">
        <h2 style="font-size: 1.5rem; font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-4);">Review generated code</h2>
        <p style="color: var(--text-secondary); margin-bottom: var(--space-6);">The migration generated runnable Python code. Review and edit if needed.</p>
        <div style="background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden;">
          <div style="padding: var(--space-3) var(--space-4); background: var(--bg-elevated); border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
            <span style="font-family: var(--font-mono); font-size: 0.875rem; color: var(--text-secondary);">migrated_strategy.py</span>
            <button id="copy-code" class="btn btn-ghost btn-sm" style="padding: var(--space-1) var(--space-3); font-size: 0.8125rem;">Copy</button>
          </div>
          <pre id="generated-code" style="padding: var(--space-4); margin: 0; overflow-x: auto; font-family: var(--font-mono); font-size: 0.8125rem; line-height: 1.6; color: var(--text-primary); max-height: 500px;">
# Generated strategy code will appear here
          </pre>
        </div>
        <div style="margin-top: var(--space-6); display: flex; justify-content: space-between;">
          <div id="step3-back"></div>
          <div id="step3-next"></div>
        </div>
      </div>

      <div id="step-panel-4" class="step-panel" style="display: none;">
        <h2 style="font-size: 1.5rem; font-weight: 600; color: var(--text-primary); margin-bottom: var(--space-4);">Export & deploy</h2>
        <p style="color: var(--text-secondary); margin-bottom: var(--space-6);">Your strategy is ready. Choose how to proceed.</p>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4);">
          <div class="export-option" style="padding: var(--space-6); border: 1px solid var(--border); border-radius: var(--radius-lg); text-align: center;">
            ${createIcon('download', 32).outerHTML}
            <h3 style="margin-top: var(--space-3); font-size: 1rem; font-weight: 600; color: var(--text-primary);">Download Python</h3>
            <p style="margin-top: var(--space-2); color: var(--text-muted); font-size: 0.875rem;">Get the .py file to run locally</p>
            <button id="export-py" class="btn btn-secondary" style="margin-top: var(--space-4); width: 100%;">Download .py</button>
          </div>
          <div class="export-option" style="padding: var(--space-6); border: 1px solid var(--border); border-radius: var(--radius-lg); text-align: center;">
            ${createIcon('upload', 32).outerHTML}
            <h3 style="margin-top: var(--space-3); font-size: 1rem; font-weight: 600; color: var(--text-primary);">Push to Valora</h3>
            <p style="margin-top: var(--space-2); color: var(--text-muted); font-size: 0.875rem;">Import directly into your workspace</p>
            <button id="export-valora" class="btn btn-primary" style="margin-top: var(--space-4); width: 100%;">Import now</button>
          </div>
          <div class="export-option" style="padding: var(--space-6); border: 1px solid var(--border); border-radius: var(--radius-lg); text-align: center;">
            ${createIcon('chart', 32).outerHTML}
            <h3 style="margin-top: var(--space-3); font-size: 1rem; font-weight: 600; color: var(--text-primary);">Run validation</h3>
            <p style="margin-top: var(--space-2); color: var(--text-muted); font-size: 0.875rem;">Go straight to backtest dashboard</p>
            <button id="export-backtest" class="btn btn-secondary" style="margin-top: var(--space-4); width: 100%;">Open backtest</button>
          </div>
        </div>
        <div style="margin-top: var(--space-6); display: flex; justify-content: flex-start;">
          <div id="step4-back"></div>
        </div>
      </div>
    </div>
  `;
  page.appendChild(stepContent);

  // Initialize buttons
  const step1Next = createButton('primary', 'md');
  step1Next.textContent = 'Continue';
  stepContent.querySelector('#step1-next')!.appendChild(step1Next);

  const step2Back = createButton('ghost', 'md');
  step2Back.textContent = 'Back';
  stepContent.querySelector('#step2-back')!.appendChild(step2Back);

  const step2Next = createButton('primary', 'md');
  step2Next.textContent = 'Continue';
  stepContent.querySelector('#step2-next')!.appendChild(step2Next);

  const step3Back = createButton('ghost', 'md');
  step3Back.textContent = 'Back';
  stepContent.querySelector('#step3-back')!.appendChild(step3Back);

  const step3Next = createButton('primary', 'md');
  step3Next.textContent = 'Continue';
  stepContent.querySelector('#step3-next')!.appendChild(step3Next);

  const step4Back = createButton('ghost', 'md');
  step4Back.textContent = 'Back';
  stepContent.querySelector('#step4-back')!.appendChild(step4Back);

  // Step navigation logic
  const totalSteps = 4;
  let selectedEngine = 'vbt';
  let uploadedFile: File | null = null;

  function showStep(step: number) {
    for (let i = 1; i <= totalSteps; i++) {
      const panel = stepContent.querySelector(`#step-panel-${i}`) as HTMLElement;
      const stepEl = stepContent.querySelector(`#step-${i}`) as HTMLElement;
      const numEl = stepEl?.querySelector('div') as HTMLElement;
      if (panel) panel.style.display = i === step ? 'block' : 'none';
      if (numEl) {
        numEl.style.background = i <= step ? 'var(--accent)' : 'var(--border)';
        numEl.style.color = i <= step ? 'white' : 'var(--text-muted)';
      }
      if (stepEl) {
        const label = stepEl.querySelector('span') as HTMLElement;
        if (label) label.style.color = i <= step ? 'var(--text-primary)' : 'var(--text-muted)';
      }
    }
  }

  // Drop zone handling
  const dropZone = stepContent.querySelector('#drop-zone') as HTMLElement;
  const fileInput = stepContent.querySelector('#file-input') as HTMLInputElement;
  const fileInfo = stepContent.querySelector('#file-info') as HTMLElement;

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => {
      dropZone.style.borderColor = 'var(--accent)';
      dropZone.style.background = 'var(--accent-bg)';
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => {
      dropZone.style.borderColor = 'var(--border)';
      dropZone.style.background = 'var(--bg)';
    });
  });

  dropZone.addEventListener('drop', (e) => {
    const files = (e as DragEvent).dataTransfer?.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  });

  dropZone.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files.length > 0) {
      handleFile(fileInput.files[0]);
    }
  });

  function handleFile(file: File) {
    uploadedFile = file;
    fileInfo.style.display = 'block';
    fileInfo.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: var(--space-3);">
          ${createIcon('check', 20).outerHTML}
          <div>
            <div style="font-weight: 500; color: var(--text-primary);">${file.name}</div>
            <div style="font-size: 0.8125rem; color: var(--text-muted);">${(file.size / 1024).toFixed(1)} KB</div>
          </div>
        </div>
        <button id="remove-file" style="color: var(--text-muted); background: none; border: none; cursor: pointer;">Remove</button>
      </div>
    `;
    fileInfo.querySelector('#remove-file')!.addEventListener('click', (e) => {
      e.stopPropagation();
      uploadedFile = null;
      fileInfo.style.display = 'none';
      fileInput.value = '';
    });
  }

  // Engine selection
  const vbtOption = stepContent.querySelector('#engine-vbt') as HTMLElement;
  const nautilusOption = stepContent.querySelector('#engine-nautilus') as HTMLElement;

  function selectEngine(engine: 'vbt' | 'nautilus') {
    selectedEngine = engine;
    vbtOption.style.borderColor = engine === 'vbt' ? 'var(--accent)' : 'var(--border)';
    vbtOption.style.background = engine === 'vbt' ? 'var(--accent-bg)' : 'transparent';
    nautilusOption.style.borderColor = engine === 'nautilus' ? 'var(--success)' : 'var(--border)';
    nautilusOption.style.background = engine === 'nautilus' ? 'var(--success-bg)' : 'transparent';
  }

  vbtOption.addEventListener('click', () => selectEngine('vbt'));
  nautilusOption.addEventListener('click', () => selectEngine('nautilus'));

  // Generated code mock
  const generatedCode = stepContent.querySelector('#generated-code') as HTMLElement;

  function updateGeneratedCode() {
    if (selectedEngine === 'vbt') {
      generatedCode.textContent = `import vectorbtpro as vbt
import pandas as pd
import numpy as np

# Migrated from Pine Script: EMA Crossover
# Source: uploaded_strategy.pine

class EMACrossover(vbt.Portfolio):
    """
    EMA Crossover Strategy
    Fast EMA: 9 periods
    Slow EMA: 21 periods
    """
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
    
    def run(self, close: pd.Series, **kwargs):
        fast_ema = vbt.MA.run(close, window=9, ewm=True).ma
        slow_ema = vbt.MA.run(close, window=21, ewm=True).ma
        
        entries = fast_ema.vbt.crossed_above(slow_ema)
        exits = fast_ema.vbt.crossed_below(slow_ema)
        
        return self.from_signals(close, entries, exits, **kwargs)

# Usage
if __name__ == '__main__':
    data = vbt.YFData.download('BTC-USD', start='2023-01-01').get('Close')
    pf = EMACrossover().run(data, fees=0.001, slippage=0.0005)
    print(pf.stats())
    pf.plot().show()`;
    } else {
      generatedCode.textContent = `from nautilus_trader.trading.strategy import Strategy
from nautilus_trader.model.data import Bar
from nautilus_trader.indicators.ema import ExponentialMovingAverage

# Migrated from Pine Script: EMA Crossover
# Source: uploaded_strategy.pine

class EMACrossover(Strategy):
    """
    EMA Crossover Strategy for NautilusTrader
    Fast EMA: 9 periods
    Slow EMA: 21 periods
    """
    
    def __init__(self, config):
        super().__init__(config)
        self.fast_ema = ExponentialMovingAverage(9)
        self.slow_ema = ExponentialMovingAverage(21)
        self.position = None
    
    def on_start(self):
        self.subscribe_bars(self.config.instrument_id, self.config.bar_type)
    
    def on_bar(self, bar: Bar):
        self.fast_ema.update(bar.close)
        self.slow_ema.update(bar.close)
        
        if self.fast_ema.initialized and self.slow_ema.initialized:
            fast_val = self.fast_ema.value
            slow_val = self.slow_ema.value
            
            if fast_val > slow_val and self.position is None:
                self.buy(self.config.instrument_id, self.config.trade_size)
            elif fast_val < slow_val and self.position is not None:
                self.sell(self.config.instrument_id, self.position.size)

# Configuration
config = EMACrossoverConfig(
    instrument_id="BTCUSDT.BINANCE",
    bar_type="BTCUSDT.BINANCE-1-HOUR-LAST-EXTERNAL",
    trade_size=1.0
)`;
    }
  }

  // Step navigation handlers
  step1Next.addEventListener('click', () => {
    if (!uploadedFile) {
      const toast = createToast('Please upload a strategy file first', 'warning');
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
      return;
    }
    showStep(2);
  });

  step2Back.addEventListener('click', () => showStep(1));
  step2Next.addEventListener('click', () => {
    updateGeneratedCode();
    showStep(3);
  });

  step3Back.addEventListener('click', () => showStep(2));
  step3Next.addEventListener('click', () => showStep(4));

  step4Back.addEventListener('click', () => showStep(3));

  // Copy code
  stepContent.querySelector('#copy-code')!.addEventListener('click', () => {
    navigator.clipboard.writeText(generatedCode.textContent || '');
    const toast = createToast('Code copied to clipboard', 'success');
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  });

  // Export handlers
  stepContent.querySelector('#export-py')!.addEventListener('click', () => {
    const blob = new Blob([generatedCode.textContent || ''], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'migrated_strategy.py';
    a.click();
    URL.revokeObjectURL(url);
    const toast = createToast('Python file downloaded', 'success');
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  });

  stepContent.querySelector('#export-valora')!.addEventListener('click', () => {
    const toast = createToast('Strategy imported to workspace', 'success');
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  });

  stepContent.querySelector('#export-backtest')!.addEventListener('click', () => {
    window.router.navigate('/backtest');
  });

  // Responsive
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .step span { display: none; }
      #step-content > div > div:first-child { flex-direction: column; gap: var(--space-4); }
      .export-options { grid-template-columns: 1fr !important; }
    }
  `;
  document.head.appendChild(style);

  return page;
}