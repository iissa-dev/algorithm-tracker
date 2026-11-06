import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlgorithmEngineService } from '../../core/services/algorithm-engine.service';

@Component({
  selector: 'app-algorithm-controls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './algorithm-controls.component.html',
})
export class AlgorithmControlsComponent {
  protected readonly engine = inject(AlgorithmEngineService);

  protected readonly isPlaying = this.engine.isPlaying;
  protected readonly currentStep = this.engine.currentStep;
  protected readonly currentStepIndex = this.engine.currentStepIndex;
  protected readonly totalSteps = computed(() => this.engine.steps().length);
  protected readonly progressPct = this.engine.progressPercentage;
  protected readonly playbackSpeed = this.engine.playbackSpeedMs;
  protected readonly isSearchAlgorithm = computed(() => {
    return this.engine.currentAlgorithm().metadata.isSearchAlgorithm === true;
  });

  protected readonly customInputText = signal<string>('29, 10, 14, 37, 13');
  protected readonly searchTargetInput = signal<number>(14);
  protected readonly inputErrorMessage = signal<string | null>(null);
  protected readonly isInputExpanded = signal<boolean>(false);

  togglePlay(): void {
    this.engine.togglePlay();
  }

  next(): void {
    this.engine.stepForward();
  }

  prev(): void {
    this.engine.stepBackward();
  }

  reset(): void {
    this.engine.reset();
  }

  onProgressScrub(event: Event): void {
    const input = event.target as HTMLInputElement;
    const stepVal = parseInt(input.value, 10);
    this.engine.goToStep(stepVal);
  }

  onSpeedChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const speedMs = parseInt(select.value, 10);
    this.engine.setSpeed(speedMs);
  }

  toggleCustomInput(): void {
    this.isInputExpanded.update((v) => !v);
    this.inputErrorMessage.set(null);
  }

  applyCustomArray(): void {
    const res = this.engine.setCustomArrayFromString(this.customInputText());
    if (!res.success) {
      this.inputErrorMessage.set(res.message || 'خطأ في الأرقام المدخلة');
      return;
    }

    if (this.isSearchAlgorithm()) {
      this.engine.setSearchTarget(Number(this.searchTargetInput()));
    }

    this.inputErrorMessage.set(null);
    this.isInputExpanded.set(false);
  }

  setRandomArray(): void {
    this.engine.generateRandomArray(6);
    this.customInputText.set(this.engine.currentArray().join(', '));
    this.searchTargetInput.set(this.engine.searchTarget());
    this.inputErrorMessage.set(null);
  }

  setReversedArray(): void {
    this.engine.generateReversedArray(6);
    this.customInputText.set(this.engine.currentArray().join(', '));
    this.searchTargetInput.set(this.engine.searchTarget());
    this.inputErrorMessage.set(null);
  }

  setNearlySortedArray(): void {
    this.engine.generateNearlySortedArray();
    this.customInputText.set(this.engine.currentArray().join(', '));
    this.searchTargetInput.set(this.engine.searchTarget());
    this.inputErrorMessage.set(null);
  }
}
