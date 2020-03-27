import canvasSketch from "canvas-sketch";
import renderCicle from "./renders/renderCircle";
import renderGrid from "./renders/renderGrid";
import renderGenerativeWall from "./renders/renderGenerativeWall";

const settings = {
    dimensions: [2048, 2048]
};

const sketch = () => {
    // return renderGenerativeWall();
    // return renderGrid();
    return renderCicle();
};

canvasSketch(sketch, settings);
