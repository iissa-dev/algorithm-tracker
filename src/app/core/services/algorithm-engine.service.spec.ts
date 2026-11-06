import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { AlgorithmEngineService } from './algorithm-engine.service';
import { AlgorithmRegistryService } from '../algorithms/algorithm-registry.service';

describe('AlgorithmEngineService', () => {
  let service: AlgorithmEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlgorithmEngineService, AlgorithmRegistryService],
    });
    service = TestBed.inject(AlgorithmEngineService);
  });

  it('should initialize with 3 algorithms from Chapters 2 & 3', () => {
    expect(service.catalog().length).toBe(3);
    const ids = service.catalog().map((a) => a.id);
    expect(ids).toContain('insertion-sort');
    expect(ids).toContain('merge-sort');
    expect(ids).toContain('sequential-search');
  });

  it('should step forward and backward correctly', () => {
    expect(service.currentStepIndex()).toBe(0);
    service.stepForward();
    expect(service.currentStepIndex()).toBe(1);
    service.stepBackward();
    expect(service.currentStepIndex()).toBe(0);
  });

  it('should switch algorithm to merge sort and compute steps', () => {
    service.openVisualizer('merge-sort');
    expect(service.selectedAlgorithmId()).toBe('merge-sort');
    expect(service.steps().length).toBeGreaterThan(0);
    expect(service.currentAlgorithm().metadata.chapterNumber).toBe(2);
  });

  it('should switch algorithm to sequential search and search target', () => {
    service.openVisualizer('sequential-search');
    service.setSearchTarget(10);
    expect(service.selectedAlgorithmId()).toBe('sequential-search');
    expect(service.currentAlgorithm().metadata.chapterNumber).toBe(3);
  });
});
