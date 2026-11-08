import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlgorithmEngineService } from '../../core/services/algorithm-engine.service';
import { MergeSortTreeComponent } from './merge-sort-tree.component';
import { VideoPlayerComponent } from './video-player.component';

@Component({
  selector: 'app-array-visualizer',
  standalone: true,
  imports: [CommonModule, MergeSortTreeComponent, VideoPlayerComponent],
  templateUrl: './array-visualizer.component.html',
  styleUrl: './array-visualizer.component.css',
})
export class ArrayVisualizerComponent {
  protected readonly engine = inject(AlgorithmEngineService);

  protected readonly currentStep = this.engine.currentStep;
  protected readonly currentAlgorithm = this.engine.currentAlgorithm;

  readonly activeTab = signal<'visualizer' | 'tree' | 'video'>('visualizer');

  protected readonly hasTree = computed(() => {
    return this.currentAlgorithm().metadata.hasTreeVisualization === true;
  });

  protected readonly hasVideo = computed(() => {
    return !!this.currentAlgorithm().metadata.videoUrl;
  });

  protected readonly currentTab = computed<'visualizer' | 'tree' | 'video'>(() => {
    const tab = this.activeTab();
    if (tab === 'tree' && !this.hasTree()) return 'visualizer';
    if (tab === 'video' && !this.hasVideo()) return 'visualizer';
    return tab;
  });

  setTab(tab: 'visualizer' | 'tree' | 'video'): void {
    this.activeTab.set(tab);
  }

  protected readonly isSearchAlgorithm = computed(() => {
    return this.currentAlgorithm().metadata.isSearchAlgorithm === true;
  });

  protected readonly currentArray = computed(() => {
    return this.currentStep()?.array ?? this.engine.currentArray();
  });

  protected readonly maxValue = computed(() => {
    const arr = this.currentArray();
    if (arr.length === 0) return 50;
    return Math.max(...arr, 30);
  });

  // Small, compact box widths for mobile and desktop
  protected readonly boxWidthClass = computed(() => {
    const len = this.currentArray().length;
    if (len <= 6) return 'w-10 sm:w-14';
    if (len <= 10) return 'w-8 sm:w-11';
    return 'w-7 sm:w-9';
  });

  // Small, compact height formula so code is visible on mobile
  getHeightPx(val: number): number {
    const max = this.maxValue();
    const ratio = Math.min(1, Math.max(0.15, val / max));
    // 38px min, 85px max (small and compact)
    return Math.round(38 + ratio * 48);
  }

  isKeySource(index: number): boolean {
    const step = this.currentStep();
    return (
      step !== null &&
      step.key !== null &&
      step.key.fromIndex === index &&
      step.actionType !== 'insert'
    );
  }

  isActive(index: number): boolean {
    const step = this.currentStep();
    return step ? step.activeIndices.includes(index) : false;
  }

  isSorted(index: number): boolean {
    const step = this.currentStep();
    return step ? step.sortedIndices.includes(index) : false;
  }

  isAllSorted(): boolean {
    const step = this.currentStep();
    return step?.actionType === 'all-sorted';
  }

  isFound(index: number): boolean {
    const step = this.currentStep();
    return step?.actionType === 'found' && step.activeIndices.includes(index);
  }

  isComparing(index: number): boolean {
    const step = this.currentStep();
    return step?.actionType === 'compare' && step.activeIndices.includes(index);
  }

  isShifting(index: number): boolean {
    const step = this.currentStep();
    return step?.actionType === 'shift' && step.activeIndices.includes(index);
  }

  isInserting(index: number): boolean {
    const step = this.currentStep();
    return step?.actionType === 'insert' && step.activeIndices.includes(index);
  }

  getAnimationClass(index: number): string {
    if (this.isAllSorted() || this.isFound(index)) return 'anim-all-sorted';
    if (this.isInserting(index)) return 'anim-insert';
    if (this.isShifting(index)) return 'anim-shift';
    if (this.isComparing(index)) return 'anim-compare';
    if (this.isKeySource(index)) return 'anim-key-extract';
    return '';
  }
}
