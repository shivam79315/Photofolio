import "./App.css";
import Herosection from "./components/heroSection/Herosection";
import Nav from "./components/nav/Nav";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Albumlist from "./components/albumList/Albumlist";  
import Albumimage from "./components/albumImages/Imageform"; 

function App() {
  return (
      <Router>
        <div>
          <Nav />
          <Routes>
            <Route path="/" element={<Herosection />} />
            <Route path="/albums" element={<Albumlist />} /> 
            <Route path="/:albumId" element={<Albumimage />} />
          </Routes>
        </div>
      </Router>

  );
}

export default App;
