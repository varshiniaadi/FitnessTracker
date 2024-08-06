import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Modal,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link, useParams, useNavigate } from 'react-router-dom';
import DisplayWorkouts from './DisplayWorkouts';
import UserWorkouts from './UserWorkouts';
import ContactUs from './ContactUs';
import trainerhome from '../images/trainerhome.png';
import Profile from './Profile';
import GroupInvitation from './GroupInvitation';

const pages = ['Display Workouts', 'Assigned Workouts','Invitation', 'Contact Us'];
const settings = ['Profile', 'Logout'];

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#333', 
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d', 
    },
  },
});

function TraineeHomePage() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [displayWorkoutsOpen, setDisplayWorkoutsOpen] = useState(false);
  const [assignedWorkoutsOpen, setAssignedWorkoutsOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [showInvite,setShowInvite]=useState(false);
  const { traineeId } = useParams();
  localStorage.setItem('trainee_id', traineeId);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDisplayWorkouts = () => {
    setDisplayWorkoutsOpen(true);
    handleCloseNavMenu();
    setAssignedWorkoutsOpen(false);
    setShowContact(false);
    setShowInvite(false);
  };

  const handleAssignedWorkouts = () => {
    setAssignedWorkoutsOpen(true);
    handleCloseNavMenu();
    setDisplayWorkoutsOpen(false);
    setShowContact(false);
    setShowInvite(false);
  };

  const handleContactUs = () => {
    setShowContact(true);
    handleCloseNavMenu();
    setDisplayWorkoutsOpen(false);
    setAssignedWorkoutsOpen(false);
    setShowInvite(false);
  };

  const handleProfileClick = () => {
    setProfileModalOpen(true);
    handleCloseUserMenu();
  };

  const handleCloseProfileModal = () => {
    setProfileModalOpen(false);
  };
  const handleInvitation=()=>{
    console.log(traineeId);
    setShowInvite(true);
    setAssignedWorkoutsOpen(false);
    handleCloseNavMenu();
    setDisplayWorkoutsOpen(false);
    setShowContact(false);
    
  }
 

  const handleLogout = () => {
    console.log("Logging out...");
    navigate('/');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <FitnessCenterIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to={`/traineehome/${traineeId}`}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              FITNESS TRACKER
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => {
                    if (page === 'Display Workouts') {
                      handleDisplayWorkouts();
                    } else if (page === 'Assigned Workouts') {
                      handleAssignedWorkouts();
                    } else if (page === 'Contact Us') {
                      handleContactUs();
                    }else if(page==='Invitation'){
                       handleInvitation();
                    }
                  }}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    if (page === 'Display Workouts') {
                      handleDisplayWorkouts();
                    } else if (page === 'Assigned Workouts') {
                      handleAssignedWorkouts();
                    } else if (page === 'Contact Us') {
                      handleContactUs();
                    }else if(page==='Invitation'){
                        handleInvitation();
                     }
                  }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircle sx={{ color: 'white', fontSize: 40 }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={()=>{
                    
                    switch (setting) {
                        case 'Profile':
                            handleProfileClick();
                            break;
                        case 'Logout':
                            handleLogout();
                            break;
                        default:
                            handleCloseUserMenu(); 
                            break;
                    }
                  }}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Conditionally render different components based on navigation */}
      {!displayWorkoutsOpen && !assignedWorkoutsOpen && !showContact && !showInvite &&(
        <img style={{ width: '100%', height: '88.5vh' }} src={trainerhome} alt="trainerhomepage" />
      )}
      {displayWorkoutsOpen && <DisplayWorkouts userType="trainee"/>}
      {assignedWorkoutsOpen && <UserWorkouts userId={traineeId} userType="trainee" />}
      {showContact && <ContactUs />}
      {showInvite && <GroupInvitation traineeId={traineeId}/> }
      <Modal
        open={profileModalOpen}  
        onClose={handleCloseProfileModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            left: '85%',
            transform: 'translate(-65%, -136%)',
            width: 400,
          }}
        >
          {<Profile traineeId={traineeId} /> }
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

export default TraineeHomePage;
