import{ useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';
import NavBar from './components/Navbar';

function App() {
  const [sideToggle, setSideToggle] = useState<boolean>(false);
  return (
      <Router>
        <div className="App">
          <NavBar onClick={() => setSideToggle(true)} userName=""/>
          <Routes>
            {/* <Route path="/" element={<HomeScreen />} />
            <Route path="/page/:pageNumber" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/favourites" element={<FavouritesScreen />} />
            <Route path="/game/:id" element={<GameScreen />} /> */}
          </Routes>
        </div>
      </Router>
  );
}

export default App;
