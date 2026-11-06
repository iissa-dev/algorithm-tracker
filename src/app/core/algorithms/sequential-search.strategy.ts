import {
  AlgorithmMetadata,
  AlgorithmStep,
  AlgorithmStrategy,
  SupportedLanguage,
} from '../models/algorithm.model';

export class SequentialSearchStrategy implements AlgorithmStrategy {
  readonly metadata: AlgorithmMetadata = {
    id: 'sequential-search',
    nameEn: 'Sequential Search',
    nameAr: 'البحث التسلسلي',
    chapterNumber: 3,
    chapterTitle: 'Chapter 3: Growth of Functions',
    categoryAr: 'خوارزميات البحث (Searching)',
    descriptionAr: 'البحث عن عنصر x في مصفوفة بفحص العناصر واحداً تلو الآخر حتى إيجاده أو الوصول للنهاية.',
    badge: 'Chapter 3',
    status: 'active',
    isSearchAlgorithm: true,
    timeComplexity: {
      best: 'O(1) - في أول موقع',
      average: 'O(n) - في المنتصف',
      worst: 'O(n) - غير موجود أو بالآخر',
    },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
  };

  readonly codeSnippets: Record<SupportedLanguage, string[]> = {
    pseudocode: [
      '// Chapter 3: Seq_Search(A[n]: array, x: item)',
      'Seq_Search(A[n]: array, x: item) {',
      '  done = false;',
      '  i = 1;',
      '  while ((i <= n) and (A[i] <> x)) {',
      '    i = i + 1;',
      '  }',
      '  return i;',
      '}',
    ],
    csharp: [
      '// Chapter 3: Sequential Search C#',
      'int SeqSearch(int[] A, int n, int x) {',
      '    int i = 0;',
      '    while (i < n && A[i] != x) {',
      '        i++;',
      '    }',
      '    return (i < n) ? i : -1;',
      '}',
    ],
    cpp: [
      '// Chapter 3: Sequential Search C++',
      'int seqSearch(const std::vector<int>& A, int n, int x) {',
      '    int i = 0;',
      '    while (i < n && A[i] != x) {',
      '        i++;',
      '    }',
      '    return (i < n) ? i : -1;',
      '}',
    ],
  };

  static getHighlightedLine(logicalLineId: number, lang: SupportedLanguage): number {
    switch (lang) {
      case 'pseudocode':
        switch (logicalLineId) {
          case 1: return 2;
          case 2: return 3; // done = false
          case 3: return 4; // i = 1
          case 4: return 5; // while condition
          case 5: return 6; // i = i + 1
          case 6: return 8; // return i
          default: return 2;
        }
      case 'csharp':
      case 'cpp':
        switch (logicalLineId) {
          case 1: return 2;
          case 2: return 3;
          case 3: return 3;
          case 4: return 4;
          case 5: return 5;
          case 6: return 7;
          default: return 2;
        }
    }
  }

  generateSteps(initialArray: number[], targetVal?: number): AlgorithmStep[] {
    const rawSteps: Omit<AlgorithmStep, 'stepIndex' | 'totalSteps'>[] = [];
    const arr = [...initialArray];
    const n = arr.length;

    // Default target: choose arr[2] if available, otherwise 14 or 10
    const x = targetVal !== undefined ? targetVal : (n >= 3 ? arr[2] : (arr[0] ?? 10));

    if (n === 0) return [];

    // Step 0: Init
    rawSteps.push({
      array: [...arr],
      activeIndices: [],
      sortedIndices: [],
      key: null,
      lineCodeNumber: 1,
      phaseNameAr: 'البداية',
      descriptionAr: `البحث عن العنصر x = ${x} في مصفوفة بحجم ${n}.`,
      actionType: 'init',
      variables: {
        i: null,
        j: null,
        key: x,
        target: x,
        conditionDescription: `هدف البحث x = ${x}`,
      },
    });

    let i = 0;
    let found = false;

    // Step: initialize i
    rawSteps.push({
      array: [...arr],
      activeIndices: [0],
      sortedIndices: [],
      key: null,
      lineCodeNumber: 3,
      phaseNameAr: 'تهيئة المؤشر',
      descriptionAr: `تهيئة المؤشر i = 1 (الموقع الأول [0]).`,
      actionType: 'select-key',
      variables: {
        i: 0,
        j: null,
        key: x,
        target: x,
        conditionDescription: `i = 1 (Index 0)`,
      },
    });

    while (i < n && !found) {
      // Comparison Step
      const matches = arr[i] === x;

      rawSteps.push({
        array: [...arr],
        activeIndices: [i],
        sortedIndices: [],
        key: null,
        lineCodeNumber: 4,
        phaseNameAr: 'مقارنة',
        descriptionAr: `فحص الموقع [${i}]: هل A[${i}] (${arr[i]}) يساوي ${x}؟ ${matches ? 'نعم! تم العثور عليه.' : 'لا، انتقال للتالي.'}`,
        actionType: 'compare',
        variables: {
          i,
          j: null,
          key: x,
          target: x,
          conditionDescription: `A[${i}] (${arr[i]}) == ${x} : ${matches ? 'نعم' : 'لا'}`,
          isConditionTrue: !matches,
        },
      });

      if (matches) {
        found = true;
        rawSteps.push({
          array: [...arr],
          activeIndices: [i],
          sortedIndices: [i],
          key: null,
          lineCodeNumber: 6,
          phaseNameAr: 'تم الإيجاد (Found)',
          descriptionAr: `نجاح: تم العثور على العنصر (${x}) في الموقع [${i}]! (أفضل حالة إذا كان أول عنصر).`,
          actionType: 'found',
          variables: {
            i,
            j: null,
            key: x,
            target: x,
            conditionDescription: `تم العثور عليه عند الموقع [${i}]`,
            isConditionTrue: true,
          },
        });
      } else {
        i++;
        if (i < n) {
          rawSteps.push({
            array: [...arr],
            activeIndices: [i],
            sortedIndices: [],
            key: null,
            lineCodeNumber: 5,
            phaseNameAr: 'تحريك المؤشر',
            descriptionAr: `i = i + 1 ⬅ الانتقال للموقع التالي [${i}].`,
            actionType: 'shift',
            variables: {
              i,
              j: null,
              key: x,
              target: x,
              conditionDescription: `i أصبح ${i + 1}`,
            },
          });
        }
      }
    }

    if (!found) {
      rawSteps.push({
        array: [...arr],
        activeIndices: [],
        sortedIndices: [],
        key: null,
        lineCodeNumber: 6,
        phaseNameAr: 'غير موجود (Not Found)',
        descriptionAr: `العنصر (${x}) غير موجود في المصفوفة بعد فحص كافة العناصر (أسوأ حالة O(n)).`,
        actionType: 'not-found',
        variables: {
          i: n,
          j: null,
          key: x,
          target: x,
          conditionDescription: `i = ${n + 1} (غير موجود)`,
          isConditionTrue: false,
        },
      });
    }

    const totalSteps = rawSteps.length;
    return rawSteps.map((step, index) => ({
      ...step,
      stepIndex: index,
      totalSteps,
    }));
  }
}
