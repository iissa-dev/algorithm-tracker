import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MermaidRendererComponent } from '../../shared/components/mermaid-renderer.component';
import { AlgorithmEngineService } from '../../core/services/algorithm-engine.service';

@Component({
  selector: 'app-chapter-1-summary',
  standalone: true,
  imports: [CommonModule, MermaidRendererComponent],
  template: `
    <div class="space-y-8 max-w-5xl mx-auto pb-12 font-sans">
      
      <!-- HERO HEADER -->
      <div class="p-6 sm:p-8 rounded-3xl bg-charcoal-850 border border-charcoal-border shadow-2xl relative overflow-hidden">
        <div class="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-(--color-beige)/15 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-(--color-blue)/10 blur-3xl pointer-events-none"></div>

        <div class="relative z-10 space-y-3">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="px-3 py-1 rounded-full bg-(--color-beige)/15 border border-(--color-beige)/30 text-(--color-beige) text-xs font-mono font-bold tracking-wider uppercase">
              Chapter 1 Theory
            </span>
            <span class="px-2.5 py-0.5 rounded-md bg-charcoal-950 text-[#828c9b] text-[11px] font-mono border border-charcoal-border">
              Course Reference: Slides 1 – 34
            </span>
            <span class="px-2.5 py-0.5 rounded-md bg-(--color-green)/10 text-(--color-green) text-[11px] font-mono border border-(--color-green)/30">
              ✓ Core Curriculum Only (Slide 34 Boundary)
            </span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Chapter 1: The Role of Algorithms in Computing
          </h1>

          <p class="text-sm sm:text-base text-silver-300 leading-relaxed max-w-3xl">
            This guide summarizes the core lecture concepts from <strong class="text-white">Chapter 1</strong> (strictly covering <strong class="text-(--color-beige)">Slides 1 to 34</strong>).
            You will learn the formal definition of algorithms, the 5-stage problem-solving process, correctness vs efficiency, Euclidean GCD, and the famous benchmark proving that an efficient algorithm beats 100x faster hardware.
          </p>

          <!-- Quick Navigation Pill Links with Slide Badges -->
          <div class="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
            <a href="#ch1-definition" class="px-3 py-1.5 rounded-lg bg-charcoal-950 hover:bg-charcoal-800 border border-charcoal-border text-silver-300 transition flex items-center gap-1.5">
              <span>01. Algorithm Definition</span>
              <span class="text-[10px] text-[#828c9b] bg-charcoal-900 px-1.5 py-0.5 rounded">Slides 3-4, 6</span>
            </a>
            <a href="#ch1-process" class="px-3 py-1.5 rounded-lg bg-charcoal-950 hover:bg-charcoal-800 border border-charcoal-border text-(--color-blue) transition flex items-center gap-1.5">
              <span>02. Problem-Solving Process</span>
              <span class="text-[10px] text-[#828c9b] bg-charcoal-900 px-1.5 py-0.5 rounded">Slide 5</span>
            </a>
            <a href="#ch1-correctness" class="px-3 py-1.5 rounded-lg bg-charcoal-950 hover:bg-charcoal-800 border border-charcoal-border text-(--color-beige) transition flex items-center gap-1.5">
              <span>03. Correctness &amp; Efficiency</span>
              <span class="text-[10px] text-[#828c9b] bg-charcoal-900 px-1.5 py-0.5 rounded">Slides 12-20</span>
            </a>
            <a href="#ch1-gcd" class="px-3 py-1.5 rounded-lg bg-charcoal-950 hover:bg-charcoal-800 border border-charcoal-border text-(--color-green) transition flex items-center gap-1.5">
              <span>04. Euclidean GCD</span>
              <span class="text-[10px] text-[#828c9b] bg-charcoal-900 px-1.5 py-0.5 rounded">Slides 21-27</span>
            </a>
            <a href="#ch1-benchmark" class="px-3 py-1.5 rounded-lg bg-charcoal-950 hover:bg-charcoal-800 border border-charcoal-border text-amber-300 transition flex items-center gap-1.5">
              <span>05. 100x Hardware Benchmark</span>
              <span class="text-[10px] text-[#828c9b] bg-charcoal-900 px-1.5 py-0.5 rounded">Slides 28-34</span>
            </a>
          </div>
        </div>
      </div>

      <!-- SECTION 1: WHAT IS AN ALGORITHM & COMPUTATIONAL PROBLEMS -->
      <section id="ch1-definition" class="p-6 rounded-2xl bg-charcoal-850 border border-charcoal-border space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal-border/60 pb-3">
          <div class="flex items-center gap-2.5">
            <span class="w-7 h-7 rounded-lg bg-(--color-beige)/20 text-(--color-beige) flex items-center justify-center font-mono font-bold text-xs">01</span>
            <h2 class="text-lg sm:text-xl font-bold text-white">Algorithm &amp; Computational Problems Definition</h2>
          </div>
          <span class="px-2.5 py-1 rounded-lg bg-charcoal-950 border border-(--color-beige)/40 text-(--color-beige) text-xs font-mono font-bold self-start sm:self-auto">
            📑 Slides 3 – 4, 6
          </span>
        </div>

        <div class="space-y-3 text-sm text-silver-300 leading-relaxed">
          <div class="p-4 rounded-xl bg-charcoal-950 border border-charcoal-border space-y-2">
            <h3 class="text-white font-bold font-mono text-xs uppercase tracking-wider text-(--color-beige)">Informal Definition (Slide 3):</h3>
            <p>
              An <strong class="text-white">algorithm</strong> is any well-defined computational procedure that takes some value, or set of values, as <strong class="text-(--color-blue)">input</strong> and produces some value, or set of values, as <strong class="text-(--color-green)">output</strong>.
            </p>
            <p class="text-xs text-[#828c9b]">
              In other words: An algorithm is a sequence of computational steps that transforms the input into the output.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div class="p-3.5 rounded-xl bg-charcoal-950 border border-charcoal-border space-y-1.5">
              <span class="font-bold text-white font-mono block">Computational Problem (Slide 4):</span>
              <p class="text-[#828c9b]">
                Specifies in general terms the desired input/output relationship.
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-charcoal-950 border border-charcoal-border space-y-1.5">
              <span class="font-bold text-white font-mono block">Problem Instance (Slide 4):</span>
              <p class="text-[#828c9b]">
                Consists of specific input needed to compute a solution, satisfying all problem constraints.
              </p>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-charcoal-950 border border-charcoal-border space-y-2 text-xs">
            <span class="font-bold text-white font-mono block">Components of Writing Any Algorithm (Slide 6):</span>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
              <div class="p-2 rounded-lg bg-charcoal-900 border border-charcoal-border">
                <span class="text-(--color-blue) font-bold block">1. Name</span>
                <span class="text-[10px] text-[#828c9b]">Appropriate identifier</span>
              </div>
              <div class="p-2 rounded-lg bg-charcoal-900 border border-charcoal-border">
                <span class="text-(--color-beige) font-bold block">2. Input</span>
                <span class="text-[10px] text-[#828c9b]">Value or set of values</span>
              </div>
              <div class="p-2 rounded-lg bg-charcoal-900 border border-charcoal-border">
                <span class="text-(--color-green) font-bold block">3. Output</span>
                <span class="text-[10px] text-[#828c9b]">Value or set of values</span>
              </div>
              <div class="p-2 rounded-lg bg-charcoal-900 border border-charcoal-border">
                <span class="text-white font-bold block">4. Steps</span>
                <span class="text-[10px] text-[#828c9b]">Transformation steps</span>
              </div>
            </div>
          </div>
        </div>

        <app-mermaid-renderer
          [code]="diagramDefinition"
          maxWidth="560px"
          title="Mermaid Diagram: Algorithm Input/Output Model & Problem Instance (Slides 3-4)">
        </app-mermaid-renderer>
      </section>

      <!-- SECTION 2: THE PROBLEM-SOLVING PROCESS -->
      <section id="ch1-process" class="p-6 rounded-2xl bg-charcoal-850 border border-charcoal-border space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal-border/60 pb-3">
          <div class="flex items-center gap-2.5">
            <span class="w-7 h-7 rounded-lg bg-(--color-beige)/20 text-(--color-beige) flex items-center justify-center font-mono font-bold text-xs">02</span>
            <h2 class="text-lg sm:text-xl font-bold text-white">The Problem-Solving Process</h2>
          </div>
          <span class="px-2.5 py-1 rounded-lg bg-charcoal-950 border border-(--color-beige)/40 text-(--color-beige) text-xs font-mono font-bold self-start sm:self-auto">
            📑 Slide 5
          </span>
        </div>

        <p class="text-sm text-silver-300 leading-relaxed">
          Slide 5 describes the complete engineering lifecycle from understanding a real-world problem to producing a runnable solution:
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs font-mono text-center">
          <div class="p-3 rounded-xl bg-charcoal-950 border border-charcoal-border">
            <span class="text-[10px] text-[#828c9b] block">Phase 1</span>
            <span class="font-bold text-white block my-1">Problem</span>
            <span class="text-[10px] text-(--color-beige) block font-sans">Real-world need</span>
          </div>

          <div class="p-3 rounded-xl bg-charcoal-950 border border-charcoal-border">
            <span class="text-[10px] text-[#828c9b] block">Analysis &rarr;</span>
            <span class="font-bold text-(--color-blue) block my-1">Specification</span>
            <span class="text-[10px] text-silver-400 block font-sans">Formal I/O bounds</span>
          </div>

          <div class="p-3 rounded-xl bg-charcoal-950 border border-charcoal-border">
            <span class="text-[10px] text-[#828c9b] block">Design &rarr;</span>
            <span class="font-bold text-(--color-green) block my-1">Algorithm</span>
            <span class="text-[10px] text-silver-400 block font-sans">Pseudocode steps</span>
          </div>

          <div class="p-3 rounded-xl bg-charcoal-950 border border-charcoal-border">
            <span class="text-[10px] text-[#828c9b] block">Implementation &rarr;</span>
            <span class="font-bold text-amber-300 block my-1">Program Code</span>
            <span class="text-[10px] text-silver-400 block font-sans">C / C++ / Java / Python</span>
          </div>

          <div class="p-3 rounded-xl bg-charcoal-950 border border-charcoal-border">
            <span class="text-[10px] text-[#828c9b] block">Compilation &rarr;</span>
            <span class="font-bold text-emerald-400 block my-1">Executable</span>
            <span class="text-[10px] text-silver-400 block font-sans">Binary solution</span>
          </div>
        </div>

        <app-mermaid-renderer
          [code]="diagramProcess"
          maxWidth="440px"
          title="Mermaid Diagram: The 5-Stage Problem-Solving Lifecycle (Slide 5)">
        </app-mermaid-renderer>
      </section>

      <!-- SECTION 3: CORRECTNESS VS EFFICIENCY -->
      <section id="ch1-correctness" class="p-6 rounded-2xl bg-charcoal-850 border border-charcoal-border space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal-border/60 pb-3">
          <div class="flex items-center gap-2.5">
            <span class="w-7 h-7 rounded-lg bg-(--color-beige)/20 text-(--color-beige) flex items-center justify-center font-mono font-bold text-xs">03</span>
            <h2 class="text-lg sm:text-xl font-bold text-white">Algorithms Correctness and Efficiency</h2>
          </div>
          <span class="px-2.5 py-1 rounded-lg bg-charcoal-950 border border-(--color-beige)/40 text-(--color-beige) text-xs font-mono font-bold self-start sm:self-auto">
            📑 Slides 12 – 20
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <!-- Correctness Card -->
          <div class="p-5 rounded-2xl bg-charcoal-950 border border-emerald-500/30 space-y-2">
            <div class="flex items-center justify-between">
              <span class="px-2.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 font-mono font-bold">
                1. CORRECTNESS (Slide 12)
              </span>
              <span class="text-[11px] text-[#828c9b] font-mono">Halts + Desired Output</span>
            </div>
            <p class="text-silver-300 leading-relaxed">
              An algorithm is <strong class="text-white">correct</strong> if, for every input instance, it <strong class="text-emerald-400">halts</strong> with the correct output.
            </p>
            <div class="p-2.5 rounded-lg bg-charcoal-900 border border-charcoal-border text-[#828c9b] space-y-1">
              <strong class="text-rose-400 block font-mono">Incorrect Algorithms:</strong>
              <p>Might not halt at all (infinite loop), or might halt with a wrong answer (e.g. dividing by 0.454 instead of multiplying on Slide 15).</p>
            </div>
          </div>

          <!-- Efficiency Card -->
          <div class="p-5 rounded-2xl bg-charcoal-950 border border-(--color-blue)/30 space-y-2">
            <div class="flex items-center justify-between">
              <span class="px-2.5 py-0.5 rounded-md bg-(--color-blue)/15 text-(--color-blue) font-mono font-bold">
                2. EFFICIENCY (Slide 12)
              </span>
              <span class="text-[11px] text-[#828c9b] font-mono">Speed + Memory Usage</span>
            </div>
            <p class="text-silver-300 leading-relaxed">
              An algorithm must be <strong class="text-white">efficient</strong>: it should run as quickly as possible (time), and use as little memory as possible (space).
            </p>
            <div class="p-2.5 rounded-lg bg-charcoal-900 border border-charcoal-border text-[#828c9b] space-y-1">
              <strong class="text-(--color-beige) block font-mono">Inefficient Example (Slide 16):</strong>
              <p>Subtracting 1 in a while loop to convert pounds to kg instead of a single multiplication takes O(weight) steps instead of O(1)!</p>
            </div>
          </div>
        </div>

        <!-- Performance Summary Table from Slide 19 -->
        <div class="p-4 rounded-xl bg-charcoal-950 border border-charcoal-border space-y-3">
          <div class="flex items-center justify-between">
            <span class="font-bold text-white font-mono text-xs">Performance of Introductory Algorithms (Slide 19):</span>
            <span class="text-[11px] font-mono text-[#828c9b]">Order of Growth</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-xs font-mono text-left border-collapse">
              <thead>
                <tr class="bg-charcoal-900 text-[#828c9b] border-b border-charcoal-border">
                  <th class="p-2.5">Algorithm Name</th>
                  <th class="p-2.5">Input &bull; Purpose</th>
                  <th class="p-2.5">Order of Growth</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-charcoal-border/50 text-silver-300">
                <tr>
                  <td class="p-2.5 font-bold text-white">ConvertPoundToKg (Slide 13)</td>
                  <td class="p-2.5 text-[#828c9b]">Multiply by 0.454</td>
                  <td class="p-2.5 text-(--color-green) font-bold">Constant Order O(1)</td>
                </tr>
                <tr>
                  <td class="p-2.5 font-bold text-white">SumDigits (Slide 20)</td>
                  <td class="p-2.5 text-[#828c9b]">N / 10 + N % 10</td>
                  <td class="p-2.5 text-(--color-green) font-bold">Constant Order O(1)</td>
                </tr>
                <tr>
                  <td class="p-2.5 font-bold text-white">SumOfNumbers (Slide 9-11)</td>
                  <td class="p-2.5 text-[#828c9b]">Loop from 1 to n</td>
                  <td class="p-2.5 text-(--color-blue) font-bold">Linear Order O(n)</td>
                </tr>
                <tr>
                  <td class="p-2.5 font-bold text-white">FindMinInArray (Slide 17)</td>
                  <td class="p-2.5 text-[#828c9b]">Scan n elements</td>
                  <td class="p-2.5 text-(--color-blue) font-bold">Linear Order O(n)</td>
                </tr>
                <tr>
                  <td class="p-2.5 font-bold text-white">Prime (Slide 18)</td>
                  <td class="p-2.5 text-[#828c9b]">Check divisibility up to n-1</td>
                  <td class="p-2.5 text-(--color-beige) font-bold">Constant to Linear Order O(n)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- SECTION 4: GREATEST COMMON DIVISOR (GCD) -->
      <section id="ch1-gcd" class="p-6 rounded-2xl bg-charcoal-850 border border-charcoal-border space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal-border/60 pb-3">
          <div class="flex items-center gap-2.5">
            <span class="w-7 h-7 rounded-lg bg-(--color-beige)/20 text-(--color-beige) flex items-center justify-center font-mono font-bold text-xs">04</span>
            <h2 class="text-lg sm:text-xl font-bold text-white">Greatest Common Divisor (GCD) Case Study</h2>
          </div>
          <span class="px-2.5 py-1 rounded-lg bg-charcoal-950 border border-(--color-beige)/40 text-(--color-beige) text-xs font-mono font-bold self-start sm:self-auto">
            📑 Slides 21 – 27
          </span>
        </div>

        <p class="text-sm text-silver-300 leading-relaxed">
          The <strong class="text-white">GCD</strong> of two natural numbers <code class="text-white font-mono">x, y</code> is the largest integer <code class="text-white font-mono">j</code> that divides both without remainder (Slide 21):
          <code class="text-(--color-green) font-mono">mod(x, j) == 0 and mod(y, j) == 0</code>.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <!-- Simple GCD -->
          <div class="p-4 rounded-xl bg-charcoal-950 border border-charcoal-border space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-bold text-(--color-beige)">1. Simple Brute-Force GCD1 (Slide 22)</span>
              <span class="text-rose-400">Order(y)</span>
            </div>
            <pre class="text-[#828c9b] text-[11px] leading-relaxed">r = min(x, y)
for j = 1 to r &#123;
  if (mod(x, j) == 0 and mod(y, j) == 0)
    largest = j
&#125;
output largest</pre>
            <p class="text-[11px] text-silver-400 font-sans">
              Tests every number up to min(x, y). Inefficient for large numbers!
            </p>
          </div>

          <!-- Euclid's GCD -->
          <div class="p-4 rounded-xl bg-charcoal-950 border border-(--color-green)/40 space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-bold text-(--color-green)">2. Euclid's Algorithm GCD2 (Slides 23-27)</span>
              <span class="text-(--color-green)">Order(lg y)</span>
            </div>
            <pre class="text-[#a0bd26] text-[11px] leading-relaxed">while (y != 0) &#123;
  t = mod(x, y)
  x = y
  y = t
&#125;
output x</pre>
            <p class="text-[11px] text-silver-400 font-sans">
              Oldest nontrivial algorithm (~300 B.C.). Runs exponentially faster in logarithmic time <strong class="text-(--color-green)">O(lg y)</strong>!
            </p>
          </div>
        </div>

        <app-mermaid-renderer
          [code]="diagramEuclidGcd"
          maxWidth="460px"
          title="Mermaid Diagram: Euclidean GCD Algorithm State Transitions (Slides 24-26)">
        </app-mermaid-renderer>
      </section>

      <!-- SECTION 5: ALGORITHM EFFICIENCY & THE FAMOUS BENCHMARK -->
      <section id="ch1-benchmark" class="p-6 rounded-2xl bg-charcoal-850 border border-charcoal-border space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal-border/60 pb-3">
          <div class="flex items-center gap-2.5">
            <span class="w-7 h-7 rounded-lg bg-(--color-beige)/20 text-(--color-beige) flex items-center justify-center font-mono font-bold text-xs">05</span>
            <h2 class="text-lg sm:text-xl font-bold text-white">Algorithm Efficiency &amp; The 100x Hardware Benchmark</h2>
          </div>
          <span class="px-2.5 py-1 rounded-lg bg-charcoal-950 border border-(--color-beige)/40 text-(--color-beige) text-xs font-mono font-bold self-start sm:self-auto">
            📑 Slides 28 – 34
          </span>
        </div>

        <p class="text-sm text-silver-300 leading-relaxed">
          Slides 28 to 34 present the most famous experiment in algorithmic computer science: proving that <strong class="text-white">algorithmic efficiency matters far more than supercomputer hardware speed</strong>!
        </p>

        <!-- The Setup Card -->
        <div class="p-4 rounded-xl bg-charcoal-950 border border-charcoal-border space-y-2 text-xs font-mono">
          <span class="text-(--color-beige) font-bold block">THE EXPERIMENT SETUP (Slide 28):</span>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-silver-300 pt-1">
            <div class="p-3 rounded-lg bg-charcoal-900 border border-charcoal-border">
              <strong class="text-(--color-blue) block">Insertion Sort:</strong>
              Takes <code class="text-white">2 · n²</code> instructions (<code class="text-silver-400">c₁ = 2</code>, smaller constant factor).
            </div>
            <div class="p-3 rounded-lg bg-charcoal-900 border border-charcoal-border">
              <strong class="text-(--color-green) block">Merge Sort:</strong>
              Takes <code class="text-white">50 · n · lg(n)</code> instructions (<code class="text-silver-400">c₂ = 50</code>, larger constant factor).
            </div>
          </div>
        </div>

        <!-- Benchmark 1 vs Benchmark 2 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          
          <!-- Test 1 -->
          <div class="p-4 rounded-xl bg-charcoal-950 border border-charcoal-border space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-bold text-white">TEST 1: Identical Computers (Slide 30)</span>
              <span class="text-[#828c9b]">1 Billion ops/sec</span>
            </div>
            <p class="text-[11px] text-silver-400 font-sans">Sorting 1 Million (10⁶) numbers on same 10⁹ ops/sec computer:</p>
            <div class="space-y-1.5 pt-1">
              <div class="p-2 rounded bg-charcoal-900 border border-charcoal-border flex justify-between">
                <span class="text-rose-400 font-bold">Insertion Sort:</span>
                <span class="text-white">2 · (10⁶)² / 10⁹ = <strong>2,000 sec (~33 min)</strong></span>
              </div>
              <div class="p-2 rounded bg-charcoal-900 border border-charcoal-border flex justify-between">
                <span class="text-emerald-400 font-bold">Merge Sort:</span>
                <span class="text-white">50 · 10⁶ · 20 / 10⁹ &approx; <strong>1 second!</strong></span>
              </div>
            </div>
          </div>

          <!-- Test 2 (100x Slower Computer) -->
          <div class="p-4 rounded-xl bg-charcoal-950 border border-(--color-green)/40 space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-bold text-(--color-green)">TEST 2: 100x Slower Computer! (Slides 31-32)</span>
              <span class="text-(--color-green)">★ Core Lesson</span>
            </div>
            <p class="text-[11px] text-silver-400 font-sans">Computer A is 100x faster than Computer B:</p>
            <div class="space-y-1.5 pt-1">
              <div class="p-2 rounded bg-charcoal-900 border border-charcoal-border flex justify-between">
                <span class="text-silver-300">Fast PC A (10⁹ ops) + Insertion:</span>
                <span class="text-rose-400"><strong>2,000 sec</strong></span>
              </div>
              <div class="p-2 rounded bg-charcoal-900 border border-charcoal-border flex justify-between">
                <span class="text-silver-300">Slow PC B (10⁷ ops) + Merge:</span>
                <span class="text-emerald-400"><strong>~100 sec</strong></span>
              </div>
            </div>
            <p class="text-[11px] text-(--color-green) font-sans pt-1 font-bold">
              ➔ Even on a computer that is 100 times slower, Merge Sort finishes 20 TIMES FASTER!
            </p>
          </div>

        </div>

        <!-- Ten Million Numbers Scale (Slide 33) & Crossover (Slide 34) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-4 rounded-xl bg-charcoal-950 border border-charcoal-border space-y-1.5">
            <span class="font-bold text-white font-mono block">For 10 Million Numbers (Slide 33):</span>
            <ul class="list-disc list-inside space-y-1 text-silver-300 font-mono text-[11px]">
              <li>Insertion sort takes <strong class="text-rose-400">&approx; 2.3 days</strong>!</li>
              <li>Merge sort takes <strong class="text-emerald-400">&approx; 20 minutes</strong>!</li>
            </ul>
          </div>

          <div class="p-4 rounded-xl bg-charcoal-950 border border-charcoal-border space-y-1.5">
            <span class="font-bold text-white font-mono block">The Crossover Point (Slide 34):</span>
            <p class="text-[#828c9b] leading-relaxed text-[11px]">
              Some algorithms are faster after a specific input size (e.g., <code class="text-white font-mono">20n²</code> vs <code class="text-white font-mono">3n³</code>, where 20n² wins starting from <code class="text-(--color-green) font-mono">n &ge; 8</code>). Faster for small inputs does not mean more efficient asymptotically.
            </p>
          </div>
        </div>

        <app-mermaid-renderer
          [code]="diagramBenchmark"
          maxWidth="700px"
          title="Mermaid Diagram: 100x Hardware vs Asymptotic Growth Rate (Slides 29-32)">
        </app-mermaid-renderer>
      </section>

    </div>
  `
})
export class Chapter1SummaryComponent {
  protected readonly engine = inject(AlgorithmEngineService);

