import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper, Typography, Button, Box } from '@mui/material';

const GroupInvitation = ({ traineeId }) => {
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

  const handleAccept = () => {
    if (user && user.groupType) {
      axios.post(`http://localhost:8080/trainer/invite/accept/${traineeId}/${user.groupType}`)
        .then(() => {
          console.log('Group invitation accepted');
          setUser({ ...user, groupStatus: 'ACCEPTED' });
        })
        .catch(error => {
          console.error('Error accepting group invitation:', error);
        });
    }
  };

  const handleReject = () => {
    axios.post(`http://localhost:8080/trainer/invite/reject/${traineeId}`)
      .then(() => {
        console.log('Group invitation rejected');
        setUser({ ...user, groupStatus: 'REJECTED' });
      })
      .catch(error => {
        console.error('Error rejecting group invitation:', error);
      });
  };

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Paper elevation={10} sx={{ padding: 2, marginTop: 2, maxWidth: 400 ,marginLeft:'525px',marginRight:'525px',marginTop:'200px',marginRight:'200px',height:'200px',width:'500px',alignItems:'center',justifyContent:'center',display:'flex',flexDirection:'column'}}>
      <Typography variant="h6">Group Invitation</Typography>
      <Box sx={{ marginTop: 2 }}>
        {user.groupStatus === 'ACCEPTED' && (
          <Typography>You have joined the {user.groupType} group.</Typography>
        )}
        {user.groupStatus === 'REJECTED' && (
          <Typography>You have rejected the {user.groupType} group.</Typography>
        )}
        {user.groupStatus === 'INVITED' && (
          <>
            <Typography>Do you want to join the {user.groupType} group?</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ marginRight: 1 }} 
              onClick={handleAccept}
            >
              Yes
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={handleReject}
            >
              No
            </Button>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default GroupInvitation;
