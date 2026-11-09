import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlgorithmEngineService } from '../../core/services/algorithm-engine.service';

@Component({
  selector: 'app-variable-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './variable-tracker.component.html',
})
export class VariableTrackerComponent {
  protected readonly engine = inject(AlgorithmEngineService);
  protected readonly currentStep = this.engine.currentStep;
  protected readonly currentAlgorithm = this.engine.currentAlgorithm;

  protected readonly isSearch = computed(() => {
    return this.currentAlgorithm().metadata.isSearchAlgorithm === true;
  });

  protected readonly isMergeSort = computed(() => {
    return this.currentAlgorithm().metadata.id === 'merge-sort';
  });

  protected readonly isQuickSort = computed(() => {
    return this.currentAlgorithm().metadata.id === 'quick-sort';
  });

  protected readonly variables = computed(() => {
    return this.currentStep()?.variables ?? null;
  });
}
