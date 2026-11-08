import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  signal,
  PLATFORM_ID,
  inject
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

declare global {
  interface Window {
    mermaid?: any;
  }
}

@Component({
  selector: 'app-mermaid-renderer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="my-4 rounded-2xl bg-charcoal-850 border border-charcoal-border overflow-hidden shadow-xl transition-all">
      <!-- Diagram Header Toolbar -->
      <div class="px-3.5 py-2 bg-charcoal-900 border-b border-charcoal-border flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-(--color-blue) animate-pulse"></span>
          <span class="text-xs font-mono font-bold text-silver-300">{{ title || 'Mermaid Diagram' }}</span>
        </div>

        <div class="flex items-center gap-2 flex-wrap">
          <!-- Interactive Zoom / Scale Controls -->
          @if (activeTab() === 'diagram') {
            <div class="flex items-center bg-charcoal-950 px-1.5 py-0.5 rounded-xl border border-charcoal-border text-xs font-mono">
              <button
                type="button"
                (click)="zoomOut()"
                class="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-charcoal-800 text-silver-400 hover:text-white transition active:scale-90 font-bold"
                title="تصغير / Zoom Out">
                &minus;
              </button>
              <button
                type="button"
                (click)="resetZoom()"
                class="px-2 py-0.5 text-[10px] text-silver-400 hover:text-(--color-blue) font-bold transition"
                title="إعادة تعيين الحجم / Reset size">
                {{ zoomLevel() }}%
              </button>
              <button
                type="button"
                (click)="zoomIn()"
                class="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-charcoal-800 text-silver-400 hover:text-white transition active:scale-90 font-bold"
                title="تكبير / Zoom In">
                +
              </button>
            </div>
          }

          <!-- View Toggle -->
          <div class="flex items-center gap-1 bg-charcoal-950 p-1 rounded-xl border border-charcoal-border text-xs">
            <button
              type="button"
              (click)="activeTab.set('diagram')"
              [class.bg-(--color-blue)]="activeTab() === 'diagram'"
              [class.text-white]="activeTab() === 'diagram'"
              [class.text-[#828c9b]]="activeTab() !== 'diagram'"
              class="px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold transition active:scale-95">
              Diagram
            </button>
            <button
              type="button"
              (click)="activeTab.set('code')"
              [class.bg-(--color-blue)]="activeTab() === 'code'"
              [class.text-white]="activeTab() === 'code'"
              [class.text-[#828c9b]]="activeTab() !== 'code'"
              class="px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold transition active:scale-95">
              Mermaid Code
            </button>
          </div>
        </div>
      </div>

      <!-- Diagram View -->
      <div [hidden]="activeTab() !== 'diagram'" class="p-3 sm:p-5 overflow-x-auto flex justify-center items-center min-h-[120px] bg-charcoal-950/40">
        @if (isLoading()) {
          <div class="flex items-center gap-2 text-xs font-mono text-[#828c9b]">
            <span class="animate-spin text-(--color-blue)">⏳</span>
            <span>Rendering diagram...</span>
          </div>
        }
        @if (hasError()) {
          <div class="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
            ⚠️ Unable to render diagram. You can view the raw Mermaid code using the toggle above.
          </div>
        }
        <div #diagramContainer class="mermaid-container w-full flex justify-center items-center text-center"></div>
      </div>

      <!-- Code View -->
      @if (activeTab() === 'code') {
        <div class="relative bg-charcoal-950 p-4 font-mono text-xs text-silver-300 overflow-x-auto border-t border-charcoal-border/50">
          <button
            type="button"
            (click)="copyCode()"
            class="absolute top-3 right-3 px-2 py-1 rounded-md bg-charcoal-800 hover:bg-charcoal-700 text-[10px] text-silver-400 border border-charcoal-border transition active:scale-90">
            {{ isCopied() ? '✓ Copied' : 'Copy' }}
          </button>
          <pre class="text-[#a0bd26] whitespace-pre">{{ code.trim() }}</pre>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    :host ::ng-deep svg {
      display: block;
      margin: 0 auto;
      height: auto !important;
      transition: max-width 0.2s ease;
    }
    :host ::ng-deep .node rect,
    :host ::ng-deep .node circle,
    :host ::ng-deep .node polygon {
      stroke-width: 1.5px !important;
      rx: 6px !important;
      ry: 6px !important;
    }
    :host ::ng-deep .node .label {
      font-size: 12px !important;
      line-height: 1.35 !important;
    }
    :host ::ng-deep .edgeLabel {
      font-size: 11px !important;
      background-color: #06070b !important;
      padding: 1px 4px !important;
      border-radius: 4px !important;
    }
  `]
})
export class MermaidRendererComponent implements AfterViewInit, OnChanges {
  @Input({ required: true }) code!: string;
  @Input() title?: string;
  @Input() maxWidth?: string;

  @ViewChild('diagramContainer') diagramContainer!: ElementRef<HTMLDivElement>;

  readonly activeTab = signal<'diagram' | 'code'>('diagram');
  readonly isLoading = signal<boolean>(true);
  readonly hasError = signal<boolean>(false);
  readonly isCopied = signal<boolean>(false);
  readonly zoomLevel = signal<number>(85); // 85% default compact scale

  private readonly platformId = inject(PLATFORM_ID);
  private static renderCounter = 0;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initAndRender();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['code'] && !changes['code'].firstChange) {
      this.initAndRender();
    } else if (changes['maxWidth'] && !changes['maxWidth'].firstChange) {
      this.applySvgDimensions();
    }
  }

  zoomIn(): void {
    this.zoomLevel.update(z => Math.min(z + 15, 140));
    this.applySvgDimensions();
  }

  zoomOut(): void {
    this.zoomLevel.update(z => Math.max(z - 15, 40));
    this.applySvgDimensions();
  }

  resetZoom(): void {
    this.zoomLevel.set(85);
    this.applySvgDimensions();
  }

  copyCode(): void {
    navigator.clipboard?.writeText(this.code.trim()).then(() => {
      this.isCopied.set(true);
      setTimeout(() => this.isCopied.set(false), 2000);
    });
  }

  private async initAndRender(): Promise<void> {
    if (!this.diagramContainer) return;
    this.isLoading.set(true);
    this.hasError.set(false);

    try {
      await this.ensureMermaidLoaded();

      const mermaid = window.mermaid;
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
          darkMode: true,
          background: '#0e111a',
          primaryColor: '#182239',
          primaryTextColor: '#c9d2dc',
          primaryBorderColor: '#4771b4',
          lineColor: '#b59678',
          secondaryColor: '#1d231a',
          secondaryTextColor: '#c9d2dc',
          secondaryBorderColor: '#a0bd26',
          tertiaryColor: '#1a1829',
          tertiaryTextColor: '#c9d2dc',
          tertiaryBorderColor: '#b59678',
          noteBkgColor: '#141724',
          noteTextColor: '#c9d2dc',
          edgeLabelBackground: '#06070b',
          fontSize: '12px',
          fontFamily: "'JetBrains Mono', 'Plus Jakarta Sans', sans-serif"
        },
        securityLevel: 'loose'
      });

      const uniqueId = `mermaid-svg-${Date.now()}-${++MermaidRendererComponent.renderCounter}`;
      const { svg } = await mermaid.render(uniqueId, this.code.trim());

      if (this.diagramContainer && this.diagramContainer.nativeElement) {
        this.diagramContainer.nativeElement.innerHTML = svg;
        this.applySvgDimensions();
      }
      this.isLoading.set(false);
    } catch (err) {
      console.error('Mermaid render error:', err);
      this.hasError.set(true);
      this.isLoading.set(false);
    }
  }

  private applySvgDimensions(): void {
    if (!this.diagramContainer?.nativeElement) return;
    const svgEl = this.diagramContainer.nativeElement.querySelector('svg');
    if (!svgEl) return;

    const viewBox = svgEl.getAttribute('viewBox');
    let baseWidth = 500;
    if (viewBox) {
      const parts = viewBox.split(/[\s,]+/).filter(Boolean).map(Number);
      if (parts.length === 4 && parts[2] > 0) {
        baseWidth = parts[2];
      }
    }

    if (this.maxWidth) {
      const parsed = parseInt(this.maxWidth, 10);
      if (!isNaN(parsed) && parsed > 0) {
        baseWidth = Math.min(baseWidth, parsed);
      }
    } else {
      // Default maximum natural width: keep compact & prevent oversized bloat
      baseWidth = Math.min(baseWidth, 600);
    }

    const scaledWidth = Math.round(baseWidth * (this.zoomLevel() / 100));
    svgEl.style.maxWidth = `${scaledWidth}px`;
    svgEl.style.width = '100%';
    svgEl.style.height = 'auto';
    svgEl.style.display = 'block';
    svgEl.style.margin = '0 auto';
  }

  private ensureMermaidLoaded(): Promise<void> {
    if (window.mermaid) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector('script[src*="mermaid"]');
      if (existingScript) {
        existingScript.addEventListener('load', () => resolve());
        existingScript.addEventListener('error', () => reject(new Error('Failed to load Mermaid script')));
        if (window.mermaid) {
          resolve();
        }
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
      script.crossOrigin = 'anonymous';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Could not load Mermaid CDN'));
      document.head.appendChild(script);
    });
  }
}