  readonly diagramDefinition = `flowchart LR
    Instance["Problem Instance<br/>(Valid Inputs & Constraints)"] --> In["📥 Input Values"]
    In --> Algo["⚙️ Algorithm<br/>(Deterministic Steps & Procedure)"]
    Algo --> Out["📤 Output Values<br/>(Specified Relationship)"]

    style Instance fill:#0e111a,stroke:#b59678,color:#ffffff
    style In fill:#0e111a,stroke:#4771b4,color:#c9d2dc
    style Algo fill:#182239,stroke:#b59678,stroke-width:2px,color:#ffffff
    style Out fill:#0e111a,stroke:#a0bd26,color:#c9d2dc
  `;

  readonly diagramProcess = `flowchart TD
    P["1. Real-World Problem"] --> A["Analysis Phase"]
    A --> Spec["2. Problem Specification<br/>(Input/Output Constraints)"]
    Spec --> D["Design Phase"]
    D --> Alg["3. Algorithm Design<br/>(Pseudocode Formulation)"]
    Alg --> I["Implementation Phase"]
    I --> Code["4. Program Code<br/>(C / C++ / Java / Python)"]
    Code --> C["Compilation Phase"]
    C --> Exec["5. Executable Solution<br/>(Machine Code / Binary)"]

    style P fill:#0e111a,stroke:#b59678,color:#ffffff
    style Spec fill:#182239,stroke:#4771b4,color:#ffffff
    style Alg fill:#182239,stroke:#b59678,color:#ffffff
    style Code fill:#182239,stroke:#a0bd26,color:#ffffff
    style Exec fill:#1d231a,stroke:#a0bd26,color:#ffffff
  `;

