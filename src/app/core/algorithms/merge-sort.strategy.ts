import {
  AlgorithmMetadata,
  AlgorithmStep,
  AlgorithmStrategy,
  SupportedLanguage,
} from '../models/algorithm.model';

export class MergeSortStrategy implements AlgorithmStrategy {
  readonly metadata: AlgorithmMetadata = {
    id: 'merge-sort',
    nameEn: 'Merge Sort',
    nameAr: 'ترتيب بالدمج',
    chapterNumber: 2,
    chapterTitle: 'Chapter 2: Getting Started',
    categoryAr: 'خوارزميات الترتيب (Divide & Conquer)',
    descriptionAr: 'تقسيم المصفوفة إلى نصفين متكررين حتى عناصر أحادية، ثم دمجهما تصاعدياً.',
    badge: 'Chapter 2',
    status: 'active',
    isSearchAlgorithm: false,
    hasTreeVisualization: true,
    videoUrl: 'https://www.youtube.com/embed/sh3ax9qOmY8?si=pL2mzbkuBIECM7Tg',
    videoTitle: 'شرح خوارزمية ترتيب الدمج (Merge Sort) - فَرِّقْ تَسُدْ',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: false,
  };

  readonly codeSnippets: Record<SupportedLanguage, string[]> = {
    pseudocode: [
      '// Chapter 2: MergeSort(A, left, right)',
      'MergeSort(A, left, right) {',
      '  if (left < right) {',
      '    mid = floor((left + right) / 2);',
      '    MergeSort(A, left, mid);',
      '    MergeSort(A, mid + 1, right);',
      '    Merge(A, left, mid, right);',
      '  }',
      '}',
      'Merge(A, left, mid, right) {',
      '  i = left;  j = mid + 1;',
      '  while (i <= mid && j <= right) {',
      '    if (A[i] <= A[j]) tmp[k++] = A[i++];',
      '    else tmp[k++] = A[j++];',
      '  }',
      '  copy remaining and write back to A',
      '}',
    ],
    csharp: [
      '// Chapter 2: MergeSort C#',
      'void MergeSort(int[] A, int left, int right) {',
      '    if (left < right) {',
      '        int mid = (left + right) / 2;',
      '        MergeSort(A, left, mid);',
      '        MergeSort(A, mid + 1, right);',
      '        Merge(A, left, mid, right);',
      '    }',
      '}',
      'void Merge(int[] A, int left, int mid, int right) {',
      '    int[] tmp = new int[right - left + 1];',
      '    int i = left, j = mid + 1, k = 0;',
      '    while (i <= mid && j <= right) {',
      '        if (A[i] <= A[j]) tmp[k++] = A[i++];',
      '        else tmp[k++] = A[j++];',
      '    }',
      '    while (i <= mid) tmp[k++] = A[i++];',
      '    while (j <= right) tmp[k++] = A[j++];',
      '    Array.Copy(tmp, 0, A, left, tmp.Length);',
      '}',
    ],
    cpp: [
      '// Chapter 2: MergeSort C++',
      'void mergeSort(std::vector<int>& A, int left, int right) {',
      '    if (left < right) {',
      '        int mid = left + (right - left) / 2;',
      '        mergeSort(A, left, mid);',
      '        mergeSort(A, mid + 1, right);',
      '        merge(A, left, mid, right);',
      '    }',
      '}',
      'void merge(std::vector<int>& A, int left, int mid, int right) {',
      '    std::vector<int> tmp(right - left + 1);',
      '    int i = left, j = mid + 1, k = 0;',
      '    while (i <= mid && j <= right) {',
      '        if (A[i] <= A[j]) tmp[k++] = A[i++];',
      '        else tmp[k++] = A[j++];',
      '    }',
      '    while (i <= mid) tmp[k++] = A[i++];',
      '    while (j <= right) tmp[k++] = A[j++];',
      '    for (int p = 0; p < k; p++) A[left + p] = tmp[p];',
      '}',
    ],
  };

