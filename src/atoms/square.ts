import { atom } from "jotai";
import {
    Point,
    SquareState,
    HistoryState,
    HistoryAction,
} from "../types/square";

// 원점 상태를 위한 atom
export const originAtom = atom<Point>({ x: 0, y: 0 });

const initialSquareState: SquareState = {
    location: { x: 0, y: 0 }, // 사각형의 중심점
    rotation: 0, // x축 기준 회전각 (도)
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

// 파생된 상태: 사각형의 모서리 좌표 (원점 기준 회전 적용)
export const cornersAtom = atom((get) => {
    const { location, rotation } = get(squareStateAtom);
    const origin = get(originAtom);
    const halfSize = 100 / 2;

    // 회전하기 전의 모서리 좌표 (중심점 기준)
    const corners: Point[] = [
        { x: -halfSize, y: halfSize }, // left top
        { x: halfSize, y: halfSize }, // right top
        { x: halfSize, y: -halfSize }, // right bottom
        { x: -halfSize, y: -halfSize }, // left bottom
    ];

    // 회전 변환 적용 (원점 기준)
    return corners.map((corner) => {
        // 1. 중심점 기준 좌표를 절대 좌표로 변환
        const absX = corner.x + location.x;
        const absY = corner.y + location.y;

        // 2. 원점 기준 회전
        const deltaX = absX - origin.x;
        const deltaY = absY - origin.y;
        const angleRad = (rotation * Math.PI) / 180;

        const rotatedX =
            deltaX * Math.cos(angleRad) -
            deltaY * Math.sin(angleRad) +
            origin.x;
        const rotatedY =
            deltaX * Math.sin(angleRad) +
            deltaY * Math.cos(angleRad) +
            origin.y;

        return { x: rotatedX, y: rotatedY };
    });
});

// 원점 기준 변환을 위한 파생 atom
export const transformAtom = atom(
    null,
    (get, set, action: { move?: Point; rotate?: number }) => {
        const origin = get(originAtom);

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
                    location: {
                        x: prev.location.x + transformedMove.x,
                        y: prev.location.y + transformedMove.y,
                    },
                };
            }

            if (action.rotate) {
                const deltaRad = (action.rotate * Math.PI) / 180;

                // 원점으로부터의 상대 벡터
                const dx = prev.location.x - origin.x;
                const dy = prev.location.y - origin.y;

                // 원점 기준 순수 회전 변환
                const newX = dx * Math.cos(deltaRad) - dy * Math.sin(deltaRad);
                const newY = dx * Math.sin(deltaRad) + dy * Math.cos(deltaRad);

                return {
                    location: {
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
