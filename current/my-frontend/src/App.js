import * as React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './FavoritesContext';
import Home from './Home';
import Profile from './Profile';
import Exhibitions from './Exhibitions';
import Museums from './Museusm2';
import Favorites from './Favorites';
import Layout from './Layout';
import SignIn from './SignIn';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// Initialize the MUI theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#B443FF',
    },
    background: {
      default: '#000000',
      paper: '#080808',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 600,
      transform: "scale(1, 3)",
      padding: ".6em 0",
    },
    body2: {
      fontSize: '1.05em',
    },
  },

});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <FavoritesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="museums" element={<Museums />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="exhibitions" element={<Exhibitions />} />
              <Route path="profile" element={<Profile />} />
              <Route path="signin" element={<SignIn />} />
            </Route>
          </Routes>
        </Router>
      </FavoritesProvider>

    </ThemeProvider>
  );
}
