var input = 
`..#..#..
#.#...#.
..#.....
##....##
#..#.###
.#..#...
###..#..
....#..#`;

// common

var inputMatrix = input.split("\n").map( line => { return line.split(""); });

function getCubeActive(x,y) {
    if (x < 0 || x >= width)  return 0;
    if (y < 0 || y >= height) return 0;
    return (matrix[y][x] === "#") ? 1 : 0;
}

function getSeatVisible(x, y, dx, dy) {
    x += dx;
    y += dy;
    while (x >= 0 && x < width && y >= 0 && y < height) {
        if (matrix[y][x] === "#") { return 1; }
        if (matrix[y][x] === "L") { return 0; }
        x += dx;
        y += dy;
    } 
    return 0;
}

function activeCubesAround(x,y, lookFurther) {
    if (!lookFurther) {
    // clockwise from top left
        return (getCubeActive(x-1, y-1) + 
                getCubeActive(x  , y-1) + 
                getCubeActive(x+1, y-1) + 
                getCubeActive(x+1, y  ) + 
                getCubeActive(x+1, y+1) + 
                getCubeActive(x  , y+1) + 
                getCubeActive(x-1, y+1) + 
                getCubeActive(x-1, y  ) );
    } else {
        return (getSeatVisible(x, y, -1, -1) + 
                getSeatVisible(x, y,  0, -1) + 
                getSeatVisible(x, y,  1, -1) + 
                getSeatVisible(x, y,  1,  0) + 
                getSeatVisible(x, y,  1,  1) + 
                getSeatVisible(x, y,  0,  1) + 
                getSeatVisible(x, y, -1,  1) + 
                getSeatVisible(x, y, -1,  0) );
    }
}

function getNextState(matrix, lookFurther) {
    var leaveThreshold = lookFurther ? 5 : 4;
    var nextMatrix = [];
    matrix.forEach( (row, y) => {
        nextMatrix.push( 
            row.map( (seat, x) => {
                if (seat === ".") {
                    return ".";
                } else {
                    var visible = activeCubesAround(x, y, lookFurther);
                    if (seat === "L" && visible === 0) {
                        return "#";
                    } else if (seat === "#" && visible >= leaveThreshold) {
                        return "L";
                    } else {
                        return seat;
                    }
                }
            })
        );
    })
    return nextMatrix;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function printMatrix(matrix) {
    var output = "";
    matrix.forEach( row => {
        row.forEach( seat => {
            output += seat;
        });
        output += "\n";
    });
    console.log(output + "\n");
}

function countActiveCubes(matrix) {
    return numberOfSeatsOccupied = matrix.map( row => {
        return row.reduce( (acc, val) => { return acc + (val === "#"); }, 0);
    }).reduce( (acc, val) => { return acc + val; })
}

// part 1
var matrix = Object.assign([], inputMatrix);
var width = matrix[0].length;
var height = matrix.length;
var lastState = "";
var rounds = 0;
while (lastState !== JSON.stringify(matrix)) {
    lastState = JSON.stringify(matrix);
    rounds++;
    matrix = getNextState(matrix);
    //printMatrix(matrix);
}
console.log(rounds);
console.log(countActiveCubes(matrix));

// part 2
/*
var matrix = Object.assign([], inputMatrix);
var lastState = "";
var rounds = 0;
printMatrix(matrix);
async function simulate() { 
    while (lastState !== JSON.stringify(matrix)) {
        lastState = JSON.stringify(matrix);
        rounds++;
        matrix = getNextState(matrix, true);
        printMatrix(matrix);
        await sleep(100);
    }
};
simulate().then( () => {
    console.log(rounds);
    console.log(countActiveCubes(matrix));    
});
*/