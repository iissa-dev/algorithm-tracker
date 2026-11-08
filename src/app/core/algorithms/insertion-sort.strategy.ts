import {
  AlgorithmMetadata,
  AlgorithmStep,
  AlgorithmStrategy,
  SupportedLanguage,
} from '../models/algorithm.model';

export class InsertionSortStrategy implements AlgorithmStrategy {
  readonly metadata: AlgorithmMetadata = {
    id: 'insertion-sort',
    nameEn: 'Insertion Sort',
    nameAr: 'ترتيب بالإدراج',
    chapterNumber: 2,
    chapterTitle: 'Chapter 2: Getting Started',
    categoryAr: 'خوارزميات الترتيب (Sorting)',
    descriptionAr: 'ترتيب العناصر عن طريق إزاحة القيم الأكبر وإدراج المفتاح في موضعه الصحيح.',
    badge: 'Chapter 2',
    status: 'active',
    isSearchAlgorithm: false,
    videoUrl: 'https://www.youtube.com/embed/hm5qvaSnnc8?si=Q-1Avd0C2ys8-VuO',
    videoTitle: 'شرح خوارزمية ترتيب الإدراج (Insertion Sort)',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
  };

  readonly codeSnippets: Record<SupportedLanguage, string[]> = {
    pseudocode: [
      '// Chapter 2: InsertionSort(A, n)',
      'InsertionSort(A, n) {',
      '  for i = 2 to n {',
      '    key = A[i]',
      '    j = i - 1',
      '    while (j > 0) and (A[j] > key) {',
      '      A[j+1] = A[j]',
      '      j = j - 1',
      '    }',
      '    A[j+1] = key',
      '  }',
      '}',
    ],
    csharp: [
      '// Chapter 2: InsertionSort C#',
      'public void InsertionSort(int[] arr) {',
      '    int n = arr.Length;',
      '    for (int i = 1; i < n; i++) {',
      '        int key = arr[i];',
      '        int j = i - 1;',
      '        while (j >= 0 && arr[j] > key) {',
      '            arr[j + 1] = arr[j];',
      '            j--;',
      '        }',
      '        arr[j + 1] = key;',
      '    }',
      '}',
    ],
    cpp: [
      '// Chapter 2: InsertionSort C++',
      'void insertionSort(std::vector<int>& arr) {',
      '    int n = arr.size();',
      '    for (int i = 1; i < n; i++) {',
      '        int key = arr[i];',
      '        int j = i - 1;',
      '        while (j >= 0 && arr[j] > key) {',
      '            arr[j + 1] = arr[j];',
      '            j--;',
      '        }',
      '        arr[j + 1] = key;',
      '    }',
      '}',
    ],
  };

  static getHighlightedLine(logicalLineId: number, lang: SupportedLanguage): number {
    switch (lang) {
      case 'pseudocode':
        switch (logicalLineId) {
          case 1: return 2;
          case 2: return 3;
          case 3: return 4;
          case 4: return 5;
          case 5: return 6;
          case 6: return 7;
          case 7: return 8;
          case 8: return 10;
          case 9: return 12;
          default: return 2;
        }
      case 'csharp':
      case 'cpp':
        switch (logicalLineId) {
          case 1: return 2;
          case 2: return 4;
          case 3: return 5;
          case 4: return 6;
          case 5: return 7;
          case 6: return 8;
          case 7: return 9;
          case 8: return 11;
          case 9: return 13;
          default: return 2;
        }
    }
  }

