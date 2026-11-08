import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MermaidRendererComponent } from '../../shared/components/mermaid-renderer.component';
import { AlgorithmEngineService } from '../../core/services/algorithm-engine.service';

@Component({
  selector: 'app-chapter-2-summary',
  standalone: true,
  imports: [CommonModule, MermaidRendererComponent],
  template: `
    <div class="space-y-8 max-w-5xl mx-auto pb-12 font-sans">
      
      <!-- HERO HEADER -->
      <div class="p-6 sm:p-8 rounded-3xl bg-charcoal-850 border border-charcoal-border shadow-2xl relative overflow-hidden">
        <div class="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-(--color-blue)/10 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-(--color-beige)/10 blur-3xl pointer-events-none"></div>

        <div class="relative z-10 space-y-3">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="px-3 py-1 rounded-full bg-(--color-blue)/15 border border-(--color-blue)/30 text-(--color-blue) text-xs font-mono font-bold tracking-wider uppercase">
              Chapter 2 Theory
            </span>
            <span class="px-2.5 py-0.5 rounded-md bg-charcoal-950 text-[#828c9b] text-[11px] font-mono border border-charcoal-border">
              Course Reference: Slides 1 – 71
            </span>
            <span class="px-2.5 py-0.5 rounded-md bg-(--color-green)/10 text-(--color-green) text-[11px] font-mono border border-(--color-green)/30">
              ✓ Slide Numbers Linked
            </span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Theoretical Topics &amp; Algorithm Analysis
          </h1>

          <p class="text-sm sm:text-base text-silver-300 leading-relaxed max-w-3xl">
            This theoretical guide summarizes the lecture concepts from <strong class="text-white">Chapter 2: Getting Started</strong>.
            Every section below is tagged with its <strong class="text-(--color-beige)">exact course slide numbers</strong> so you can easily review the official presentation alongside these notes.
          </p>

          <!-- Quick Navigation Pill Links with Slide Badges -->
          <div class="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
            <a href="#topic-sorting" class="px-3 py-1.5 rounded-lg bg-charcoal-950 hover:bg-charcoal-800 border border-charcoal-border text-silver-300 transition flex items-center gap-1.5">
              <span>01. Sorting Problem</span>
              <span class="text-[10px] text-[#828c9b] bg-charcoal-900 px-1.5 py-0.5 rounded">Slides 3-4, 8</span>
            </a>
            <a href="#topic-framework" class="px-3 py-1.5 rounded-lg bg-charcoal-950 hover:bg-charcoal-800 border border-charcoal-border text-(--color-blue) transition flex items-center gap-1.5">
              <span>02. Analysis Framework</span>
              <span class="text-[10px] text-[#828c9b] bg-charcoal-900 px-1.5 py-0.5 rounded">Slides 45-46</span>
            </a>
            <a href="#topic-ram" class="px-3 py-1.5 rounded-lg bg-charcoal-950 hover:bg-charcoal-800 border border-charcoal-border text-(--color-beige) transition flex items-center gap-1.5">
              <span>03. RAM Model</span>
              <span class="text-[10px] text-[#828c9b] bg-charcoal-900 px-1.5 py-0.5 rounded">Slides 46-47</span>
            </a>
            <a href="#topic-cases" class="px-3 py-1.5 rounded-lg bg-charcoal-950 hover:bg-charcoal-800 border border-charcoal-border text-rose-300 transition flex items-center gap-1.5">
              <span>04. Cost &amp; 3 Cases</span>
              <span class="text-[10px] text-[#828c9b] bg-charcoal-900 px-1.5 py-0.5 rounded">Slides 48-55</span>
            </a>
            <a href="#topic-growth" class="px-3 py-1.5 rounded-lg bg-charcoal-950 hover:bg-charcoal-800 border border-charcoal-border text-(--color-green) transition flex items-center gap-1.5">
              <span>05. Order of Growth</span>
              <span class="text-[10px] text-[#828c9b] bg-charcoal-900 px-1.5 py-0.5 rounded">Slide 56</span>
            </a>
            <a href="#topic-paradigms" class="px-3 py-1.5 rounded-lg bg-charcoal-950 hover:bg-charcoal-800 border border-charcoal-border text-silver-300 transition flex items-center gap-1.5">
              <span>06. Paradigms</span>
              <span class="text-[10px] text-[#828c9b] bg-charcoal-900 px-1.5 py-0.5 rounded">Slides 57-59</span>
            </a>
            <a href="#topic-recurrences" class="px-3 py-1.5 rounded-lg bg-charcoal-950 hover:bg-charcoal-800 border border-charcoal-border text-amber-300 transition flex items-center gap-1.5">
              <span>07. Recurrence Trees</span>
              <span class="text-[10px] text-[#828c9b] bg-charcoal-900 px-1.5 py-0.5 rounded">Slides 67-70</span>
            </a>
          </div>
        </div>
      </div>

      <!-- TOPIC 1: THE SORTING PROBLEM & IN-PLACE DEFINITION -->
      <section id="topic-sorting" class="p-6 rounded-2xl bg-charcoal-850 border border-charcoal-border space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal-border/60 pb-3">
          <div class="flex items-center gap-2.5">
            <span class="w-7 h-7 rounded-lg bg-(--color-blue)/20 text-(--color-blue) flex items-center justify-center font-mono font-bold text-xs">01</span>
            <h2 class="text-lg sm:text-xl font-bold text-white">The Sorting Problem &amp; In-Place Property</h2>
          </div>
          <span class="px-2.5 py-1 rounded-lg bg-charcoal-950 border border-(--color-beige)/40 text-(--color-beige) text-xs font-mono font-bold self-start sm:self-auto">
            📑 Slides 3 – 4, 8
          </span>
        </div>

        <p class="text-sm text-silver-300 leading-relaxed">
          The sorting problem is the foundational computational problem studied in Chapter 2:
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div class="p-4 rounded-xl bg-charcoal-950 border border-charcoal-border space-y-1.5">
            <span class="text-(--color-beige) font-bold text-[11px] block">📥 INPUT FORMULATION (Slide 3):</span>
            <p class="text-silver-300">A sequence of n numbers:</p>
            <p class="text-white font-bold">&lang; a₁, a₂, a₃, ..., aₙ &rang;</p>
            <span class="text-[#828c9b] text-[11px] block">Numbers to be sorted are called <strong>keys</strong>. They may carry associated satellite data.</span>
          </div>

          <div class="p-4 rounded-xl bg-charcoal-950 border border-charcoal-border space-y-1.5">
            <span class="text-(--color-green) font-bold text-[11px] block">📤 OUTPUT FORMULATION (Slide 3):</span>
            <p class="text-silver-300">A permutation (reordering) such that:</p>
            <p class="text-white font-bold">a'₁ &le; a'₂ &le; a'₃ &le; ... &le; a'ₙ</p>
            <span class="text-[#828c9b] text-[11px] block">Elements are arranged in non-decreasing order.</span>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-charcoal-950 border border-charcoal-border space-y-2 text-xs">
          <div class="flex items-center justify-between">
            <span class="font-bold text-white block font-mono">What does "In-Place" Mean? (Slide 8)</span>
            <span class="text-[10px] font-mono text-(--color-green) bg-(--color-green)/10 px-2 py-0.5 rounded border border-(--color-green)/30">Space: O(1)</span>
          </div>
          <p class="text-silver-300 leading-relaxed">
            An algorithm is <strong class="text-white">in-place</strong> if numbers are rearranged entirely within the input array itself. At most, a constant number of items are stored outside the array at any time (<code class="text-(--color-beige) font-mono">O(1)</code> extra memory).
          </p>
        </div>

        <app-mermaid-renderer
          [code]="diagramSortingProblem"
          title="Mermaid Diagram: The Sorting Transformation Pipeline (Slides 3-4)">
        </app-mermaid-renderer>
      </section>

      <!-- TOPIC 2: THE ALGORITHM ANALYSIS FRAMEWORK -->
      <section id="topic-framework" class="p-6 rounded-2xl bg-charcoal-850 border border-charcoal-border space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal-border/60 pb-3">
          <div class="flex items-center gap-2.5">
            <span class="w-7 h-7 rounded-lg bg-(--color-blue)/20 text-(--color-blue) flex items-center justify-center font-mono font-bold text-xs">02</span>
            <h2 class="text-lg sm:text-xl font-bold text-white">What is "Algorithm Analysis"?</h2>
          </div>
          <span class="px-2.5 py-1 rounded-lg bg-charcoal-950 border border-(--color-beige)/40 text-(--color-beige) text-xs font-mono font-bold self-start sm:self-auto">
            📑 Slides 45 – 46
          </span>
        </div>

        <p class="text-sm text-silver-300 leading-relaxed">
          <strong class="text-white">Analysis of algorithms</strong> means mathematically predicting the computational resources that an algorithm requires before running it on a real computer.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="p-4 rounded-xl bg-charcoal-950 border border-charcoal-border space-y-2">
            <h4 class="font-bold text-(--color-beige) font-mono uppercase text-[11px]">Primary Resource: Time (Slide 45)</h4>
            <p class="text-silver-300 leading-relaxed">
              Computational running time — measured as the number of primitive machine operations executed as a function of input size <code class="text-white font-mono">n</code>.
            </p>
          </div>

          <div class="p-4 rounded-xl bg-charcoal-950 border border-charcoal-border space-y-2">
            <h4 class="font-bold text-(--color-green) font-mono uppercase text-[11px]">Secondary Resources: Space &amp; Hardware (Slide 45)</h4>
            <p class="text-silver-300 leading-relaxed">
              Memory consumption (RAM), disk storage, communication bandwidth, and hardware circuitry.
            </p>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-charcoal-950 border border-charcoal-border space-y-2 text-xs">
          <span class="font-bold text-white block">Why not just measure execution time with a stopwatch? (Slide 46)</span>
          <p class="text-[#828c9b] leading-relaxed">
            Clock time depends on the processor speed, operating system scheduling, compiler optimizations, and background programs. Mathematical analysis gives a <strong class="text-silver-200">machine-independent metric</strong> that remains universally valid across all machines.
          </p>
        </div>

        <app-mermaid-renderer
          [code]="diagramAnalysisFramework"
          title="Mermaid Diagram: Theoretical Analysis vs Machine Benchmark (Slides 45-46)">
        </app-mermaid-renderer>
      </section>

      <!-- TOPIC 3: THE RAM MODEL -->
      <section id="topic-ram" class="p-6 rounded-2xl bg-charcoal-850 border border-charcoal-border space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal-border/60 pb-3">
          <div class="flex items-center gap-2.5">
            <span class="w-7 h-7 rounded-lg bg-(--color-blue)/20 text-(--color-blue) flex items-center justify-center font-mono font-bold text-xs">03</span>
            <h2 class="text-lg sm:text-xl font-bold text-white">The RAM Model (Random Access Machine)</h2>
          </div>
          <span class="px-2.5 py-1 rounded-lg bg-charcoal-950 border border-(--color-beige)/40 text-(--color-beige) text-xs font-mono font-bold self-start sm:self-auto">
            📑 Slides 46 – 47
          </span>
        </div>

        <p class="text-sm text-silver-300 leading-relaxed">
          The <strong class="text-white">Random Access Machine (RAM)</strong> model is the standard single-processor theoretical computer used in algorithm analysis. It abstracts away hardware complexities:
        </p>

        <!-- 4 RAM Pillars Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          
          <div class="p-4 rounded-xl bg-charcoal-950 border border-(--color-blue)/30 space-y-1.5">
            <span class="text-(--color-blue) font-bold font-mono text-[11px] block">1. SINGLE PROCESSOR (SEQUENTIAL) (Slide 46)</span>
            <p class="text-silver-300">
              Instructions execute strictly one after another. There are no concurrent, multi-threaded, or parallel operations in the standard RAM model.
            </p>
          </div>

          <div class="p-4 rounded-xl bg-charcoal-950 border border-(--color-beige)/30 space-y-1.5">
            <span class="text-(--color-beige) font-bold font-mono text-[11px] block">2. CONSTANT-TIME INSTRUCTIONS (Slide 47)</span>
            <p class="text-silver-300">
              Each primitive instruction takes a constant amount of time <code class="text-white font-mono">c</code>. Arithmetic (<code class="text-white font-mono">+ - * / %</code>), logic, comparisons, and assignments all take <code class="text-(--color-green) font-mono">O(1)</code>.
            </p>
          </div>

          <div class="p-4 rounded-xl bg-charcoal-950 border border-(--color-green)/30 space-y-1.5">
            <span class="text-(--color-green) font-bold font-mono text-[11px] block">3. UNIFORM MEMORY ACCESS (Slide 47)</span>
            <p class="text-silver-300">
              Accessing any memory cell <code class="text-white font-mono">A[i]</code> takes the exact same constant time regardless of address. Memory caches (L1/L2) and virtual memory hierarchies are abstracted away.
            </p>
          </div>

          <div class="p-4 rounded-xl bg-charcoal-950 border border-charcoal-border space-y-1.5">
            <span class="text-silver-400 font-bold font-mono text-[11px] block">4. BOUNDED WORD SIZE (Slide 47)</span>
            <p class="text-silver-300">
              Data types are integers and floats. Each memory word is bounded by <code class="text-white font-mono">c · lg n</code> bits so an index or integer up to size <code class="text-white font-mono">n</code> fits in a single word.
            </p>
          </div>

        </div>

        <app-mermaid-renderer
          [code]="diagramRamModel"
          title="Mermaid Diagram: Architecture of the RAM Theoretical Model (Slides 46-47)">
        </app-mermaid-renderer>
      </section>

      <!-- TOPIC 4: COST FORMULA & THE 3 CASES -->
      <section id="topic-cases" class="p-6 rounded-2xl bg-charcoal-850 border border-charcoal-border space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal-border/60 pb-3">
          <div class="flex items-center gap-2.5">
            <span class="w-7 h-7 rounded-lg bg-(--color-blue)/20 text-(--color-blue) flex items-center justify-center font-mono font-bold text-xs">04</span>
            <h2 class="text-lg sm:text-xl font-bold text-white">The Cost Formula &amp; The 3 Cases of Analysis</h2>
          </div>
          <span class="px-2.5 py-1 rounded-lg bg-charcoal-950 border border-(--color-beige)/40 text-(--color-beige) text-xs font-mono font-bold self-start sm:self-auto">
            📑 Slides 48 – 55
          </span>
        </div>

        <p class="text-sm text-silver-300 leading-relaxed">
          Running time <code class="text-white font-mono">T(n)</code> is defined as the sum of statement execution costs multiplied by how many times each statement executes:
        </p>

        <div class="p-4 rounded-xl bg-charcoal-950 border border-charcoal-border text-center font-mono text-sm text-white">
          T(n) = &sum; ( c<sub>i</sub> &times; t<sub>i</sub> ) &nbsp;&nbsp;&bull;&nbsp;&nbsp; [Cost of statement i &times; Execution count of statement i]
        </div>

        <!-- 3 Cases Comparison Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          <div class="p-4 rounded-xl bg-charcoal-950 border border-charcoal-border space-y-2">
            <span class="text-[10px] text-[#828c9b] uppercase block">1. Best Case (Slide 53)</span>
            <span class="text-sm font-bold text-(--color-green) block">Minimum Time</span>
            <p class="text-silver-400 font-sans leading-relaxed text-[11px]">
              Smallest possible running time on any input of size <code class="text-white">n</code>. Represents the ideal scenario (e.g. data is already sorted).
            </p>
          </div>

          <div class="p-4 rounded-xl bg-charcoal-950 border border-(--color-beige)/40 space-y-2">
            <span class="text-[10px] text-[#828c9b] uppercase block">2. Average Case (Slide 54)</span>
            <span class="text-sm font-bold text-(--color-beige) block">Expected Time</span>
            <p class="text-silver-400 font-sans leading-relaxed text-[11px]">
              Expected running time assuming all inputs of size <code class="text-white">n</code> are equally likely. Often hard to compute mathematically.
            </p>
          </div>

          <div class="p-4 rounded-xl bg-charcoal-950 border border-(--color-blue)/50 space-y-2">
            <span class="text-[10px] text-(--color-blue) uppercase block font-bold">3. Worst Case (Slide 54-55)</span>
            <span class="text-sm font-bold text-rose-400 block">Maximum Time</span>
            <p class="text-silver-400 font-sans leading-relaxed text-[11px]">
              Longest running time on <em>any</em> input of size <code class="text-white">n</code>. Guarantees that the algorithm will never exceed this time!
            </p>
          </div>
        </div>

        <!-- Why Focus on Worst-Case? -->
        <div class="p-4 rounded-xl bg-charcoal-950 border border-charcoal-border space-y-2 text-xs">
          <h4 class="font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <span class="text-(--color-blue)">★</span>
            <span>Why do computer scientists focus on Worst-Case Analysis? (Slide 55)</span>
          </h4>
          <ol class="list-decimal list-inside space-y-1.5 text-silver-300 pl-1 leading-relaxed">
            <li>
              <strong class="text-white">Guaranteed Upper Bound:</strong> The algorithm will never take longer than this limit. Gives an absolute guarantee of performance for critical systems.
            </li>
            <li>
              <strong class="text-white">Worst case occurs frequently:</strong> In many real applications (e.g. database lookups), searching for an absent record forces the algorithm to explore the entire search space.
            </li>
            <li>
              <strong class="text-white">Average Case is often roughly as bad as Worst Case:</strong> For many algorithms, both average and worst case share the exact same order of growth (e.g., both are <code class="text-(--color-beige) font-mono">O(n²)</code>).
            </li>
          </ol>
        </div>

        <app-mermaid-renderer
          [code]="diagramAnalysisCases"
          title="Mermaid Diagram: The 3 Analysis Cases Spectrum (Slides 53-55)">
        </app-mermaid-renderer>
      </section>

      <!-- TOPIC 5: ORDER OF GROWTH -->
      <section id="topic-growth" class="p-6 rounded-2xl bg-charcoal-850 border border-charcoal-border space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal-border/60 pb-3">
          <div class="flex items-center gap-2.5">
            <span class="w-7 h-7 rounded-lg bg-(--color-blue)/20 text-(--color-blue) flex items-center justify-center font-mono font-bold text-xs">05</span>
            <h2 class="text-lg sm:text-xl font-bold text-white">Order of Growth (Rate of Growth)</h2>
          </div>
          <span class="px-2.5 py-1 rounded-lg bg-charcoal-950 border border-(--color-beige)/40 text-(--color-beige) text-xs font-mono font-bold self-start sm:self-auto">
            📑 Slide 56
          </span>
        </div>

        <p class="text-sm text-silver-300 leading-relaxed">
          When analyzing running time for very large inputs (<code class="text-white font-mono">n &rarr; &infin;</code>), lower-order terms and leading constant coefficients become completely insignificant (Slide 56):
        </p>

        <div class="p-4 rounded-xl bg-charcoal-950 border border-charcoal-border font-mono text-xs space-y-2">
          <span class="text-(--color-beige) font-bold block">Simplifying Cost Equations (Slide 56):</span>
          <div class="text-sm text-white bg-charcoal-900 p-3 rounded-lg border border-charcoal-border text-center">
            T(n) = a · n² + b · n + c &nbsp;&nbsp;&Longrightarrow;&nbsp;&nbsp; &Theta;(n²)
          </div>
          <ul class="list-disc list-inside space-y-1 text-silver-400 text-[11px] pt-1">
            <li>We drop the constant coefficient <code class="text-white font-mono">a</code> because machine speed differences only change the constant.</li>
            <li>We drop lower-order terms <code class="text-white font-mono">b·n + c</code> because as <code class="text-white font-mono">n</code> grows large, <code class="text-white font-mono">n²</code> dwarfs them completely.</li>
          </ul>
        </div>

        <div class="p-4 rounded-xl bg-charcoal-950 border border-charcoal-border text-xs space-y-2">
          <span class="font-bold text-white block">Key Principle (Slide 56):</span>
          <p class="text-silver-300 leading-relaxed">
            An algorithm with a lower order of growth is theoretically superior. Even if an algorithm with <code class="text-(--color-green) font-mono">O(n log n)</code> has large constant factors, it will <em>always</em> outperform an <code class="text-rose-400 font-mono">O(n²)</code> algorithm once <code class="text-white font-mono">n</code> is large enough.
          </p>
        </div>

        <app-mermaid-renderer
          [code]="diagramOrderOfGrowth"
          title="Mermaid Diagram: Hierarchy of Growth Rates (Slide 56)">
        </app-mermaid-renderer>
      </section>

      <!-- TOPIC 6: INCREMENTAL VS DIVIDE-AND-CONQUER -->
      <section id="topic-paradigms" class="p-6 rounded-2xl bg-charcoal-850 border border-charcoal-border space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal-border/60 pb-3">
          <div class="flex items-center gap-2.5">
            <span class="w-7 h-7 rounded-lg bg-(--color-blue)/20 text-(--color-blue) flex items-center justify-center font-mono font-bold text-xs">06</span>
            <h2 class="text-lg sm:text-xl font-bold text-white">Design Paradigms: Incremental vs. Divide-and-Conquer</h2>
          </div>
          <span class="px-2.5 py-1 rounded-lg bg-charcoal-950 border border-(--color-beige)/40 text-(--color-beige) text-xs font-mono font-bold self-start sm:self-auto">
            📑 Slides 57 – 59
          </span>
        </div>

        <p class="text-sm text-silver-300 leading-relaxed">
          Chapter 2 contrasts two fundamental approaches to designing algorithms:
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <!-- Incremental Card -->
          <div class="p-5 rounded-2xl bg-charcoal-950 border border-(--color-beige)/30 space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="px-2.5 py-0.5 rounded-md bg-(--color-beige)/15 text-(--color-beige) font-mono font-bold">
                1. INCREMENTAL APPROACH (Slide 57)
              </span>
              <span class="text-[#828c9b] font-mono text-[11px]">Iterative</span>
            </div>
            <p class="text-silver-300 leading-relaxed">
              Builds the solution step by step, one element at a time. The algorithm takes a single new element and incorporates it into the already solved partial solution (e.g., Insertion Sort).
            </p>
            <div class="pt-2 text-[11px] text-[#828c9b] font-mono border-t border-charcoal-border/50">
              Typical Complexity: <strong class="text-rose-400">O(n²)</strong>.
            </div>
          </div>

          <!-- Divide and Conquer Card -->
          <div class="p-5 rounded-2xl bg-charcoal-950 border border-(--color-green)/30 space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="px-2.5 py-0.5 rounded-md bg-(--color-green)/15 text-(--color-green) font-mono font-bold">
                2. DIVIDE-AND-CONQUER (Slide 59)
              </span>
              <span class="text-[#828c9b] font-mono text-[11px]">Recursive</span>
            </div>
            <p class="text-silver-300 leading-relaxed">
              Breaks the problem into smaller subproblems of the same type, solves them recursively, and combines their solutions into the global answer (e.g., Merge Sort).
            </p>
            <div class="pt-2 text-[11px] text-[#828c9b] font-mono border-t border-charcoal-border/50">
              Typical Complexity: <strong class="text-(--color-green)">O(n log n)</strong>.
            </div>
          </div>
        </div>

        <!-- The 3 Steps of Divide and Conquer -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs font-mono">
          <div class="p-3.5 rounded-xl bg-charcoal-950 border border-charcoal-border">
            <span class="text-(--color-blue) font-bold block mb-1">Phase 1: DIVIDE (Slide 59)</span>
            <p class="text-silver-400 font-sans text-[11px]">Divide the problem into smaller subproblems.</p>
          </div>
          <div class="p-3.5 rounded-xl bg-charcoal-950 border border-charcoal-border">
            <span class="text-(--color-beige) font-bold block mb-1">Phase 2: CONQUER (Slide 59)</span>
            <p class="text-silver-400 font-sans text-[11px]">Solve recursively; base case solved directly.</p>
          </div>
          <div class="p-3.5 rounded-xl bg-charcoal-950 border border-charcoal-border">
            <span class="text-(--color-green) font-bold block mb-1">Phase 3: COMBINE (Slide 59)</span>
            <p class="text-silver-400 font-sans text-[11px]">Merge subproblem solutions together in linear time.</p>
          </div>
        </div>

        <app-mermaid-renderer
          [code]="diagramParadigms"
          title="Mermaid Diagram: Incremental vs Divide-and-Conquer Paradigm (Slides 57-59)">
        </app-mermaid-renderer>
      </section>

      <!-- TOPIC 7: RECURRENCE RELATIONS & RECURRENCE TREE -->
      <section id="topic-recurrences" class="p-6 rounded-2xl bg-charcoal-850 border border-charcoal-border space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal-border/60 pb-3">
          <div class="flex items-center gap-2.5">
            <span class="w-7 h-7 rounded-lg bg-(--color-blue)/20 text-(--color-blue) flex items-center justify-center font-mono font-bold text-xs">07</span>
            <h2 class="text-lg sm:text-xl font-bold text-white">Recurrence Relations &amp; The Recurrence Tree Model</h2>
          </div>
          <span class="px-2.5 py-1 rounded-lg bg-charcoal-950 border border-(--color-beige)/40 text-(--color-beige) text-xs font-mono font-bold self-start sm:self-auto">
            📑 Slides 67 – 70
          </span>
        </div>

        <p class="text-sm text-silver-300 leading-relaxed">
          Because divide-and-conquer algorithms call themselves recursively, their running time is described by a <strong class="text-white">recurrence equation</strong> (Slide 67):
        </p>

        <!-- General Recurrence Equation Box -->
        <div class="p-4 rounded-xl bg-charcoal-950 border border-charcoal-border font-mono text-xs space-y-2.5">
          <span class="text-(--color-beige) font-bold block uppercase text-[11px]">General Divide-and-Conquer Recurrence (Slide 67):</span>
          <div class="text-sm text-white bg-charcoal-900 p-3 rounded-lg border border-charcoal-border text-center">
            T(n) = a · T(n / b) + D(n) + C(n)
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-silver-400 pt-1">
            <div><strong class="text-white">a · T(n/b):</strong> Time to solve <code class="text-(--color-blue)">a</code> subproblems of size <code class="text-(--color-blue)">n/b</code>.</div>
            <div><strong class="text-white">D(n):</strong> Time to divide problem into subproblems.</div>
            <div><strong class="text-white">C(n):</strong> Time to combine subproblem solutions.</div>
          </div>
        </div>

        <!-- The Recursion Tree Method -->
        <div class="p-4 rounded-xl bg-charcoal-950 border border-charcoal-border text-xs space-y-2">
          <span class="font-bold text-white block font-mono">The Recurrence Tree Model (Slides 68 – 70):</span>
          <p class="text-silver-300 leading-relaxed">
            A recurrence tree visualizes how work is distributed across recursive levels:
          </p>
          <ul class="list-disc list-inside space-y-1 text-silver-400 text-[11px]">
            <li><strong>Nodes:</strong> Represent subproblems at each depth.</li>
            <li><strong>Per-Level Cost:</strong> The sum of combining and dividing costs for all nodes on that level. For Merge Sort, each level costs exactly <code class="text-white font-mono">c · n</code> (Slide 69).</li>
            <li><strong>Tree Height:</strong> How many times we divide <code class="text-white font-mono">n</code> by <code class="text-white font-mono">b</code> until reaching base case size 1 &rarr; exactly <code class="text-(--color-beige) font-mono">log<sub>b</sub> n + 1</code> levels (Slide 69).</li>
            <li><strong>Total Running Time:</strong> Sum of costs of all levels across the tree &rarr; <code class="text-(--color-green) font-mono">c·n·log₂ n + c·n = &Theta;(n log n)</code> (Slide 70).</li>
          </ul>
        </div>

        <app-mermaid-renderer
          [code]="diagramRecurrenceTree"
          title="Mermaid Diagram: Theoretical Recurrence Tree Structure & Level Summation (Slides 68-70)">
        </app-mermaid-renderer>
      </section>

    </div>
  `
})
export class Chapter2SummaryComponent {
  protected readonly engine = inject(AlgorithmEngineService);

