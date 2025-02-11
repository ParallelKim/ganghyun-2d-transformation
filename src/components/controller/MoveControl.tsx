import { useSetAtom } from "jotai";
import { useState } from "react";
import { transformAtom } from "../../atoms/square";
import { TransformControl } from "../common/TransformControl";
import { validateInteger } from "../../utils/validation";
import { NumberInput } from "../common/NumberInput";

interface Coordinate {
    x: number;
    y: number;
}

export const MoveControl = () => {
    const transform = useSetAtom(transformAtom);
    const [coords, setCoords] = useState<Coordinate>({ x: 0, y: 0 });
    const [errors, setErrors] = useState<{ x?: string; y?: string }>({});

    const handleChange = (axis: keyof Coordinate, value: number) => {
        setCoords((prev) => ({ ...prev, [axis]: value }));

        if (!validateInteger(value)) {
            setErrors((prev) => ({
                ...prev,
                [axis]: "정수만 입력 가능합니다",
            }));
        } else {
            setErrors((prev) => ({ ...prev, [axis]: undefined }));
        }
    };

    const handleMove = () => {
        if (coords.x === 0 && coords.y === 0) return;
        if (errors.x || errors.y) return;

        transform({ move: coords });
        setCoords({ x: 0, y: 0 });
    };

    return (
        <TransformControl
            title="이동"
            onApply={handleMove}
        >
            <NumberInput
                label="x"
                value={coords.x}
                onChange={(value) => handleChange("x", value)}
                error={errors.x}
            />
            <NumberInput
                label="y"
                value={coords.y}
                onChange={(value) => handleChange("y", value)}
                error={errors.y}
            />
        </TransformControl>
    );
};
