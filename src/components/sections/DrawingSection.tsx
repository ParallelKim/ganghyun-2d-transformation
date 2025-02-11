import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import { squareStateAtom } from "../../atoms/transform";
import { GRID_SIZE, HALF_SIZE, SQUARE_SIZE } from "../../constants";
import { CANVAS_STYLE } from "../../constants";

type CustomCanvas = HTMLCanvasElement & {
    drawSquareAndOrigin?: () => void;
};

export const DrawingSection = () => {
    const canvasRef = useRef<CustomCanvas>(null);
    const {
        square: { center, rotation },
        origin,
    } = useAtomValue(squareStateAtom);

    // 캔버스 초기 설정 및 고정된 요소 그리기
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // DPR 및 캔버스 크기 설정 함수
        const setupCanvas = () => {
            const rect = canvas.getBoundingClientRect();

            canvas.width = rect.width;
            canvas.height = rect.height;

            const size = Math.min(rect.width, rect.height);
            const scale = size / (2 * HALF_SIZE);

            ctx.setTransform(
                scale,
                0,
                0,
                -scale,
                rect.width / 2,
                rect.height / 2
            );
        };

        const gridCount = HALF_SIZE / GRID_SIZE;

        // 그리드 그리기 함수
        const drawGrid = () => {
            ctx.strokeStyle = CANVAS_STYLE.colors.GRID;
            ctx.beginPath();
            for (let i = -gridCount; i <= gridCount; i++) {
                ctx.moveTo(i * GRID_SIZE, -HALF_SIZE);
                ctx.lineTo(i * GRID_SIZE, HALF_SIZE);
                ctx.moveTo(-HALF_SIZE, i * GRID_SIZE);
                ctx.lineTo(HALF_SIZE, i * GRID_SIZE);
            }
            ctx.stroke();
        };

        // 그리드 숫자 그리기 함수
        const drawTickValue = () => {
            ctx.save();
            ctx.scale(1, -1);
            ctx.fillStyle = CANVAS_STYLE.colors.AXES;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = CANVAS_STYLE.text.FONT;

            for (let i = -gridCount + 1; i < gridCount; i++) {
                if (i % 5 === 0 && i !== 0) {
                    const value = i * GRID_SIZE;
                    ctx.fillText(
                        value.toString(),
                        value,
                        CANVAS_STYLE.sizes.TICK_OFFSET
                    );
                    ctx.fillText(
                        (-value).toString(),
                        -CANVAS_STYLE.sizes.TICK_OFFSET,
                        value
                    );
                }
            }
            ctx.restore();
        };

        // 축 그리기 함수
        const drawAxes = () => {
            ctx.strokeStyle = CANVAS_STYLE.colors.AXES;
            ctx.beginPath();
            ctx.moveTo(-HALF_SIZE, 0);
            ctx.lineTo(HALF_SIZE, 0);
            ctx.moveTo(0, -HALF_SIZE);
            ctx.lineTo(0, HALF_SIZE);
            ctx.stroke();
        };

        // 사각형과 원점 그리기 함수
        const drawSquareAndOrigin = () => {
            ctx.save();
            ctx.translate(center.x, center.y);
            ctx.rotate((rotation * Math.PI) / 180);
            ctx.fillStyle = CANVAS_STYLE.colors.SQUARE.FILL;
            ctx.strokeStyle = CANVAS_STYLE.colors.SQUARE.STROKE;
            ctx.beginPath();

            // 중심점 기준으로 사각형 그리기
            const halfSize = SQUARE_SIZE / 2;
            ctx.rect(-halfSize, -halfSize, SQUARE_SIZE, SQUARE_SIZE);

            ctx.fill();
            ctx.stroke();
            ctx.restore();

            // 원점 표시
            ctx.fillStyle = CANVAS_STYLE.colors.ORIGIN;
            ctx.beginPath();
            ctx.arc(
                origin.x,
                origin.y,
                CANVAS_STYLE.sizes.ORIGIN_RADIUS,
                0,
                Math.PI * 2
            );
            ctx.fill();
        };

        // state 변경 시 업데이트를 위해 drawSquareAndOrigin 함수를 ref에 저장
        if (canvasRef.current) {
            canvasRef.current.drawSquareAndOrigin = drawSquareAndOrigin;
        }

        // 리사이즈 이벤트 리스너
        const handleResize = () => {
            setupCanvas();
            drawGrid();
            drawAxes();
            drawSquareAndOrigin();
            drawTickValue();
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }); // 마운트 시에만 실행

    // state 변경 감지 및 업데이트
    useEffect(() => {
        if (canvasRef.current?.drawSquareAndOrigin) {
            canvasRef.current.drawSquareAndOrigin();
        }
    }, [center, rotation, origin]);

    return (
        <section className="display">
            <canvas
                ref={canvasRef}
                id="canvas"
            />
        </section>
    );
};
