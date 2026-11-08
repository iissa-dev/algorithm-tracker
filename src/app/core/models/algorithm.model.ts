export type ActionType =
  | 'init'
  | 'select-key'
  | 'compare'
  | 'shift'
  | 'insert'
  | 'divide'
  | 'merge'
  | 'found'
  | 'not-found'
  | 'subarray-sorted'
  | 'all-sorted';

export type SupportedLanguage = 'pseudocode' | 'csharp' | 'cpp';

export interface VariableSnapshot {
  i: number | null;
  j: number | null;
  key: number | null;
  k?: number | null;
  left?: number | null;
  right?: number | null;
  mid?: number | null;
  target?: number | null;
  conditionDescription?: string | null;
  isConditionTrue?: boolean | null;
  custom?: Record<string, string | number | boolean>;
}

export interface KeyElementInfo {
  value: number;
  fromIndex: number;
}

export interface AlgorithmStep {
  stepIndex: number;
  totalSteps: number;
  array: number[];
  activeIndices: number[];
  sortedIndices: number[];
  key: KeyElementInfo | null;
  lineCodeNumber: number;
  phaseNameAr: string;
  descriptionAr: string;
  actionType: ActionType;
  variables: VariableSnapshot;
  auxiliaryArray?: number[];
}

export interface AlgorithmMetadata {
  id: string;
  nameEn: string;
  nameAr: string;
  chapterNumber: number;
  chapterTitle: string;
  categoryAr: string;
  descriptionAr: string;
  badge?: string;
  status: 'active';
  isSearchAlgorithm?: boolean;
  hasTreeVisualization?: boolean;
  videoUrl?: string;
  videoTitle?: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  stable: boolean;
  inPlace: boolean;
}

export interface AlgorithmStrategy {
  readonly metadata: AlgorithmMetadata;
  readonly codeSnippets: Record<SupportedLanguage, string[]>;
  generateSteps(initialArray: number[], target?: number): AlgorithmStep[];
}
