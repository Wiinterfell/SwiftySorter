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
    mergeSortOneStep("Lover");
    mergeSortOneStep("Midnight rain");
    mergeSortOneStep("Haunted");
    mergeSortOneStep("Blank Space");
    mergeSortOneStep("Fifteen");
    mergeSortOneStep("Enchanted");
    mergeSortOneStep("Death By A Thousand Cuts");
    mergeSortOneStep("Anti-Hero");
    mergeSortOneStep("Lover");
    mergeSortOneStep("Midnight rain");
    mergeSortOneStep("betty");
    mergeSortOneStep("Blank Space");
    mergeSortOneStep("Haunted");
    mergeSortOneStep("My Boy Only Breaks His Favorite Toys");
    mergeSortOneStep("Enchanted");
    mergeSortOneStep("Fifteen");
    mergeSortOneStep("Karma");
    mergeSortOneStep("Anti-Hero");
    mergeSortOneStep("Death By A Thousand Cuts");
    mergeSortOneStep("Lavender Haze");
    mergeSortOneStep("Blank Space");
    mergeSortOneStep("Haunted");
    mergeSortOneStep("Lover");
    mergeSortOneStep("Midnight rain");
    mergeSortOneStep("My Boy Only Breaks His Favorite Toys");
    mergeSortOneStep("Wildest Dreams");
    mergeSortOneStep("Anti-Hero");
    mergeSortOneStep("Death By A Thousand Cuts");
    mergeSortOneStep("Enchanted");
    mergeSortOneStep("Fifteen");
    mergeSortOneStep("Karma");
    mergeSortOneStep("Lavender Haze");
    mergeSortOneStep("Sparks Fly");
    mergeSortOneStep("Anti-Hero");
    mergeSortOneStep("Blank Space");
    mergeSortOneStep("Death By A Thousand Cuts");
    mergeSortOneStep("Enchanted");
    mergeSortOneStep("Fifteen");
    mergeSortOneStep("Haunted");
    mergeSortOneStep("Karma");
    mergeSortOneStep("Lavender Haze");
    mergeSortOneStep("Lover");
    mergeSortOneStep("Midnight rain");
    mergeSortOneStep("My Boy Only Breaks His Favorite Toys");
    mergeSortOneStep("Sparks Fly");
    mergeSortOneStep("Wildest Dreams");
    mergeSortOneStep("betty");
    mergeSortOneStep("hoax");
    mergeSortOneStep("Anti-Hero");
    mergeSortOneStep("Blank Space");
    mergeSortOneStep("Death By A Thousand Cuts");
    mergeSortOneStep("Enchanted");
    mergeSortOneStep("Fifteen");
    mergeSortOneStep("Haunted");
    mergeSortOneStep("I Bet You Think About Me");


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
            array[k] = R[j];
            j++;
        } else if (song == L[i]) {
            array[k] = L[i];
            i++;
        } else {
            console.log("ERROR");
        }
        k++;
    } 
    if (i == n1 || j == n2) {
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
    
        left_start += 2 * curr_size;
        mergeSortInit2()
        if (left_start >= n - 1) {
            curr_size = 2 * curr_size;
            left_start = 0;
            mergeSortInit2()
            if (curr_size > n - 1) {
                console.log("END");
                return "END";
            }
        }
    }
}