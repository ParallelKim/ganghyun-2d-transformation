export interface Point {
    x: number;
    y: number;
}

export interface SquareState {
    location: Point;
    rotation: number;
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

export interface HistoryState {
    past: SquareState[];
    present: SquareState;
    future: SquareState[];
}

export type HistoryAction =
    | { type: "PUSH"; newPresent: SquareState }
    | { type: "UNDO" }
    | { type: "REDO" };
