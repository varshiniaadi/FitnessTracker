import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Snackbar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  modalCard: {
    maxWidth: 600,
    width: '100%',
    padding: '16px',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

function Workouts({ open, onClose }) {
  const classes = useStyles();
  const [workoutName, setWorkoutName] = useState('');
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [duration, setDuration] = useState('');
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleWorkoutNameChange = (event) => {
    setWorkoutName(event.target.value);
  };

  const handleExerciseNameChange = (event) => {
    setExerciseName(event.target.value);
  };

  const handleSetsChange = (event) => {
    setSets(event.target.value);
  };

  const handleRepsChange = (event) => {
    setReps(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleAddExercise = () => {
    if (!exerciseName || !sets || !reps) {
      setError('Please enter all mandatory fields');
      return;
    }
    setError('');
    const newExercise = { name: exerciseName, sets: sets, reps: reps, duration: duration };
    setExercises([...exercises, newExercise]);
    setExerciseName('');
    setSets('');
    setReps('');
    setDuration('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!workoutName || exercises.length === 0) {
      setError('Please enter workout name and add exercises');
      return;
    }
    setError('');
    const workoutData = {
      name: workoutName,
      exercises: exercises,
    };
    axios
      .post('http://localhost:8080/workouts/createworkout', workoutData)
      .then((response) => {
        console.log('Workout created successfully:', response.data);
        setSuccessMessage('Workout created successfully');
        setSnackbarMessage('Workout saved successfully');
        setSnackbarOpen(true);
        setExercises([]);
        setWorkoutName('');
        onClose(); 
      })
      .catch((error) => {
        console.error('Error creating workout:', error);
        setError('Failed to create workout. Please try again.');
      });
  };

  return (
    <>
      <Dialog open={open} fullWidth maxWidth="sm">
        <DialogTitle>
          <div className={classes.titleContainer}>
            <Typography variant="h6">Create Workout</Typography>
            <IconButton className={classes.closeButton} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Workout Name"
                  value={workoutName}
                  onChange={handleWorkoutNameChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Exercise Name"
                  value={exerciseName}
                  onChange={handleExerciseNameChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Sets"
                  value={sets}
                  onChange={handleSetsChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Reps"
                  value={reps}
                  onChange={handleRepsChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Duration (minutes)"
                  value={duration}
                  onChange={handleDurationChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleAddExercise}>
                  Add Exercise
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Added Exercises:</Typography>
                <List>
                  {exercises.map((exercise, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`${exercise.name} - Sets: ${exercise.sets}, Reps: ${exercise.reps}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
            {error && <Typography color="error">{error}</Typography>}
            {successMessage && <Typography color="primary">{successMessage}</Typography>}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
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
    </>
  );
}

export default Workouts;
