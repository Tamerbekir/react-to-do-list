import { createRoot } from 'react-dom/client';
import ToDo from './Pages/List/List'

import "./index.css";

function App() {
  return (
    <div className="App">
      <h1>To Do List</h1>
      <div>
        <ToDo />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);

export default App
