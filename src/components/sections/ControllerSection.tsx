import { CoordinateDisplay } from "../controller/CoordinateDisplay";
import { MoveControl } from "../controller/MoveControl";
import { RotateControl } from "../controller/RotateControl";
import { OriginControl } from "../controller/OriginControl";
import { HistoryControl } from "../controller/HistoryControl";
import { ResetControl } from "../controller/ResetControl";

export const ControllerSection = () => {
    return (
        <section className="controller">
            <CoordinateDisplay />
            <div>
                <MoveControl />
                <RotateControl />
                <OriginControl />
            </div>
            <HistoryControl />
            <ResetControl />
        </section>
    );
};
