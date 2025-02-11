import { atom } from "jotai";
import { Point, SquareState } from "../types/square";

export const squareStateAtom = atom<SquareState>({
    position: { x: 0, y: 0 },
    rotation: 0,
    origin: { x: 0, y: 0 },
});

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
        // 원점을 기준으로 회전
        const rotatedX =
            Math.cos((state.rotation * Math.PI) / 180) *
                (corner.x - state.origin.x) -
            Math.sin((state.rotation * Math.PI) / 180) *
                (corner.y - state.origin.y) +
            state.origin.x;
        const rotatedY =
            Math.sin((state.rotation * Math.PI) / 180) *
                (corner.x - state.origin.x) +
            Math.cos((state.rotation * Math.PI) / 180) *
                (corner.y - state.origin.y) +
            state.origin.y;

        // 이동 적용
        return {
            x: rotatedX + state.position.x,
            y: rotatedY + state.position.y,
        };
    });
});
