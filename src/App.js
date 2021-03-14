import './App.css';
import Canvas from "./canvas/Canvas";

function App() {
  return (
    <div className="App">
      <h3>This is simple application to play with interactive nodes</h3>
      <div className="canvas-wrapper">
        <Canvas/>
      </div>
    </div>
  );
}

export default App;
