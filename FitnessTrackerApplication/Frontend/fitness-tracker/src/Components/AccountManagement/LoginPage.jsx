import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link,useNavigate ,Redirect} from 'react-router-dom';


const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '400px', // Adjust the maximum width of the form
    margin: 'auto', // Center the form horizontally
  },
});

function LoginPage({userType}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const classes = useStyles();
  const [userId, setUserId] = useState(null); 
  const [trainer_id,setTrainerId]=useState(null);
  const [redirectToWorkouts, setRedirectToWorkouts] = useState(false); 
  const [redirectTotrainerHome,setRedirectTotrainerHome]=useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginData = {
      email: email,
      password: password
    };
     // Send POST request based on the user type
     const apiUrl = userType === 'trainer' ? 'http://localhost:8080/trainer/logintrainer' : 'http://localhost:8080/trainee/loginuser';

    axios.post(apiUrl, loginData)
      .then((response) => {
        console.log('Login successful:', response.data);
        setEmail('');
        setPassword('');
        if(userType=='trainee')
        {
          console.log(userType);
          console.log(response.data.id);
          const traineeId=response.data.id;
           setUserId(response.data.id); 
           setRedirectToWorkouts(true);
          navigate(`/traineehome/${traineeId}`);
        }
        if(userType=='trainer')
          {
            console.log(userType);
            console.log(response.data.id);
            const trainerId=response.data.id;
             setTrainerId(response.data.id); 
             setRedirectTotrainerHome(true);
             navigate(`/trainerhome/${trainerId}`);
          }
          
      })
      .catch((error) => {
        console.error('Login failed:', error);
        setError('Invalid email or password. Please try again.');
      });
  };

  return (
    <Container>
       {redirectToWorkouts && <Link to={`/assignedUserWorkouts/${userId}`} />}  
       {redirectTotrainerHome && <Link to={`/trainerhome/${trainer_id}`}/>}
      <Typography variant="h4" align="center" gutterBottom>
        Login for {userType === 'trainer' ? 'Trainer' : 'Trainee'}
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField label="Email" type="email" value={email} onChange={handleEmailChange} required />
        <TextField label="Password" type="password" value={password} onChange={handlePasswordChange} required />
        {error && <Typography variant="body2" color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        <Typography variant="body2">
          Don't have an account? <Link to="/register">Register here</Link>.
        </Typography>
      </form>
    </Container>
  );
}

export default LoginPage;
