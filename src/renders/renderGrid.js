import { lerp } from "canvas-sketch-util/math";
import random from "canvas-sketch-util/random";
import palettes from "nice-color-palettes";
import { createGrid } from "../creators";

const renderGrid = () => {
    const palette = random.pick(palettes);

    const points = createGrid(40, 256, palette).filter(
        () => random.value() > 0.5
    );
    const margin = 300;

    return ({ context, width, height }) => {
        context.fillStyle = "white";
        context.fillRect(0, 0, width, height);

        points.forEach(point => {
            const {
                position: [u, v],
                radius,
                color,
                rotation
            } = point;

            const x = lerp(margin, width - margin, u);
            const y = lerp(margin, height - margin, v);

            // Saving before changing the canvas position
            context.save();

            // Drawing circle
            // context.beginPath();
            // context.arc(x, y, radius, 0, Math.PI * 2, false);

            // Drawing text
            context.fillStyle = color;
            context.font = `${radius}px Arial`;
            context.translate(x, y);
            context.rotate(rotation);
            context.fillText("||", 0, 0);

            // Restore the canvas position
            context.restore();
        });
    };
};

export default renderGrid;