  readonly diagramSortingProblem = `flowchart LR
    A["📥 Unsorted Sequence (Slide 3)<br/>[29, 10, 14, 37, 13]"] --> B["⚙️ Sorting Algorithm<br/>(In-Place O(1) Extra Space - Slide 8)"]
    B --> C["📤 Sorted Permutation (Slide 3)<br/>[10, 13, 14, 29, 37]"]
    
    style A fill:#0e111a,stroke:#4771b4,stroke-width:1.5px,color:#c9d2dc
    style B fill:#182239,stroke:#b59678,stroke-width:2px,color:#ffffff
    style C fill:#0e111a,stroke:#a0bd26,stroke-width:1.5px,color:#c9d2dc
  `;

  readonly diagramAnalysisFramework = `flowchart TD
    Prob["Real World Problem (Slide 45)"] --> Algo["Algorithm Definition"]
    Algo --> Model["Theoretical RAM Model (Slides 46-47)<br/>(Machine-Independent Machine)"]
    Model --> Cost["Cost Function T(n) = Sum of (Cost × Executions) (Slides 48-52)"]
    Cost --> Growth["Order of Growth Analysis (Slide 56)<br/>(Ignore constants & lower-order terms)"]
    Growth --> Class["Asymptotic Complexity<br/>O(n), O(n log n), O(n²)"]

    style Prob fill:#0e111a,stroke:#4771b4,color:#ffffff
    style Algo fill:#0e111a,stroke:#4771b4,color:#ffffff
    style Model fill:#182239,stroke:#b59678,stroke-width:2px,color:#ffffff
    style Cost fill:#182239,stroke:#4771b4,color:#c9d2dc
    style Growth fill:#1d231a,stroke:#a0bd26,color:#ffffff
    style Class fill:#1d231a,stroke:#a0bd26,color:#ffffff
  `;

