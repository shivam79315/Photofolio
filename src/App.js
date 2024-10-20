import "./App.css";
import Herosection from "./components/heroSection/Herosection";
import Nav from "./components/nav/Nav";
import { AlbumProvider } from "./context/Albumcontext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Albumlist from "./components/albumList/Albumlist";  
import Albumimage from "./components/albumImages/Albumimage"; 

function App() {
  return (
    <AlbumProvider>
      <Router>
        <div>
          <Nav />
          <Routes>
            <Route path="/" element={<Herosection />} />
            <Route path="/albums" element={<Albumlist />} /> 
            <Route path="/:albumName/images" element={<Albumimage />} />
          </Routes>
        </div>
      </Router>
    </AlbumProvider>
  );
}

export default App;
