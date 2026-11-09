import { Injectable } from '@angular/core';
import { AlgorithmMetadata, AlgorithmStrategy } from '../models/algorithm.model';
import { InsertionSortStrategy } from './insertion-sort.strategy';
import { MergeSortStrategy } from './merge-sort.strategy';
import { QuickSortStrategy } from './quick-sort.strategy';
import { SequentialSearchStrategy } from './sequential-search.strategy';

@Injectable({
  providedIn: 'root',
})
export class AlgorithmRegistryService {
  private readonly strategies = new Map<string, AlgorithmStrategy>();

  constructor() {
    this.register(new InsertionSortStrategy());
    this.register(new MergeSortStrategy());
    this.register(new QuickSortStrategy());
    this.register(new SequentialSearchStrategy());
  }

  register(strategy: AlgorithmStrategy): void {
    this.strategies.set(strategy.metadata.id, strategy);
  }

  get(id: string): AlgorithmStrategy {
    const strategy = this.strategies.get(id);
    if (!strategy) {
      throw new Error(`Algorithm with id "${id}" not found.`);
    }
    return strategy;
  }

  getAll(): AlgorithmStrategy[] {
    return Array.from(this.strategies.values());
  }

  getCatalog(): AlgorithmMetadata[] {
    return this.getAll().map((s) => s.metadata);
  }
}
