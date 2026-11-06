import { describe, it, expect } from 'vitest';
import { SequentialSearchStrategy } from './sequential-search.strategy';

describe('SequentialSearchStrategy', () => {
  const strategy = new SequentialSearchStrategy();

  it('should have proper metadata with Chapter 3', () => {
    expect(strategy.metadata.id).toBe('sequential-search');
    expect(strategy.metadata.chapterNumber).toBe(3);
    expect(strategy.metadata.isSearchAlgorithm).toBe(true);
    expect(strategy.metadata.timeComplexity.best).toContain('O(1)');
    expect(strategy.metadata.timeComplexity.worst).toContain('O(n)');
  });

  it('should find element when present', () => {
    const input = [10, 20, 30, 40];
    const steps = strategy.generateSteps(input, 30);

    expect(steps.length).toBeGreaterThan(0);
    const foundStep = steps.find((s) => s.actionType === 'found');
    expect(foundStep).toBeDefined();
    expect(foundStep?.activeIndices).toContain(2); // 30 is at index 2
  });

  it('should mark not-found when target is missing', () => {
    const input = [10, 20, 30];
    const steps = strategy.generateSteps(input, 99);

    const notFoundStep = steps.find((s) => s.actionType === 'not-found');
    expect(notFoundStep).toBeDefined();
  });
});
