import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlgorithmEngineService } from '../../core/services/algorithm-engine.service';

@Component({
  selector: 'app-explanation-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './explanation-box.component.html',
})
export class ExplanationBoxComponent {
  protected readonly engine = inject(AlgorithmEngineService);
  protected readonly currentStep = this.engine.currentStep;

  protected readonly phaseBadgeClass = computed(() => {
    const action = this.currentStep()?.actionType;
    switch (action) {
      case 'all-sorted':
        return 'bg-[var(--color-green)]/20 text-[var(--color-green)] border-[var(--color-green)]/40';
      case 'compare':
        return 'bg-[var(--color-beige)]/20 text-[var(--color-beige)] border-[var(--color-beige)]/40';
      case 'shift':
        return 'bg-[var(--color-blue)]/20 text-[var(--color-blue)] border-[var(--color-blue)]/40';
      case 'select-key':
      case 'insert':
        return 'bg-[var(--color-blue)]/20 text-[var(--color-blue)] border-[var(--color-blue)]/40';
      default:
        return 'bg-[#23283c] text-[#c9d2dc] border-[#23283c]';
    }
  });
}
