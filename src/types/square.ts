export interface Point {
    x: number;
    y: number;
}

export interface SquareState {
    position: Point;
    rotation: number;
    origin: Point;
}

export interface ControlForm {
    move: {
        x: number;
        y: number;
    };
    rotate: {
        angle: number;
    };
    origin: {
        x: number;
        y: number;
    };
}
