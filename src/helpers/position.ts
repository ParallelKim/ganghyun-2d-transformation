import { Point } from "../types/square";

export const getCornerPosition = (point: Point, corners: Point[]) => {
    // 모든 x, y 좌표값을 추출
    const xs = corners.map((c) => c.x);
    const ys = corners.map((c) => c.y);

    // 최소/최대값 찾기
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    // 위치 판단
    const isLeft = Math.abs(point.x - minX) < 0.01;
    const isRight = Math.abs(point.x - maxX) < 0.01;
    const isTop = Math.abs(point.y - maxY) < 0.01;
    const isBottom = Math.abs(point.y - minY) < 0.01;

    const positions: string[] = [];
    if (isLeft) positions.push("left");
    if (isRight) positions.push("right");
    if (isTop) positions.push("top");
    if (isBottom) positions.push("bottom");

    return positions.join(", ");
};
