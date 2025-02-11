import { useAtomValue, useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import {
    cornersAtom,
    historyUpdateAtom,
    transformAtom,
} from "../../atoms/square";
import { ControlForm } from "../../types/square";
import { getCornerPosition } from "../../helpers/position";

export const ControllerSection = () => {
    const corners = useAtomValue(cornersAtom);
    const updateHistory = useSetAtom(historyUpdateAtom);
    const transform = useSetAtom(transformAtom);

    const { register, handleSubmit, reset } = useForm<ControlForm>({
        defaultValues: {
            move: { x: 0, y: 0 },
            rotate: { angle: 0 },
            origin: { x: 0, y: 0 },
        },
    });

    const onSubmit = (data: ControlForm) => {
        if (
            data.move.x === 0 &&
            data.move.y === 0 &&
            data.rotate.angle === 0 &&
            data.origin.x === 0 &&
            data.origin.y === 0
        ) {
            return;
        }

        // 원점 업데이트
        if (data.origin.x !== 0 || data.origin.y !== 0) {
            transform({
                origin: { x: data.origin.x, y: data.origin.y },
            });
        }

        // 이동 변환
        if (data.move.x !== 0 || data.move.y !== 0) {
            transform({
                move: { x: data.move.x, y: data.move.y },
            });
        }

        // 회전 변환
        if (data.rotate.angle !== 0) {
            transform({
                rotate: data.rotate.angle,
            });
        }

        reset({
            move: { x: 0, y: 0 },
            rotate: { angle: 0 },
            origin: { x: 0, y: 0 },
        });
    };

    return (
        <section className="controller">
            <div className="control-group">
                <h2>점의 좌표</h2>
                <div className="control-box">
                    <ol>
                        {corners.map((coord, index) => {
                            const position = getCornerPosition(coord, corners);
                            return (
                                <li key={index}>
                                    {position}: {coord.x.toFixed(2)} /{" "}
                                    {coord.y.toFixed(2)}
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="control-group">
                    <h2>이동</h2>
                    <div className="control-box">
                        <div className="input-row">
                            <label>x:</label>
                            <input
                                type="number"
                                {...register("move.x", {
                                    valueAsNumber: true,
                                })}
                            />
                        </div>
                        <div className="input-row">
                            <label>y:</label>
                            <input
                                type="number"
                                {...register("move.y", {
                                    valueAsNumber: true,
                                })}
                            />
                        </div>
                    </div>
                </fieldset>
                <fieldset className="control-group">
                    <h2>회전</h2>
                    <div className="control-box">
                        <div className="input-row">
                            <label>각도:</label>
                            <input
                                style={{ flex: 1 }}
                                type="number"
                                {...register("rotate.angle", {
                                    valueAsNumber: true,
                                })}
                            />
                        </div>
                    </div>
                </fieldset>
                <fieldset className="control-group">
                    <h2>원점 변경</h2>
                    <div className="control-box">
                        <div className="input-row">
                            <label>x:</label>
                            <input
                                type="number"
                                {...register("origin.x", {
                                    valueAsNumber: true,
                                })}
                            />
                        </div>
                        <div className="input-row">
                            <label>y:</label>
                            <input
                                type="number"
                                {...register("origin.y", {
                                    valueAsNumber: true,
                                })}
                            />
                        </div>
                    </div>
                </fieldset>
                <button
                    type="submit"
                    className="control-button"
                >
                    적용
                </button>
            </form>
            <div className="history-controls">
                <button
                    type="button"
                    className="control-button"
                    onClick={() => updateHistory({ type: "UNDO" })}
                >
                    실행 취소
                </button>
                <button
                    type="button"
                    className="control-button"
                    onClick={() => updateHistory({ type: "REDO" })}
                >
                    다시 실행
                </button>
            </div>
        </section>
    );
};
