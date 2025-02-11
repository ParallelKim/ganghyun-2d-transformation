import { SQUARE_SIZE } from "../constants";
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

export const getCorners = (center: Point, rotation: number) => {
    const angleRad = (rotation * Math.PI) / 180;
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    const halfSize = SQUARE_SIZE / 2;

    // 중심점 기준으로 각 꼭지점의 상대 위치를 회전 변환
    const corners: [Point, Point, Point, Point] = [
        // left top: (-halfSize, halfSize)
        {
            x: center.x + (-halfSize * cos - halfSize * sin),
            y: center.y + (-halfSize * sin + halfSize * cos),
        },
        // right top: (halfSize, halfSize)
        {
            x: center.x + (halfSize * cos - halfSize * sin),
            y: center.y + (halfSize * sin + halfSize * cos),
        },
        // right bottom: (halfSize, -halfSize)
        {
            x: center.x + (halfSize * cos + halfSize * sin),
            y: center.y + (halfSize * sin - halfSize * cos),
        },
        // left bottom: (-halfSize, -halfSize)
        {
            x: center.x + (-halfSize * cos + halfSize * sin),
            y: center.y + (-halfSize * sin - halfSize * cos),
        },
    ];

    return corners;
};
