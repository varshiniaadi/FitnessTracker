import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper } from '@mui/material';

const TrainerProfile = ({ trainerId }) => {
    console.log(trainerId);
    
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/trainer/${trainerId}`)
      .then(response => {
        console.log(response.data)
       
        setTrainer(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the trainer data!', error);
      });
  }, [trainerId]);

  if (!trainer) {
    return <Typography>Loading...</Typography>;
  }

  return (
   
    <Paper elevation={10} sx={{ padding: 1 }}>
      <Typography variant="h6">Profile</Typography>
      <Box>
        <Typography><strong>username:</strong> {trainer.username}</Typography>
        <Typography><strong>email:</strong> {trainer.email}</Typography>
        <Typography><strong>city:</strong> {trainer.city}</Typography>
        <Typography><strong>state:</strong> {trainer.state}</Typography>
        <Typography><strong>country:</strong> {trainer.country}</Typography>
      </Box>
     </Paper>
  );
};

export default TrainerProfile;

