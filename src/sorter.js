var array;
var n;
var iteration;
var numberOfSteps;
// For current size of subarrays to
// be merged curr_size varies from
// 1 to n/2
var curr_size;
// For picking starting index of
// left subarray to be merged
var left_start, mid, right_end;

var i, j, k;
var n1, n2;
var L, R;

function getSaveData() {
  return {
    array,
    n,
    iteration,
    numberOfSteps,
    curr_size,
    left_start,
    mid,
    right_end,
    i,
    j,
    k,
    n1,
    n2,
    L,
    R
  }
}

export function loadSaveData(saveData) {
  console.log("Restoring save data", saveData);
  array = saveData.array;
  n = saveData.n;
  iteration = saveData.iteration;
  numberOfSteps = saveData.numberOfSteps;
  curr_size = saveData.curr_size;
  left_start = saveData.left_start;
  mid = saveData.mid;
  right_end = saveData.right_end;
  i = saveData.i;
  j = saveData.j;
  k = saveData.k;
  n1 = saveData.n1;
  n2 = saveData.n2;
  L = saveData.L;
  R = saveData.R;

  return {
    currentSortingStep: [L[i], R[j], iteration / numberOfSteps],
  };
}

export function mergeSortInit(a) {
    array = a;
    n = array.length

    curr_size = 1;
    left_start = 0;
    mergeSortInit2();

    iteration = 0;
    numberOfSteps = Math.trunc((n * Math.log2(n)) - n + 1);
    console.log("Number of steps " + numberOfSteps);

    return {
      currentSortingStep: [L[i], R[j],
      iteration / numberOfSteps],
    };
}

function mergeSortInit2() {
    if (curr_size <= n - 1) {
        mid = Math.min(left_start + curr_size - 1, n - 1);
        right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);

        n1 = mid - left_start + 1;
        n2 = right_end - mid;
        L = Array(n1).fill(0);
        R = Array(n2).fill(0);

        i = 0;
        j = 0;
        k = left_start;

        for (var i1 = 0; i1 < n1; i1++)
            L[i1] = array[left_start + i1];
        for (var j2 = 0; j2 < n2; j2++)
            R[j2] = array[mid + 1 + j2];
    }
}

export function mergeSortOneStep(song) {
    if (i < n1 && j < n2) {
        iteration++;
        console.log(L[i]);
        console.log(R[j]);
        console.log("CHOOSE " + song)
        var progress = iteration / numberOfSteps
        console.log("Progress " + progress + "%")
        
        if (song === R[j]) {
            array[k] = R[j];
            j++;
        } else if (song === L[i]) {
            array[k] = L[i];
            i++;
        } else {
            console.log("ERROR");
        }
        k++;
    } 
    if (i === n1 || j === n2) {
        if (j === n2) {
            while (i < n1) {
                array[k] = L[i];
                i++;
                k++;
            }
        }
        if (i === n1) {
            while (j < n2) {
                array[k] = R[j];
                j++;
                k++;
            }
        }
    
        left_start += 2 * curr_size;
        if (left_start < n - 1) {
            mergeSortInit2()
        }
        else {
            curr_size = 2 * curr_size;
            left_start = 0;
            mergeSortInit2()
            if (curr_size > n - 1) {
                console.log("END");
                return { finalResult: array, saveData: { finalResult: array } };
            }
        }
    }
    return { currentSortingStep: [L[i], R[j], progress], saveData: getSaveData() };
}