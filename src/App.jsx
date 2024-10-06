import { createRoot } from 'react-dom/client';
import ToDo from './Pages/List/List'
import DateDisplay from './Components/Date/Date'
import ComingSoon from './Pages/ComingSoon/ComingSoon'
import SiteNotes from './Components/SiteNotes/SiteNotes'
import Footer from './Components/Footer/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CompletedList from './Pages/CompletedList/CompletedList';

import "./index.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>To Do List</h1>
          <DateDisplay />
        </header>
        <Routes>
          <Route path="/" element={<ToDo />} />
          <Route path="completed" Component={CompletedList} />
        </Routes>
        <div >
          <SiteNotes />
          <ComingSoon />
        </div>
        <Footer />
      </div>
    </Router>
  );
}



const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);

export default App
