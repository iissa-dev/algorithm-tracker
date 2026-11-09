import { describe, it, expect } from 'vitest';
import { MergeSortStrategy } from './merge-sort.strategy';

describe('MergeSortStrategy', () => {
  const strategy = new MergeSortStrategy();

  it('should have proper metadata with Chapter 2', () => {
    expect(strategy.metadata.id).toBe('merge-sort');
    expect(strategy.metadata.chapterNumber).toBe(2);
    expect(strategy.metadata.timeComplexity.worst).toContain('O(n log n)');
    expect(strategy.codeSnippets.pseudocode.length).toBeGreaterThan(0);
  });

  it('should correctly sort an arbitrary array through divide and conquer', () => {
    const input = [38, 27, 43, 3, 9, 82, 10];
    const steps = strategy.generateSteps(input);

    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0];
    expect(firstStep.actionType).toBe('init');

    const lastStep = steps[steps.length - 1];
    expect(lastStep.actionType).toBe('all-sorted');
    expect(lastStep.array).toEqual([3, 9, 10, 27, 38, 43, 82]);
  });

  it('should handle duplicates and reverse sorted arrays', () => {
    const input = [9, 5, 2, 5, 1];
    const steps = strategy.generateSteps(input);
    const lastStep = steps[steps.length - 1];

    expect(lastStep.array).toEqual([1, 2, 5, 5, 9]);
  });

  it('should step through while condition, if branch, and else branch during Merge', () => {
    const input = [29, 10, 14, 37, 13];
    const steps = strategy.generateSteps(input);

    const whileSteps = steps.filter((s) => s.lineCodeNumber === 7);
    const ifBranchSteps = steps.filter((s) => s.lineCodeNumber === 8);
    const elseBranchSteps = steps.filter((s) => s.lineCodeNumber === 9);

    expect(whileSteps.length).toBeGreaterThan(0);
    expect(ifBranchSteps.length).toBeGreaterThan(0);
    expect(elseBranchSteps.length).toBeGreaterThan(0);
  });

  it('should return matching highlighted lines for pseudocode, C#, and C++', () => {
    // while loop line
    expect(MergeSortStrategy.getHighlightedLine(7, 'pseudocode')).toBe(12);
    expect(MergeSortStrategy.getHighlightedLine(7, 'csharp')).toBe(13);
    expect(MergeSortStrategy.getHighlightedLine(7, 'cpp')).toBe(13);

    // if branch line
    expect(MergeSortStrategy.getHighlightedLine(8, 'pseudocode')).toBe(13);
    expect(MergeSortStrategy.getHighlightedLine(8, 'csharp')).toBe(14);
    expect(MergeSortStrategy.getHighlightedLine(8, 'cpp')).toBe(14);

    // else branch line
    expect(MergeSortStrategy.getHighlightedLine(9, 'pseudocode')).toBe(14);
    expect(MergeSortStrategy.getHighlightedLine(9, 'csharp')).toBe(15);
    expect(MergeSortStrategy.getHighlightedLine(9, 'cpp')).toBe(15);

    // copy remaining / write back line
    expect(MergeSortStrategy.getHighlightedLine(10, 'pseudocode')).toBe(16);
    expect(MergeSortStrategy.getHighlightedLine(10, 'csharp')).toBe(19);
    expect(MergeSortStrategy.getHighlightedLine(10, 'cpp')).toBe(19);
  });
});