  readonly diagramRamModel = `flowchart TD
    subgraph RAM ["Theoretical RAM Model - Slides 46-47 (Random Access Machine)"]
      CPU["Single CPU Processor (Slide 46)<br/>• Strict Sequential Execution<br/>• No Concurrency"]
      ALU["ALU: Primitive Operations (Slide 47)<br/>• +, -, *, /, % take O(1)<br/>• Comparisons (<, >, ==) take O(1)<br/>• Assignments take O(1)"]
      MEM["Uniform Memory Access (Slide 47)<br/>• Infinite addressable memory cells<br/>• Reading/Writing A[i] takes O(1)<br/>• Word size: bounded by c · lg n bits"]
      
      CPU <--> ALU
      CPU <--> MEM
    end

    style RAM fill:#0e111a,stroke:#4771b4,stroke-width:2px,color:#ffffff
    style CPU fill:#182239,stroke:#4771b4,color:#ffffff
    style ALU fill:#1d231a,stroke:#a0bd26,color:#c9d2dc
    style MEM fill:#182239,stroke:#b59678,color:#c9d2dc
  `;

  readonly diagramAnalysisCases = `flowchart LR
    subgraph Spectrum ["Input Space for Size n (Slides 53-55)"]
      direction LR
      Best["Best Case (Slide 53)<br/>(Lower Bound)<br/>Minimum possible steps"] 
      Avg["Average Case (Slide 54)<br/>(Expected Value)<br/>Over uniform random inputs"] 
      Worst["Worst Case (Slide 54-55)<br/>(Upper Bound Guarantee)<br/>Maximum possible steps"]
      
      Best --> Avg --> Worst
    end

    Worst --> Guarantee["★ Primary Engineering Metric (Slide 55)<br/>Guarantees Upper Bound & Safety"]

    style Best fill:#1d231a,stroke:#a0bd26,color:#a0bd26
    style Avg fill:#182239,stroke:#b59678,color:#b59678
    style Worst fill:#2a141b,stroke:#f87171,color:#f87171
    style Guarantee fill:#182239,stroke:#4771b4,color:#ffffff
    style Spectrum fill:#0e111a,stroke:#23283c,color:#ffffff
  `;

