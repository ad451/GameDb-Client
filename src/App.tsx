import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar';
import Login from './views/auth/Login';
import './index.scss';
import Signup from './views/auth/Signup';
import ForgotPassword from './views/auth/ForgotPassword';

function App() {
  const [sideToggle, setSideToggle] = useState<boolean>(false);
  return (
    <div className="App d-flex flex-column">
      <NavBar onClick={() => setSideToggle(true)} userName="" />
      <Toolbar />
      <div className="d-flex flex-grow-1">
        <Router>
          <Routes>
            {/* <Route path="/" element={<HomeScreen />} /> */}
            {/* <Route path="/page/:pageNumber" element={<HomeScreen />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* <Route path="/profile" element={<ProfileScreen />} /> */}
            {/* <Route path="/favourites" element={<FavouritesScreen />} /> */}
            {/* <Route path="/game/:id" element={<GameScreen />} /> */}
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
