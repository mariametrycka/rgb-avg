const express = require('express');
const { readFile } = require('fs').promises;
const { RESULTS_FILENAME } = require('./constants');
const { findClosest } = require('./lib');

const PORT = 3000;

(async () => {
    const data = JSON.parse(
        await readFile(RESULTS_FILENAME, { encoding: 'utf8' }),
    );

    const app = express();

    app.set('view engine', 'ejs');
    app.use('/data', express.static('data'));

    app.get('/:args', (req, res) => {
        const [r, g, b, amount] = req.params.args.split(',').map((s) => +s);
        const results = findClosest(data, [r, g, b], amount);

        res.render('index', {
            color: { r, g, b },
            results: results.map(([path, distance, r, g, b]) => ({
                path,
                distance,
                r,
                g,
                b,
            })),
        });
    });

    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
})();