  readonly diagramEuclidGcd = `flowchart TD
    Start(["Input: Natural numbers x, y"]) --> Check{"Is y != 0 ?"}
    Check -- Yes --> Rem["Compute t = mod(x, y)"]
    Rem --> Shift["Update: x = y<br/>Update: y = t"]
    Shift --> Check
    Check -- No --> Output(["Output GCD = x"])

    style Start fill:#0e111a,stroke:#4771b4,color:#ffffff
    style Check fill:#1d231a,stroke:#a0bd26,color:#ffffff
    style Rem fill:#182239,stroke:#b59678,color:#c9d2dc
    style Shift fill:#182239,stroke:#4771b4,color:#c9d2dc
    style Output fill:#1d231a,stroke:#a0bd26,color:#ffffff
  `;

  readonly diagramBenchmark = `flowchart LR
    subgraph FastHW ["Computer A: 100x Faster Hardware (10⁹ ops/sec)"]
      A_Algo["Runs Insertion Sort (O(n²))<br/>Takes 2·(10⁶)² ops"] --> A_Time["Result: 2,000 Seconds<br/>(~33.3 Minutes)"]
    end

    subgraph SlowHW ["Computer B: 100x Slower Hardware (10⁷ ops/sec)"]
      B_Algo["Runs Merge Sort (O(n log n))<br/>Takes 50·10⁶·lg(10⁶) ops"] --> B_Time["Result: ~100 Seconds<br/>(~1.6 Minutes)"]
    end

    FastHW --> Comp{"Which Finishes First?"}
    SlowHW --> Comp
    Comp --> Winner["🏆 Computer B with Merge Sort<br/>Runs 20x FASTER despite 100x slower hardware!"]

    style FastHW fill:#0e111a,stroke:#f87171,color:#ffffff
    style SlowHW fill:#0e111a,stroke:#a0bd26,color:#ffffff
    style A_Time fill:#2a141b,stroke:#f87171,color:#f87171
    style B_Time fill:#1d231a,stroke:#a0bd26,color:#a0bd26
    style Winner fill:#1d231a,stroke:#a0bd26,stroke-width:2px,color:#ffffff
  `;
}
