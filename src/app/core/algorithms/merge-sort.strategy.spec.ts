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
});