  generateSteps(initialArray: number[]): AlgorithmStep[] {
    const rawSteps: Omit<AlgorithmStep, 'stepIndex' | 'totalSteps'>[] = [];
    const arr = [...initialArray];
    const n = arr.length;

    if (n === 0) return [];

    rawSteps.push({
      array: [...arr],
      activeIndices: [],
      sortedIndices: [0],
      key: null,
      lineCodeNumber: 1,
      phaseNameAr: 'البداية',
      descriptionAr: 'العنصر الأول [0] مرتب افتراضياً.',
      actionType: 'init',
      variables: {
        i: null,
        j: null,
        key: null,
        conditionDescription: 'جاهز',
        isConditionTrue: null,
      },
    });

    for (let i = 1; i < n; i++) {
      const currentKey = arr[i];

      rawSteps.push({
        array: [...arr],
        activeIndices: [i],
        sortedIndices: Array.from({ length: i }, (_, k) => k),
        key: null,
        lineCodeNumber: 2,
        phaseNameAr: `دورة i = ${i}`,
        descriptionAr: `تحديد العنصر [${i}] ذو القيمة (${currentKey}).`,
        actionType: 'select-key',
        variables: {
          i,
          j: null,
          key: null,
          conditionDescription: `i = ${i} < ${n}`,
          isConditionTrue: true,
        },
      });

      rawSteps.push({
        array: [...arr],
        activeIndices: [i],
        sortedIndices: Array.from({ length: i }, (_, k) => k),
        key: { value: currentKey, fromIndex: i },
        lineCodeNumber: 3,
        phaseNameAr: 'استخراج المفتاح',
        descriptionAr: `حفظ المفتاح Key = ${currentKey}.`,
        actionType: 'select-key',
        variables: {
          i,
          j: null,
          key: currentKey,
          conditionDescription: `Key = ${currentKey}`,
          isConditionTrue: true,
        },
      });

      let j = i - 1;
      rawSteps.push({
        array: [...arr],
        activeIndices: [i, j],
        sortedIndices: Array.from({ length: i }, (_, k) => k),
        key: { value: currentKey, fromIndex: i },
        lineCodeNumber: 4,
        phaseNameAr: 'تهيئة j',
        descriptionAr: `تعيين مؤشر المقارنة j = ${j}.`,
        actionType: 'select-key',
        variables: {
          i,
          j,
          key: currentKey,
          conditionDescription: `j = ${j}`,
          isConditionTrue: true,
        },
      });

      while (j >= 0 && arr[j] > currentKey) {
        rawSteps.push({
          array: [...arr],
          activeIndices: [j],
          sortedIndices: Array.from({ length: i }, (_, k) => k).filter((idx) => idx !== j),
          key: { value: currentKey, fromIndex: i },
          lineCodeNumber: 5,
          phaseNameAr: 'مقارنة',
          descriptionAr: `مقارنة: ${arr[j]} > ${currentKey} (صحيح) ⬅ إزاحة ${arr[j]} لليمين.`,
          actionType: 'compare',
          variables: {
            i,
            j,
            key: currentKey,
            conditionDescription: `${arr[j]} > ${currentKey} (نعم)`,
            isConditionTrue: true,
          },
        });

        arr[j + 1] = arr[j];
        rawSteps.push({
          array: [...arr],
          activeIndices: [j, j + 1],
          sortedIndices: Array.from({ length: i }, (_, k) => k).filter((idx) => idx !== j),
          key: { value: currentKey, fromIndex: i },
          lineCodeNumber: 6,
          phaseNameAr: 'إزاحة',
          descriptionAr: `إزاحة ${arr[j]} إلى الموقع [${j + 1}].`,
          actionType: 'shift',
          variables: {
            i,
            j,
            key: currentKey,
            conditionDescription: `arr[${j + 1}] = ${arr[j]}`,
            isConditionTrue: true,
          },
        });

        j--;
        rawSteps.push({
          array: [...arr],
          activeIndices: j >= 0 ? [j] : [],
          sortedIndices: Array.from({ length: i }, (_, k) => k),
          key: { value: currentKey, fromIndex: i },
          lineCodeNumber: 7,
          phaseNameAr: 'تحديث j',
          descriptionAr: `إنقاص j ليصبح ${j}.`,
          actionType: 'compare',
          variables: {
            i,
            j,
            key: currentKey,
            conditionDescription: `j = ${j}`,
            isConditionTrue: true,
          },
        });
      }

      if (j >= 0) {
        rawSteps.push({
          array: [...arr],
          activeIndices: [j],
          sortedIndices: Array.from({ length: i }, (_, k) => k),
          key: { value: currentKey, fromIndex: i },
          lineCodeNumber: 5,
          phaseNameAr: 'توقف المقارنة',
          descriptionAr: `${arr[j]} ليس أكبر من ${currentKey} ⬅ موضع المفتاح هو [${j + 1}].`,
          actionType: 'compare',
          variables: {
            i,
            j,
            key: currentKey,
            conditionDescription: `${arr[j]} > ${currentKey} (لا)`,
            isConditionTrue: false,
          },
        });
      } else {
        rawSteps.push({
          array: [...arr],
          activeIndices: [],
          sortedIndices: Array.from({ length: i }, (_, k) => k),
          key: { value: currentKey, fromIndex: i },
          lineCodeNumber: 5,
          phaseNameAr: 'توقف (بداية)',
          descriptionAr: `j = -1 ⬅ المفتاح (${currentKey}) سيوضع في البداية [0].`,
          actionType: 'compare',
          variables: {
            i,
            j,
            key: currentKey,
            conditionDescription: 'j < 0',
            isConditionTrue: false,
          },
        });
      }

      arr[j + 1] = currentKey;
      rawSteps.push({
        array: [...arr],
        activeIndices: [j + 1],
        sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
        key: null,
        lineCodeNumber: 8,
        phaseNameAr: 'إدراج المفتاح',
        descriptionAr: `إدراج المفتاح (${currentKey}) في الموقع [${j + 1}].`,
        actionType: 'insert',
        variables: {
          i,
          j,
          key: currentKey,
          conditionDescription: `arr[${j + 1}] = ${currentKey}`,
          isConditionTrue: null,
        },
      });
    }

    rawSteps.push({
      array: [...arr],
      activeIndices: [],
      sortedIndices: Array.from({ length: n }, (_, k) => k),
      key: null,
      lineCodeNumber: 9,
      phaseNameAr: 'اكتمل الترتيب',
      descriptionAr: 'اكتمل الترتيب: جميع العناصر في مواقعها الصحيحة.',
      actionType: 'all-sorted',
      variables: {
        i: n,
        j: null,
        key: null,
        conditionDescription: 'مرتب بالكامل',
        isConditionTrue: true,
      },
    });

    const totalSteps = rawSteps.length;
    return rawSteps.map((step, index) => ({
      ...step,
      stepIndex: index,
      totalSteps,
    }));
  }
}
