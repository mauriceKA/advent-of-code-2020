var input =
    `..#..#..
#.#...#.
..#.....
##....##
#..#.###
.#..#...
###..#..
....#..#`;

// var input =
// `.#.
// ..#
// ###`;

// common

// coordinates are matrix[z][y][x], objects are used, only
// active cubes are represented as true
var matrix = {};
var minX = 0;
var maxX = 0;
var minY = 0;
var maxY = 0;
var minZ = 0;
var maxZ = 0;
var minW = 0;
var maxW = 0;

// coordinates are matrix[z][y][x]
var inputPlane0 = input.split("\n").map(line => {
    return line.split("");
});
inputPlane0.forEach((row, y) => {
    row.forEach((cube, x) => {
        if (cube === "#") {
            setActive(x, y, 0, 0, true);
        }
    });
});

function setActive(x, y, z, w, active) {
    if (active) {
        if (!matrix[w]) {
            matrix[w] = {};
        }
        if (!matrix[w][z]) {
            matrix[w][z] = {};
        }
        if (!matrix[w][z][y]) {
            matrix[w][z][y] = {};
        }
        matrix[w][z][y][x] = true;
        // increase the area to cover for calculating next state
        if (minX > x) {
            minX = x;
        }
        if (maxX < x) {
            maxX = x;
        }
        if (minY > y) {
            minY = y;
        }
        if (maxY < y) {
            maxY = y;
        }
        if (minZ > z) {
            minZ = z;
        }
        if (maxZ < z) {
            maxZ = z;
        }
        if (minW > w) {
            minW = w;
        }
        if (maxW < w) {
            maxW = w;
        }
    } else {
        if (matrix[w] && matrix[w][z] && matrix[w][z][y] && matrix[w][z][y][x]) {
            delete matrix[w][z][y][x];
        }
    }
}

// returns 1 if the cube is active, 0 otherwise
function getActiveAs01(x, y, z, w, dx, dy, dz, dw) {
    x = x + (dx || 0);
    y = y + (dy || 0);
    z = z + (dz || 0);
    w = w + (dw || 0);
    var active = (matrix[w] && matrix[w][z] && matrix[w][z][y] && matrix[w][z][y][x]);
    return active ? 1 : 0;
}

function activeCubesAround(x, y, z, w) {
    var count = 0;
    for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
            for (var dz = -1; dz <= 1; dz++) {
                for (var dw = -1; dw <= 1; dw++) {
                    if (!(dx === 0 && dy === 0 && dz === 0 && dw === 0)) {
                        count += getActiveAs01(x, y, z, w, dx, dy, dz, dw);
                    }
                }
            }
        }
    }
    return count;
}

/////////////////// continue below here to add w to every method


function nextState() {
    var transitions = [];
    // gather transitions
    for (var w = minW - 1; w <= maxW + 1; w++) {
        for (var z = minZ - 1; z <= maxZ + 1; z++) {
            for (var y = minY - 1; y <= maxY + 1; y++) {
                for (var x = minX - 1; x <= maxX + 1; x++) {
                    var active = getActiveAs01(x, y, z, w);
                    var numNeighbors = activeCubesAround(x, y, z, w);
                    if (active && (numNeighbors < 2 || numNeighbors > 3)) {
                        transitions.push({
                            x: x,
                            y: y,
                            z: z,
                            w: w,
                            state: false
                        });
                    } else if (!active && numNeighbors === 3) {
                        transitions.push({
                            x: x,
                            y: y,
                            z: z,
                            w: w,
                            state: true
                        });
                    }
                }
            }
        }
    }
    // apply transitions
    transitions.forEach(tr => {
        setActive(tr.x, tr.y, tr.z, tr.w, tr.state);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function printMatrix(matrix) {
    var output = "x: " + minX + "..." + maxX + ", " +
        "y: " + minY + "..." + maxY + ", " +
        "z: " + minZ + "..." + maxZ +
        "w: " + minW + "..." + maxW + "\n\n";
    for (var w = minW; w <= maxW; w++) {
        for (var z = minZ; z <= maxZ; z++) {
            output += "\nz=" + z + ", w=" + z + "\n";
            for (var y = minY; y <= maxY; y++) {
                for (var x = minX; x <= maxX; x++) {
                    output += getActiveAs01(x, y, z, w) ? "#" : ".";
                }
                output += "\n";
            }
        }
    }
    console.log(output + "\n");
}

function countActiveCubes() {
    var count = 0;
    for (var w = minW; w <= maxW; w++) {
        for (var z = minZ; z <= maxZ; z++) {
            for (var y = minY; y <= maxY; y++) {
                for (var x = minX; x <= maxX; x++) {
                    count += getActiveAs01(x, y, z, w);
                }
            }
        }
    }
    return count;
}

printMatrix(matrix);
var lastState = "";
var rounds = 0;
while (lastState !== JSON.stringify(matrix) && rounds < 6) {
    lastState = JSON.stringify(matrix);
    rounds++;
    nextState();
    printMatrix(matrix);
}
console.log(rounds);
console.log(countActiveCubes());