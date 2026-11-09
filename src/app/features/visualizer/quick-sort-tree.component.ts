import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlgorithmEngineService } from '../../core/services/algorithm-engine.service';

export interface QuickSortTreeNode {
  id: string;
  left: number;
  right: number;
  initialValues: number[];
  partitionedValues: number[];
  pivotValue: number;
  pivotIndex: number;
  branchRole: string; // "root" | "≤ P" | "> P"
  isLeaf: boolean;
  startStepIndex: number;
  endStepIndex: number;
  children: QuickSortTreeNode[];
}

@Component({
  selector: 'app-quick-sort-tree',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-sort-tree.component.html',
  styleUrl: './quick-sort-tree.component.css',
})
export class QuickSortTreeComponent {
  protected readonly engine = inject(AlgorithmEngineService);

  protected readonly currentStep = this.engine.currentStep;
  protected readonly currentArray = computed(() => {
    return this.currentStep()?.array ?? this.engine.currentArray();
  });

  protected readonly treeRoot = computed<QuickSortTreeNode | null>(() => {
    const arr = this.engine.currentArray();
    if (!arr || arr.length === 0) return null;
    return this.buildTree(arr);
  });

  private buildTree(initialArr: number[]): QuickSortTreeNode | null {
    const arr = [...initialArr];
    const steps = this.engine.steps();

    const recurse = (
      left: number,
      right: number,
      path: string,
      branchRole: string
    ): QuickSortTreeNode | null => {
      if (left > right) return null;

      // Slice of subarray when this recursive call is reached
      const initialValues = arr.slice(left, right + 1);

      // Find step range for this partition in the engine steps
      const matching = steps.filter(
        (s) => s.variables?.left === left && s.variables?.right === right
      );
      const startStepIndex = matching[0]?.stepIndex ?? 0;
      const endStepIndex = matching[matching.length - 1]?.stepIndex ?? steps.length;

      if (left === right) {
        return {
          id: path,
          left,
          right,
          initialValues,
          partitionedValues: [...initialValues],
          pivotValue: arr[left],
          pivotIndex: left,
          branchRole,
          isLeaf: true,
          startStepIndex,
          endStepIndex,
          children: [],
        };
      }

      // Lomuto partition simulation to compute structure and accurate slices
      const pivot = arr[right];
      let i = left - 1;
      for (let j = left; j < right; j++) {
        if (arr[j] <= pivot) {
          i++;
          const tmp = arr[i];
          arr[i] = arr[j];
          arr[j] = tmp;
        }
      }
      const pivotIdx = i + 1;
      const tmp = arr[pivotIdx];
      arr[pivotIdx] = arr[right];
      arr[right] = tmp;

      const partitionedValues = arr.slice(left, right + 1);

      const children: QuickSortTreeNode[] = [];
      if (left <= pivotIdx - 1) {
        const leftChild = recurse(left, pivotIdx - 1, `${path}-L`, '≤ P');
        if (leftChild) children.push(leftChild);
      }
      if (pivotIdx + 1 <= right) {
        const rightChild = recurse(pivotIdx + 1, right, `${path}-R`, '> P');
        if (rightChild) children.push(rightChild);
      }

      return {
        id: path,
        left,
        right,
        initialValues,
        partitionedValues,
        pivotValue: pivot,
        pivotIndex: pivotIdx,
        branchRole,
        isLeaf: children.length === 0,
        startStepIndex,
        endStepIndex,
        children,
      };
    };

    return recurse(0, arr.length - 1, 'root', 'root');
  }

  getNodeValues(node: QuickSortTreeNode): number[] {
    const step = this.currentStep();
    if (!step) return node.initialValues;

    // Has this node been reached yet?
    if (step.stepIndex < node.startStepIndex) {
      return node.initialValues;
    }

    // Is this node currently active or completed?
    return step.array.slice(node.left, node.right + 1);
  }

  isNodeActive(node: QuickSortTreeNode): boolean {
    const step = this.currentStep();
    if (!step || step.variables?.left === null || step.variables?.left === undefined) return false;
    return (
      step.variables.left === node.left &&
      step.variables.right === node.right
    );
  }

  isNodePartitioned(node: QuickSortTreeNode): boolean {
    const step = this.currentStep();
    if (!step) return false;
    return (
      step.stepIndex > node.endStepIndex ||
      (step.sortedIndices !== undefined && step.sortedIndices.includes(node.pivotIndex))
    );
  }

  isNodePartitioning(node: QuickSortTreeNode): boolean {
    const step = this.currentStep();
    if (!step) return false;
    return (
      this.isNodeActive(node) &&
      (step.actionType === 'partition' ||
        step.actionType === 'pivot' ||
        step.actionType === 'compare' ||
        step.actionType === 'swap')
    );
  }

  isNodeSettled(node: QuickSortTreeNode): boolean {
    const step = this.currentStep();
    if (!step) return false;
    return (
      this.isNodeActive(node) &&
      (step.actionType === 'subarray-sorted' || step.actionType === 'all-sorted')
    );
  }

  isPivotElement(node: QuickSortTreeNode, relativeIndex: number): boolean {
    if (node.isLeaf) return false;
    const globalIndex = node.left + relativeIndex;
    const step = this.currentStep();

    if (this.isNodeActive(node)) {
      if (step?.variables?.pivotIndex !== null && step?.variables?.pivotIndex !== undefined) {
        return globalIndex === step.variables.pivotIndex;
      }
      return globalIndex === node.right;
    }

    if (this.isNodePartitioned(node)) {
      return globalIndex === node.pivotIndex;
    }

    return false;
  }
}