  readonly diagramOrderOfGrowth = `flowchart TD
    O1["O(1) &bull; Constant Time (Fastest)"] --> Ologn["O(log n) &bull; Logarithmic Time"]
    Ologn --> On["O(n) &bull; Linear Time"]
    On --> Onlogn["O(n log n) &bull; Linearithmic Time (Divide & Conquer)"]
    Onlogn --> On2["O(n²) &bull; Quadratic Time (Incremental Sorts)"]
    On2 --> On3["O(n³) &bull; Cubic Time"]
    On3 --> O2n["O(2ⁿ) &bull; Exponential Time (Slowest)"]

    style O1 fill:#1d231a,stroke:#a0bd26,color:#a0bd26
    style Ologn fill:#1d231a,stroke:#a0bd26,color:#a0bd26
    style On fill:#182239,stroke:#4771b4,color:#4771b4
    style Onlogn fill:#182239,stroke:#4771b4,color:#ffffff
    style On2 fill:#2a1b14,stroke:#b59678,color:#b59678
    style On3 fill:#2a141b,stroke:#f87171,color:#f87171
    style O2n fill:#2a141b,stroke:#f87171,color:#f87171
  `;

  readonly diagramParadigms = `flowchart TD
    subgraph Incremental ["1. Incremental Design (Slide 57)"]
      Subarr["Sorted Prefix A[1..i-1]"] --> Pick["Pick next element A[i]"]
      Pick --> Scan["Scan & Shift larger elements"]
      Scan --> Result1["Grown Sorted Prefix A[1..i]"]
    end

    subgraph DivideConquer ["2. Divide-and-Conquer Design (Slide 59)"]
      D["1. DIVIDE (Slide 59)<br/>Partition into subproblems of size n/b"]
      C["2. CONQUER (Slide 59)<br/>Solve subproblems recursively"]
      M["3. COMBINE (Slide 59)<br/>Merge subproblem solutions"]
      
      D --> C --> M
    end

    style Incremental fill:#0e111a,stroke:#b59678,color:#ffffff
    style DivideConquer fill:#0e111a,stroke:#a0bd26,color:#ffffff
    style Subarr fill:#182239,stroke:#b59678,color:#c9d2dc
    style Pick fill:#182239,stroke:#b59678,color:#c9d2dc
    style Scan fill:#182239,stroke:#b59678,color:#c9d2dc
    style Result1 fill:#182239,stroke:#b59678,color:#ffffff
    style D fill:#182239,stroke:#4771b4,color:#c9d2dc
    style C fill:#182239,stroke:#4771b4,color:#c9d2dc
    style M fill:#1d231a,stroke:#a0bd26,color:#ffffff
  `;

