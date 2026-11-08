import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlgorithmEngineService, ChapterInfo } from '../../core/services/algorithm-engine.service';

@Component({
  selector: 'app-chapter-catalog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6 max-w-6xl mx-auto pb-10">
      
      <!-- HERO HEADER -->
      <div class="text-center space-y-3 pt-2 pb-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--color-blue)/15 border border-(--color-blue)/30 text-(--color-blue) text-xs font-mono font-bold tracking-wider uppercase">
          Curriculum Chapters &bull; فصول المنهج
        </div>
        <h1 class="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Select a Chapter to Learn
        </h1>
        <p class="text-sm sm:text-base text-[#828c9b] max-w-2xl mx-auto font-sans leading-relaxed">
          Choose a chapter below to read the comprehensive summary with Mermaid diagrams, or jump directly into the interactive algorithm simulations.
        </p>
      </div>

      <!-- MIDTERM EXAM BANNER -->
      <div class="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-charcoal-850 via-[#121827] to-charcoal-850 border border-(--color-blue)/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4 text-center md:text-left">
          <div class="w-12 h-12 rounded-2xl bg-(--color-blue)/20 border border-(--color-blue)/40 flex items-center justify-center text-2xl shrink-0">
            📝
          </div>
          <div>
            <div class="flex items-center gap-2 justify-center md:justify-start">
              <span class="px-2.5 py-0.5 rounded-full bg-(--color-green)/15 text-(--color-green) border border-(--color-green)/30 text-[10px] font-mono font-bold uppercase">
                Mid 1 Alone
              </span>
              <h2 class="text-lg font-bold text-white">Midterm Exam 1 (امتحان الميد الأول)</h2>
            </div>
            <p class="text-xs text-[#828c9b] mt-1 leading-relaxed">
              25+ سؤال شامل من نماذج امتحانات الميد: أسئلة الاختيار من متعدد، صح وخطأ، تتبع خوارزمية GCD، وجدول التعقيد الزمني مع تتبع Insertion Sort.
            </p>
          </div>
        </div>

        <button
          type="button"
          (click)="engine.openExam()"
          class="px-5 py-2.5 rounded-xl bg-(--color-blue) hover:brightness-110 text-white text-xs font-bold transition shadow-lg shadow-(--color-blue)/20 flex items-center gap-2 active:scale-95 shrink-0">
          <span>دخول قسم امتحان الميد</span>
          <span>➔</span>
        </button>
      </div>

      <!-- CHAPTER CARDS GRID -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        @for (chapter of engine.chapters; track chapter.number) {
          <div
            class="bg-charcoal-850 border border-charcoal-border hover:border-(--color-blue)/60 rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between group hover:shadow-2xl hover:shadow-(--color-blue)/10 relative overflow-hidden">
            
            <!-- Glow Accent -->
            <div
              class="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-40"
              [style.background-color]="chapter.badgeColor">
            </div>

            <div class="space-y-4 relative z-10">
              <!-- Top Badges -->
              <div class="flex items-center justify-between gap-2">
                <span
                  class="px-3 py-1 rounded-xl text-xs font-mono font-bold border"
                  [style.color]="chapter.badgeColor"
                  [style.border-color]="chapter.badgeColor + '55'"
                  [style.background-color]="chapter.badgeColor + '15'">
                  CHAPTER {{ chapter.number }}
                </span>

                <span class="text-xs font-mono text-[#828c9b] bg-charcoal-950 px-2.5 py-1 rounded-lg border border-charcoal-border">
                  {{ chapter.algorithmIds.length }} {{ chapter.algorithmIds.length === 1 ? 'Algorithm' : 'Algorithms' }}
                </span>
              </div>

              <!-- Chapter Titles -->
              <div class="space-y-1">
                <h2 class="text-xl sm:text-2xl font-bold text-white group-hover:text-(--color-blue) transition-colors flex items-center justify-between">
                  <span>{{ chapter.titleEn }}</span>
                  <span class="text-sm font-arabic font-semibold text-[#828c9b]">{{ chapter.titleAr }}</span>
                </h2>
                <p class="text-xs sm:text-sm text-silver-300 font-sans leading-relaxed pt-1">
                  {{ chapter.descriptionEn }}
                </p>
                <p class="text-xs text-[#828c9b] font-arabic leading-relaxed">
                  {{ chapter.descriptionAr }}
                </p>
              </div>

              <!-- Topic Tags -->
              <div class="pt-2">
                <span class="text-[10px] font-mono text-[#828c9b] uppercase tracking-wider block mb-2">Key Topics Covered:</span>
                <div class="flex flex-wrap gap-1.5">
                  @for (topic of chapter.topics; track topic) {
                    <span class="px-2.5 py-0.5 rounded-md bg-charcoal-950 border border-charcoal-border text-[11px] font-mono text-silver-300">
                      {{ topic }}
                    </span>
                  }
                </div>
              </div>
            </div>

            <!-- Action Buttons: Summary vs Algorithms -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-6 mt-4 border-t border-charcoal-border/70 relative z-10">
              <button
                type="button"
                (click)="openChapter(chapter.number, 'summary')"
                class="w-full py-2.5 px-3 rounded-xl bg-charcoal-950 hover:bg-charcoal-800 text-silver-200 hover:text-white border border-charcoal-border hover:border-(--color-blue)/50 text-xs font-bold transition flex items-center justify-center gap-2 active:scale-95 group/btn">
                <span>📖 Read Summary</span>
                <span class="text-(--color-blue) group-hover/btn:translate-x-0.5 transition-transform">➔</span>
              </button>

              <button
                type="button"
                (click)="openChapter(chapter.number, 'algorithms')"
                class="w-full py-2.5 px-3 rounded-xl bg-(--color-blue) hover:brightness-110 text-white text-xs font-bold transition shadow-md shadow-(--color-blue)/20 flex items-center justify-center gap-2 active:scale-95">
                <span>⚡ Interactive Lab</span>
                <span>➔</span>
              </button>
            </div>

          </div>
        }
      </div>

    </div>
  `
})
export class ChapterCatalogComponent {
  protected readonly engine = inject(AlgorithmEngineService);

  openChapter(chapterNumber: number, tab: 'summary' | 'algorithms'): void {
    this.engine.openChapterHub(chapterNumber, tab);
  }
}
