import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/components/navbar.component';
import { AlgorithmCatalogComponent } from './features/catalog/algorithm-catalog.component';
import { ArrayVisualizerComponent } from './features/visualizer/array-visualizer.component';
import { AlgorithmControlsComponent } from './features/controls/algorithm-controls.component';
import { ExplanationBoxComponent } from './features/explanation/explanation-box.component';
import { VariableTrackerComponent } from './features/variable-tracker/variable-tracker.component';
import { CodeViewerComponent } from './features/code-viewer/code-viewer.component';
import { AlgorithmEngineService } from './core/services/algorithm-engine.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    AlgorithmCatalogComponent,
    ArrayVisualizerComponent,
    AlgorithmControlsComponent,
    ExplanationBoxComponent,
    VariableTrackerComponent,
    CodeViewerComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly engine = inject(AlgorithmEngineService);
  protected readonly activeView = this.engine.activeView;
  protected readonly currentAlgorithm = this.engine.currentAlgorithm;
}
