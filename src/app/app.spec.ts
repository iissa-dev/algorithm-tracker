import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { AlgorithmEngineService } from './core/services/algorithm-engine.service';

describe('App', () => {
  let engine: AlgorithmEngineService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
    engine = TestBed.inject(AlgorithmEngineService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render catalog on first page with Chapter 2 & Chapter 3', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('AlgorithmTracker');
    expect(compiled.textContent).toContain('Insertion Sort');
    expect(compiled.textContent).toContain('Merge Sort');
    expect(compiled.textContent).toContain('Sequential Search');
    expect(compiled.textContent).toContain('Chapter 2');
    expect(compiled.textContent).toContain('Chapter 3');
  });

  it('should switch between algorithms cleanly', async () => {
    const fixture = TestBed.createComponent(App);
    engine.openVisualizer('merge-sort');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(engine.activeView()).toBe('visualizer');
    expect(engine.selectedAlgorithmId()).toBe('merge-sort');

    engine.openVisualizer('sequential-search');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(engine.selectedAlgorithmId()).toBe('sequential-search');
  });
});
