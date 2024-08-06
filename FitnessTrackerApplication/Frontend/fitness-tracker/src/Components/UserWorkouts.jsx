
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Container,
//   Button,
//   Box,
//   TextField
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import dayjs from 'dayjs';
// const UserWorkouts = ({userId,userType}) => {
//   //const { userId } = useParams();
//   const [assignedWorkouts, setAssignedWorkouts] = useState([]);
//   const [completedWorkouts, setCompletedWorkouts] = useState([]);
//   const [filteredAssignedWorkouts, setFilteredAssignedWorkouts] = useState([]);
//   const [filteredCompletedWorkouts, setFilteredCompletedWorkouts] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [message, setMessage] = useState('');
//   const darkTheme = createTheme({
//     palette: {
//      mode: 'dark',
//       primary: {
//         main: '#333', // Dark color for the AppBar
//       },
//       background: {
//       default: '#121212', // Background color for the theme
//       paper: '#1d1d1d',   // Background color for AppBar and other components
//       },
//     },
//   });

//   useEffect(() => {
//     axios.get(`http://localhost:8080/userworkouts/user/${userId}`)
//       .then((response) => {
//         console.log('User workouts:', response.data);
//         const { assigned, completed } = categorizeWorkouts(response.data);
//         setAssignedWorkouts(assigned);
//         setCompletedWorkouts(completed);
//         setFilteredAssignedWorkouts(assigned);
//         setFilteredCompletedWorkouts(completed);
//       })
//       .catch((error) => {
//         console.error('Error fetching user workouts:', error);
//       });
//   }, [userId]);

//   const categorizeWorkouts = (workouts) => {
//     const assigned = workouts.filter(workout => !workout.completedDate);
//     const completed = workouts.filter(workout => workout.completedDate);
//     return { assigned, completed };
//   };

//   const handleWorkoutComplete = (workoutId) => {
//     axios.post(`http://localhost:8080/userworkouts/markAsDone/${userId}/${workoutId}`)
//       .then(response => {
//         setMessage('Workout completed successfully');
//         axios.get(`http://localhost:8080/userworkouts/user/${userId}`)
//           .then((response) => {
//             const { assigned, completed } = categorizeWorkouts(response.data);
//             setAssignedWorkouts(assigned);
//             setCompletedWorkouts(completed);
//             setFilteredAssignedWorkouts(assigned);
//             setFilteredCompletedWorkouts(completed);
//           })
//           .catch((error) => {
//             console.error('Error fetching user workouts:', error);
//           });
//       })
//       .catch(error => {
//         setMessage('Failed to complete workout');
//         console.error('Error:', error);
//       });
//   };

