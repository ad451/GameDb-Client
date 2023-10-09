import { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { UserState } from '../redux/reducer/userReducer';
import { AppState } from '../redux/store';
import './css/Navbar.css';

interface NavBarProps {
  userName: string;
  onClick: () => void;
}

const NavBar: FunctionComponent<NavBarProps> = () => {
  const userState = useSelector((state: AppState) => state.userState);
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const navItems = ['home', 'lists'];
  const drawerWidth = 240;
  const container =
    window !== undefined ? () => window.document.body : undefined;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography
        variant="h6"
        className="content-drawer"
        sx={{ my: 2, fontWeight: 'bold' }}
      >
        <h2>gameDB</h2>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        {userState.isLoggedIn ? (
          <ListItem key={'profile'} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={userState.user.name.split(' ')[0]} />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem key={'login'} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={'Login'} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar component="nav" sx={{ backgroundColor: '#FF1818' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {/* Apply retro animation to the Typography component */}
          <Typography
            className="content"
            variant="h5"
            sx={{
              flexGrow: 1,
              display: {
                xs: 'none',
                sm: 'block',
                textAlign: 'start',
                fontFamily: 'Montserrat',
                fontWeight: 'bold',
                color: 'black',
                lineHeight: 'center',
                height: '100%'
              }
            }}
          >
            <h2>GameDb</h2>
            <h2>GameDb</h2>
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: 'white', fontWeight: 'bold' }}
                onClick={() => navigate(`/${item}`)}
              >
                {item}
              </Button>
            ))}
            {userState.isLoggedIn ? (
              <Button
                key={'profile'}
                sx={{ color: 'white', fontWeight: 'bold' }}
              >
                {userState.user.name.split(' ')[0]}
              </Button>
            ) : (
              <Button
                key={'login'}
                sx={{ color: 'white', fontWeight: 'bold' }}
                onClick={() => navigate(`/login`)}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

export default NavBar;
