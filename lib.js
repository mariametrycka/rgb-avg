function colorDistance([aR, aG, aB], [bR, bG, bB]) {
    return Math.sqrt((aR - bR) ** 2 + (aG - bG) ** 2 + (aB - bB) ** 2);
}

exports.findClosest = function (data, userColor, amount) {
    const distances = data.map(([path, ...color]) => [
        path,
        colorDistance(color, userColor),
        ...color,
    ]);

    return distances
        .sort(([_, distA], [__, distB]) => distA - distB)
        .slice(0, amount);
};