//   const renderExerciseDetails = (exercises) => {
//     return (
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Exercise Name</TableCell>
//             <TableCell>Sets</TableCell>
//             <TableCell>Reps</TableCell>
//             <TableCell>Duration (mins)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {exercises && exercises.map((exercise) => (
//             <TableRow key={exercise.id}>
//               <TableCell>{exercise.name}</TableCell>
//               <TableCell>{exercise.sets}</TableCell>
//               <TableCell>{exercise.reps}</TableCell>
//               <TableCell>{exercise.duration}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     );
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     if (date) {
//       const formattedDate = date.format('YYYY-MM-DD');
//       const filteredAssigned = assignedWorkouts.filter(workout => workout.assignedDate.startsWith(formattedDate));
//       const filteredCompleted = completedWorkouts.filter(workout => workout.completedDate.startsWith(formattedDate));
//       setFilteredAssignedWorkouts(filteredAssigned);
//       setFilteredCompletedWorkouts(filteredCompleted);
//     } else {
//       setFilteredAssignedWorkouts(assignedWorkouts);
//       setFilteredCompletedWorkouts(completedWorkouts);
//     }
//   };

//   return (
//     // <ThemeProvider theme={darkTheme}>
//     <Container maxWidth="xl" sx={{ mt: 4 }}>
      
//       <Typography variant="h4" mb={2}>
//         User Workouts
//       </Typography>

//       <LocalizationProvider dateAdapter={AdapterDayjs }>
//         <Box sx={{ mb: 4}} >
//           <DatePicker
//             label="Select Date"
//             value={selectedDate}
//             onChange={handleDateChange}
//             renderInput={(params) => <TextField {...params} helperText="DD/MM/YYYY" />
           
//           }
//           sx={{border:'solid',color:'black'}}
          
//           />
//         </Box> 
//       </LocalizationProvider >

//       {/* Assigned Workouts Table */}
//       <Box sx={{ mb: 4 }}>
//         <Paper>
//           <TableContainer>
//             <Table aria-label="assigned workouts table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Assigned Workouts(Not yet completed)</TableCell>
//                   <TableCell>Exercise Details</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredAssignedWorkouts.length > 0 ? (
//                   filteredAssignedWorkouts.map((assignment) => (
//                     <TableRow key={assignment.id}>
//                       <TableCell>{assignment.workout.name}</TableCell>
//                       <TableCell>
//                         {renderExerciseDetails(assignment.workout.exercises)}
//                       </TableCell>
//                       <TableCell>
//                         {/* <Button
//                           variant="contained"
//                           //color="primary"
//                           sx={{
//                             backgroundColor: 'lightgrey',
//                             color: 'black',
//                             '&:hover': {
//                               backgroundColor: 'white', // Change to ash color on hover
//                             },
//                           }}
//                           onClick={() => handleWorkoutComplete(assignment.workout.id)}
//                         >
//                           Complete
//                         </Button> */}
//                           {userType === 'trainee' ? (
//                           <Button
//                             variant="contained"
//                             sx={{
//                               backgroundColor: 'lightgrey',
//                               color: 'black',
//                               '&:hover': {
//                                 backgroundColor: 'white', // Change to ash color on hover
//                               },
//                             }}
//                             onClick={() => handleWorkoutComplete(assignment.workout.id)}
//                           >
//                             Complete
//                           </Button>
//                         ) : (
//                           <Typography variant="body2" color="textSecondary">
//                             Not completed
//                           </Typography>
//                         )}
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={3} align="center">No data available</TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       </Box>

//       {/* Completed Workouts Table */}
//       <Box sx={{ mb: 4 }}>
//         <Paper>
//           <TableContainer>
//             <Table aria-label="completed workouts table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Completed Workouts</TableCell>
//                   <TableCell>Exercise Details</TableCell>
//                   <TableCell>Assigned On</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredCompletedWorkouts.length > 0 ? (
//                   filteredCompletedWorkouts.map((workout) => (
//                     <TableRow key={workout.id}>
//                       <TableCell>{workout.workout.name}</TableCell>
//                       <TableCell>
//                         {renderExerciseDetails(workout.workout.exercises)}
//                       </TableCell>
//                       <TableCell>{dayjs(workout.assignedDate).format('DD-MM-YYYY')}</TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={3} align="center">No data available</TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       </Box>
//       {userType === 'trainee' && (
//       <div className="text-center mt-5">
//                 <p>Want to track your fitness goals?<Link to="/googlesignin">Click here</Link></p>
//             </div>)}
//     </Container>
//     // </ThemeProvider>
//   );
// };

// export default UserWorkouts;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Typography, Container, Button, TextField,IconButton,Snackbar ,Grid} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';

const UserWorkouts = ({ userId, userType,onBack }) => {
  const [assignedWorkouts, setAssignedWorkouts] = useState([]);
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  const [filteredAssignedWorkouts, setFilteredAssignedWorkouts] = useState([]);
  const [filteredCompletedWorkouts, setFilteredCompletedWorkouts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

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

  useEffect(() => {
    axios.get(`http://localhost:8080/userworkouts/user/${userId}`)
      .then((response) => {
        const { assigned, completed } = categorizeWorkouts(response.data);
        setAssignedWorkouts(assigned);
        setCompletedWorkouts(completed);
        setFilteredAssignedWorkouts(assigned);
        setFilteredCompletedWorkouts(completed);
      })
      .catch((error) => {
        console.error('Error fetching user workouts:', error);
      });
  }, [userId]);

  const categorizeWorkouts = (workouts) => {
    const assigned = workouts.filter(workout => !workout.completedDate);
    const completed = workouts.filter(workout => workout.completedDate);
    return { assigned, completed };
  };

  const handleWorkoutComplete = (workoutId) => {
    axios.post(`http://localhost:8080/userworkouts/markAsDone/${userId}/${workoutId}`)
      .then(response => {
        setSnackbarMessage('Workout completed successfully');
        setSnackbarOpen(true);

        axios.get(`http://localhost:8080/userworkouts/user/${userId}`)
          .then((response) => {
            const { assigned, completed } = categorizeWorkouts(response.data);
            setAssignedWorkouts(assigned);
            setCompletedWorkouts(completed);
            setFilteredAssignedWorkouts(assigned);
            setFilteredCompletedWorkouts(completed);
          })
          .catch((error) => {
            console.error('Error fetching user workouts:', error);
          });
      })
      .catch(error => {
        setSnackbarMessage('Failed to complete workout');
        setSnackbarOpen(true);
        console.error('Error:', error);
      });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = date.format('YYYY-MM-DD');
      const filteredAssigned = assignedWorkouts.filter(workout => workout.assignedDate.startsWith(formattedDate));
      const filteredCompleted = completedWorkouts.filter(workout => workout.completedDate.startsWith(formattedDate));
      setFilteredAssignedWorkouts(filteredAssigned);
      setFilteredCompletedWorkouts(filteredCompleted);
    } else {
      setFilteredAssignedWorkouts(assignedWorkouts);
      setFilteredCompletedWorkouts(completedWorkouts);
    }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="xl" sx={{ mt: 3 }}>
      {userType === 'trainer' && (<Button variant="contained" color="primary" onClick={onBack} sx={{ mb: 2 }}>
          Back to List
      </Button>)}
        <Typography variant="h6" >
        <strong>Trainee Workouts</strong>
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
    <Box sx={{ bgcolor: '#626566', p: 0, borderRadius: 1, width: '250px' }}>
      <DatePicker
        label="Select Date"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} helperText="DD/MM/YYYY" />}
      />
    </Box>
    {userType === 'trainee' && (
      <div className="text-center mt-5">
        <Typography variant="h6" sx={{ color: 'black', p: 1, borderRadius: 1 ,backgroundColor:'white'}}>
          Want to track your fitness goals? <Link to="/googlesignin" sx={{ color: 'black', textDecoration: 'underline' }}>Click here</Link>
        </Typography>
      </div>
    )}
  </Box>
</LocalizationProvider>

       <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
          <Typography variant="h6" mb={1} className="card-title text-dark">
            Assigned Workouts:
          </Typography>
            {filteredAssignedWorkouts.length > 0 ? (
              filteredAssignedWorkouts.map((assignment) => (
                <div className="col-md-10 mb-4" key={assignment.id}>
                  <div className="card bg-light">
                    <div className="card-body">
                      <Typography variant="h6" className="card-title text-dark">
                        {assignment.workout.name}
                      </Typography>
                      <ul className="list-group list-group-flush">
                        {assignment.workout.exercises.map((exercise) => (
                          <li className="list-group-item" key={exercise.id}>
                            <strong>{exercise.name}</strong> - Sets: {exercise.sets}, Reps: {exercise.reps}, Duration: {exercise.duration}
                          </li>
                        ))}
                      </ul>
                      {userType === 'trainee' ? (
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: 'lightgrey',
                            color: 'black',
                            '&:hover': {
                              backgroundColor: 'white',
                            },
                          }}
                          onClick={() => handleWorkoutComplete(assignment.workout.id)}
                        >
                          Complete Workout
                        </Button>
                      ) : (
                        <Typography variant="body2" color="black">
                          <br></br>
                          <b>NOT YET COMPLETED</b>
                        </Typography>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Typography variant="h5" align="center">
                No assigned workouts available
              </Typography>
            )}
          </Grid>
          <Grid item xs={6} sm={6}>
          <Typography variant="h6" mb={1} className="card-title text-dark">
            Completed Workouts:
          </Typography>
            {filteredCompletedWorkouts.length > 0 ? (
              filteredCompletedWorkouts.map((workout) => (
                <div className="col-md-10 mb-4" key={workout.id}>
                  <div className="card bg-light">
                    <div className="card-body">
                      <Typography variant="h6" className="card-title text-dark">
                        {workout.workout.name}
                      </Typography>
                      <ul className="list-group list-group-flush">
                        {workout.workout.exercises.map((exercise) => (
                          <li className="list-group-item" key={exercise.id}>
                            <strong>{exercise.name}</strong> - Sets: {exercise.sets}, Reps: {exercise.reps}, Duration: {exercise.duration}
                          </li>
                        ))}
                      </ul>
                      <Typography variant="body2" color="black" mt={2}>
                        Assigned On: {dayjs(workout.assignedDate).format('DD-MM-YYYY')}
                      </Typography>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Typography variant="h5" align="center">
                No completed workouts available
              </Typography>
            )}
          </Grid>
     
        </Grid>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Container> 
    </ThemeProvider>
  );
};

export default UserWorkouts;
