import { useSetAtom } from "jotai";
import { useState } from "react";
import { transformAtom } from "../../atoms/transform";
import { NumberInput } from "../common/NumberInput";
import { TransformControl } from "../common/TransformControl";
import { normalizeRotation, validateInteger } from "../../utils/validation";

export const RotateControl = () => {
    const transform = useSetAtom(transformAtom);
    const [angle, setAngle] = useState(0);

    const handleChange = (value: number) => {
        if (!validateInteger(value)) return;

        setAngle(value);
    };

    const handleRotate = () => {
        if (angle === 0) return;

        const normalizedAngle = normalizeRotation(angle);
        transform({ rotate: normalizedAngle });
        setAngle(0);
    };

    return (
        <TransformControl
            title="회전"
            onApply={handleRotate}
        >
            <NumberInput
                label="각도"
                value={angle}
                onChange={handleChange}
            />
        </TransformControl>
    );
};
