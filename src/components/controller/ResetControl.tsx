import { useSetAtom } from "jotai";
import { transformAtom } from "../../atoms/square";

export const ResetControl = () => {
    const transform = useSetAtom(transformAtom);

    const handleReset = () => {
        transform({ reset: true });
    };

    return (
        <div className="history-controls">
            <button
                type="button"
                className="control-button"
                onClick={handleReset}
            >
                초기화
            </button>
        </div>
    );
};
