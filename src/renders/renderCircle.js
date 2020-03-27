import random from "canvas-sketch-util/random";
import palettes from "nice-color-palettes";
import { createDottedCircle } from "../creators";

const renderCicle = () => {
    const palette = random.pick(palettes);
    random.setSeed(512);
    const points = createDottedCircle(800, 256, 25, palette);

    return ({ context, width, height }) => {
        context.fillStyle = "white";
        context.fillRect(0, 0, width, height);

        points.forEach(point => {
            const {
                position: [x, y],
                radius,
                color
            } = point;

            // Translate X, Y to the center of the canvas
            const transX = x + width / 2;
            const transY = y + width / 2;

            context.beginPath();
            context.arc(transX, transY, radius, 0, Math.PI * 2, false);
            context.fillStyle = color;
            context.fill();
        });
    };
};

export default renderCicle;
