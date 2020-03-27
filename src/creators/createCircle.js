import random from "canvas-sketch-util/random";

const calcRadius = (k, n, b) => {
    if (k > n - b) {
        return 1;
    } else {
        return Math.sqrt(k - 1 / 2) / Math.sqrt(n - (b + 1) / 2);
    }
};

/**
 * Using sunflower arrangement
 * Ref: https://stackoverflow.com/questions/28567166/uniformly-distribute-x-points-inside-a-circle
 */
const createDottedCircle = (
    radius = 10,
    pointCount = 10,
    pointRadius = 10,
    palette
) => {
    const points = [];
    const alpha = 2;
    const b = Math.round(alpha * Math.sqrt(pointCount)); // Number of boundary points
    const phi = (Math.sqrt(5) + 1) / 2; // Golden ratio

    for (let k = 0; k < pointCount; k++) {
        let r = calcRadius(k, pointCount, b) * radius;
        let theta = (2 * Math.PI * k) / (phi * phi);
        let x = r * Math.cos(theta);
        let y = r * Math.sin(theta);

        let newPoint = {
            radius: Math.abs(random.gaussian() * pointRadius),
            position: [x, y],
            color: random.pick(palette)
        };

        points.push(newPoint);
    }

    return points;
};

export { createDottedCircle };
