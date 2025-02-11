import { useSetAtom } from "jotai";
import { useState } from "react";
import { transformAtom } from "../../atoms/transform";
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

    const handleChange = (axis: keyof Coordinate, value: number) => {
        if (!validateInteger(value)) return;

        setCoords((prev) => ({ ...prev, [axis]: value }));
    };

    const handleMove = () => {
        if (coords.x === 0 && coords.y === 0) return;

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
            />
            <NumberInput
                label="y"
                value={coords.y}
                onChange={(value) => handleChange("y", value)}
            />
        </TransformControl>
    );
};
