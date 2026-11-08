import { Injectable, computed, signal, inject, OnDestroy } from '@angular/core';
import {
  AlgorithmMetadata,
  AlgorithmStep,
  AlgorithmStrategy,
  SupportedLanguage,
} from '../models/algorithm.model';
import { AlgorithmRegistryService } from '../algorithms/algorithm-registry.service';
import { InsertionSortStrategy } from '../algorithms/insertion-sort.strategy';
import { MergeSortStrategy } from '../algorithms/merge-sort.strategy';
import { SequentialSearchStrategy } from '../algorithms/sequential-search.strategy';

export interface ChapterInfo {
  number: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  topics: string[];
  algorithmIds: string[];
  badgeColor: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlgorithmEngineService implements OnDestroy {
  private readonly registry = inject(AlgorithmRegistryService);

  readonly activeView = signal<'chapters' | 'chapter-hub' | 'visualizer' | 'exam'>('chapters');
  readonly selectedChapterNumber = signal<number>(2);
  readonly activeChapterTab = signal<'summary' | 'algorithms'>('summary');

  readonly currentArray = signal<number[]>([29, 10, 14, 37, 13]);
  readonly searchTarget = signal<number>(14); // For Sequential Search
  readonly selectedAlgorithmId = signal<string>('insertion-sort');
  readonly selectedLanguage = signal<SupportedLanguage>('pseudocode');

  readonly currentStepIndex = signal<number>(0);
  readonly isPlaying = signal<boolean>(false);
  readonly playbackSpeedMs = signal<number>(800);

  readonly chapters: ChapterInfo[] = [
    {
      number: 1,
      titleEn: 'The Role of Algorithms in Computing',
      titleAr: 'دور الخوارزميات في الحوسبة',
      descriptionEn: 'Algorithm Definition, Problem-Solving Lifecycle, Correctness vs Efficiency, Euclidean GCD, and the 100x Hardware vs Algorithm Benchmark.',
      descriptionAr: 'تعريف الخوارزمية، دورة حياة حل المشكلات، الصحة والكفاءة، خوارزمية إقليدس GCD، ومقارنة تفوق الخوارزمية على عتاد أسرع بـ 100 مرة.',
      topics: ['Algorithm Definition', 'Problem-Solving Process', 'Correctness & Efficiency', 'Euclidean GCD', 'Hardware vs Algorithm Scaling'],
      algorithmIds: [],
      badgeColor: 'var(--color-beige)',
    },
    {
      number: 2,
      titleEn: 'Getting Started',
      titleAr: 'البداية والترتيب',
      descriptionEn: 'The Sorting Problem, Insertion Sort, RAM Model of Computation, and Divide-and-Conquer Merge Sort.',
      descriptionAr: 'مسألة الترتيب، ترتيب الإدراج، نموذج حاسوب RAM، وشجرة الدمج وفرّق تسد.',
      topics: ['Sorting Problem', 'Insertion Sort', 'RAM Model', 'Divide-and-Conquer', 'Merge Sort Recurrence'],
      algorithmIds: ['insertion-sort', 'merge-sort'],
      badgeColor: 'var(--color-blue)',
    },
    {
      number: 3,
      titleEn: 'Growth of Functions',
      titleAr: 'نمو الدوال والتعقيد',
      descriptionEn: 'Sequential Search, Best vs Worst Case Behavior, and Asymptotic Notations (Big-O, Omega, Theta).',
      descriptionAr: 'البحث التسلسلي، تحليل الحالة الفضلى والأسوأ، ورموز التعقيد المقارب.',
      topics: ['Sequential Search', 'Best vs Worst Case', 'Asymptotic Notation', 'Order of Growth'],
      algorithmIds: ['sequential-search'],
      badgeColor: 'var(--color-green)',
    },
  ];

  readonly catalog = computed<AlgorithmMetadata[]>(() => {
    return this.registry.getCatalog();
  });

  readonly currentChapterAlgorithms = computed<AlgorithmMetadata[]>(() => {
    const chNum = this.selectedChapterNumber();
    return this.registry.getCatalog().filter(algo => algo.chapterNumber === chNum);
  });

  readonly currentChapterInfo = computed<ChapterInfo>(() => {
    const chNum = this.selectedChapterNumber();
    return this.chapters.find(c => c.number === chNum) || this.chapters[0];
  });

  readonly currentAlgorithm = computed<AlgorithmStrategy>(() => {
    return this.registry.get(this.selectedAlgorithmId());
  });

  readonly steps = computed<AlgorithmStep[]>(() => {
    const algorithm = this.currentAlgorithm();
    const arr = this.currentArray();
    const target = this.searchTarget();
    return algorithm.generateSteps(arr, target);
  });

  readonly currentStep = computed<AlgorithmStep | null>(() => {
    const allSteps = this.steps();
    const index = this.currentStepIndex();
    if (!allSteps || allSteps.length === 0) return null;
    const clampedIndex = Math.min(Math.max(index, 0), allSteps.length - 1);
    return allSteps[clampedIndex] ?? null;
  });

  readonly progressPercentage = computed<number>(() => {
    const total = this.steps().length;
    if (total <= 1) return 0;
    return Math.round((this.currentStepIndex() / (total - 1)) * 100);
  });

  readonly activeCodeLine = computed<number>(() => {
    const step = this.currentStep();
    if (!step) return 1;
    const algoId = this.selectedAlgorithmId();
    const lang = this.selectedLanguage();

    if (algoId === 'insertion-sort') {
      return InsertionSortStrategy.getHighlightedLine(step.lineCodeNumber, lang);
    } else if (algoId === 'merge-sort') {
      return MergeSortStrategy.getHighlightedLine(step.lineCodeNumber, lang);
    } else if (algoId === 'sequential-search') {
      return SequentialSearchStrategy.getHighlightedLine(step.lineCodeNumber, lang);
    }
    return 1;
  });

  private timerId: any = null;

  ngOnDestroy(): void {
    this.stopTimer();
  }

  openVisualizer(algorithmId: string): void {
    this.pause();
    this.selectedAlgorithmId.set(algorithmId);
    const algo = this.registry.get(algorithmId);
    if (algo?.metadata?.chapterNumber) {
      this.selectedChapterNumber.set(algo.metadata.chapterNumber);
    }
    this.currentStepIndex.set(0);
    this.activeView.set('visualizer');
  }

  openChapters(): void {
    this.pause();
    this.activeView.set('chapters');
  }

  openExam(): void {
    this.pause();
    this.activeView.set('exam');
  }

  openChapterHub(chapterNumber: number, tab: 'summary' | 'algorithms' = 'summary'): void {
    this.pause();
    this.selectedChapterNumber.set(chapterNumber);
    this.activeChapterTab.set(tab);
    this.activeView.set('chapter-hub');
  }

  setChapterTab(tab: 'summary' | 'algorithms'): void {
    this.activeChapterTab.set(tab);
  }

  openCatalog(): void {
    this.pause();
    // Return to the chapter hub of the current chapter
    this.activeView.set('chapter-hub');
  }

  setSearchTarget(target: number): void {
    this.pause();
    this.searchTarget.set(target);
    this.currentStepIndex.set(0);
  }

  play(): void {
    const total = this.steps().length;
    if (total === 0) return;

    if (this.currentStepIndex() >= total - 1) {
      this.currentStepIndex.set(0);
    }

    this.isPlaying.set(true);
    this.startTimer();
  }

  pause(): void {
    this.isPlaying.set(false);
    this.stopTimer();
  }

  togglePlay(): void {
    if (this.isPlaying()) {
      this.pause();
    } else {
      this.play();
    }
  }

  stepForward(): void {
    this.pause();
    const total = this.steps().length;
    if (this.currentStepIndex() < total - 1) {
      this.currentStepIndex.update((i) => i + 1);
    }
  }

  stepBackward(): void {
    this.pause();
    if (this.currentStepIndex() > 0) {
      this.currentStepIndex.update((i) => i - 1);
    }
  }

  goToStep(index: number): void {
    this.pause();
    const total = this.steps().length;
    const clamped = Math.max(0, Math.min(index, total - 1));
    this.currentStepIndex.set(clamped);
  }

  reset(): void {
    this.pause();
    this.currentStepIndex.set(0);
  }

  setSpeed(speedMs: number): void {
    this.playbackSpeedMs.set(speedMs);
    if (this.isPlaying()) {
      this.stopTimer();
      this.startTimer();
    }
  }

  setLanguage(lang: SupportedLanguage): void {
    this.selectedLanguage.set(lang);
  }

  setCustomArray(numbers: number[]): { success: boolean; message?: string } {
    if (!numbers || numbers.length < 2) {
      return { success: false, message: 'يجب إدخال رقمين على الأقل' };
    }
    if (numbers.length > 16) {
      return { success: false, message: 'الحد الأقصى 16 رقماً' };
    }
    const validNumbers = numbers.map((n) => Math.round(Number(n)));
    if (validNumbers.some((n) => isNaN(n) || !isFinite(n))) {
      return { success: false, message: 'أرقام صحيحة فقط' };
    }

    this.pause();
    this.currentArray.set(validNumbers);
    // If current search target is not in array, pick the first or keep
    this.currentStepIndex.set(0);
    return { success: true };
  }

  setCustomArrayFromString(input: string): { success: boolean; message?: string } {
    if (!input || input.trim().length === 0) {
      return { success: false, message: 'أدخل أرقاماً مفصولة بفواصل' };
    }
    const parts = input
      .split(/[\s,،]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const nums = parts.map(Number);
    if (nums.some((n) => isNaN(n))) {
      return { success: false, message: 'أرقام غير صالحة' };
    }

    return this.setCustomArray(nums);
  }

  generateRandomArray(count = 6): void {
    this.pause();
    const newArr = Array.from({ length: count }, () => Math.floor(Math.random() * 85) + 10);
    this.currentArray.set(newArr);
    this.searchTarget.set(newArr[Math.floor(Math.random() * newArr.length)]);
    this.currentStepIndex.set(0);
  }

  generateReversedArray(count = 6): void {
    this.pause();
    const newArr = Array.from({ length: count }, (_, i) => (count - i) * 12 + 10);
    this.currentArray.set(newArr);
    this.searchTarget.set(newArr[newArr.length - 1]);
    this.currentStepIndex.set(0);
  }

  generateNearlySortedArray(): void {
    this.pause();
    const newArr = [12, 18, 25, 22, 39, 45];
    this.currentArray.set(newArr);
    this.searchTarget.set(25);
    this.currentStepIndex.set(0);
  }

  private startTimer(): void {
    this.stopTimer();
    this.timerId = setInterval(() => {
      const total = this.steps().length;
      if (this.currentStepIndex() < total - 1) {
        this.currentStepIndex.update((i) => i + 1);
      } else {
        this.pause();
      }
    }, this.playbackSpeedMs());
  }

  private stopTimer(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}
