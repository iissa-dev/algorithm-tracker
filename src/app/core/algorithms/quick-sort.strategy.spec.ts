import { describe, it, expect } from 'vitest';
import { QuickSortStrategy } from './quick-sort.strategy';

describe('QuickSortStrategy', () => {
  const strategy = new QuickSortStrategy();

  it('should have proper metadata for Chapter 2', () => {
    expect(strategy.metadata.id).toBe('quick-sort');
    expect(strategy.metadata.chapterNumber).toBe(2);
    expect(strategy.metadata.timeComplexity.worst).toContain('O(n²)');
    expect(strategy.metadata.timeComplexity.average).toContain('O(n log n)');
    expect(strategy.metadata.hasTreeVisualization).toBe(true);
    expect(strategy.metadata.videoUrl).toContain('NK-Z7syJzP4');
    expect(strategy.codeSnippets.pseudocode.length).toBeGreaterThan(0);
    expect(strategy.codeSnippets.csharp.length).toBeGreaterThan(0);
    expect(strategy.codeSnippets.cpp.length).toBeGreaterThan(0);
  });

  it('should correctly sort an arbitrary array using partition and pivot', () => {
    const input = [38, 27, 43, 3, 9, 82, 10];
    const steps = strategy.generateSteps(input);

    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0];
    expect(firstStep.actionType).toBe('init');

    const lastStep = steps[steps.length - 1];
    expect(lastStep.actionType).toBe('all-sorted');
    expect(lastStep.array).toEqual([3, 9, 10, 27, 38, 43, 82]);
  });

  it('should handle duplicate values and reverse sorted input', () => {
    const input = [9, 5, 2, 5, 1];
    const steps = strategy.generateSteps(input);
    const lastStep = steps[steps.length - 1];

    expect(lastStep.array).toEqual([1, 2, 5, 5, 9]);
  });

  it('should emit pivot, compare, swap, and recursion steps', () => {
    const input = [29, 10, 14, 37, 13];
    const steps = strategy.generateSteps(input);

    const pivotSteps = steps.filter((s) => s.actionType === 'pivot');
    const swapSteps = steps.filter((s) => s.actionType === 'swap');
    const partitionSteps = steps.filter((s) => s.actionType === 'partition');

    expect(pivotSteps.length).toBeGreaterThan(0);
    expect(swapSteps.length).toBeGreaterThan(0);
    expect(partitionSteps.length).toBeGreaterThan(0);
  });

  it('should return matching highlighted lines across pseudocode, C#, and C++', () => {
    // Partition call
    expect(QuickSortStrategy.getHighlightedLine(4, 'pseudocode')).toBe(4);
    expect(QuickSortStrategy.getHighlightedLine(4, 'csharp')).toBe(4);
    expect(QuickSortStrategy.getHighlightedLine(4, 'cpp')).toBe(4);

    // Pivot selection
    expect(QuickSortStrategy.getHighlightedLine(10, 'pseudocode')).toBe(10);
    expect(QuickSortStrategy.getHighlightedLine(10, 'csharp')).toBe(10);

    // Swap in loop
    expect(QuickSortStrategy.getHighlightedLine(15, 'pseudocode')).toBe(15);
    expect(QuickSortStrategy.getHighlightedLine(15, 'csharp')).toBe(15);

    // Swap pivot to final position
    expect(QuickSortStrategy.getHighlightedLine(18, 'pseudocode')).toBe(18);
    expect(QuickSortStrategy.getHighlightedLine(18, 'cpp')).toBe(18);
  });
});
