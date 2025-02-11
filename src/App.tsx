import "./App.css";
import { DrawingSection } from "./components/sections/DrawingSection";
import { ControllerSection } from "./components/sections/ControllerSection";

function App() {
    return (
        <main className="app">
            <div className="container">
                <div className="layout">
                    <DrawingSection />
                    <ControllerSection />
                </div>
            </div>
        </main>
    );
}

export default App;
