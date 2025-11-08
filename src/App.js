import "./App.css";
import Herosection from "./pages/HeroPage";
import Nav from "./components/nav/Nav";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Albumimage from "./components/albumImages/Imageform"; 

function App() {
  return (
      <Router>
        <div>
          <Nav />
          <Routes>
            <Route path="/" element={<Herosection />} />
            <Route path="/:albumId" element={<Albumimage />} />
          </Routes>
        </div>
      </Router>

  );
}

export default App;