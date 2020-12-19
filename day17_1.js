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
var minY = 0;
var minZ = 0;
var maxX = 0;
var maxY = 0;
var maxZ = 0;

// coordinates are matrix[z][y][x]
var inputPlane0 = input.split("\n").map(line => {
    return line.split("");
});
inputPlane0.forEach((row, y) => {
    row.forEach((cube, x) => {
        if (cube === "#") {
            setActive(x, y, 0, true);
        }
    });
});

function setActive(x, y, z, active) {
    if (active) {
        if (!matrix[z]) {
            matrix[z] = {};
        }
        if (!matrix[z][y]) {
            matrix[z][y] = {};
        }
        matrix[z][y][x] = true;
        // increase the area to cover for calculating next state
        if (minX > x) {
            minX = x;
        }
        if (minY > y) {
            minY = y;
        }
        if (minZ > z) {
            minZ = z;
        }
        if (maxX < x) {
            maxX = x;
        }
        if (maxY < y) {
            maxY = y;
        }
        if (maxZ < z) {
            maxZ = z;
        }
    } else {
        if (matrix[z] && matrix[z][y] && matrix[z][y][x]) {
            delete matrix[z][y][x];
        }
    }
}

// returns 1 if the cube is active, 0 otherwise
function getActiveAs01(x, y, z, dx, dy, dz) {
    x = x + ( dx || 0 );
    y = y + ( dy || 0 );
    z = z + ( dz || 0 );
    var active = (matrix[z] && matrix[z][y] && matrix[z][y][x]);
    return active ? 1 : 0;
}

function activeCubesAround(x, y, z) {
    return (
        // same plane clockwise
        getActiveAs01(x, y, z, -1, -1, 0) +
        getActiveAs01(x, y, z, 0, -1, 0) +
        getActiveAs01(x, y, z, 1, -1, 0) +
        getActiveAs01(x, y, z, 1, 0, 0) +
        getActiveAs01(x, y, z, 1, 1, 0) +
        getActiveAs01(x, y, z, 0, 1, 0) +
        getActiveAs01(x, y, z, -1, 1, 0) +
        getActiveAs01(x, y, z, -1, 0, 0) +
        // plane above clockwise
        getActiveAs01(x, y, z, -1, -1, 1) +
        getActiveAs01(x, y, z, 0, -1, 1) +
        getActiveAs01(x, y, z, 1, -1, 1) +
        getActiveAs01(x, y, z, 1, 0, 1) +
        getActiveAs01(x, y, z, 1, 1, 1) +
        getActiveAs01(x, y, z, 0, 1, 1) +
        getActiveAs01(x, y, z, -1, 1, 1) +
        getActiveAs01(x, y, z, -1, 0, 1) +
        getActiveAs01(x, y, z, 0, 0, 1) + // center
        // plane below clockwise
        getActiveAs01(x, y, z, -1, -1, -1) +
        getActiveAs01(x, y, z, 0, -1, -1) +
        getActiveAs01(x, y, z, 1, -1, -1) +
        getActiveAs01(x, y, z, 1, 0, -1) +
        getActiveAs01(x, y, z, 1, 1, -1) +
        getActiveAs01(x, y, z, 0, 1, -1) +
        getActiveAs01(x, y, z, -1, 1, -1) +
        getActiveAs01(x, y, z, -1, 0, -1) +
        getActiveAs01(x, y, z, 0, 0, -1) // center
    );
}

function nextState() {
    var transitions = [];
    // gather transitions
    for (var z = minZ - 1; z <= maxZ + 1; z++) {
        for (var y = minY - 1; y <= maxY + 1; y++) {
            for (var x = minX - 1; x <= maxX + 1; x++) {
                var active = getActiveAs01(x, y, z);
                var numNeighbors = activeCubesAround(x, y, z);
                if (active && (numNeighbors < 2 || numNeighbors > 3)) {
                    transitions.push({
                        x: x,
                        y: y,
                        z: z,
                        state: false
                    });
                } else if (!active && numNeighbors === 3) {
                    transitions.push({
                        x: x,
                        y: y,
                        z: z,
                        state: true
                    });
                }
            }
        }
    }
    // apply transitions
    transitions.forEach(tr => {
        setActive(tr.x, tr.y, tr.z, tr.state);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function printMatrix(matrix) {
    var output = "x: " + minX + "..." + maxX + ", " + 
        "y: " + minY + "..." + maxY + ", " + 
        "z: " + minZ + "..." + maxZ + "\n\n"; 
    for (var z = minZ; z <= maxZ; z++) {
        output += "\nz=" + z + "\n";
        for (var y = minY; y <= maxY; y++) {
            for (var x = minX; x <= maxX; x++) {
                output += getActiveAs01(x,y,z) ? "#" : ".";
            }
            output += "\n";
        }
    }
    console.log(output + "\n");
}

function countActiveCubes() {
    var count = 0;
    for (var z = minZ; z <= maxZ; z++) {
        for (var y = minY; y <= maxY; y++) {
            for (var x = minX; x <= maxX; x++) {
                count += getActiveAs01(x,y,z);
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