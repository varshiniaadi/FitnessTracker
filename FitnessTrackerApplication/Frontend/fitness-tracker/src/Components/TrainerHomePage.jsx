import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Workouts from './Workouts'; 
import DisplayWorkouts from './DisplayWorkouts';
import DisplayTrainees from './DisplayTrainees'; 
import trainerhome from '../images/trainerhome.png';
import {React,useState} from 'react';
import Modal from '@mui/material/Modal';
import TrainerProfile from './TrainerProfile';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Invite from './Invite.jsx';
import ContactUs from './ContactUs.jsx';

const pages = ['Create Workout', 'Display Workouts', 'Display Trainees','Send an Invite','Contact Us'];
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

function TrainerHomePage() {
    const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [createWorkoutModalOpen, setCreateWorkoutModalOpen] = useState(false); 
  const [displayWorkoutsOpen, setDisplayWorkoutsOpen] = useState(false); 
  const [displayTraineesOpen, setDisplayTraineesOpen] = useState(false); 
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showInvite, setShowInvite] = useState(false); 
  const { trainerId } = useParams();
  localStorage.setItem('trainer_id', trainerId);
  console.log(trainerId);
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
  const handleContactUs=()=>{
    setShowContact(true);
    handleCloseNavMenu(); 
    setCreateWorkoutModalOpen(false);
    setDisplayTraineesOpen(false);
    setDisplayWorkoutsOpen(false); 
    setShowInvite(false); 
  }
  const handleToggleWorkouts = () => {
    setCreateWorkoutModalOpen((prev) => !prev); 
    handleCloseNavMenu(); 
    setDisplayWorkoutsOpen(false); 
    setDisplayTraineesOpen(false);
    setShowContact(false);
    setShowInvite(false); 
  };

  const handleDisplayWorkouts = () => {
    setDisplayWorkoutsOpen(true); 
    handleCloseNavMenu(); 
    setCreateWorkoutModalOpen(false);
    setDisplayTraineesOpen(false);
    setShowContact(false);
    setShowInvite(false); 
  };

  const handleDisplayTrainees = () => {
    setDisplayTraineesOpen(true); 
    handleCloseNavMenu(); 
    setCreateWorkoutModalOpen(false); 
    setDisplayWorkoutsOpen(false);
    setShowContact(false);
    setShowInvite(false); 
  };
  const handleProfileClick = () => {
    setProfileModalOpen(true);
    handleCloseUserMenu();
  };

  const handleCloseProfileModal = () => {
    setProfileModalOpen(false);
  };
  const handleLogout = () => {
    console.log("logging out...")
    navigate('/');
};
const handleShowInvite = () => {
  setShowInvite(true); 
  handleCloseNavMenu();
  setCreateWorkoutModalOpen(false);
  setDisplayTraineesOpen(false);
  setDisplayWorkoutsOpen(false);
  setShowContact(false);
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
              to="/trainerhome/trainerId"
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
                aria-label="account of current user"
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
                    if (page === 'Create Workout') {
                      handleToggleWorkouts();
                    } else if (page === 'Display Workouts') {
                      handleDisplayWorkouts();
                    } else if (page === 'Display Trainees') {
                      handleDisplayTrainees();
                    } else if(page==='Contact Us'){
                      handleContactUs();
                    }
                    else {
                      handleCloseNavMenu();
                    }
                  }}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <FitnessCenterIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              FITNESS TRACKER
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    if (page === 'Create Workout') {
                      handleToggleWorkouts();
                    } else if (page === 'Display Workouts') {
                      handleDisplayWorkouts();
                    } else if (page === 'Display Trainees') {
                      handleDisplayTrainees();
                    } else if (page === 'Send an Invite') {
                        console.log("trainer",trainerId);
                        handleShowInvite(); 
                      } else if(page==='Contact Us'){
                        handleContactUs();
                      }
                    else {
                      handleCloseNavMenu();
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
      {/* Conditionally render the image */}
      {!displayWorkoutsOpen && !displayTraineesOpen && !showContact && !showInvite &&(
        <img style={{ width: '100%', height: '88.5vh' }} src={trainerhome} alt="trainerhomepage" />
      )}
      <Workouts open={createWorkoutModalOpen} onClose={handleToggleWorkouts} />
      {displayWorkoutsOpen && <DisplayWorkouts userType="trainer"/>}
      {showInvite && <Invite trainerId={trainerId} />}
      {displayTraineesOpen && <DisplayTrainees />}
      {showContact && <ContactUs />}
     
       <Modal
        open={profileModalOpen}
        onClose={handleCloseProfileModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box
          sx={{
            position: 'absolute',
           bottom: '25%',
            left: '85%',
            transform: 'translate(-65%, -136%)',
            width: 400,
            border: '2px soild #000',
          }} 
        >
          <TrainerProfile trainerId={trainerId} />
        </Box> 
      </Modal> 
    </ThemeProvider>
  );
}

export default TrainerHomePage;
