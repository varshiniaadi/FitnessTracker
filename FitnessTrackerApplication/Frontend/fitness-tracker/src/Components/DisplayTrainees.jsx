
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  Checkbox,
  ListItemText,
  TablePagination
} from '@mui/material';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import WorkoutSelector from './WorkoutSelector'; 
import UserWorkouts from './UserWorkouts';

const DisplayTrainees = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filterCity, setFilterCity] = useState('');
  const [filterState, setFilterState] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUser,setShowUser]=useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null); 
  const [filterGroupType, setFilterGroupType] = useState('');
 const userType="trainer";

 const [page, setPage] = useState(0);
 const [rowsPerPage, setRowsPerPage] = useState(3);


  useEffect(() => {
    fetchUsers();
    fetchCities();
    fetchStates();
    fetchCountries();
  }, [filterGroupType]);

  useEffect(() => {
    filterUsers();
  }, [users, filterCity, filterState, filterCountry, searchTerm]);

  const fetchUsers = () => {
     let url = 'http://localhost:8080/trainee/users';
    if (filterGroupType) {
      url = `http://localhost:8080/userworkouts/byGroupTypeAndStatus/${filterGroupType}`;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  };

  const fetchCities = () => {
    fetch('http://localhost:8080/userworkouts/allCities')
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.error('Error fetching cities:', error));
  };

  const fetchStates = () => {
    fetch('http://localhost:8080/userworkouts/allStates')
      .then(response => response.json())
      .then(data => setStates(data))
      .catch(error => console.error('Error fetching states:', error));
  };

  const fetchCountries = () => {
    fetch('http://localhost:8080/userworkouts/allCountries')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCityChange = (event) => {
    setFilterCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setFilterState(event.target.value);
  };

  const handleCountryChange = (event) => {
    setFilterCountry(event.target.value);
  };
  const handleGroupTypeChange = (event) => {
    setFilterGroupType(event.target.value);
    fetchUsers(); 
  };

  const filterUsers = () => {
    let filtered = users.filter(user => {
      return Object.values(user).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    if (filterCity !== '') {
      filtered = filtered.filter(user => user.city.toLowerCase() === filterCity.toLowerCase());
    }

    if (filterState !== '') {
      filtered = filtered.filter(user => user.state.toLowerCase() === filterState.toLowerCase());
    }

    if (filterCountry !== '') {
      filtered = filtered.filter(user => user.country.toLowerCase() === filterCountry.toLowerCase());
    }
    if (filterGroupType !== '') {
      filtered = filtered.filter(user => user.groupType === filterGroupType);
    }
    setFilteredUsers(filtered);
  };
  const handleUserDetails = userId => {

        console.log(userId);
        setShowUser(true);
        setSelectedUserId(userId);
       
    };
    const handleBackToList = () => {
      setSelectedUserId(null);
    };
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      {selectedUserId ? (
        <UserWorkouts userId={selectedUserId} userType={userType} onBack={handleBackToList} />
      ) : (
        <>
<Typography variant="h4" mb={2}>
        Trainees
      </Typography>
      <Grid container spacing={4} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="search"
            label="Search Bar"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              style: { color: 'black', backgroundColor: 'white' },
              classes: {
                notchedOutline: 'blackOutline'
              }
            }}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'black' },
                '&:hover fieldset': { borderColor: 'black' },
                '&.Mui-focused fieldset': { borderColor: 'black' },
              }
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="filter-city-label">Filter by City</InputLabel>
            <Select
              labelId="filter-city-label"
              id="filter-city"
              value={filterCity}
              onChange={handleCityChange}
              label="Filter by City"
              sx={{ backgroundColor: 'black' }}
            >
              <MenuItem value="">
                None
              </MenuItem>
              {cities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="filter-state-label">Filter by State</InputLabel>
            <Select
              labelId="filter-state-label"
              id="filter-state"
              value={filterState}
              onChange={handleStateChange}
              label="Filter by State"
              sx={{ backgroundColor: 'black' }}
            >
              <MenuItem value="">
                None
              </MenuItem>
              {states.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="filter-country-label">Filter by Country</InputLabel>
            <Select
              labelId="filter-country-label"
              id="filter-country"
              value={filterCountry}
              onChange={handleCountryChange}
              label="Filter by Country"
              sx={{ backgroundColor: 'black' }}
            >
              <MenuItem value="">
                None
              </MenuItem>
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="filter-group-type-label">Filter by Group Type</InputLabel>
                <Select
                  labelId="filter-group-type-label"
                  id="filter-group-type"
                  value={filterGroupType}
                  onChange={handleGroupTypeChange}
                  label="Filter by Group Type"
                  sx={{ backgroundColor: 'black' }}
                >
                  <MenuItem value="">
                    None
                  </MenuItem>
                  <MenuItem value="morning">Morning</MenuItem>
                  <MenuItem value="evening">Evening</MenuItem>
                </Select>
              </FormControl>
            </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Assign Workouts</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {filteredUsers.map((user) => ( */}
            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.city}</TableCell>
                <TableCell>{user.state}</TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>
                  <WorkoutSelector
                    userId={user.id}
                     onWorkoutsAssigned={() => {
                      console.log("Workouts Assigned successfully");
                     }}
                  />
                </TableCell>
                <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleUserDetails(user.id)}
                     sx={{ backgroundColor: 'white' }}
                    >
                      TRACK PROGRESS <FontAwesomeIcon icon={faAnglesRight} />
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
              rowsPerPageOptions={[1, 2, 5]}
              component="div"
              count={filteredUsers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ backgroundColor: 'black', color: 'white' }}
            />
      </TableContainer>
      </>
      )}
    </Container>
  );
};

export default DisplayTrainees;
