const { resolve, extname } = require('path');
const { readdir, writeFile } = require('fs').promises;
const getColors = require('get-image-colors');
const { IMG_EXTENSIONS, DATA_DIR, RESULTS_FILENAME } = require('./constants');

async function* getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });

    for (const dirent of dirents) {
        const path = resolve(dir, dirent.name);

        if (dirent.isDirectory()) {
            yield* getFiles(path);
        } else {
            yield path;
        }
    }
}

function isImage(path) {
    const ext = extname(path).toLowerCase();
    return IMG_EXTENSIONS.includes(ext);
}

async function averageRGB(path) {
    const colors = await getColors(path);

    const [sumR, sumG, sumB] = colors.reduce(([r, g, b], color) => {
        const [cR, cG, cB] = color.rgb();
        return [r + cR, g + cG, b + cB];
    }, [0, 0, 0]);

    return [
        sumR / colors.length,
        sumG / colors.length,
        sumB / colors.length,
    ];
}

(async () => {
    const data = [];
    const t = Date.now();
    let count = 0;

    for await (const path of getFiles(DATA_DIR)) {
        if (isImage(path)) {
            data.push([path, ...await averageRGB(path)]);
            process.stdout.write('.');
            ++count;
        }
    }

    await writeFile(RESULTS_FILENAME, JSON.stringify(data));
    console.log(`\nProcessing ${count} files done in ${(Date.now() - t) / 1000} s`);
})();