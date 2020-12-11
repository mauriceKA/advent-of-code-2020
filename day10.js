var input = `79
142
139
33
56
133
138
61
125
88
158
123
65
69
105
6
81
31
60
70
159
114
71
15
13
72
118
14
9
93
162
140
165
1
80
148
32
53
102
5
68
101
111
85
45
25
16
59
131
23
91
92
115
103
166
22
145
161
108
155
135
55
86
34
37
78
28
75
7
104
121
24
153
167
95
87
94
134
154
84
151
124
62
49
38
39
54
109
128
19
2
98
122
132
141
168
8
160
50
42
46
110
12
152`;


/*
var input = `16
10
15
5
1
11
7
19
6
12
4`;

var input = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;
*/

var jolts = input.split("\n").map(val => {
    return Number.parseInt(val);
}).sort((a, b) => {
    return a - b;
});

// add the device joltage
jolts.push(jolts[jolts.length - 1] + 3);

// part 1
var currentJoltage = 0,
    numberOfJoltageDiffs = {
        1: 0,
        3: 0
    };
jolts.forEach(jolt => {
    numberOfJoltageDiffs[jolt - currentJoltage]++;
    currentJoltage = jolt;
});
console.log(numberOfJoltageDiffs[1] * numberOfJoltageDiffs[3]);

// part 2
// add plug joltage
jolts.unshift(0);

var options = {};

// find possible successors
jolts.forEach(jolt1 => {
    var entry = {
        nextJoltage: [],
        sum: 0
    };
    options[jolt1] = entry;
    jolts.forEach(jolt2 => {
        if (jolt2 > jolt1 && jolt2 <= jolt1 + 3) {
            entry.nextJoltage.push(jolt2);
        }
    });
});

console.log(jolts);
console.log(options);

// start from target voltage and try to reach 0
jolts.sort((a, b) => {
    return b - a;
});
console.log(jolts);

jolts.forEach((jolt, i) => {
    if (i === 0) {
        options[jolt].sum = 1;
    } else {
        options[jolt].sum = options[jolt].nextJoltage.map(op => {
            return options[op].sum;
        }).reduce((acc, val) => {
            return acc + val;
        });
    }
});
console.log(options[0].sum);