  readonly diagramRecurrenceTree = `flowchart TD
    Root["T(n) &rarr; Dividing & Combining Cost: f(n) (Slide 67)"] --> Node1["T(n/b)"]
    Root --> Node2["T(n/b)"]
    Root --> NodeDots["... a subproblems"]

    Node1 --> Leaf1["Base Case T(1)"]
    Node2 --> Leaf2["Base Case T(1)"]
    NodeDots --> Leaf3["Base Case T(1)"]

    Cost0["Level 0 Cost = f(n) (Slide 68)"]
    Cost1["Level 1 Cost = a · f(n/b) (Slide 69)"]
    CostLeaves["Leaves Level Cost = Θ(n^(log_b a)) (Slide 70)"]

    Root -.- Cost0
    Node2 -.- Cost1
    Leaf2 -.- CostLeaves

    style Root fill:#182239,stroke:#4771b4,stroke-width:2px,color:#ffffff
    style Node1 fill:#0e111a,stroke:#b59678,color:#c9d2dc
    style Node2 fill:#0e111a,stroke:#b59678,color:#c9d2dc
    style NodeDots fill:#0e111a,stroke:#b59678,color:#c9d2dc
    style Leaf1 fill:#1d231a,stroke:#a0bd26,color:#c9d2dc
    style Leaf2 fill:#1d231a,stroke:#a0bd26,color:#c9d2dc
    style Leaf3 fill:#1d231a,stroke:#a0bd26,color:#c9d2dc
    style Cost0 fill:#182239,stroke:#4771b4,color:#ffffff
    style Cost1 fill:#182239,stroke:#b59678,color:#ffffff
    style CostLeaves fill:#1d231a,stroke:#a0bd26,color:#ffffff
  `;
}
