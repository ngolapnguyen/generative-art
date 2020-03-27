import { lerp } from "canvas-sketch-util/math";
import random from "canvas-sketch-util/random";
import palettes from "nice-color-palettes";
import { createGrid } from "../creators";

const renderSector = (firstPos, secondPos) => {};

const renderGenerativeWall = () => {
    const gridSize = 6;

    const palette = random.pick(palettes);
    const points = createGrid(gridSize, 1, palette);
    const margin = 300;

    // Sort points to change the order from top down left right
    // to left right top down
    points.sort((a, b) => {
        if (a.position[1] === b.position[1]) {
            return a.position[0] - b.position[0];
        }

        return a.position[1] - b.position[1];
    });

    // Create an empty one-direction array with all cells = 0
    // cell number = size ^ 2 to simulate a 2D matrix
    const initArray = Array(gridSize * gridSize)
        .fill()
        .map((entry, index) => index);

    // Run a loop and pick the trapezoid points till the grid is exhausted
    let paths = [];
    do {
        // Randomize the first and second point, depending on the remaining array
        let first = -1;
        let second = -1;
        let firstArrayIndex, secondArrayIndex;

        if (initArray.length === 2) {
            firstArrayIndex = 0;
            secondArrayIndex = 1;
        } else {
            firstArrayIndex = random.rangeFloor(0, initArray.length - 1);
            first = initArray[firstArrayIndex];
            initArray.splice(firstArrayIndex, 1);

            do {
                secondArrayIndex = random.rangeFloor(0, initArray.length - 1);
                second = initArray[secondArrayIndex];
            } while (first % gridSize === second % gridSize);

            initArray.splice(secondArrayIndex, 1);
        }

        // If first % gridSize > second % gridSize
        // Meaning the first point is to the right of the second point
        // We need to swap
        if (first % gridSize > second % gridSize) {
            let temp = first;
            first = second;
            second = temp;
        }

        // Project the first and second point down to the bottom of the grid
        // This looks strange because our points grid is populated from top down, then left to right
        let third = (first % gridSize) + gridSize * (gridSize - 1);
        let fourth = (second % gridSize) + gridSize * (gridSize - 1);

        // New path
        paths.push([first, second, third, fourth]);
    } while (initArray.length > 2);

    return ({ context, width, height }) => {
        context.fillStyle = "white";
        context.fillRect(0, 0, width, height);

        // Map all vertices of each path to canvas coordinate
        paths = paths.map(vertices => {
            return vertices.map(index => {
                const {
                    position: [u, v],
                    color
                } = points[index];

                const x = lerp(margin, width - margin, u);
                const y = lerp(margin, height - margin, v);

                return { x, y, color };
            });
        });

        // Sort in the ascending order of average y of first and second points
        // This will make canvas render path with lower average y value first
        // (Because y increases top down)
        paths.sort((a, b) => {
            return (a[0].y + a[1].y) / 2 - (b[0].y + b[1].y) / 2;
        });

        // Change opacity level before drawing
        context.globalAlpha = 0.8;

        paths.forEach(vertices => {
            context.beginPath();
            context.moveTo(vertices[0].x, vertices[0].y);
            context.lineTo(vertices[1].x, vertices[1].y);
            context.lineTo(vertices[3].x, vertices[3].y);
            context.lineTo(vertices[2].x, vertices[2].y);
            context.lineTo(vertices[0].x, vertices[0].y);
            context.fillStyle = random.pick(vertices).color;
            context.fill();

            // Stroking
            context.lineWidth = 10;
            context.strokeStyle = "white";
            context.stroke();
        });
    };
};

export default renderGenerativeWall;
