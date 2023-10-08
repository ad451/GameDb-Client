import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Toolbar from '@mui/material/Toolbar';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/Navbar';
import './index.scss';
import ForgotPassword from './views/auth/ForgotPassword';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';

function App() {
  const [sideToggle, setSideToggle] = useState<boolean>(false);
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
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
    </GoogleOAuthProvider>
  );
}

export default App;
