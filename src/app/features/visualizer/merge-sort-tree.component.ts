import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlgorithmEngineService } from '../../core/services/algorithm-engine.service';

export interface MergeTreeNode {
  id: string;
  left: number;
  right: number;
  initialValues: number[];
  mid?: number;
  isLeaf: boolean;
  children: MergeTreeNode[];
}

@Component({
  selector: 'app-merge-sort-tree',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './merge-sort-tree.component.html',
  styleUrl: './merge-sort-tree.component.css',
})
export class MergeSortTreeComponent {
  protected readonly engine = inject(AlgorithmEngineService);

  protected readonly currentStep = this.engine.currentStep;
  protected readonly currentArray = computed(() => {
    return this.currentStep()?.array ?? this.engine.currentArray();
  });

  protected readonly treeRoot = computed<MergeTreeNode | null>(() => {
    const arr = this.engine.currentArray();
    if (!arr || arr.length === 0) return null;
    return this.buildTree(arr, 0, arr.length - 1, 'root');
  });

  private buildTree(arr: number[], left: number, right: number, path: string): MergeTreeNode {
    const initialValues = arr.slice(left, right + 1);
    if (left >= right) {
      return {
        id: path,
        left,
        right,
        initialValues,
        isLeaf: true,
        children: [],
      };
    }

    const mid = Math.floor((left + right) / 2);
    return {
      id: path,
      left,
      right,
      initialValues,
      mid,
      isLeaf: false,
      children: [
        this.buildTree(arr, left, mid, `${path}-L`),
        this.buildTree(arr, mid + 1, right, `${path}-R`),
      ],
    };
  }

  getNodeValues(node: MergeTreeNode): number[] {
    const step = this.currentStep();
    if (!step) return node.initialValues;

    // If node is leaf, always return single item
    if (node.isLeaf) {
      return [step.array[node.left]];
    }

    // Return the slice from currentStep array if step has progressed
    return step.array.slice(node.left, node.right + 1);
  }

  isNodeActive(node: MergeTreeNode): boolean {
    const step = this.currentStep();
    if (!step || step.variables?.left === null || step.variables?.left === undefined) return false;
    return (
      step.variables.left === node.left &&
      step.variables.right === node.right
    );
  }

  isNodeDividing(node: MergeTreeNode): boolean {
    return this.isNodeActive(node) && this.currentStep()?.actionType === 'divide';
  }

  isNodeMerging(node: MergeTreeNode): boolean {
    const step = this.currentStep();
    if (!step) return false;
    return (
      this.isNodeActive(node) &&
      (step.actionType === 'merge' || step.actionType === 'subarray-sorted' || step.actionType === 'compare')
    );
  }
}
