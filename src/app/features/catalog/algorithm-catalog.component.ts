import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlgorithmEngineService } from '../../core/services/algorithm-engine.service';
import { AlgorithmMetadata } from '../../core/models/algorithm.model';

@Component({
  selector: 'app-algorithm-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './algorithm-catalog.component.html',
})
export class AlgorithmCatalogComponent {
  protected readonly engine = inject(AlgorithmEngineService);
  protected readonly catalog = this.engine.catalog;

  onSelectAlgorithm(algo: AlgorithmMetadata): void {
    if (algo.status === 'active') {
      this.engine.openVisualizer(algo.id);
    }
  }
}
