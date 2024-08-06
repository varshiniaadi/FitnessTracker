
import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
  Card,
  CardContent,
  Snackbar, IconButton 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const CustomSnackbar = styled(Snackbar)(({ theme }) => ({
  '& .MuiSnackbarContent-root': {
    backgroundColor: 'black',
    color: 'white',
  },
}));


const WorkoutSelector = ({ userId, onWorkoutsAssigned }) => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [isOpen, setIsOpen] = useState(false); 
  const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');


  useEffect(() => {
    fetch('http://localhost:8080/workouts/all')
      .then(response => response.json())
      .then(data => setWorkouts(data))
      .catch(error => console.error('Error fetching workouts:', error));
  }, []);

  const handleWorkoutChange = (event) => {
    setSelectedWorkouts(event.target.value);
  };
  const handleDone = () => {
    // Array to hold promises for each workout assignment
    const assignmentPromises = selectedWorkouts.map(workoutId =>
      fetch(`http://localhost:8080/userworkouts/assignworkout/${workoutId}/${userId}`, {
        method: 'POST',
      })
      .then(response => {
        console.log(response)
        if (!response.ok) {
          //throw new Error(`HTTP error! Status: ${response.status}`);
          //return response.json().then(err => { throw new Error(err.message || `HTTP error! Status: ${response.status}`); });
          return response.text().then(text => { throw new Error(text); });
        }
        return response.text();
      })
    );

    Promise.all(assignmentPromises)
      .then(data => {
        onWorkoutsAssigned(data);
        setSnackbarMessage('Workout assigned successfully!');
        setSnackbarOpen(true);
      })
      .catch(error => {
        console.error('Error assigning workout:', error);
        setSnackbarMessage(`Failed to assign workout: ${error.message}`);
        alert('Failed to assign workout');
        setSnackbarOpen(true);
      })
      .finally(() => {
        setIsOpen(false);
        setSelectedWorkouts([]);
      });
  };
 

  const handleCancel = () => {
    setSelectedWorkouts([]);
    setIsOpen(false); 
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id={`workout-select-label-${userId}`}>Select Workouts</InputLabel>
      <Select
        labelId={`workout-select-label-${userId}`}
        id={`workout-select-${userId}`}
        multiple
        value={selectedWorkouts}
        onChange={handleWorkoutChange}
        onOpen={handleOpen}
        onClose={handleClose}
        open={isOpen}
        renderValue={(selected) => selected.map(id => workouts.find(w => w.id === id)?.name).join(', ')}
      >
        {workouts.map((workout) => (
          <MenuItem key={workout.id} value={workout.id}>
            <Checkbox checked={selectedWorkouts.indexOf(workout.id) > -1} 
            sx={{
              color: selectedWorkouts.indexOf(workout.id) > -1 ? 'white' : 'default',
              '&.Mui-checked': {
                color: 'white',
              },
            }}
              />
            <ListItemText primary={workout.name} />
          </MenuItem>
        ))}
        <Card sx={{ mt: 1 }}>
          <CardContent>
            <Button variant="contained" color="primary" onClick={handleDone}>
              Done
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </CardContent>
        </Card>
      </Select>
      <CustomSnackbar
  open={snackbarOpen}
  autoHideDuration={6000}
  onClose={() => setSnackbarOpen(false)}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
  sx={{backgroundColor:'black'}}
  message={snackbarMessage}
  action={
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={() => setSnackbarOpen(false)}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  }
/>

    </FormControl>
  );
};

export default WorkoutSelector;


