import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import { squareStateAtom } from "../../atoms/square";

const HALF_SIZE = 200;
const GRID_SIZE = 10;
const SQUARE_SIZE = 100;

export const DrawingSection = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const state = useAtomValue(squareStateAtom);

    useEffect(() => {
        const draw = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Canvas 초기화 및 설정
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            ctx.scale(dpr, dpr);

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

            // Grid 그리기
            ctx.strokeStyle = "rgba(0,0,0,0.1)";
            ctx.beginPath();
            const gridCount = HALF_SIZE / GRID_SIZE;
            for (let i = -gridCount; i <= gridCount; i++) {
                ctx.moveTo(i * GRID_SIZE, -HALF_SIZE);
                ctx.lineTo(i * GRID_SIZE, HALF_SIZE);
                ctx.moveTo(-HALF_SIZE, i * GRID_SIZE);
                ctx.lineTo(HALF_SIZE, i * GRID_SIZE);
            }
            ctx.stroke();

            // 축 그리기
            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.moveTo(-HALF_SIZE, 0);
            ctx.lineTo(HALF_SIZE, 0);
            ctx.moveTo(0, -HALF_SIZE);
            ctx.lineTo(0, HALF_SIZE);
            ctx.stroke();

            // 사각형 그리기
            const { position, rotation, origin } = state;
            ctx.save();
            ctx.translate(position.x, position.y);
            ctx.translate(origin.x, origin.y);
            ctx.rotate((rotation * Math.PI) / 180);
            ctx.translate(-origin.x, -origin.y);

            ctx.fillStyle = "#e5e7eb";
            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.rect(0, 0, SQUARE_SIZE, SQUARE_SIZE);
            ctx.fill();
            ctx.stroke();
            ctx.restore();

            // 원점 그리기
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(
                origin.x + position.x,
                origin.y + position.y,
                3,
                0,
                Math.PI * 2
            );
            ctx.fill();
        };

        draw();
    }, [state]);

    return (
        <section className="display">
            <canvas
                ref={canvasRef}
                id="canvas"
            />
        </section>
    );
};
