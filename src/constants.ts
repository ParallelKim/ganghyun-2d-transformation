export const HALF_SIZE = 200;
export const GRID_SIZE = 10;
export const SQUARE_SIZE = 100;

// Canvas 관련 상수
export const CANVAS_STYLE = {
    colors: {
        GRID: "rgba(0,0,0,0.1)",
        AXES: "black",
        SQUARE: {
            FILL: "#e5e7eb",
            STROKE: "black",
        },
        ORIGIN: "red",
    },
    sizes: {
        ORIGIN_RADIUS: 3,
        TICK_OFFSET: 15,
    },
    text: {
        FONT: "12px Arial",
    },
} as const;
