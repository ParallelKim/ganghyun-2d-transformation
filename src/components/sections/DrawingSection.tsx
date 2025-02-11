import { useEffect, useRef } from "react";

const HALF_SIZE = 200;
const GRID_SIZE = 10;
const RECT_SIZE = 100;

export const DrawingSection = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        ctx.scale(dpr, dpr);

        const size = Math.min(rect.width, rect.height);
        const scale = size / (2 * HALF_SIZE);

        ctx.setTransform(scale, 0, 0, -scale, rect.width / 2, rect.height / 2);

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
        ctx.fillStyle = "#e5e7eb";
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.rect(0, 0, RECT_SIZE, RECT_SIZE);
        ctx.fill();
        ctx.stroke();

        // 원점 그리기
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill();
    }, []);

    return (
        <section className="display">
            <canvas
                ref={canvasRef}
                id="canvas"
            />
        </section>
    );
};
