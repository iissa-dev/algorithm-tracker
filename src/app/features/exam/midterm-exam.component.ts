import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlgorithmEngineService } from '../../core/services/algorithm-engine.service';

export interface McqQuestion {
  id: number;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  category: 'mcq' | 'tf';
  topicTag: string;
}

@Component({
  selector: 'app-midterm-exam',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-8 max-w-5xl mx-auto pb-16 font-sans">
      
      <!-- HERO HEADER -->
      <div class="p-6 sm:p-8 rounded-3xl bg-charcoal-850 border border-charcoal-border shadow-2xl relative overflow-hidden">
        <div class="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-(--color-blue)/15 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-(--color-green)/10 blur-3xl pointer-events-none"></div>

        <div class="relative z-10 space-y-4">
          <div class="flex items-center justify-between gap-3 flex-wrap">
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-full bg-(--color-blue)/15 border border-(--color-blue)/30 text-(--color-blue) text-xs font-mono font-bold tracking-wider uppercase">
                Midterm Exam &bull; امتحان منتصف الفصل
              </span>
              <span class="px-2.5 py-0.5 rounded-md bg-(--color-green)/15 text-(--color-green) text-[11px] font-mono border border-(--color-green)/30">
                Mid 1 Alone
              </span>
            </div>

            <button
              (click)="engine.openChapters()"
              class="px-3.5 py-1.5 rounded-xl bg-charcoal-950 hover:bg-charcoal-800 border border-charcoal-border text-xs font-semibold text-[#828c9b] hover:text-white transition flex items-center gap-1.5 font-arabic active:scale-95">
              <span>&larr;</span>
              <span>العودة لفصول المنهج</span>
            </button>
          </div>

          <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Midterm Exam 1 (بنك أسئلة امتحان الميد الأول)
            </h1>
            <p class="text-sm sm:text-base text-silver-300 leading-relaxed max-w-3xl mt-1">
              جميع أسئلة امتحان الميد (MCQ، True/False، تتبع خوارزمية GCD، وجدول التعقيد الزمني مع تتبع Insertion Sort) مع إمكانية الحل التفاعلي وعرض الشرح المفصل لكل سؤال.
            </p>
          </div>

          <!-- Score & Statistics Bar -->
          <div class="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono">
            <div class="p-2.5 rounded-xl bg-charcoal-950 border border-charcoal-border flex items-center gap-2">
              <span class="text-[#828c9b]">Answered:</span>
              <span class="font-bold text-white">{{ answeredCount() }} / {{ totalQuestionsCount }}</span>
            </div>
            <div class="p-2.5 rounded-xl bg-charcoal-950 border border-charcoal-border flex items-center gap-2">
              <span class="text-[#828c9b]">Score:</span>
              <span class="font-bold text-(--color-green)">{{ score() }} / {{ answeredCount() }}</span>
            </div>
            <button
              (click)="revealAllAnswers.set(!revealAllAnswers())"
              class="px-3 py-2 rounded-xl bg-charcoal-950 hover:bg-charcoal-800 border border-(--color-beige)/40 text-(--color-beige) font-bold text-xs transition active:scale-95">
              {{ revealAllAnswers() ? '👁️ إخفاء الإجابات' : '💡 إظهار جميع الإجابات والشروحات' }}
            </button>
            <button
              (click)="resetQuiz()"
              class="px-3 py-2 rounded-xl bg-charcoal-950 hover:bg-charcoal-800 border border-charcoal-border text-[#828c9b] hover:text-white text-xs transition active:scale-95">
              🔄 إعادة تصفير الإجابات
            </button>
          </div>
        </div>
      </div>

      <!-- FILTER TABS -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-charcoal-border/60 text-xs font-mono">
        <button
          (click)="selectedCategory.set('all')"
          [class.bg-(--color-blue)]="selectedCategory() === 'all'"
          [class.text-white]="selectedCategory() === 'all'"
          [class.text-[#828c9b]]="selectedCategory() !== 'all'"
          class="px-3.5 py-1.5 rounded-xl bg-charcoal-950 border border-charcoal-border font-bold transition shrink-0 active:scale-95">
          All Questions ({{ totalQuestionsCount }})
        </button>
        <button
          (click)="selectedCategory.set('mcq')"
          [class.bg-(--color-blue)]="selectedCategory() === 'mcq'"
          [class.text-white]="selectedCategory() === 'mcq'"
          [class.text-[#828c9b]]="selectedCategory() !== 'mcq'"
          class="px-3.5 py-1.5 rounded-xl bg-charcoal-950 border border-charcoal-border font-bold transition shrink-0 active:scale-95">
          Multiple Choice ({{ mcqQuestions.length }})
        </button>
        <button
          (click)="selectedCategory.set('tf')"
          [class.bg-(--color-blue)]="selectedCategory() === 'tf'"
          [class.text-white]="selectedCategory() === 'tf'"
          [class.text-[#828c9b]]="selectedCategory() !== 'tf'"
          class="px-3.5 py-1.5 rounded-xl bg-charcoal-950 border border-charcoal-border font-bold transition shrink-0 active:scale-95">
          True / False ({{ tfQuestions.length }})
        </button>
        <button
          (click)="selectedCategory.set('trace')"
          [class.bg-(--color-blue)]="selectedCategory() === 'trace'"
          [class.text-white]="selectedCategory() === 'trace'"
          [class.text-[#828c9b]]="selectedCategory() !== 'trace'"
          class="px-3.5 py-1.5 rounded-xl bg-charcoal-950 border border-charcoal-border font-bold transition shrink-0 active:scale-95">
          Algorithm Tracing (GCD)
        </button>
        <button
          (click)="selectedCategory.set('written')"
          [class.bg-(--color-blue)]="selectedCategory() === 'written'"
          [class.text-white]="selectedCategory() === 'written'"
          [class.text-[#828c9b]]="selectedCategory() !== 'written'"
          class="px-3.5 py-1.5 rounded-xl bg-charcoal-950 border border-charcoal-border font-bold transition shrink-0 active:scale-95">
          Complexity &amp; Insertion Sort Trace
        </button>
      </div>

      <!-- QUESTIONS LIST -->
      @if (selectedCategory() === 'all' || selectedCategory() === 'mcq' || selectedCategory() === 'tf') {
        <div class="space-y-4">
          @for (q of filteredQuestions(); track q.id) {
            <div class="p-5 sm:p-6 rounded-2xl bg-charcoal-850 border border-charcoal-border space-y-4 transition-all">
              
              <!-- Question Header -->
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-2.5">
                  <span class="w-7 h-7 rounded-lg bg-(--color-blue)/20 text-(--color-blue) flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    Q{{ q.id }}
                  </span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono border border-charcoal-border bg-charcoal-950 text-[#828c9b]">
                    {{ q.topicTag }}
                  </span>
                </div>

                @if (userAnswers()[q.id]) {
                  <span
                    class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold"
                    [class.bg-emerald-500/15]="userAnswers()[q.id] === q.correctAnswer"
                    [class.text-emerald-400]="userAnswers()[q.id] === q.correctAnswer"
                    [class.bg-rose-500/15]="userAnswers()[q.id] !== q.correctAnswer"
                    [class.text-rose-400]="userAnswers()[q.id] !== q.correctAnswer">
                    {{ userAnswers()[q.id] === q.correctAnswer ? '✓ Correct' : '✗ Incorrect' }}
                  </span>
                }
              </div>

              <!-- Question Text -->
              <h3 class="text-sm sm:text-base font-semibold text-white leading-relaxed">
                {{ q.question }}
              </h3>

              <!-- Options Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                @for (opt of q.options; track opt.label) {
                  <button
                    type="button"
                    (click)="selectAnswer(q.id, opt.label)"
                    [class.border-(--color-blue)]="userAnswers()[q.id] === opt.label && userAnswers()[q.id] !== q.correctAnswer"
                    [class.bg-(--color-blue)/15]="userAnswers()[q.id] === opt.label && userAnswers()[q.id] !== q.correctAnswer"
                    [class.border-emerald-500]="(userAnswers()[q.id] && opt.label === q.correctAnswer) || revealAllAnswers()"
                    [class.bg-emerald-500/15]="(userAnswers()[q.id] && opt.label === q.correctAnswer) || revealAllAnswers()"
                    [class.border-charcoal-border]="userAnswers()[q.id] !== opt.label && !(revealAllAnswers() && opt.label === q.correctAnswer)"
                    class="p-3 rounded-xl border text-left text-xs transition flex items-center gap-3 active:scale-98 group cursor-pointer hover:bg-charcoal-800">
                    
                    <span
                      class="w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0"
                      [class.bg-emerald-500]="(userAnswers()[q.id] && opt.label === q.correctAnswer) || (revealAllAnswers() && opt.label === q.correctAnswer)"
                      [class.text-charcoal-950]="(userAnswers()[q.id] && opt.label === q.correctAnswer) || (revealAllAnswers() && opt.label === q.correctAnswer)"
                      [class.bg-(--color-blue)]="userAnswers()[q.id] === opt.label && opt.label !== q.correctAnswer"
                      [class.text-white]="userAnswers()[q.id] === opt.label && opt.label !== q.correctAnswer"
                      [class.bg-charcoal-950]="userAnswers()[q.id] !== opt.label && !(revealAllAnswers() && opt.label === q.correctAnswer)"
                      [class.text-silver-300]="userAnswers()[q.id] !== opt.label && !(revealAllAnswers() && opt.label === q.correctAnswer)">
                      {{ opt.label }}
                    </span>

                    <span class="text-silver-200 leading-snug">{{ opt.text }}</span>
                  </button>
                }
              </div>

              <!-- Explanation Dropdown -->
              @if (userAnswers()[q.id] || revealAllAnswers()) {
                <div class="mt-3 p-3.5 rounded-xl bg-charcoal-950 border border-charcoal-border text-xs space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-(--color-green) font-mono">Correct Answer: ({{ q.correctAnswer }})</span>
                  </div>
                  <p class="text-[#828c9b] font-sans leading-relaxed">{{ q.explanation }}</p>
                </div>
              }

            </div>
          }
        </div>
      }

      <!-- PART 3: ALGORITHM TRACING (GCD) -->
      @if (selectedCategory() === 'all' || selectedCategory() === 'trace') {
        <div class="p-6 rounded-2xl bg-charcoal-850 border border-charcoal-border space-y-5">
          <div class="flex items-center justify-between border-b border-charcoal-border/60 pb-3">
            <div class="flex items-center gap-2.5">
              <span class="w-7 h-7 rounded-lg bg-(--color-beige)/20 text-(--color-beige) flex items-center justify-center font-mono font-bold text-xs shrink-0">
                TRACE
              </span>
              <h2 class="text-lg font-bold text-white">Algorithm Tracing: Euclidean GCD Algorithm</h2>
            </div>
            <span class="text-xs font-mono text-[#828c9b]">Exam Paper 3</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Code snippet -->
            <div class="bg-charcoal-950 p-4 rounded-xl border border-charcoal-border font-mono text-xs text-silver-300">
              <span class="text-(--color-beige) font-bold block mb-2">// Given Algorithm:</span>
              <pre class="text-[#a0bd26] leading-relaxed">GCD(x, y) &#123;
  while (y != 0) &#123;
    t = mod(x, y)
    x = y
    y = t
  &#125;
  Output x
&#125;</pre>
              <div class="mt-3 pt-3 border-t border-charcoal-border text-silver-400">
                <strong class="text-white">Input Data:</strong> <code class="text-(--color-blue)">x = 32, y = 80</code>
              </div>
            </div>

            <!-- Trace explanation -->
            <div class="space-y-3 text-xs">
              <h4 class="font-bold text-white font-mono">Trace Execution Table:</h4>
              <div class="overflow-x-auto">
                <table class="w-full text-left font-mono border-collapse">
                  <thead>
                    <tr class="bg-charcoal-950 text-[#828c9b] border-b border-charcoal-border">
                      <th class="p-2">Step</th>
                      <th class="p-2">t = mod(x, y)</th>
                      <th class="p-2">x</th>
                      <th class="p-2">y</th>
                      <th class="p-2">Condition (y != 0)</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-charcoal-border/50 text-silver-300">
                    <tr>
                      <td class="p-2 text-[#828c9b]">Initial</td>
                      <td class="p-2">-</td>
                      <td class="p-2 text-white font-bold">32</td>
                      <td class="p-2 text-white font-bold">80</td>
                      <td class="p-2 text-(--color-green)">True (80 != 0)</td>
                    </tr>
                    <tr class="bg-charcoal-900/40">
                      <td class="p-2 text-[#828c9b]">Iter 1</td>
                      <td class="p-2 text-(--color-beige)">mod(32, 80) = 32</td>
                      <td class="p-2 text-white font-bold">80</td>
                      <td class="p-2 text-white font-bold">32</td>
                      <td class="p-2 text-(--color-green)">True (32 != 0)</td>
                    </tr>
                    <tr>
                      <td class="p-2 text-[#828c9b]">Iter 2</td>
                      <td class="p-2 text-(--color-beige)">mod(80, 32) = 16</td>
                      <td class="p-2 text-white font-bold">32</td>
                      <td class="p-2 text-white font-bold">16</td>
                      <td class="p-2 text-(--color-green)">True (16 != 0)</td>
                    </tr>
                    <tr class="bg-charcoal-900/40">
                      <td class="p-2 text-[#828c9b]">Iter 3</td>
                      <td class="p-2 text-(--color-beige)">mod(32, 16) = 0</td>
                      <td class="p-2 text-emerald-400 font-bold">16</td>
                      <td class="p-2 text-rose-400 font-bold">0</td>
                      <td class="p-2 text-rose-400">False (0 != 0 is False)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="p-3 rounded-xl bg-charcoal-950 border border-(--color-green)/30 text-(--color-green) font-mono">
                🎉 Final Output: <strong>x = 16</strong> (The Greatest Common Divisor of 32 and 80 is 16).
              </div>
            </div>
          </div>
        </div>
      }

      <!-- PART 4: COMPLEXITY TABLE & INSERTION SORT TRACE -->
      @if (selectedCategory() === 'all' || selectedCategory() === 'written') {
        <div class="space-y-6">
          
          <!-- Written Question A: Complexity Table -->
          <div class="p-6 rounded-2xl bg-charcoal-850 border border-charcoal-border space-y-4">
            <div class="flex items-center justify-between border-b border-charcoal-border/60 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-7 h-7 rounded-lg bg-(--color-blue)/20 text-(--color-blue) flex items-center justify-center font-mono font-bold text-xs shrink-0">
                  SEC 2A
                </span>
                <h3 class="text-base font-bold text-white">Fill in Time Complexity Table (4 Points)</h3>
              </div>
              <span class="text-xs font-mono text-[#828c9b]">Exam Paper 4</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-xs font-mono text-left border-collapse">
                <thead>
                  <tr class="bg-charcoal-950 border-b border-charcoal-border text-[#828c9b]">
                    <th class="p-3">Algorithm</th>
                    <th class="p-3">Average Case Time</th>
                    <th class="p-3">Worst Case Time</th>
                    <th class="p-3">Notes &amp; Reason</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-charcoal-border/50 text-silver-300">
                  <tr class="hover:bg-charcoal-800/40">
                    <td class="p-3 font-bold text-white">Insertion sort</td>
                    <td class="p-3 text-(--color-beige) font-bold">O(n²) [or &Theta;(n²)]</td>
                    <td class="p-3 text-rose-400 font-bold">O(n²) [or &Theta;(n²)]</td>
                    <td class="p-3 text-[#828c9b] font-sans">Elements must be shifted backwards to find position.</td>
                  </tr>
                  <tr class="hover:bg-charcoal-800/40">
                    <td class="p-3 font-bold text-white">Linear search</td>
                    <td class="p-3 text-(--color-beige) font-bold">O(n) [or &Theta;(n)]</td>
                    <td class="p-3 text-rose-400 font-bold">O(n) [or &Theta;(n)]</td>
                    <td class="p-3 text-[#828c9b] font-sans">Scans up to n elements if item is at the end or absent.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Written Question B: Insertion Sort Operation Trace -->
          <div class="p-6 rounded-2xl bg-charcoal-850 border border-charcoal-border space-y-4">
            <div class="flex items-center justify-between border-b border-charcoal-border/60 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-7 h-7 rounded-lg bg-(--color-green)/20 text-(--color-green) flex items-center justify-center font-mono font-bold text-xs shrink-0">
                  SEC 2B
                </span>
                <h3 class="text-base font-bold text-white">
                  Illustrate the operation of INSERTION-SORT on array A = &lang; 40, 15, 30, 5, 25, 10, 20, 35 &rang; (6 Points)
                </h3>
              </div>
              <span class="text-xs font-mono text-[#828c9b]">Exam Paper 4</span>
            </div>

            <p class="text-xs text-silver-300 leading-relaxed font-sans">
              Step-by-step trace showing each pass of the outer loop <code class="text-white font-mono">i</code>, the extracted <code class="text-(--color-beige) font-mono">key</code>, and the resulting sorted prefix:
            </p>

            <div class="space-y-2 font-mono text-xs">
              @for (step of insertionSortSteps; track step.pass) {
                <div class="p-3 rounded-xl bg-charcoal-950 border border-charcoal-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div class="flex items-center gap-2.5">
                    <span class="px-2 py-0.5 rounded bg-charcoal-900 border border-charcoal-border text-[11px] text-(--color-blue) font-bold shrink-0">
                      {{ step.pass }}
                    </span>
                    <span class="text-white font-bold">{{ step.array }}</span>
                  </div>
                  <span class="text-[#828c9b] text-[11px] font-sans">{{ step.action }}</span>
                </div>
              }
            </div>

            <div class="p-3.5 rounded-xl bg-(--color-green)/10 border border-(--color-green)/30 text-xs font-mono text-(--color-green) flex items-center gap-2">
              <span>✓ Final Sorted Array:</span>
              <strong class="text-white">&lang; 5, 10, 15, 20, 25, 30, 35, 40 &rang;</strong>
            </div>
          </div>

        </div>
      }

    </div>
  `
})
export class MidtermExamComponent {
  protected readonly engine = inject(AlgorithmEngineService);

  readonly selectedCategory = signal<'all' | 'mcq' | 'tf' | 'trace' | 'written'>('all');
  readonly userAnswers = signal<Record<number, string>>({});
  readonly revealAllAnswers = signal<boolean>(false);

  readonly mcqQuestions: McqQuestion[] = [
    {
      id: 1,
      question: 'The main measure\\s for the efficiency of an algorithm are:',
      options: [
        { label: 'A', text: 'Processor' },
        { label: 'B', text: 'throughput' },
        { label: 'C', text: 'information' },
        { label: 'D', text: 'space' },
      ],
      correctAnswer: 'D',
      explanation: 'Algorithm efficiency is measured primarily by time (running time) and space (memory consumption). Among the choices, (D) space is the valid efficiency resource.',
      category: 'mcq',
      topicTag: 'Efficiency Resources',
    },
    {
      id: 2,
      question: 'The time factor when determining the efficiency of algorithm is measured by ______:',
      options: [
        { label: 'A', text: 'Counting the maximum memory needed by the algorithm' },
        { label: 'B', text: 'Counting the minimum memory needed by the algorithm' },
        { label: 'C', text: 'Counting the number of key operations' },
        { label: 'D', text: 'Counting the number of statements' },
      ],
      correctAnswer: 'C',
      explanation: 'In algorithm analysis, time efficiency is theoretically evaluated by counting the number of fundamental key operations (comparisons, arithmetic steps) executed as a function of input size.',
      category: 'mcq',
      topicTag: 'Time Factor',
    },
    {
      id: 3,
      question: 'Let algorithm A take 2n³ and algorithm B take 20n². Algorithm B is faster than algorithm A for all values starting from n = :',
      options: [
        { label: 'A', text: '8' },
        { label: 'B', text: '12' },
        { label: 'C', text: '6' },
        { label: 'D', text: '10' },
      ],
      correctAnswer: 'B',
      explanation: 'Set 20n² < 2n³. Divide both sides by 2n²: 10 < n ⟹ n ≥ 11. At n = 10, both take 2000 steps (equal). Algorithm B is strictly faster starting from n = 11, so among the options (8, 12, 6, 10), starting from n = 12 (or values > 10) Algorithm B is faster.',
      category: 'mcq',
      topicTag: 'Order of Growth',
    },
    {
      id: 4,
      question: 'The program (code) of the problem-solving process directly comes after:',
      options: [
        { label: 'A', text: 'Analysis of the problem' },
        { label: 'B', text: 'Problem specification' },
        { label: 'C', text: 'Implementing the algorithm' },
        { label: 'D', text: 'Compiling the program' },
      ],
      correctAnswer: 'C',
      explanation: 'The problem-solving cycle is: Specification ➔ Analysis ➔ Algorithm Design ➔ Implementation / Coding ➔ Compiling & Testing.',
      category: 'mcq',
      topicTag: 'Problem Solving Process',
    },
    {
      id: 5,
      question: 'Algorithm P with running time n³ solves an instance of size 500 in 4 seconds. How long will it take for P to solve an instance of size 1000?',
      options: [
        { label: 'A', text: '32 seconds' },
        { label: 'B', text: '27 seconds' },
        { label: 'C', text: '16 seconds' },
        { label: 'D', text: '12 seconds' },
      ],
      correctAnswer: 'A',
      explanation: 'The input size doubles: 1000 / 500 = 2. Since running time is cubic (n³), the time multiplies by 2³ = 8. Therefore, 4 seconds × 8 = 32 seconds!',
      category: 'mcq',
      topicTag: 'Cubic Growth Scaling',
    },
    {
      id: 6,
      question: 'What is the result of GCD(16, 20) according to the Euclidean algorithm?',
      options: [
        { label: 'A', text: '4' },
        { label: 'B', text: '3' },
        { label: 'C', text: '6' },
        { label: 'D', text: '2' },
      ],
      correctAnswer: 'A',
      explanation: 'Iter 1: mod(16, 20) = 16, x=20, y=16. Iter 2: mod(20, 16) = 4, x=16, y=4. Iter 3: mod(16, 4) = 0, x=4, y=0. Output x = 4.',
      category: 'mcq',
      topicTag: 'GCD Algorithm',
    },
    {
      id: 7,
      question: 'What operation does Insertion Sort use to slide the sorted list to the right one by one until finding the right location?',
      options: [
        { label: 'A', text: 'Finding the minimum value' },
        { label: 'B', text: 'Swapping' },
        { label: 'C', text: 'Finding out a pivot value' },
        { label: 'D', text: 'Shifting' },
      ],
      correctAnswer: 'D',
      explanation: 'Insertion sort slides elements to the right via shifting: A[j+1] = A[j] until key finds its proper place.',
      category: 'mcq',
      topicTag: 'Insertion Sort Operations',
    },
    {
      id: 8,
      question: 'If all elements in an input array are equal, for example {2, 2, 2, 2, 2, 2}, what would be the running time of the Insertion Sort algorithm?',
      options: [
        { label: 'A', text: 'O(2ⁿ)' },
        { label: 'B', text: 'None of these' },
        { label: 'C', text: 'O(n²)' },
        { label: 'D', text: 'O(n)' },
      ],
      correctAnswer: 'D',
      explanation: 'When all elements are equal, the condition (A[j] > key) is immediately false on every iteration. The while loop body never executes, resulting in best-case O(n) linear time!',
      category: 'mcq',
      topicTag: 'Best-Case Insertion Sort',
    },
    {
      id: 9,
      question: 'Which of the following 5-element arrays would take the most number of comparisons in the Insertion Sort code?',
      options: [
        { label: 'A', text: '1, 3, 5, 2, 4' },
        { label: 'B', text: '1, 2, 5, 3, 4' },
        { label: 'C', text: '5, 2, 3, 4, 1' },
        { label: 'D', text: '5, 4, 3, 2, 1' },
      ],
      correctAnswer: 'D',
      explanation: 'A reverse sorted array (5, 4, 3, 2, 1) is the worst-case scenario for Insertion Sort, requiring the maximum number of comparisons and shifts: n(n-1)/2.',
      category: 'mcq',
      topicTag: 'Worst-Case Array',
    },
    {
      id: 10,
      question: 'In Insertion Sort, which of the lines (line 3: j = i - 1 and line 8: A[j+1] = key) takes shorter to run for a sorted array?',
      options: [
        { label: 'A', text: 'Same time' },
        { label: 'B', text: 'depends on the array size' },
        { label: 'C', text: 'line 6' },
        { label: 'D', text: 'line 8' },
      ],
      correctAnswer: 'A',
      explanation: 'Both line 3 and line 8 are located directly inside the outer for-loop (i = 2 to n). Neither is inside the while loop, so both execute exactly n-1 times regardless of whether the array is sorted.',
      category: 'mcq',
      topicTag: 'Code Cost Analysis',
    },
    {
      id: 11,
      question: 'Consider partially sorted array [1, 3, 6, 8, 9 || 5, 2]. How many comparisons and swaps/shifts are needed to insert the next number (5)?',
      options: [
        { label: 'A', text: '2 comparisons, 3 swaps' },
        { label: 'B', text: '3 comparisons, 2 swaps' },
        { label: 'C', text: '4 comparisons, 3 swaps' },
        { label: 'D', text: '3 comparisons, 4 swaps' },
      ],
      correctAnswer: 'C',
      explanation: 'Compare 5 with 9 (shift 9), compare with 8 (shift 8), compare with 6 (shift 6), compare with 3 (3 < 5 ➔ stop!). That is 4 comparisons and 3 shifts.',
      category: 'mcq',
      topicTag: 'Insertion Step Analysis',
    },
    {
      id: 12,
      question: 'What term is used to describe an O(n²) algorithm?',
      options: [
        { label: 'A', text: 'Constant' },
        { label: 'B', text: 'Linear' },
        { label: 'C', text: 'Quadratic' },
        { label: 'D', text: 'Logarithmic' },
      ],
      correctAnswer: 'C',
      explanation: 'O(1) is constant, O(n) is linear, O(log n) is logarithmic, and O(n²) is quadratic.',
      category: 'mcq',
      topicTag: 'Complexity Terminology',
    },
    {
      id: 13,
      question: 'The running time of Merge Sort is:',
      options: [
        { label: 'A', text: 'd · n' },
        { label: 'B', text: 'c · n' },
        { label: 'C', text: 'n log n' },
        { label: 'D', text: 'a · n' },
      ],
      correctAnswer: 'C',
      explanation: 'Merge sort runs in Θ(n log n) in all cases (best, average, and worst).',
      category: 'mcq',
      topicTag: 'Merge Sort Complexity',
    },
    {
      id: 14,
      question: 'What is a finite set of steps for carrying out a specific task called?',
      options: [
        { label: 'A', text: 'Data packages' },
        { label: 'B', text: 'Source code' },
        { label: 'C', text: 'Algorithm' },
        { label: 'D', text: 'Programming' },
      ],
      correctAnswer: 'C',
      explanation: 'An algorithm is defined as a well-defined computational procedure that takes some value as input and produces some value as output through a finite set of steps.',
      category: 'mcq',
      topicTag: 'Algorithm Definition',
    },
    {
      id: 15,
      question: 'All the following are fundamental parts of an algorithm except:',
      options: [
        { label: 'A', text: 'Compiler' },
        { label: 'B', text: 'Variables / Steps' },
        { label: 'C', text: 'Input' },
        { label: 'D', text: 'Output' },
      ],
      correctAnswer: 'A',
      explanation: 'A compiler is software that translates source code to machine code; it is NOT part of an algorithm definition (which consists of Input, Output, and Steps).',
      category: 'mcq',
      topicTag: 'Algorithm Components',
    },
    {
      id: 16,
      question: 'The worst case occurs in the linear search algorithm when:',
      options: [
        { label: 'A', text: 'Item is somewhere in the middle of the array.' },
        { label: 'B', text: 'Item is not in the array at all.' },
        { label: 'C', text: 'Item is the last element in the array.' },
        { label: 'D', text: 'Item is the last element in the array or is not there at all.' },
      ],
      correctAnswer: 'D',
      explanation: 'In both cases (item at the last position n, or item completely missing), linear search must inspect all n elements, taking the maximum time n.',
      category: 'mcq',
      topicTag: 'Linear Search Worst Case',
    },
    {
      id: 17,
      question: 'A Merge Sort divides the unsorted array into:',
      options: [
        { label: 'A', text: '3 sublists of equal size' },
        { label: 'B', text: '4 sublists of equal size' },
        { label: 'C', text: '10 sublists of equal size' },
        { label: 'D', text: '2 sublists of equal size' },
      ],
      correctAnswer: 'D',
      explanation: 'Merge sort splits the array into 2 halves of size n/2 around the midpoint.',
      category: 'mcq',
      topicTag: 'Merge Sort Halves',
    },
    {
      id: 18,
      question: 'What is the running time of the loop: for (int i = 0; i < k % 100; ++i) in Big-Oh notation?',
      options: [
        { label: 'A', text: 'O(k²)' },
        { label: 'B', text: 'O(k)' },
        { label: 'C', text: 'O(log k)' },
        { label: 'D', text: 'O(1)' },
      ],
      correctAnswer: 'D',
      explanation: 'Because (k % 100) is bounded between 0 and 99, the loop executes at most 99 times regardless of how large k is. A constant number of iterations is O(1)!',
      category: 'mcq',
      topicTag: 'Asymptotic Bounds',
    },
    {
      id: 19,
      question: 'What is efficiency related to?',
      options: [
        { label: 'A', text: 'Output format' },
        { label: 'B', text: 'Speed and memory usage' },
        { label: 'C', text: 'Input type' },
        { label: 'D', text: 'Programming language' },
      ],
      correctAnswer: 'B',
      explanation: 'Algorithm efficiency is fundamentally defined by execution speed (time complexity) and memory consumption (space complexity).',
      category: 'mcq',
      topicTag: 'Efficiency Definition',
    },
    {
      id: 20,
      question: 'What does the function mod(a, b) return?',
      options: [
        { label: 'A', text: 'Division result' },
        { label: 'B', text: 'Multiplication' },
        { label: 'C', text: 'Remainder' },
        { label: 'D', text: 'Power' },
      ],
      correctAnswer: 'C',
      explanation: 'The modulo operation mod(a, b) computes the integer remainder after division of a by b.',
      category: 'mcq',
      topicTag: 'Modulo Operation',
    },
    {
      id: 21,
      question: 'Which algorithm is faster for very large inputs?',
      options: [
        { label: 'A', text: 'Insertion Sort' },
        { label: 'B', text: 'Merge Sort' },
        { label: 'C', text: 'Both equal' },
        { label: 'D', text: 'None' },
      ],
      correctAnswer: 'B',
      explanation: 'Merge sort has O(n log n) running time, which grows much slower than Insertion Sort O(n²), making it dramatically faster for large n.',
      category: 'mcq',
      topicTag: 'Algorithm Comparison',
    },
    {
      id: 22,
      question: 'What is a procedure?',
      options: [
        { label: 'A', text: 'Variable' },
        { label: 'B', text: 'Named sequence of instructions' },
        { label: 'C', text: 'Loop' },
        { label: 'D', text: 'Condition' },
      ],
      correctAnswer: 'B',
      explanation: 'A procedure (or function/subroutine) is a named sequence of instructions that performs a specific task and can be called repeatedly.',
      category: 'mcq',
      topicTag: 'Procedure Definition',
    },
  ];

  readonly tfQuestions: McqQuestion[] = [
    {
      id: 101,
      question: 'Sequence means instructions are executed randomly.',
      options: [
        { label: 'A', text: 'True' },
        { label: 'B', text: 'False' },
      ],
      correctAnswer: 'B',
      explanation: 'False! Sequence means instructions execute one after another in strict sequential order, not randomly.',
      category: 'tf',
      topicTag: 'Control Flow (Sequence)',
    },
    {
      id: 102,
      question: 'An incorrect algorithm may give wrong output.',
      options: [
        { label: 'A', text: 'True' },
        { label: 'B', text: 'False' },
      ],
      correctAnswer: 'A',
      explanation: 'True! An algorithm is correct only if it halts with the correct output for every input instance. An incorrect algorithm may produce erroneous results.',
      category: 'tf',
      topicTag: 'Correctness',
    },
    {
      id: 103,
      question: 'A loop is also called repetition.',
      options: [
        { label: 'A', text: 'True' },
        { label: 'B', text: 'False' },
      ],
      correctAnswer: 'A',
      explanation: 'True! Loops (for, while) implement repetition / iteration constructs.',
      category: 'tf',
      topicTag: 'Loops',
    },
    {
      id: 104,
      question: 'Variables store values.',
      options: [
        { label: 'A', text: 'True' },
        { label: 'B', text: 'False' },
      ],
      correctAnswer: 'A',
      explanation: 'True! A variable is a named storage location in memory used to hold data values.',
      category: 'tf',
      topicTag: 'Variables',
    },
  ];

  readonly insertionSortSteps = [
    { pass: 'Initial Array', array: '⟨ 40, 15, 30, 5, 25, 10, 20, 35 ⟩', action: 'Input unsorted array of size n=8.' },
    { pass: 'Pass 1 (i = 2, key = 15)', array: '⟨ 15, 40, 30, 5, 25, 10, 20, 35 ⟩', action: 'Compare 15 with 40 ➔ shift 40 right ➔ insert 15.' },
    { pass: 'Pass 2 (i = 3, key = 30)', array: '⟨ 15, 30, 40, 5, 25, 10, 20, 35 ⟩', action: 'Compare 30 with 40 ➔ shift 40 right ➔ compare with 15 (stop) ➔ insert 30.' },
    { pass: 'Pass 3 (i = 4, key = 5)', array: '⟨ 5, 15, 30, 40, 25, 10, 20, 35 ⟩', action: 'Compare 5 with 40, 30, 15 ➔ shift all three right ➔ insert 5 at index 1.' },
    { pass: 'Pass 4 (i = 5, key = 25)', array: '⟨ 5, 15, 25, 30, 40, 10, 20, 35 ⟩', action: 'Compare 25 with 40, 30 ➔ shift 40 & 30 ➔ compare with 15 (stop) ➔ insert 25.' },
    { pass: 'Pass 5 (i = 6, key = 10)', array: '⟨ 5, 10, 15, 25, 30, 40, 20, 35 ⟩', action: 'Compare 10 with 40, 30, 25, 15 ➔ shift all four ➔ compare with 5 (stop) ➔ insert 10.' },
    { pass: 'Pass 6 (i = 7, key = 20)', array: '⟨ 5, 10, 15, 20, 25, 30, 40, 35 ⟩', action: 'Compare 20 with 40, 30, 25 ➔ shift 40, 30, 25 ➔ compare with 15 (stop) ➔ insert 20.' },
    { pass: 'Pass 7 (i = 8, key = 35)', array: '⟨ 5, 10, 15, 20, 25, 30, 35, 40 ⟩', action: 'Compare 35 with 40 ➔ shift 40 right ➔ compare with 30 (stop) ➔ insert 35.' },
  ];

  readonly totalQuestionsCount = computed(() => this.mcqQuestions.length + this.tfQuestions.length);

  readonly filteredQuestions = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'mcq') return this.mcqQuestions;
    if (cat === 'tf') return this.tfQuestions;
    return [...this.mcqQuestions, ...this.tfQuestions];
  });

  readonly answeredCount = computed(() => {
    return Object.keys(this.userAnswers()).length;
  });

  readonly score = computed(() => {
    const answers = this.userAnswers();
    const all = [...this.mcqQuestions, ...this.tfQuestions];
    let correct = 0;
    for (const q of all) {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    }
    return correct;
  });

  selectAnswer(questionId: number, label: string): void {
    this.userAnswers.update(curr => ({
      ...curr,
      [questionId]: label,
    }));
  }

  resetQuiz(): void {
    this.userAnswers.set({});
    this.revealAllAnswers.set(false);
  }
}
