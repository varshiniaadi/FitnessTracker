import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Paper, Typography, Box, Button } from '@mui/material';

function Profile() {
  const { traineeId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/trainee/users/${traineeId}`)
      .then((response) => {
        console.log('User information:', response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user information:', error);
      });
  }, [traineeId]);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Paper elevation={10} sx={{ padding: 2 }}>
      <Typography variant="h6">Profile</Typography>
      <Box>
        <Typography><strong>Username:</strong> {user.username}</Typography>
        <Typography><strong>Email:</strong> {user.email}</Typography>
        <Typography><strong>City:</strong> {user.city}</Typography>
        <Typography><strong>State:</strong> {user.state}</Typography>
        <Typography><strong>Country:</strong> {user.country}</Typography>
        {user.groupStatus === 'ACCEPTED' && (
          <Typography><strong>Group:</strong> {user.groupType}</Typography>
        )}
      </Box>
    </Paper>
  );
}

export default Profile;

