import {
  AlgorithmMetadata,
  AlgorithmStep,
  AlgorithmStrategy,
  SupportedLanguage,
} from '../models/algorithm.model';

export class QuickSortStrategy implements AlgorithmStrategy {
  readonly metadata: AlgorithmMetadata = {
    id: 'quick-sort',
    nameEn: 'Quick Sort',
    nameAr: 'ترتيب سريع',
    chapterNumber: 2,
    chapterTitle: 'Chapter 2: Getting Started',
    categoryAr: 'خوارزميات الترتيب (Divide & Conquer)',
    descriptionAr: 'اختيار عنصر محوري (Pivot) وتقسيم المصفوفة إلى عناصر أصغر وأكبر منه، ثم الترتيب التكراري لكل قسم.',
    badge: 'Chapter 2',
    status: 'active',
    isSearchAlgorithm: false,
    hasTreeVisualization: true,
    videoUrl: 'https://www.youtube.com/embed/NK-Z7syJzP4?si=6RyvKmDZ0zydXlJ0',
    videoTitle: 'شرح خوارزمية الترتيب السريع (Quick Sort) - فَرِّقْ تَسُدْ',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(log n)',
    stable: false,
    inPlace: true,
  };

  readonly codeSnippets: Record<SupportedLanguage, string[]> = {
    pseudocode: [
      '// Chapter 2: QuickSort(A, low, high)',
      'QuickSort(A, low, high) {',
      '  if (low < high) {',
      '    p = Partition(A, low, high);',
      '    QuickSort(A, low, p - 1);',
      '    QuickSort(A, p + 1, high);',
      '  }',
      '}',
      'Partition(A, low, high) {',
      '  pivot = A[high];',
      '  i = low - 1;',
      '  for j = low to high - 1 {',
      '    if (A[j] <= pivot) {',
      '      i = i + 1;',
      '      swap(A[i], A[j]);',
      '    }',
      '  }',
      '  swap(A[i + 1], A[high]);',
      '  return i + 1;',
      '}',
    ],
    csharp: [
      '// Chapter 2: QuickSort C#',
      'void QuickSort(int[] A, int low, int high) {',
      '    if (low < high) {',
      '        int p = Partition(A, low, high);',
      '        QuickSort(A, low, p - 1);',
      '        QuickSort(A, p + 1, high);',
      '    }',
      '}',
      'int Partition(int[] A, int low, int high) {',
      '    int pivot = A[high];',
      '    int i = low - 1;',
      '    for (int j = low; j < high; j++) {',
      '        if (A[j] <= pivot) {',
      '            i++;',
      '            (A[i], A[j]) = (A[j], A[i]);',
      '        }',
      '    }',
      '    (A[i + 1], A[high]) = (A[high], A[i + 1]);',
      '    return i + 1;',
      '}',
    ],
    cpp: [
      '// Chapter 2: QuickSort C++',
      'void quickSort(std::vector<int>& A, int low, int high) {',
      '    if (low < high) {',
      '        int p = partition(A, low, high);',
      '        quickSort(A, low, p - 1);',
      '        quickSort(A, p + 1, high);',
      '    }',
      '}',
      'int partition(std::vector<int>& A, int low, int high) {',
      '    int pivot = A[high];',
      '    int i = low - 1;',
      '    for (int j = low; j < high; j++) {',
      '        if (A[j] <= pivot) {',
      '            i++;',
      '            std::swap(A[i], A[j]);',
      '        }',
      '    }',
      '    std::swap(A[i + 1], A[high]);',
      '    return i + 1;',
      '}',
    ],
  };

