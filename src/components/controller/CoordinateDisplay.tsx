import { useAtomValue } from "jotai";
import { cornersAtom } from "../../atoms/square";
import { getCornerPosition } from "../../helpers/position";

export const CoordinateDisplay = () => {
    const corners = useAtomValue(cornersAtom);

    return (
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
    );
};
