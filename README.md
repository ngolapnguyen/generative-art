# generative-art
Toy project to experiment with drawing generative art with Canvas API.

## 1. Grid
![Grid Sample](/samples/grid.png?raw=true "Grid Sample")

## 2. Circle
![Circle Sample](/samples/circle.png?raw=true "Circle Sample")

## 3. Sol Wall 
> - Base on a grid of `n x n` size.
> - Pick 2 random points from the grid, then pick 2 more points by projecting each point down to the bottom of the grid. These points will create a trapezoid
> - Fill the trapezoid with a random color, then stroke it with the background color
> - Repeat until all points on the grid are exhausted

![Sol Wall Sample](/samples/solwall.png?raw=true "Sol Wall Sample")