  static getHighlightedLine(logicalLineId: number, _lang: SupportedLanguage): number {
    switch (logicalLineId) {
      case 1: return 2;  // QuickSort function entry
      case 2: return 3;  // if (low < high)
      case 3: return 3;  // base case
      case 4: return 4;  // p = Partition(...)
      case 5: return 5;  // QuickSort left
      case 6: return 6;  // QuickSort right
      case 10: return 10; // pivot = A[high]
      case 11: return 11; // i = low - 1
      case 12: return 12; // for loop j
      case 13: return 13; // if (A[j] <= pivot)
      case 14: return 14; // i = i + 1
      case 15: return 15; // swap(A[i], A[j])
      case 18: return 18; // swap(A[i + 1], A[high])
      case 19: return 19; // return i + 1
      case 20: return 2;  // all sorted
      default: return 2;
    }
  }

  generateSteps(initialArray: number[]): AlgorithmStep[] {
    const rawSteps: Omit<AlgorithmStep, 'stepIndex' | 'totalSteps'>[] = [];
    const arr = [...initialArray];
    const n = arr.length;

    if (n === 0) return [];

    const permanentlySorted = new Set<number>();

    // Step 0: Init
    rawSteps.push({
      array: [...arr],
      activeIndices: [],
      sortedIndices: [],
      key: null,
      lineCodeNumber: 1,
      phaseNameAr: 'البداية',
      descriptionAr: 'البدء بخوارزمية الترتيب السريع (Quick Sort) بتكنيك فرّق تسد.',
      actionType: 'init',
      variables: {
        i: null,
        j: null,
        key: null,
        left: 0,
        right: n - 1,
        pivot: null,
        conditionDescription: `المصفوفة الحجم ${n}`,
      },
    });

    const runQuickSort = (low: number, high: number) => {
      // Step: Check low < high
      if (low >= high) {
        if (low === high) {
          permanentlySorted.add(low);
          rawSteps.push({
            array: [...arr],
            activeIndices: [low],
            sortedIndices: Array.from(permanentlySorted).sort((a, b) => a - b),
            key: null,
            lineCodeNumber: 3,
            phaseNameAr: 'حالة التوقف (Base Case)',
            descriptionAr: `النطاق [${low}] عنصر واحد فقط (${arr[low]}) ⬅ مرتب بالفعل، العودة من الاستدعاء.`,
            actionType: 'subarray-sorted',
            variables: {
              i: null,
              j: null,
              key: arr[low],
              left: low,
              right: high,
              pivot: arr[low],
              conditionDescription: `${low} < ${high} (خطأ: عنصر واحد)`,
              isConditionTrue: false,
            },
          });
        }
        return;
      }

      // Step: Partition Call
      rawSteps.push({
        array: [...arr],
        activeIndices: Array.from({ length: high - low + 1 }, (_, k) => low + k),
        sortedIndices: Array.from(permanentlySorted).sort((a, b) => a - b),
        key: null,
        lineCodeNumber: 4,
        phaseNameAr: 'بدء التقسيم (Partition)',
        descriptionAr: `استدعاء Partition للنطاق [${low}...${high}] لاختيار المحور وإعادة الترتيب حوله.`,
        actionType: 'partition',
        variables: {
          i: null,
          j: null,
          key: arr[high],
          left: low,
          right: high,
          pivot: arr[high],
          conditionDescription: `Partition(A, ${low}, ${high})`,
          isConditionTrue: true,
        },
      });

      // Execute Partition
      const pivot = arr[high];

      // Step: Select Pivot
      rawSteps.push({
        array: [...arr],
        activeIndices: [high],
        sortedIndices: Array.from(permanentlySorted).sort((a, b) => a - b),
        key: null,
        lineCodeNumber: 10,
        phaseNameAr: 'تحديد المحور (Pivot)',
        descriptionAr: `اختيار العنصر الأخير A[${high}] = ${pivot} كمحور للتقسيم (Pivot).`,
        actionType: 'pivot',
        variables: {
          i: null,
          j: null,
          key: pivot,
          left: low,
          right: high,
          pivot,
          conditionDescription: `pivot = A[${high}] = ${pivot}`,
        },
      });

      let i = low - 1;

      // Step: Init i
      rawSteps.push({
        array: [...arr],
        activeIndices: [high],
        sortedIndices: Array.from(permanentlySorted).sort((a, b) => a - b),
        key: null,
        lineCodeNumber: 11,
        phaseNameAr: 'تهيئة مؤشر i',
        descriptionAr: `تهيئة المؤشر i = ${i} (نهاية العناصر الأصغر من أو تساوي المحور).`,
        actionType: 'select-key',
        variables: {
          i,
          j: null,
          key: pivot,
          left: low,
          right: high,
          pivot,
          conditionDescription: `i = low - 1 = ${i}`,
        },
      });

      for (let j = low; j < high; j++) {
        // Step: for loop step
        rawSteps.push({
          array: [...arr],
          activeIndices: [j, high],
          sortedIndices: Array.from(permanentlySorted).sort((a, b) => a - b),
          key: null,
          lineCodeNumber: 12,
          phaseNameAr: `فحص العنصر j = ${j}`,
          descriptionAr: `فحص العنصر A[${j}] = ${arr[j]} ومقارنته بالمحور (${pivot}).`,
          actionType: 'compare',
          variables: {
            i,
            j,
            key: pivot,
            left: low,
            right: high,
            pivot,
            conditionDescription: `j = ${j} < ${high}`,
            isConditionTrue: true,
          },
        });

        // Step: if (A[j] <= pivot)
        const isLeq = arr[j] <= pivot;
        rawSteps.push({
          array: [...arr],
          activeIndices: [j, high],
          sortedIndices: Array.from(permanentlySorted).sort((a, b) => a - b),
          key: null,
          lineCodeNumber: 13,
          phaseNameAr: 'مقارنة مع المحور',
          descriptionAr: `مقارنة: A[${j}] (${arr[j]}) <= المحور (${pivot}) ⬅ ${
            isLeq ? 'صحيح (أصغر أو يساوي)، نقله لليسار.' : 'خطأ (أكبر)، يترك في مكانه.'
          }`,
          actionType: 'compare',
          variables: {
            i,
            j,
            key: pivot,
            left: low,
            right: high,
            pivot,
            conditionDescription: `${arr[j]} <= ${pivot} : ${isLeq ? 'نعم' : 'لا'}`,
            isConditionTrue: isLeq,
          },
        });

        if (isLeq) {
          i++;
          // Step: i = i + 1
          rawSteps.push({
            array: [...arr],
            activeIndices: [i, j, high],
            sortedIndices: Array.from(permanentlySorted).sort((a, b) => a - b),
            key: null,
            lineCodeNumber: 14,
            phaseNameAr: 'زيادة مؤشر i',
            descriptionAr: `زيادة i ليصبح ${i} لتوسيع نطاق العناصر الأصغر من المحور.`,
            actionType: 'select-key',
            variables: {
              i,
              j,
              key: pivot,
              left: low,
              right: high,
              pivot,
              conditionDescription: `i = ${i}`,
            },
          });

          // Step: swap(A[i], A[j])
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;

          rawSteps.push({
            array: [...arr],
            activeIndices: [i, j],
            sortedIndices: Array.from(permanentlySorted).sort((a, b) => a - b),
            key: null,
            lineCodeNumber: 15,
            phaseNameAr: 'تبديل (Swap)',
            descriptionAr: `تبديل A[${i}] (${arr[i]}) مع A[${j}] (${arr[j]}) لنقل الأصغر لليسار.`,
            actionType: 'swap',
            variables: {
              i,
              j,
              key: pivot,
              left: low,
              right: high,
              pivot,
              conditionDescription: `swap(A[${i}], A[${j}])`,
            },
          });
        }
      }

      // Step: swap(A[i + 1], A[high])
      const pivotIdx = i + 1;
      const tmp = arr[pivotIdx];
      arr[pivotIdx] = arr[high];
      arr[high] = tmp;

      rawSteps.push({
        array: [...arr],
        activeIndices: [pivotIdx, high],
        sortedIndices: Array.from(permanentlySorted).sort((a, b) => a - b),
        key: null,
        lineCodeNumber: 18,
        phaseNameAr: 'تثبيت المحور (Swap Pivot)',
        descriptionAr: `تبديل المحور (${pivot}) من [${high}] إلى موضعه الفاصل الصحيح [${pivotIdx}].`,
        actionType: 'swap',
        variables: {
          i: pivotIdx,
          j: null,
          key: pivot,
          left: low,
          right: high,
          pivot,
          pivotIndex: pivotIdx,
          conditionDescription: `swap(A[${pivotIdx}], A[${high}])`,
        },
      });

      // Step: return i + 1 (Pivot settled)
      permanentlySorted.add(pivotIdx);
      rawSteps.push({
        array: [...arr],
        activeIndices: [pivotIdx],
        sortedIndices: Array.from(permanentlySorted).sort((a, b) => a - b),
        key: null,
        lineCodeNumber: 19,
        phaseNameAr: 'المحور في موضعه النهائي',
        descriptionAr: `المحور (${pivot}) الآن في موضعه النهائي الصحيح [${pivotIdx}].`,
        actionType: 'subarray-sorted',
        variables: {
          i: pivotIdx,
          j: null,
          key: pivot,
          left: low,
          right: high,
          pivot,
          pivotIndex: pivotIdx,
          conditionDescription: `p = ${pivotIdx}`,
        },
      });

      // Step: Recurse Left
      rawSteps.push({
        array: [...arr],
        activeIndices: Array.from(
          { length: Math.max(0, pivotIdx - low) },
          (_, k) => low + k
        ),
        sortedIndices: Array.from(permanentlySorted).sort((a, b) => a - b),
        key: null,
        lineCodeNumber: 5,
        phaseNameAr: 'استدعاء النصف الأيسر',
        descriptionAr: `استدعاء QuickSort للنصف الأيسر (الأصغر من المحور): النطاق [${low}...${pivotIdx - 1}].`,
        actionType: 'divide',
        variables: {
          i: null,
          j: null,
          key: pivot,
          left: low,
          right: pivotIdx - 1,
          pivot,
          conditionDescription: `QuickSort(A, ${low}, ${pivotIdx - 1})`,
        },
      });
      runQuickSort(low, pivotIdx - 1);

      // Step: Recurse Right
      rawSteps.push({
        array: [...arr],
        activeIndices: Array.from(
          { length: Math.max(0, high - pivotIdx) },
          (_, k) => pivotIdx + 1 + k
        ),
        sortedIndices: Array.from(permanentlySorted).sort((a, b) => a - b),
        key: null,
        lineCodeNumber: 6,
        phaseNameAr: 'استدعاء النصف الأيمن',
        descriptionAr: `استدعاء QuickSort للنصف الأيمن (الأكبر من المحور): النطاق [${pivotIdx + 1}...${high}].`,
        actionType: 'divide',
        variables: {
          i: null,
          j: null,
          key: pivot,
          left: pivotIdx + 1,
          right: high,
          pivot,
          conditionDescription: `QuickSort(A, ${pivotIdx + 1}, ${high})`,
        },
      });
      runQuickSort(pivotIdx + 1, high);
    };

    runQuickSort(0, n - 1);

    // Final Step
    rawSteps.push({
      array: [...arr],
      activeIndices: [],
      sortedIndices: Array.from({ length: n }, (_, k) => k),
      key: null,
      lineCodeNumber: 20,
      phaseNameAr: 'اكتمل الترتيب',
      descriptionAr: 'اكتمل الترتيب: جميع العناصر مدمجة ومرتبة بالكامل بواسطة Quick Sort.',
      actionType: 'all-sorted',
      variables: {
        i: null,
        j: null,
        key: null,
        left: 0,
        right: n - 1,
        pivot: null,
        conditionDescription: 'O(n log n) مكتمل',
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
