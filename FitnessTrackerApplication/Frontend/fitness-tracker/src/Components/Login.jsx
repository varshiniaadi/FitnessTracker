import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import AggregateData from './AggregateData';
import { Button, Card, CardContent, Typography, IconButton, Menu, MenuItem, ClickAwayListener, Box } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Login() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showAggregateData, setShowAggregateData] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showProfileCard, setShowProfileCard] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          setProfile({
            name: res.data.name,
            email: res.data.email
          });
          // Store access token in localStorage
          localStorage.setItem('accessToken', user.access_token);
          setShowAggregateData(true);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    setShowProfileCard(true);
    handleMenuClose();
  };

  const logOut = () => {
    googleLogout();
    setProfile(null);
    setUser(null);
    setShowAggregateData(false);
    setShowProfileCard(false);
    handleMenuClose();
  };

  const handleClickAway = () => {
    setShowProfileCard(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className="login-container">
            {profile ? (
              <>
              <Box sx={{ position: 'absolute', top: 0, right: 0, mt: 2, mr: 2 }}> 
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  color="inherit"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <AccountCircle fontSize="large" />
                  <Typography variant="body1" color="inherit" sx={{ ml: 1 }}>
                    Profile
                  </Typography>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                  <MenuItem onClick={logOut}>Logout</MenuItem>
                </Menu>
              </Box>
              </>
            ) : (
            <>
              <div className="abc">
              <Button onClick={login} variant="contained" color="primary" className='btn btn-light' style={{height:'55px'}}>
                Sign in with Google <FontAwesomeIcon icon={faGoogle} className="ml-2" />
              </Button>
              </div>
            </>

            )}

          <div className="flex items-center justify-center mt-4" style={{width:'1000px'}}>
            {showAggregateData && <AggregateData />}
          </div>

          {showProfileCard && profile && (
            <Card 
              sx={{ 
                position: 'absolute', 
                top: '80px', 
                right: '20px', 
                width: '200px', 
                zIndex: 1 
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div">
                  {profile.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {profile.email}
                </Typography>
              </CardContent>
            </Card>
          )}
          </div>
      </ClickAwayListener>
    </ThemeProvider>
  );
}

export default Login;

