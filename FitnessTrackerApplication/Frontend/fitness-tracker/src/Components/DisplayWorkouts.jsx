import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; 
import workoutPictures from './WorkoutPictures.jsx';
import Carousel from 'react-material-ui-carousel';

const DisplayWorkouts = ({userType}) => {
  const [workouts, setWorkouts] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editingWorkout, setEditingWorkout] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/workouts/all')
      .then(response => {
        setWorkouts(response.data);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
      });
  }, []);

  const toggleEditMode = (workoutId) => {
    setEditMode(editMode === workoutId ? null : workoutId);
    if (editMode === workoutId) {
      setEditingWorkout(null);
    } else {
      const workoutToEdit = workouts.find(workout => workout.id === workoutId);
      setEditingWorkout({ ...workoutToEdit });
    }
  };

  const saveWorkout = (workoutId) => {
    axios.put(`http://localhost:8080/workouts/update/${workoutId}`, editingWorkout)
      .then(response => {
        setWorkouts(workouts.map(workout => workout.id === workoutId ? editingWorkout : workout));
        setEditMode(null);
      })
      .catch(error => {
        console.error('Error saving workout:', error);
      });
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setEditingWorkout(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleExerciseInputChange = (e, exerciseId, field) => {
    const { value } = e.target;
    setEditingWorkout(prevState => ({
      ...prevState,
      exercises: prevState.exercises.map(exercise =>
        exercise.id === exerciseId ? { ...exercise, [field]: value } : exercise
      )
    }));
  };

  // Group workouts into sets of four
  const groupedWorkouts = workouts.reduce((result, workout, index) => {
    const groupIndex = Math.floor(index / 4);
    if (!result[groupIndex]) {
      result[groupIndex] = [];
    }
    result[groupIndex].push(workout);
    return result;
  }, []);

  return (
    <div className="workout-container">
      <Carousel
        indicators={true}
        navButtonsAlwaysVisible={true}
        autoPlay={false}
        animation="slide"
      >
        {groupedWorkouts.map((group, groupIndex) => (
          <div key={groupIndex} className="workout-group">
            {group.map(workout => (
              <div key={workout.id} className={`workout-card ${editMode === workout.id ? 'edit-mode' : ''}`}>
                <div>
                  {editMode === workout.id ? (
                    <div>
                      <div className="edit-field">
                        <label htmlFor="name">Name:</label>
                        <input id="name" name="name" value={editingWorkout.name} onChange={(e) => handleInputChange(e, 'name')} />
                      </div>
                      <h6>Exercises:</h6>
                      {editingWorkout.exercises.map(exercise => (
                        <div key={exercise.id} className="exercise-field">
                          <div className="edit-field">
                            <label htmlFor={`exercise-name-${exercise.id}`}>Name:</label>
                            <input id={`exercise-name-${exercise.id}`} name="name" value={exercise.name} onChange={(e) => handleExerciseInputChange(e, exercise.id, 'name')} />
                          </div>
                          <div className="edit-field">
                            <label htmlFor={`exercise-sets-${exercise.id}`}>Sets:</label>
                            <input id={`exercise-sets-${exercise.id}`} name="sets" value={exercise.sets} onChange={(e) => handleExerciseInputChange(e, exercise.id, 'sets')} />
                          </div>
                          <div className="edit-field">
                            <label htmlFor={`exercise-reps-${exercise.id}`}>Reps:</label>
                            <input id={`exercise-reps-${exercise.id}`} name="reps" value={exercise.reps} onChange={(e) => handleExerciseInputChange(e, exercise.id, 'reps')} />
                          </div>
                          <div className="edit-field">
                            <label htmlFor={`exercise-duration-${exercise.id}`}>Duration:</label>
                            <input id={`exercise-duration-${exercise.id}`} name="duration" value={exercise.duration} onChange={(e) => handleExerciseInputChange(e, exercise.id, 'duration')} />
                          </div>
                        </div>
                      ))}
                      <div>
                        <button onClick={() => saveWorkout(workout.id)}>Save</button>
                        <button onClick={() => toggleEditMode(workout.id)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="workout-picture">
                        {workoutPictures[workout.name] ? (
                          <img src={workoutPictures[workout.name]} alt={workout.name} />
                        ) : (
                          <img src={workoutPictures["Workout"]} alt={workout.name} />
                        )}
                      </div>
                      <h2>{workout.name}</h2>
                      <h6>Exercises:</h6>
                      {workout.exercises.map(exercise => (
                        <div key={exercise.id} className="exercise-field">
                          <ul className="exercise-list">
                            <li>
                              <strong><span>{exercise.name}</span><br /></strong>
                              <strong>Sets:</strong> <span>{exercise.sets} </span>
                              <strong>Reps:</strong> <span>{exercise.reps}</span><br />
                              <strong>Duration:</strong> <span>{exercise.duration} mins</span>
                            </li>
                          </ul>
                        </div>
                      ))}
                      {userType === 'trainer' && (
                      <button onClick={() => toggleEditMode(workout.id)}>Edit</button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default DisplayWorkouts;
