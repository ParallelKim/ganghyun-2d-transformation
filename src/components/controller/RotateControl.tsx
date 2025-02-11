import { useSetAtom } from "jotai";
import { useState } from "react";
import { transformAtom } from "../../atoms/square";
import { NumberInput } from "../common/NumberInput";
import { TransformControl } from "../common/TransformControl";
import { normalizeRotation, validateInteger } from "../../utils/validation";

export const RotateControl = () => {
    const transform = useSetAtom(transformAtom);
    const [angle, setAngle] = useState(0);
    const [error, setError] = useState<string>();

    const handleChange = (value: number) => {
        setAngle(value);
        setError(validateInteger(value) ? undefined : "정수만 입력 가능합니다");
    };

    const handleRotate = () => {
        if (angle === 0 || error) return;

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
                error={error}
            />
        </TransformControl>
    );
};
