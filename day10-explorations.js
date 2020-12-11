/*

I'm not proud of these  :-\

4er            3er       2er
----------  ----------  ------
(0), 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19, (22) + 1
(0), 1, 4, 5, 6, 7, 10,     12, 15, 16, 19, (22)
(0), 1, 4, 5,    7, 10, 11, 12, 15, 16, 19, (22)
(0), 1, 4, 5,    7, 10,     12, 15, 16, 19, (22)
(0), 1, 4,    6, 7, 10, 11, 12, 15, 16, 19, (22)
(0), 1, 4,    6, 7, 10,     12, 15, 16, 19, (22)
(0), 1, 4,       7, 10, 11, 12, 15, 16, 19, (22)
(0), 1, 4,       7, 10,     12, 15, 16, 19, (22)

3er
-------
0, 3, 6, 7, 8, 11
0, 3, 6,    8, 11
1
0

4er
----------
0, 3, 6, 7, 8, 9, 12
0, 3, 6, 7,    9, 12
0, 3, 6,    8, 9, 12
0, 3, 6,       9, 12
11
10
01
11

5er
--------------
0, 3, 6, 7, 8, 9, 10, 13
0, 3, 6, 7, 8,    10, 13
0, 3, 6, 7,    9, 10, 13
0, 3, 6, 7,       10, 13
0, 3, 6,    8, 9, 10, 13
0, 3, 6,    8,    10, 13
0, 3, 6,       9, 10, 13
111
110
101
100
011
010
001

6er
------------------
0, 3, 6, 7, 8, 9, 10, 11, 13
0, 3, 6, 7, 8, 9,     11, 13
0, 3, 6, 7, 8,    10, 11, 13
0, 3, 6, 7, 8,        11, 13
0, 3, 6, 7,    9, 10, 11, 13
0, 3, 6, 7,    9,     11, 13
0, 3, 6, 7,       10, 11, 13
0, 3, 6,    8, 9, 10, 11, 13
0, 3, 6,    8, 9,     11, 13
0, 3, 6,    8,        11, 13
0, 3, 6,       9, 10, 11, 13
0, 3, 6,       9,     11, 13
1111
1110
1101
1100
1011
1010
1001
0111
0110
0100
0011
0010

7er (5 bits)
11111
11110
11101
11100
11011
11010
11001
10111
10110
10101
10100
10011
01111
01110
01101
01100
01011
01010
00111
00110
00101
00100

2er => 0 Möglichkeiten
3er => 2 Möglichkeiten
4er => 4 Möglichkeiten
5er => 7 Möglichkeiten
6er => 13 Möglichkeiten

*/

function isLegal(num, exp) {
    var binString = ((num * 2 + 1 + Math.pow(2,exp+1)) >>> 0).toString(2);
    //console.log(binString);
    var runningZeros = 0;
    var invalid = binString.split("").some( digit => {
        runningZeros = (digit === "0") ? (runningZeros+1) : 0;
        //console.log(digit, runningZeros);
        return runningZeros > 2;
    })
    //if (!invalid) { console.log(binString); }
    return !invalid;
}

for (i = 1; i<20; i++) {
    var validCombinations = 0;
    for (j= 0; j<Math.pow(2,i); j++) {
        //console.log(isLegal(j,i));
        validCombinations += isLegal(j,i) ? 1 : 0
    }
    console.log((i+2) + " chain, validCombinations: " + validCombinations);
}

var validCombinations2 = [2,4,7], validCombinationsMap= {3:2, 4:4, 5:7};
for (var i=0; i<70; i++) {
    var nextNumber = validCombinations2[i] + validCombinations2[i+1] + validCombinations2[i+2];
    validCombinations2.push(nextNumber);
    validCombinationsMap[i+6] = nextNumber;
}
console.log(validCombinations2, validCombinationsMap);

/*

function removeOneMoreAdapter( jolts, beginIndex ) {
    if (jolts.length < 3 || beginIndex >= jolts.length - 1) { return null; }
    var i = beginIndex;
    while (jolts[i+1] - jolts[i-1] > 2 && i < jolts.length - 1) {
        i++;
    }
    // clone and remove element
    var remainingJolts = Object.assign([], jolts);
    remainingJolts.splice(i,1);
    return (i >= jolts.length - 1) ? null : { remainingJolts: remainingJolts, i: i} ;
}

function possibleRemovalsOnOneLevel(jolts) {
    var indexMapToResultMap = {};
    loop: for (var startIndex = 1; startIndex < jolts.length - 2; startIndex++) {
        var result = removeOneMoreAdapter(jolts, startIndex);
        result && (indexMapToResultMap[result.i] = result.remainingJolts);
        if (!result) { break loop; }
        startIndex = result.i; // continue from after the current removal position
    } 
    //console.log(indexMapToResultMap);
    delete indexMapToResultMap[null];
    return Object.values(indexMapToResultMap);
}
*/
/*
// recurse until number of removals is no more possible
function possibleRemovals(jolts) {
    var nextLevelSet = possibleRemovalsOnOneLevel(jolts);
    if (nextLevelSet.length === 0) {
        return 0;
    } else {
        return nextLevelSet.length + nextLevelSet.map(possibleRemovals).reduce( (acc, val) => { return acc + val; } );
        //return nextLevelSet.length + possibleRemovals(nextLevelSet[0]);
    }
}

console.log(jolts);
console.log(possibleRemovals(jolts) + 1); // plus one for the whole chain of adapters
*/


/*
function factorial(xParam) {
    var x = BigInt(xParam);
    var f = BigInt(1);
    for (var i = BigInt(2); i <=x; i++) {
        f = f * i;
    }
    return f;
}
*/
/*
var sum1toN = (n) => n * (n+1) / 2;

console.log(factorial(numberOfJoltageDiffs[1]) + BigInt(1)); // too high
console.log(factorial(49) + BigInt(1)); //too high
*/

/*
var validCombinations2 = [2,4,7], validCombinationsMap= {3:2, 4:4, 5:7};
for (var i=0; i<70; i++) {
    var nextNumber = validCombinations2[i] + validCombinations2[i+1] + validCombinations2[i+2];
    validCombinations2.push(nextNumber);
    validCombinationsMap[i+6] = nextNumber;
}
console.log(validCombinations2, validCombinationsMap);

function chainLengthToValidCombinations(len) {
    return validCombinationsMap[len];
}



var currentJoltage = 0, numberOfJoltageDiffs = { 1 : 0, 3 : 0 };
var lengthOfCurrentChain = 0, chains = [];
jolts.forEach( jolt => {
    if (jolt - currentJoltage === 1 && currentJoltage !== 0) {
        lengthOfCurrentChain++;
    } else {
        lengthOfCurrentChain++;
        if (lengthOfCurrentChain > 0) {
            if (lengthOfCurrentChain > 2) {
                // only chains > 2 can be reduced
                chains.push(lengthOfCurrentChain);
            }
            lengthOfCurrentChain = 0;
        }
    }
    currentJoltage = jolt;
});

function sumOf2ToN(n) { 
    return n * (n+1) / 2 - 1;
}

console.log(jolts );
console.log( chains );
console.log( chains.map(chainLengthToValidCombinations) );
console.log( chains.map(chainLengthToValidCombinations).reduce( (acc,val) => {return acc * val; } ) );
*/