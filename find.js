const { readFile } = require('fs').promises;
const { createInterface } = require('readline');
const { RESULTS_FILENAME } = require('./constants');

function question(cl, text) {
    return new Promise((res, rej) => {
        cl.question(text, answer => {
            res(answer);
        });
    });
}

function colorDistance([aR, aG, aB], [bR, bG, bB]) {
    return Math.sqrt((aR - bR) ** 2 + (aG - bG) ** 2 + (aB - bB) ** 2);
}

function findClosest(data, userColor, amount) {
    const distances = data.map(([path, ...color]) => (
        [path, colorDistance(color, userColor), ...color]
    ));

    return distances
        .sort(([_, distA], [__, distB]) => distA - distB)
        .slice(0, amount);
}

(async () => {
    const data = JSON.parse(await readFile(RESULTS_FILENAME, { encoding: 'utf8' }));

    const cl = createInterface(process.stdin, process.stdout);

    while (true) {
        const values = await question(cl, 'Provide R, G & B values and expected number of results separated by spaces: ');
        const [r, g, b, amount] = values.split(' ').map(s => +s);
        const results = findClosest(data, [r, g, b], amount);

        results.forEach(([path, distance, r, g, b]) => {
            console.log(`${distance.toFixed(2)} ${path} [${r}, ${g}, ${b}]`);
        });

        const answer = await question(cl, 'Do you want to continue? [yes]: ');
        if (answer.toLowerCase() !== 'yes') break;
    }

    cl.close();
})();