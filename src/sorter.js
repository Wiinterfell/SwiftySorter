import taylor from './taylorswift.json';

var array;
var n;
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

export function sorter() {
    array = taylor.songs;
    n = array.length;
    mergeSortInit();
    mergeSortOneStep("willow");
    mergeSortOneStep("betty");

//    mergeSortOneStep("");

    return array;
}

function mergeSortInit() {
    curr_size = 1;
    left_start = 0;
    mergeSortInit2();
}

function mergeSortInit2() {
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

function mergeSortOneStep(song) {
    if (i < n1 && j < n2) {
        console.log(L[i]);
        console.log(R[j]);
        console.log("CHOOSE " + song)
        
        if (song == R[j]) {
            array[k] = L[i];
            i++;
        } else if (song == L[i]) {
            array[k] = R[j];
            j++;
        } else {
            console.log("ERROR");
        }
        k++;
    } else {
        if (j == n2) {
            while (i < n1) {
                array[k] = L[i];
                i++;
                k++;
            }
        }
        if (i == n1) {
            while (j < n2) {
                array[k] = R[j];
                j++;
                k++;
            }
        }
        i = 0;
        j = 0;
        k = left_start;
        if (left_start >= n - 1) {
            left_start += 2 * curr_size;
            mergeSortInit2()
        } else {
            if (curr_size <= n - 1) {
                curr_size = 2 * curr_size;
                mergeSortInit2()
            } else {
                console.log("END");
                return "END";
            }
        }
    }
}

/*
function mergeSort() {
    // Merge subarrays in bottom up
    // manner. First merge subarrays
    // of size 1 to create sorted
    // subarrays of size 2, then merge
    // subarrays of size 2 to create
    // sorted subarrays of size 4, and
    // so on.
    for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {

        // Pick starting point of different
        // subarrays of current size
        for (left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
            // Find ending point of left
            // subarray. mid+1 is starting
            // point of right
            var mid = Math.min(left_start + curr_size - 1, n - 1);

            var right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);

            // Merge Subarrays arr[left_start...mid]
            // & arr[mid+1...right_end]

            n1 = mid - left_start + 1;
            n2 = right_end - mid;

            L = Array(n1).fill(0);
            R = Array(n2).fill(0);


            for (i = 0; i < n1; i++)
                L[i] = arr[l + i];
            for (j = 0; j < n2; j++)
                R[j] = arr[m + 1 + j];

            i = 0;
            j = 0;
            k = l;
            while (i < n1 && j < n2) {
                console.log(L[i]);
                console.log(R[j]);
                console.log("NEXT")
                
                if (L[i] <= R[j]) {
                    arr[k] = L[i];
                    i++;
                } else {
                    arr[k] = R[j];
                    j++;
                }
                k++;
            }

            while (i < n1) {
                arr[k] = L[i];
                i++;
                k++;
            }

            while (j < n2) {
                arr[k] = R[j];
                j++;
                k++;
            }
        }
    }
}
*/