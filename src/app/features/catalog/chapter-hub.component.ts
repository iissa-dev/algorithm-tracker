import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlgorithmEngineService } from '../../core/services/algorithm-engine.service';
import { Chapter1SummaryComponent } from '../summary/chapter-1-summary.component';
import { Chapter2SummaryComponent } from '../summary/chapter-2-summary.component';
import { AlgorithmMetadata } from '../../core/models/algorithm.model';

@Component({
  selector: 'app-chapter-hub',
  standalone: true,
  imports: [CommonModule, Chapter1SummaryComponent, Chapter2SummaryComponent],
  template: `
    <div class="space-y-6 max-w-6xl mx-auto pb-10">
      
      <!-- TOP NAVIGATION BAR -->
      <div class="p-3.5 sm:p-4 rounded-2xl bg-charcoal-850 border border-charcoal-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
        
        <!-- Left: Back Button + Chapter Details -->
        <div class="flex items-center gap-3">
          <button
            type="button"
            (click)="engine.openChapters()"
            class="px-3 py-1.5 rounded-xl bg-charcoal-950 hover:bg-charcoal-800 border border-charcoal-border text-xs font-semibold text-[#828c9b] hover:text-silver-300 transition flex items-center gap-1.5 font-arabic active:scale-95 shrink-0"
            title="العودة لكل الفصول">
            <span>&larr;</span>
            <span>كل الفصول (All Chapters)</span>
          </button>

          <div class="flex items-center gap-2 flex-wrap">
            <span
              class="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold border"
              [style.color]="currentChapter().badgeColor"
              [style.border-color]="currentChapter().badgeColor + '55'"
              [style.background-color]="currentChapter().badgeColor + '15'">
              Chapter {{ currentChapter().number }}
            </span>
            <h2 class="text-base sm:text-lg font-bold text-white">{{ currentChapter().titleEn }}</h2>
            <span class="text-xs font-arabic text-[#828c9b] font-semibold">({{ currentChapter().titleAr }})</span>
          </div>
        </div>

        <!-- Right: Chapter Tabs Switcher -->
        <div class="flex items-center gap-1.5 bg-charcoal-950 p-1.5 rounded-2xl border border-charcoal-border shrink-0">
          <button
            type="button"
            (click)="engine.setChapterTab('summary')"
            [class.bg-(--color-blue)]="engine.activeChapterTab() === 'summary'"
            [class.text-white]="engine.activeChapterTab() === 'summary'"
            [class.shadow-md]="engine.activeChapterTab() === 'summary'"
            [class.text-[#828c9b]]="engine.activeChapterTab() !== 'summary'"
            class="px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 active:scale-95">
            <span>📖 Chapter Summary</span>
          </button>

          <button
            type="button"
            (click)="engine.setChapterTab('algorithms')"
            [class.bg-(--color-blue)]="engine.activeChapterTab() === 'algorithms'"
            [class.text-white]="engine.activeChapterTab() === 'algorithms'"
            [class.shadow-md]="engine.activeChapterTab() === 'algorithms'"
            [class.text-[#828c9b]]="engine.activeChapterTab() !== 'algorithms'"
            class="px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 active:scale-95">
            <span>⚡ Algorithms ({{ chapterAlgorithms().length }})</span>
          </button>
        </div>

      </div>

      <!-- TAB 1: CHAPTER SUMMARY -->
      @if (engine.activeChapterTab() === 'summary') {
        @if (currentChapter().number === 1) {
          <app-chapter-1-summary></app-chapter-1-summary>
        } @else if (currentChapter().number === 2) {
          <app-chapter-2-summary></app-chapter-2-summary>
        } @else {
          <!-- Chapter 3 Summary Placeholder -->
          <div class="p-8 rounded-3xl bg-charcoal-850 border border-charcoal-border text-center space-y-4 max-w-3xl mx-auto">
            <span class="text-3xl">📐</span>
            <h3 class="text-xl font-bold text-white">Chapter 3: Growth of Functions</h3>
            <p class="text-sm text-silver-300 leading-relaxed font-sans">
              Sequential Search and asymptotic notations (&Theta;, O, &Omega;) are available in the interactive simulation tab!
            </p>
            <button
              (click)="engine.setChapterTab('algorithms')"
              class="px-5 py-2.5 rounded-xl bg-(--color-blue) text-white text-xs font-bold transition hover:brightness-110">
              Open Chapter 3 Algorithms ➔
            </button>
          </div>
        }
      }

      <!-- TAB 2: ALGORITHMS LIST FOR THIS CHAPTER -->
      @if (engine.activeChapterTab() === 'algorithms') {
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-base font-bold text-white font-mono flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-(--color-green)"></span>
              <span>Algorithms in Chapter {{ currentChapter().number }}</span>
            </h3>
            <span class="text-xs text-[#828c9b] font-mono">{{ chapterAlgorithms().length }} Available</span>
          </div>

          @if (chapterAlgorithms().length === 0) {
            <div class="p-8 rounded-3xl bg-charcoal-850 border border-charcoal-border text-center space-y-3">
              <span class="text-3xl">📖</span>
              <h4 class="text-base font-bold text-white">Theoretical Chapter &bull; فصل نظري ومفاهيمي</h4>
              <p class="text-xs text-[#828c9b] max-w-md mx-auto leading-relaxed">
                الفصل الأول مخصص للمفاهيم النظرية التأسيسية (تعريف الخوارزمية، دورة حل المشكلات، خوارزمية إقليدس، وتجربة تفوق الخوارزمية على عتاد أسرع بـ 100 مرة). يرجى الاطلاع على تبويب ملخص الفصل.
              </p>
              <button
                type="button"
                (click)="engine.setChapterTab('summary')"
                class="px-4 py-2 rounded-xl bg-(--color-blue) text-white text-xs font-bold transition hover:brightness-110 active:scale-95">
                قراءة ملخص الفصل الأول ➔
              </button>
            </div>
          } @else {
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5">
              @for (algo of chapterAlgorithms(); track algo.id) {
                <div
                  (click)="onSelectAlgorithm(algo)"
                  class="bg-charcoal-850 border border-charcoal-border hover:border-(--color-blue)/60 rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:shadow-xl hover:shadow-(--color-blue)/10 relative overflow-hidden">
                  
                  <div>
                    <!-- Header badges -->
                    <div class="flex items-center justify-between gap-2 mb-3">
                      <span
                        class="px-2.5 py-1 rounded-lg bg-(--color-blue)/15 text-(--color-blue) border border-(--color-blue)/30 text-xs font-mono font-bold">
                        Chapter {{ algo.chapterNumber }}
                      </span>

                      <div class="flex items-center gap-1.5">
                        @if (algo.videoUrl) {
                          <span
                            class="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-mono flex items-center gap-1 font-arabic"
                            title="يتوفر فيديو شرح تفاعلي">
                            <span>📺</span>
                            <span>فيديو</span>
                          </span>
                        }
                        <span
                          class="px-2.5 py-0.5 rounded-md bg-charcoal-950 text-[10px] text-[#828c9b] font-mono border border-charcoal-border">
                          {{ algo.categoryAr }}
                        </span>
                      </div>
                    </div>

                    <!-- Titles -->
                    <div class="space-y-1 mb-3">
                      <h4 class="text-lg font-bold text-white group-hover:text-(--color-blue) transition-colors flex items-center justify-between">
                        <span>{{ algo.nameEn }}</span>
                        <span class="text-sm font-arabic font-semibold text-[#828c9b]">{{ algo.nameAr }}</span>
                      </h4>
                      <span class="text-[11px] font-mono text-(--color-blue) block">{{ algo.chapterTitle }}</span>
                      <p class="text-xs text-[#828c9b] font-arabic leading-relaxed line-clamp-2 mt-1">
                        {{ algo.descriptionAr }}
                      </p>
                    </div>

                    <!-- Complexity Badges -->
                    <div class="grid grid-cols-3 gap-1.5 my-3.5 pt-3 border-t border-charcoal-border/60 text-center font-mono text-xs">
                      <div class="p-2 rounded-xl bg-charcoal-950 border border-charcoal-border">
                        <span class="text-[10px] text-[#828c9b] block font-sans">Best</span>
                        <span class="font-bold text-(--color-green) text-[11px]">{{ algo.timeComplexity.best }}</span>
                      </div>
                      <div class="p-2 rounded-xl bg-charcoal-950 border border-charcoal-border">
                        <span class="text-[10px] text-[#828c9b] block font-sans">Average</span>
                        <span class="font-bold text-(--color-beige) text-[11px]">{{ algo.timeComplexity.average }}</span>
                      </div>
                      <div class="p-2 rounded-xl bg-charcoal-950 border border-charcoal-border">
                        <span class="text-[10px] text-[#828c9b] block font-sans">Worst</span>
                        <span class="font-bold text-rose-400 text-[11px]">{{ algo.timeComplexity.worst }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Launch Visualizer Button -->
                  <button
                    type="button"
                    (click)="onSelectAlgorithm(algo)"
                    class="w-full py-2.5 rounded-xl bg-(--color-blue) hover:brightness-110 text-white text-xs font-bold transition shadow-md shadow-(--color-blue)/20 flex items-center justify-center gap-2 group-hover:scale-[1.01] active:scale-95 font-arabic mt-1">
                    <span>فتح المحاكي المرئي</span>
                    <span>➔</span>
                  </button>

                </div>
              }
            </div>
          }
        </div>
      }

    </div>
  `
})
export class ChapterHubComponent {
  protected readonly engine = inject(AlgorithmEngineService);
  protected readonly currentChapter = this.engine.currentChapterInfo;
  protected readonly chapterAlgorithms = this.engine.currentChapterAlgorithms;

  onSelectAlgorithm(algo: AlgorithmMetadata): void {
    if (algo.status === 'active') {
      this.engine.openVisualizer(algo.id);
    }
  }
}
