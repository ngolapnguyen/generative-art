import random from "canvas-sketch-util/random";

const createGrid = (size = 5, radius = 10, palette) => {
    const points = [];

    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            const u = size <= 1 ? 0.5 : x / (size - 1);
            const v = size <= 1 ? 0.5 : y / (size - 1);
            const pointRadius = Math.abs(random.noise2D(u, v) * radius);

            let newPoint = {
                radius: pointRadius,
                position: [u, v],
                color: random.pick(palette),
                rotation: random.noise2D(u, v)
            };

            points.push(newPoint);
        }
    }

    return points;
};

export { createGrid };
