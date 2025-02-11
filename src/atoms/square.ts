import { atom } from "jotai";
import {
    Point,
    SquareState,
    HistoryState,
    HistoryAction,
} from "../types/square";

const initialSquareState: SquareState = {
    position: { x: 0, y: 0 },
    rotation: 0,
    origin: { x: 0, y: 0 },
};

// 히스토리 관리를 위한 atom
export const historyAtom = atom<HistoryState>({
    past: [],
    present: initialSquareState,
    future: [],
});

// 히스토리 업데이트를 위한 atom
export const historyUpdateAtom = atom(
    null,
    (get, set, action: HistoryAction) => {
        const history = get(historyAtom);

        switch (action.type) {
            case "PUSH": {
                set(historyAtom, {
                    past: [...history.past, history.present],
                    present: action.newPresent,
                    future: [],
                });
                break;
            }
            case "UNDO": {
                if (history.past.length === 0) return;

                const previous = history.past[history.past.length - 1];
                const newPast = history.past.slice(0, -1);

                set(historyAtom, {
                    past: newPast,
                    present: previous,
                    future: [history.present, ...history.future],
                });
                break;
            }
            case "REDO": {
                if (history.future.length === 0) return;

                const next = history.future[0];
                const newFuture = history.future.slice(1);

                set(historyAtom, {
                    past: [...history.past, history.present],
                    present: next,
                    future: newFuture,
                });
                break;
            }
        }
    }
);

// 현재 상태를 반환하는 atom (기존 squareStateAtom 대체)
export const squareStateAtom = atom(
    (get) => get(historyAtom).present,
    (get, set, newState: (prev: SquareState) => SquareState) => {
        set(historyUpdateAtom, {
            type: "PUSH",
            newPresent: newState(get(historyAtom).present),
        });
    }
);

// 파생된 상태: 사각형의 모서리 좌표
export const cornersAtom = atom((get) => {
    const state = get(squareStateAtom);
    const SQUARE_SIZE = 100;

    const corners: Point[] = [
        { x: 0, y: SQUARE_SIZE }, // left top
        { x: SQUARE_SIZE, y: SQUARE_SIZE }, // right top
        { x: SQUARE_SIZE, y: 0 }, // right bottom
        { x: 0, y: 0 }, // left bottom
    ];

    return corners.map((corner) => {
        // 1. 원점을 기준으로 회전
        const translatedX = corner.x - state.origin.x;
        const translatedY = corner.y - state.origin.y;

        const rotatedX =
            Math.cos((state.rotation * Math.PI) / 180) * translatedX -
            Math.sin((state.rotation * Math.PI) / 180) * translatedY;
        const rotatedY =
            Math.sin((state.rotation * Math.PI) / 180) * translatedX +
            Math.cos((state.rotation * Math.PI) / 180) * translatedY;

        // 2. 원점 위치로 되돌리고 최종 위치로 이동
        return {
            x: rotatedX + state.origin.x + state.position.x,
            y: rotatedY + state.origin.y + state.position.y,
        };
    });
});
