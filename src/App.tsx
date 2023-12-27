import { useState } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Toolbar from '@mui/material/Toolbar';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/Navbar/Navbar';
import './index.scss';
import ForgotPassword from './views/auth/ForgotPassword';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import HomeScreen from './views/home/Homescreen';
import GameScreen from './views/game/GameScreen';
import ListScreen from './views/list/listScreen';
import NotFound from './components/NotFound/NotFound';

function App() {
  const [sideToggle, setSideToggle] = useState<boolean>(false);
 
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="App d-flex flex-column">
        <Router>
          <NavBar onClick={() => setSideToggle(true)} userName="" />
          <Toolbar />
          <div className="d-flex flex-grow-1">
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />

              <Route path="/home" element={<HomeScreen />} />
              {/* <Route path="/page/:pageNumber" element={<HomeScreen />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              {/* <Route path="/profile" element={<ProfileScreen />} /> */}
              {/* <Route path="/favourites" element={<FavouritesScreen />} /> */}
              <Route path="/game/:gameId" element={<GameScreen />} />
              <Route path="/list/:listId" element={<ListScreen />} />
              <Route path = '/*' element={<NotFound/>} />
              {/* <Route path="/lists" element={<BasicModal />} /> */}
            </Routes>
          </div>
        </Router>
      </div>
      <ToastContainer />
    </GoogleOAuthProvider>
  );
}

export default App;