  static getHighlightedLine(logicalLineId: number, lang: SupportedLanguage): number {
    switch (lang) {
      case 'pseudocode':
        switch (logicalLineId) {
          case 1: return 2;
          case 2: return 3; // if left < right
          case 3: return 4; // mid = floor
          case 4: return 5; // MergeSort left
          case 5: return 6; // MergeSort right
          case 6: return 7; // Merge call
          case 7: return 12; // while loop in merge
          case 8: return 13; // if (A[i] <= A[j]) branch
          case 9: return 14; // else branch
          case 10: return 16; // copy remaining and write back
          case 11: return 2; // done
          default: return 2;
        }
      case 'csharp':
        switch (logicalLineId) {
          case 1: return 2;
          case 2: return 3;
          case 3: return 4;
          case 4: return 5;
          case 5: return 6;
          case 6: return 7;
          case 7: return 13; // while loop in merge
          case 8: return 14; // if (A[i] <= A[j]) branch
          case 9: return 15; // else branch
          case 10: return 19; // Array.Copy
          case 11: return 2; // done
          default: return 2;
        }
      case 'cpp':
        switch (logicalLineId) {
          case 1: return 2;
          case 2: return 3;
          case 3: return 4;
          case 4: return 5;
          case 5: return 6;
          case 6: return 7;
          case 7: return 13; // while loop in merge
          case 8: return 14; // if (A[i] <= A[j]) branch
          case 9: return 15; // else branch
          case 10: return 19; // for copy back
          case 11: return 2; // done
          default: return 2;
        }
    }
  }

