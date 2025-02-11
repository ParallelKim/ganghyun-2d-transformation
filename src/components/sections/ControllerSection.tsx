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

    const { register, getValues, setValue } = useForm<ControlForm>({
        defaultValues: {
            move: { x: 0, y: 0 },
            rotate: { angle: 0 },
            origin: { x: 0, y: 0 },
        },
    });

    const resetField = (field: keyof ControlForm) => {
        switch (field) {
            case "move":
                setValue("move", { x: 0, y: 0 });
                break;
            case "rotate":
                setValue("rotate", { angle: 0 });
                break;
            case "origin":
                setValue("origin", { x: 0, y: 0 });
                break;
        }
    };

    const handleMove = () => {
        const { move } = getValues();
        if (move.x === 0 && move.y === 0) return;

        transform({ move: { x: move.x, y: move.y } });
        resetField("move");
    };

    const handleRotate = () => {
        const { rotate } = getValues();
        if (rotate.angle === 0) return;

        transform({ rotate: rotate.angle });
        resetField("rotate");
    };

    const handleOrigin = () => {
        const { origin } = getValues();
        if (origin.x === 0 && origin.y === 0) return;

        transform({ origin: { x: origin.x, y: origin.y } });
        resetField("origin");
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
            <div>
                <fieldset className="control-group">
                    <div className="control-header">
                        <h2>이동</h2>
                        <button
                            type="button"
                            className="control-button"
                            onClick={handleMove}
                        >
                            적용
                        </button>
                    </div>
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
                    <div className="control-header">
                        <h2>회전</h2>
                        <button
                            type="button"
                            className="control-button"
                            onClick={handleRotate}
                        >
                            적용
                        </button>
                    </div>
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
                    <div className="control-header">
                        <h2>원점 변경</h2>
                        <button
                            type="button"
                            className="control-button"
                            onClick={handleOrigin}
                        >
                            적용
                        </button>
                    </div>
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
            </div>
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
