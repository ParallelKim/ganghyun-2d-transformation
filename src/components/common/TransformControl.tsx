import { TransformControlProps } from "../../types/controller";

export const TransformControl = ({
    title,
    onApply,
    children,
}: TransformControlProps) => {
    return (
        <fieldset className="control-group">
            <div className="control-header">
                <h2>{title}</h2>
                <button
                    type="button"
                    className="control-button"
                    onClick={onApply}
                >
                    적용
                </button>
            </div>
            <div className="control-box">{children}</div>
        </fieldset>
    );
};
