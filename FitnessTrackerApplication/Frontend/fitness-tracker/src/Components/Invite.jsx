import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, Typography, Checkbox, FormControlLabel, Radio, RadioGroup, Button, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Grid
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    padding: 16,
  },
  mainCard: {
    marginBottom: 16,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
  },
  formControlLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendButton: {
    marginTop: 16,
  },
  groupStatus: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  invited: {
    color: 'green',
  },
  notInvited: {
    color: 'gray',
  },
  accepted: {
    color: 'blue',
  },
  rejected: {
    color: 'red',
  },
  traineeCardContent: {
    padding: 8,
  },
});

const Invite = ({ trainerId }) => {
  const classes = useStyles();
  const [trainees, setTrainees] = useState([]);
  const [selectedTrainees, setSelectedTrainees] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const TrainerId = parseInt(trainerId, 10);
  console.log(TrainerId);

  useEffect(() => {
    fetchTrainees();
  }, []);

  const fetchTrainees = () => {
    fetch('http://localhost:8080/trainee/users')
      .then(response => response.json())
      .then(data => {
        const promises = data.map(trainee => {
          return fetchUserStatus(trainee.id).then(status => {
            return {
              ...trainee,
              groupStatus: status.groupStatus,
              groupType: status.groupType,
            };
          });
        });

        Promise.all(promises).then(traineesWithStatus => {
          setTrainees(traineesWithStatus);
        });
      })
      .catch(error => console.error('Error fetching trainees:', error));
  };

  const fetchUserStatus = (userId) => {
    return fetch(`http://localhost:8080/trainee/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        return {
          groupStatus: data.groupStatus,
          groupType: data.groupType || '',
        };
      })
      .catch(error => {
        console.error(`Error fetching user status for user ${userId}:`, error);
        return { groupStatus: 'not-invited', groupType: '' };
      });
  };

  const handleTraineeSelection = (traineeId) => {
    setSelectedTrainees(prevState =>
      prevState.includes(traineeId)
        ? prevState.filter(id => id !== traineeId)
        : [...prevState, traineeId]
    );
  };

  const handleGroupSelection = (event) => {
    setSelectedGroup(event.target.value);
  };

  const handleSendInvitation = () => {
    if (selectedTrainees.length === 0 || !selectedGroup) {
      alert('Please select at least one trainee and a group.');
      return;
    }
    setOpenDialog(true);
  };

  const confirmSendInvitation = () => {
    setOpenDialog(false);
    selectedTrainees.forEach(traineeId => {
      fetch(`http://localhost:8080/trainee/users/${traineeId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (!data) {
            throw new Error('Empty response received');
          }

          console.log('Fetched trainee data:', data);
          const currentGroupStatus = data.groupStatus;
          const currentGroupType = data.groupType;

          if (currentGroupStatus === 'INVITED' && currentGroupType === selectedGroup) {
            alert(`Trainee ${data.username} is already invited to the ${selectedGroup} group.`);
          } else {
            return fetch('http://localhost:8080/trainer/invite', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                trainerId: TrainerId,
                traineeId: traineeId,
                groupType: selectedGroup,
              }),
            });
          }
        })
        .then(data => {
          if (data && data.ok) {
            console.log('Invitation response:', data);
            alert('Invitation sent successfully');
            setSelectedTrainees([]);
            setSelectedGroup('');
            fetchTrainees(); 
          } else {
            throw new Error('Failed to send invitation');
          }
        })
        .catch(error => {
          console.error('Error sending invitation:', error);
          alert('Failed to send invitations');
        });
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Invite Trainees to Group
      </Typography>
      <Card style={{width:'500px',backgroundColor:'white'}} >
        <CardContent>
          <Grid container direction="column" spacing={0}>
            {trainees.map(trainee => (
              <Grid item xs={12} sm={6} md={4} key={trainee.id}>
                <CardContent className={classes.traineeCardContent} style={{backgroundColor:'white'}}>
                  {trainee.groupStatus === 'ACCEPTED' ? (
                    <Box display="flex" alignItems="center" >
                      <Typography style={{color:'black'}}>{trainee.username}</Typography>
                      <Typography 
                        className={`${classes.groupStatus} ${classes.accepted}`}
                      >
                        ({trainee.groupStatus})
                      </Typography>
                    </Box>
                  ) : (
                    <FormControlLabel
                      className={classes.formControlLabel}
                      control={
                        <Checkbox
                          checked={selectedTrainees.includes(trainee.id)}
                          onChange={() => handleTraineeSelection(trainee.id)}
                          name={trainee.username}
                          sx={{
                            color: selectedTrainees.indexOf(trainee.id) > -1 ? 'black' : 'black',
                            '&.Mui-checked': {
                              color: 'black',
                            },
                          }}
                        />
                      }
                      label={
                        <Box display="flex" alignItems="center">
                          <Typography style={{color:'black'}}>{trainee.username}</Typography>
                          <Typography 
                            className={`${classes.groupStatus} ${classes[trainee.groupStatus ? trainee.groupStatus.toLowerCase() : 'notInvited']}`}
                          >
                            ({trainee.groupStatus || 'not-invited'}{trainee.groupStatus === 'INVITED' && trainee.groupType ? ` to ${trainee.groupType} group` : ''})
                          </Typography>
                        </Box>
                      }
                    />
                  )}
                </CardContent>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          Select Group
        </Typography>
        <RadioGroup value={selectedGroup} onChange={handleGroupSelection}>
          <FormControlLabel value="morning" control={<Radio sx={{color:'black'}}/>} label="Morning Group" />
          <FormControlLabel value="evening" control={<Radio sx={{color:'black'}}/>} label="Evening Group" />
        </RadioGroup>
      </Box>
      <Button
        variant="contained"
        color="primary"
        className={classes.sendButton}
        onClick={handleSendInvitation}
      >
        Send Invitation
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Invitation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to send the invitation to the selected trainees?
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button onClick={confirmSendInvitation} color="secondary">
            Yes
          </Button>
          <Button onClick={handleCloseDialog} color="secondary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Invite;
