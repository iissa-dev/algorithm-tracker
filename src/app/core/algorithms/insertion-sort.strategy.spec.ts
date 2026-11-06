import { describe, it, expect } from 'vitest';
import { InsertionSortStrategy } from './insertion-sort.strategy';

describe('InsertionSortStrategy', () => {
  const strategy = new InsertionSortStrategy();

  it('should have proper metadata', () => {
    expect(strategy.metadata.id).toBe('insertion-sort');
    expect(strategy.metadata.stable).toBe(true);
    expect(strategy.metadata.inPlace).toBe(true);
    expect(strategy.codeSnippets.pseudocode.length).toBeGreaterThan(0);
    expect(strategy.codeSnippets.csharp.length).toBeGreaterThan(0);
    expect(strategy.codeSnippets.cpp.length).toBeGreaterThan(0);
  });

  it('should correctly sort an arbitrary array and mark the final step as all-sorted', () => {
    const input = [34, 12, 5, 89, 2];
    const steps = strategy.generateSteps(input);

    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0];
    expect(firstStep.array).toEqual([34, 12, 5, 89, 2]);
    expect(firstStep.actionType).toBe('init');

    const lastStep = steps[steps.length - 1];
    expect(lastStep.actionType).toBe('all-sorted');
    expect(lastStep.array).toEqual([2, 5, 12, 34, 89]);
    expect(lastStep.sortedIndices.length).toBe(5);
  });

  it('should handle already sorted arrays efficiently', () => {
    const input = [1, 2, 3, 4];
    const steps = strategy.generateSteps(input);
    const lastStep = steps[steps.length - 1];

    expect(lastStep.array).toEqual([1, 2, 3, 4]);
    expect(lastStep.actionType).toBe('all-sorted');
  });

  it('should handle reverse sorted arrays', () => {
    const input = [99, 77, 55, 33, 11];
    const steps = strategy.generateSteps(input);
    const lastStep = steps[steps.length - 1];

    expect(lastStep.array).toEqual([11, 33, 55, 77, 99]);
  });

  it('should handle duplicates correctly', () => {
    const input = [5, 2, 5, 1, 2];
    const steps = strategy.generateSteps(input);
    const lastStep = steps[steps.length - 1];

    expect(lastStep.array).toEqual([1, 2, 2, 5, 5]);
  });
});
