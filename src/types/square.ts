export interface Point {
    x: number;
    y: number;
}

export interface SquareState {
    center: Point;
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

interface HistoryItem {
    square: SquareState;
    origin: Point;
}

export interface HistoryState {
    past: HistoryItem[];
    present: HistoryItem;
    future: HistoryItem[];
}

export type HistoryAction =
    | { type: "PUSH"; newPresent: HistoryItem }
    | { type: "UNDO" }
    | { type: "REDO" };
