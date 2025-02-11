import { useSetAtom } from "jotai";
import { useState } from "react";
import { transformAtom } from "../../atoms/square";
import { NumberInput } from "../common/NumberInput";
import { TransformControl } from "../common/TransformControl";
import { validateInteger } from "../../utils/validation";

interface Coordinate {
    x: number;
    y: number;
}

export const OriginControl = () => {
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

    const handleOrigin = () => {
        if (coords.x === 0 && coords.y === 0) return;
        if (errors.x || errors.y) return;

        transform({ origin: coords });
        setCoords({ x: 0, y: 0 });
    };

    return (
        <TransformControl
            title="원점 변경"
            onApply={handleOrigin}
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
