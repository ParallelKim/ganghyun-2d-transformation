import { useSetAtom } from "jotai";
import { historyUpdateAtom } from "../../atoms/square";

export const HistoryControl = () => {
    const updateHistory = useSetAtom(historyUpdateAtom);

    return (
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
    );
};
