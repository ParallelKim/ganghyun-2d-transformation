import { Point } from "../types/square";

export const getCornerPosition = (point: Point, corners: Point[]) => {
    // 중점 계산
    const center = corners.reduce(
        (acc, curr) => ({
            x: acc.x + curr.x,
            y: acc.y + curr.y,
        }),
        { x: 0, y: 0 }
    );
    center.x /= 4;
    center.y /= 4;

    // 위치 판단 (중점 기준)
    const positions: string[] = [];

    // x축 판단 (중점보다 왼쪽/오른쪽)
    if (point.x < center.x) {
        positions.push("left");
    } else if (point.x > center.x) {
        positions.push("right");
    }

    // y축 판단 (중점보다 위/아래)
    if (point.y > center.y) {
        positions.push("top");
    } else if (point.y < center.y) {
        positions.push("bottom");
    }

    return positions.join(", ");
};
