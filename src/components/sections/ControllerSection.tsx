export const ControllerSection = () => {
    return (
        <section className="controller">
            <div className="control-group">
                <h2>점의 좌표</h2>
                <div className="control-box">
                    <ol>
                        <li>1. left, top: 0 / 00</li>
                        <li>2. right, top: 100 / 100</li>
                        <li>3. right, bottom: 100 / 0</li>
                        <li>4. left, bottom: 0 / 0</li>
                    </ol>
                </div>
            </div>

            <div className="control-group">
                <h2>이동</h2>
                <div className="control-box">
                    <div className="input-grid">
                        <label>
                            <span>x:</span>
                            <input type="number" />
                        </label>
                        <label>
                            <span>y:</span>
                            <input type="number" />
                        </label>
                    </div>
                </div>
            </div>

            <div className="control-group">
                <h2>회전</h2>
                <div className="control-box">
                    <label>
                        <span>각도:</span>
                        <input type="number" />
                    </label>
                </div>
            </div>

            <div className="control-group">
                <h2>원점 변경</h2>
                <div className="control-box">
                    <div className="input-grid">
                        <label>
                            <span>x:</span>
                            <input type="number" />
                        </label>
                        <label>
                            <span>y:</span>
                            <input type="number" />
                        </label>
                    </div>
                </div>
            </div>
        </section>
    );
};
