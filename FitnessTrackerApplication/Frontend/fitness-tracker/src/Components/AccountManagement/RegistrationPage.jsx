
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography ,Container} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      maxWidth: '400px', // Adjust the maximum width of the form
      margin: 'auto', // Center the form horizontally
    },
  });
function RegistrationPage({ userType }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const classes = useStyles();



  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation checks
    if (!username || !email || !password || !confirmPassword || !city || !state || !country) {
      setError('All fields are mandatory.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and contain at least one special character, one digit, one lowercase letter, and one uppercase letter.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Email must contain "@gmail.com".');
      return;
    }

    if (username.includes(' ')|| /[^a-zA-Z0-9]/.test(username)) {
      setError('Username must not contain spaces and  special characters.');
      return;
    }

    // Prepare user data
    const userData = {
      username: username,
      email: email,
      password: password,
      city: city,
      state: state,
      country: country
    };

     // Send POST request based on the user type
     const apiUrl = userType === 'trainer' ? 'http://localhost:8080/trainer/createtrainer' : 'http://localhost:8080/trainee/createuser';

    // Send POST request to create user
    axios.post(apiUrl, userData)
      .then((response) => {
        console.log('User created successfully:', response.data);
        // Reset form after successful registration
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setCity('');
        setState('');
        setCountry('');
        setError('');
        
        <Link to="/login">Login here</Link>
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        setError('Failed to create user. Please try again.');
      });
  };

  // Function to validate password
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Function to validate email
  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email) && email.includes('@gmail.com');
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
         Registration for {userType === 'trainer' ? 'Trainer' : 'Trainee'}
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField label="Username" type="text" value={username} onChange={handleUsernameChange} required />
        <TextField label="Email" type="email" value={email} onChange={handleEmailChange} required />
        <TextField label="Password" type="password" value={password} onChange={handlePasswordChange} required />
        <TextField label="Confirm Password" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
        <TextField label="City" type="text" value={city} onChange={handleCityChange} required />
        <TextField label="State" type="text" value={state} onChange={handleStateChange} required />
        <TextField label="Country" type="text" value={country} onChange={handleCountryChange} required />
        {error && <Typography variant="body2" color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
        <Typography variant="body2">
          Already have an account? <Link to="/login">Login here</Link>.
        </Typography>
      </form>
    </Container>
  );
}

export default RegistrationPage;


