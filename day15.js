var input = [8,11,0,19,1,2];

// part 1
var x = Object.assign([], input);
for (var i = 0; i < 2020; i++) {
  if (input[i] === undefined) {
    var lastSpokenIndex = x.lastIndexOf(x[x.length-1], x.length-2);
    var next = lastSpokenIndex === -1 ? 0 : i - 1 - lastSpokenIndex;
    x.push(next);
    //console.log(i,next);
  }
}
console.log(x[x.length-1]);


// part 2
// for performance reasons, better run this with node.js 
var indexMap = {}, lastSpoken, persistInNextRound;
for (var i = 0; i < 30000000; i++) {
  var persistInThisRound = persistInNextRound;
  if (input[i] !== undefined) {
    lastSpoken = input[i];
    persistInNextRound = { num: input[i], i: i };
  } else {
    if (indexMap[lastSpoken] === undefined) {
      lastSpoken = 0;
      persistInNextRound = { num: lastSpoken, i: i };
    } else {
      var lastSpokenIndex = indexMap[lastSpoken];
      lastSpoken = i - 1 - lastSpokenIndex;
      persistInNextRound = { num: lastSpoken, i: i };
    }
  }
  if (persistInThisRound) { 
    indexMap[persistInThisRound.num] = persistInThisRound.i; 
  }
  if (i % 1000000 === 0) {
    console.log(i, lastSpoken);
  }
}
console.log(lastSpoken);
