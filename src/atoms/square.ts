import { atom } from "jotai";
import {
    Point,
    SquareState,
    HistoryState,
    HistoryAction,
} from "../types/square";
import { SQUARE_SIZE } from "../constants";
import { getCorners } from "../helpers/position";

// 원점 상태를 위한 atom
const initialOriginState: Point = { x: 0, y: 0 };
const initialSquareState: SquareState = {
    center: { x: SQUARE_SIZE / 2, y: SQUARE_SIZE / 2 }, // 사각형의 중심점
    rotation: 0, // x축 기준 회전각 (도)
};

// 히스토리 관리를 위한 atom
export const historyAtom = atom<HistoryState>({
    past: [],
    present: { square: initialSquareState, origin: initialOriginState },
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

// 현재 상태를 반환하는 atom
export const squareStateAtom = atom(
    (get) => get(historyAtom).present,
    (get, set, newState: (prev: SquareState) => SquareState) => {
        set(historyUpdateAtom, {
            type: "PUSH",
            newPresent: {
                square: newState(get(historyAtom).present.square),
                origin: get(historyAtom).present.origin,
            },
        });
    }
);

// 파생된 상태: 사각형의 모서리 좌표 (원점 기준 회전 적용)
export const cornersAtom = atom((get) => {
    const {
        square: { center, rotation },
    } = get(squareStateAtom);

    const corners = getCorners(center, rotation);

    return corners;
});

// 원점 기준 변환을 위한 파생 atom
export const transformAtom = atom(
    null,
    (
        get,
        set,
        action: {
            move?: Point;
            rotate?: number;
            origin?: Point;
            reset?: boolean;
        }
    ) => {
        const history = get(historyAtom);
        const { square, origin } = history.present;

        if (action.reset) {
            set(historyUpdateAtom, {
                type: "PUSH",
                newPresent: {
                    square: initialSquareState,
                    origin: initialOriginState,
                },
            });
            return;
        }

        if (action.origin) {
            // origin 변경 시 history에 직접 업데이트
            set(historyUpdateAtom, {
                type: "PUSH",
                newPresent: {
                    square,
                    origin: {
                        x: origin.x + action.origin.x,
                        y: origin.y + action.origin.y,
                    },
                },
            });
            return;
        }

        set(squareStateAtom, (prev) => {
            if (action.move) {
                const angleRad = (prev.rotation * Math.PI) / 180;
                const transformedMove = {
                    x:
                        action.move.x * Math.cos(angleRad) -
                        action.move.y * Math.sin(angleRad),
                    y:
                        action.move.x * Math.sin(angleRad) +
                        action.move.y * Math.cos(angleRad),
                };
                return {
                    ...prev,
                    center: {
                        x: prev.center.x + transformedMove.x,
                        y: prev.center.y + transformedMove.y,
                    },
                };
            }

            if (action.rotate) {
                const deltaRad = (action.rotate * Math.PI) / 180;

                // 원점으로부터의 상대 벡터
                const dx = prev.center.x - origin.x;
                const dy = prev.center.y - origin.y;

                // 원점 기준 순수 회전 변환
                const newX = dx * Math.cos(deltaRad) - dy * Math.sin(deltaRad);
                const newY = dx * Math.sin(deltaRad) + dy * Math.cos(deltaRad);

                return {
                    center: {
                        x: newX + origin.x,
                        y: newY + origin.y,
                    },
                    rotation: prev.rotation + action.rotate,
                };
            }

            return prev;
        });
    }
);