  generateSteps(initialArray: number[]): AlgorithmStep[] {
    const rawSteps: Omit<AlgorithmStep, 'stepIndex' | 'totalSteps'>[] = [];
    const arr = [...initialArray];
    const n = arr.length;

    if (n === 0) return [];

    // Step 0: Init
    rawSteps.push({
      array: [...arr],
      activeIndices: [],
      sortedIndices: [],
      key: null,
      lineCodeNumber: 1,
      phaseNameAr: 'البداية',
      descriptionAr: 'البدء بخوارزمية Merge Sort (فرّق تسد).',
      actionType: 'init',
      variables: {
        i: null,
        j: null,
        key: null,
        left: 0,
        right: n - 1,
        mid: null,
        conditionDescription: `المصفوفة الحجم ${n}`,
      },
    });

    const runMergeSort = (left: number, right: number) => {
      // Step: Check condition if (left < right)
      if (left >= right) {
        rawSteps.push({
          array: [...arr],
          activeIndices: [left],
          sortedIndices: [left],
          key: null,
          lineCodeNumber: 2,
          phaseNameAr: 'حالة التوقف (Base Case)',
          descriptionAr: `النطاق [${left}] عنصر واحد فقط (${arr[left]}) ⬅ مرتب بالفعل، العودة من الاستدعاء.`,
          actionType: 'subarray-sorted',
          variables: {
            i: left,
            j: right,
            key: null,
            left,
            right,
            mid: null,
            conditionDescription: `${left} < ${right} (خطأ: عنصر واحد)`,
            isConditionTrue: false,
          },
        });
        return;
      }

      const mid = Math.floor((left + right) / 2);

      // Step: Calculate mid
      rawSteps.push({
        array: [...arr],
        activeIndices: Array.from({ length: right - left + 1 }, (_, k) => left + k),
        sortedIndices: [],
        key: null,
        lineCodeNumber: 3,
        phaseNameAr: 'تقسيم (Divide)',
        descriptionAr: `تقسيم النطاق [${left}...${right}] عند المنتصف mid = ${mid}.`,
        actionType: 'divide',
        variables: {
          i: left,
          j: right,
          key: null,
          left,
          right,
          mid,
          conditionDescription: `mid = floor((${left}+${right})/2) = ${mid}`,
          isConditionTrue: true,
        },
      });

      // Step: Recurse Left Call -> MergeSort(A, left, mid)
      rawSteps.push({
        array: [...arr],
        activeIndices: Array.from({ length: mid - left + 1 }, (_, k) => left + k),
        sortedIndices: [],
        key: null,
        lineCodeNumber: 4,
        phaseNameAr: 'استدعاء النصف الأيسر',
        descriptionAr: `استدعاء MergeSort للنصف الأيسر: النطاق [${left}...${mid}].`,
        actionType: 'divide',
        variables: {
          i: left,
          j: mid,
          key: null,
          left,
          right: mid,
          mid,
          conditionDescription: `MergeSort(A, ${left}, ${mid})`,
        },
      });
      runMergeSort(left, mid);

      // Step: Recurse Right Call -> MergeSort(A, mid + 1, right)
      rawSteps.push({
        array: [...arr],
        activeIndices: Array.from({ length: right - (mid + 1) + 1 }, (_, k) => mid + 1 + k),
        sortedIndices: [],
        key: null,
        lineCodeNumber: 5,
        phaseNameAr: 'استدعاء النصف الأيمن',
        descriptionAr: `استدعاء MergeSort للنصف الأيمن: النطاق [${mid + 1}...${right}].`,
        actionType: 'divide',
        variables: {
          i: mid + 1,
          j: right,
          key: null,
          left: mid + 1,
          right,
          mid,
          conditionDescription: `MergeSort(A, ${mid + 1}, ${right})`,
        },
      });
      runMergeSort(mid + 1, right);

      // Step: Call Merge(A, left, mid, right)
      rawSteps.push({
        array: [...arr],
        activeIndices: Array.from({ length: right - left + 1 }, (_, k) => left + k),
        sortedIndices: [],
        key: null,
        lineCodeNumber: 6,
        phaseNameAr: 'بدء الدمج (Merge)',
        descriptionAr: `الآن دمج النصفين المرتبين: [${left}...${mid}] مع [${mid + 1}...${right}].`,
        actionType: 'merge',
        variables: {
          i: left,
          j: mid + 1,
          key: null,
          left,
          right,
          mid,
          conditionDescription: `Merge(A, ${left}, ${mid}, ${right})`,
        },
      });

      // Execute merge logic
      const tmp: number[] = [];
      let i = left;
      let j = mid + 1;

      while (i <= mid && j <= right) {
        // Step 1: while condition check
        rawSteps.push({
          array: [...arr],
          activeIndices: [i, j],
          sortedIndices: [],
          key: null,
          lineCodeNumber: 7,
          phaseNameAr: 'شرط حلقة الدمج',
          descriptionAr: `فحص شرط الاستمرار: i (${i}) <= mid (${mid}) و j (${j}) <= right (${right}) ⬅ محقق، الانتقال للمقارنة.`,
          actionType: 'compare',
          variables: {
            i,
            j,
            key: null,
            left,
            right,
            mid,
            conditionDescription: `i (${i}) <= ${mid} && j (${j}) <= ${right}`,
            isConditionTrue: true,
          },
        });

        // Step 2: if / else branch
        const isSmaller = arr[i] <= arr[j];
        if (isSmaller) {
          rawSteps.push({
            array: [...arr],
            activeIndices: [i, j],
            sortedIndices: [],
            key: null,
            lineCodeNumber: 8,
            phaseNameAr: 'فرع if (العنصر الأيسر)',
            descriptionAr: `مقارنة: A[${i}] (${arr[i]}) <= A[${j}] (${arr[j]}) (صحيح) ⬅ تنفيذ فرع if: نسخ ${arr[i]} وزيادة i.`,
            actionType: 'compare',
            variables: {
              i,
              j,
              key: arr[i],
              left,
              right,
              mid,
              conditionDescription: `${arr[i]} <= ${arr[j]} : صحيح (if)`,
              isConditionTrue: true,
            },
          });
          tmp.push(arr[i]);
          i++;
        } else {
          rawSteps.push({
            array: [...arr],
            activeIndices: [i, j],
            sortedIndices: [],
            key: null,
            lineCodeNumber: 9,
            phaseNameAr: 'فرع else (العنصر الأيمن)',
            descriptionAr: `مقارنة: A[${i}] (${arr[i]}) <= A[${j}] (${arr[j]}) (خطأ: ${arr[j]} أصغر) ⬅ تنفيذ فرع else: نسخ ${arr[j]} وزيادة j.`,
            actionType: 'compare',
            variables: {
              i,
              j,
              key: arr[j],
              left,
              right,
              mid,
              conditionDescription: `${arr[i]} <= ${arr[j]} : خطأ (else)`,
              isConditionTrue: false,
            },
          });
          tmp.push(arr[j]);
          j++;
        }
      }

      while (i <= mid) {
        tmp.push(arr[i]);
        i++;
      }
      while (j <= right) {
        tmp.push(arr[j]);
        j++;
      }

      // Copy back to arr
      for (let k = 0; k < tmp.length; k++) {
        arr[left + k] = tmp[k];
      }

      // Snapshot after merging this partition
      rawSteps.push({
        array: [...arr],
        activeIndices: Array.from({ length: right - left + 1 }, (_, k) => left + k),
        sortedIndices: Array.from({ length: right - left + 1 }, (_, k) => left + k),
        key: null,
        lineCodeNumber: 10,
        phaseNameAr: 'تم الدمج',
        descriptionAr: `تم دمج النطاق [${left}...${right}] بنجاح وهو الآن مرتب.`,
        actionType: 'subarray-sorted',
        variables: {
          i: null,
          j: null,
          key: null,
          left,
          right,
          mid,
          conditionDescription: `النطاق [${left}..${right}] مرتب`,
        },
      });
    };

    runMergeSort(0, n - 1);

    // Final Step
    rawSteps.push({
      array: [...arr],
      activeIndices: [],
      sortedIndices: Array.from({ length: n }, (_, k) => k),
      key: null,
      lineCodeNumber: 11,
      phaseNameAr: 'اكتمل الترتيب',
      descriptionAr: 'اكتمل الترتيب: جميع العناصر مدمجة ومرتبة بالكامل.',
      actionType: 'all-sorted',
      variables: {
        i: null,
        j: null,
        key: null,
        left: 0,
        right: n - 1,
        mid: null,
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
