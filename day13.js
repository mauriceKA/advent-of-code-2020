var time = 1000340;
var busIds = "13,x,x,x,x,x,x,37,x,x,x,x,x,401,x,x,x,x,x,x,x,x,x,x,x,x,x,17,x,x,x,x,19,x,x,x,23,x,x,x,x,x,29,x,613,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41";

// part 1
var busses = busIds.split(",").map( (id, i) => { 
  return id === "x" ? null : { 
    i: i,
    id: Number.parseInt(id),
    timeSinceLastArrival: time % id,
    timeToNextArrival: id - time % id,    
  }; 
}).filter( id => { return id !== null }).sort( (a,b) => { return ( a.timeToNextArrival -  b.timeToNextArrival); } );

console.log(busses[0].id * busses[0].timeToNextArrival);

// part 2
busses.sort( (a,b) => { return ( a.i -  b.i); } )
busses.forEach( bus => {
  bus.expectedModulo = bus.id - bus.i;
  while (bus.expectedModulo < 0)       { bus.expectedModulo += bus.id; }
  while (bus.expectedModulo >= bus.id) { bus.expectedModulo -= bus.id; }
});
console.log(busses);

busses.forEach( bus => { 
  console.log( "x - " + bus.expectedModulo + " mod " + bus.id + " = 0");
});

var j = 0;
busses.forEach( bus => { 
  console.log( "x = " + bus.id + " * " + String.fromCharCode(97 + j++) + " +", bus.expectedModulo); 
});

var j = 0, sum = 0, exp = "";
busses.forEach( bus => { 
  exp += bus.id + String.fromCharCode(97 + j++) + " + ";
  sum +=  (bus.i === 0) ? 0 : (bus.id - bus.i); 
});
console.log( busses.length + "x = " + exp + sum );

var solveString = "";
busses.forEach( bus => { solveString += "x mod " + bus.id + " = " + bus.expectedModulo + "; "; });
console.log(solveString);  // ask Wolfram Alpha for integer soltuions to this equation system 
