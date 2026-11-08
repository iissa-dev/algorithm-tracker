import { Component, inject, signal, HostListener, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from './shared/components/navbar.component';
import { ChapterCatalogComponent } from './features/catalog/chapter-catalog.component';
import { ChapterHubComponent } from './features/catalog/chapter-hub.component';
import { ArrayVisualizerComponent } from './features/visualizer/array-visualizer.component';
import { AlgorithmControlsComponent } from './features/controls/algorithm-controls.component';
import { ExplanationBoxComponent } from './features/explanation/explanation-box.component';
import { VariableTrackerComponent } from './features/variable-tracker/variable-tracker.component';
import { CodeViewerComponent } from './features/code-viewer/code-viewer.component';
import { MidtermExamComponent } from './features/exam/midterm-exam.component';
import { AlgorithmEngineService } from './core/services/algorithm-engine.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ChapterCatalogComponent,
    ChapterHubComponent,
    ArrayVisualizerComponent,
    AlgorithmControlsComponent,
    ExplanationBoxComponent,
    VariableTrackerComponent,
    CodeViewerComponent,
    MidtermExamComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly platformId = inject(PLATFORM_ID);
  protected readonly isBrowser = isPlatformBrowser(this.platformId);
  protected readonly engine = inject(AlgorithmEngineService);
  protected readonly activeView = this.engine.activeView;
  protected readonly currentAlgorithm = this.engine.currentAlgorithm;

  readonly showScrollTop = signal<boolean>(false);

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.isBrowser) {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      this.showScrollTop.set(scrollY > 250);
    }
  }

  scrollToTop(): void {
    if (this.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
