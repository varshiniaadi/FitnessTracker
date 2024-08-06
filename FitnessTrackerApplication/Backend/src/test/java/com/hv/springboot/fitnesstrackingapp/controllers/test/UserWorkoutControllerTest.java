//package com.hv.springboot.fitnesstrackingapp.controllers.test;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import java.util.*;
//
//import com.hv.springboot.fitnesstrackingapp.controllers.UserWorkoutController;
//import com.hv.springboot.fitnesstrackingapp.entity.GroupStatus;
//import com.hv.springboot.fitnesstrackingapp.entity.UserEntity;
//import com.hv.springboot.fitnesstrackingapp.entity.UserRole;
//import com.hv.springboot.fitnesstrackingapp.entity.UserWorkoutEntity;
//import com.hv.springboot.fitnesstrackingapp.entity.WorkoutEntity;
//import com.hv.springboot.fitnesstrackingapp.repositories.UserRepository;
//import com.hv.springboot.fitnesstrackingapp.repositories.UserWorkoutRepository;
//import com.hv.springboot.fitnesstrackingapp.services.UserWorkoutService;
//import com.hv.springboot.fitnesstrackingapp.services.WorkoutService;
//
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.mockito.Mockito.doNothing;
//import static org.mockito.Mockito.verify;
//import static org.mockito.Mockito.when;
//
//@ExtendWith(MockitoExtension.class)
//public class UserWorkoutControllerTest {
//
//    @InjectMocks
//    private UserWorkoutController userWorkoutController;
//
//    @Mock
//    private UserWorkoutService userWorkoutService;
//    @Mock
//    private UserRepository userRepository;
//    @Mock
//    private WorkoutService workoutService;
//    @Mock
//    private UserWorkoutRepository userWorkoutRepository;
//
//    private UserEntity user;
//    private WorkoutEntity workout;
//    private UserWorkoutEntity userWorkout;
//
//    @BeforeEach
//    public void setUp() {
//        user = new UserEntity(1L, "Test User", "test@example.com", GroupStatus.ACCEPTED, "groupType", "password", "City", "State", "Country", UserRole.ROLE_USER);
//        workout = new WorkoutEntity(1L, "Test Workout", List.of());
//        userWorkout = new UserWorkoutEntity(1L, user, workout, "2022-01-01", null);
//    }
//
//    @Test
//    public void testAssignWorkoutToUser() {
//        when(workoutService.findById(1L)).thenReturn(Optional.of(workout));
//        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
//        when(userWorkoutRepository.findByUserAndWorkout(user, workout)).thenReturn(Optional.empty());
//
//        ResponseEntity<?> response = userWorkoutController.assignWorkoutToUser(1L, 1L);
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//    }
//
//    @Test
//    public void testGetUserWorkouts() {
//        when(userWorkoutService.getUserWorkouts(1L)).thenReturn(List.of(userWorkout));
//
//        ResponseEntity<List<UserWorkoutEntity>> response = userWorkoutController.getUserWorkouts(1L);
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertEquals(1, response.getBody().size());
//        assertEquals(userWorkout, response.getBody().get(0));
//    }
//
//    @Test
//    public void testMarkWorkoutAsDone() {
//        doNothing().when(userWorkoutService).markWorkoutAsDone(1L, 1L);
//
//        ResponseEntity<?> response = userWorkoutController.markWorkoutAsDone(1L, 1L);
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//    }
//
//    @Test
//    public void testGetUserWorkoutsByDate() {
//        when(userWorkoutService.getUserWorkoutsByDate(1L, "2022-01-01")).thenReturn(List.of(userWorkout));
//
//        ResponseEntity<List<UserWorkoutEntity>> response = userWorkoutController.getUserWorkoutsByDate(1L, "2022-01-01");
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertEquals(1, response.getBody().size());
//        assertEquals(userWorkout, response.getBody().get(0));
//    }
//
//    @Test
//    public void testGetAllCities() {
//        List<String> cities = List.of("City1", "City2");
//        when(userWorkoutService.getAllCities()).thenReturn(cities);
//
//        ResponseEntity<List<String>> response = userWorkoutController.getAllCities();
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertEquals(cities, response.getBody());
//    }
//
//    @Test
//    public void testGetAllStates() {
//        List<String> states = List.of("State1", "State2");
//        when(userWorkoutService.getAllStates()).thenReturn(states);
//
//        ResponseEntity<List<String>> response = userWorkoutController.getAllStates();
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertEquals(states, response.getBody());
//    }
//
//    @Test
//    public void testGetAllCountries() {
//        List<String> countries = List.of("Country1", "Country2");
//        when(userWorkoutService.getAllCountries()).thenReturn(countries);
//
//        ResponseEntity<List<String>> response = userWorkoutController.getAllCountries();
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertEquals(countries, response.getBody());
//    }
//
//    @Test
//    public void testGetUserWorkoutsByCity() {
//        when(userWorkoutService.getUserWorkoutsByCity("City")).thenReturn(List.of(userWorkout));
//
//        ResponseEntity<List<UserWorkoutEntity>> response = userWorkoutController.getUserWorkoutsByCity("City");
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertEquals(1, response.getBody().size());
//        assertEquals(userWorkout, response.getBody().get(0));
//    }
//
//    @Test
//    public void testGetUserWorkoutsByState() {
//        when(userWorkoutService.getUserWorkoutsByState("State")).thenReturn(List.of(userWorkout));
//
//        ResponseEntity<List<UserWorkoutEntity>> response = userWorkoutController.getUserWorkoutsByState("State");
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertEquals(1, response.getBody().size());
//        assertEquals(userWorkout, response.getBody().get(0));
//    }
//
//    @Test
//    public void testGetUserWorkoutsByCountry() {
//        when(userWorkoutService.getUserWorkoutsByCountry("Country")).thenReturn(List.of(userWorkout));
//
//        ResponseEntity<List<UserWorkoutEntity>> response = userWorkoutController.getUserWorkoutsByCountry("Country");
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertEquals(1, response.getBody().size());
//        assertEquals(userWorkout, response.getBody().get(0));
//    }
//
//    @Test
//    public void testGetUsersByGroupTypeAndStatus() {
//        List<UserEntity> users = List.of(user);
//        when(userRepository.findByGroupTypeAndGroupStatus("morning", GroupStatus.ACCEPTED)).thenReturn(users);
//
//        ResponseEntity<List<UserEntity>> response = userWorkoutController.getUsersByGroupTypeAndStatus("morning");
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertEquals(1, response.getBody().size());
//        assertEquals(user, response.getBody().get(0));
//    }
//}
package com.hv.springboot.fitnesstrackingapp.controllers.test;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.hv.springboot.fitnesstrackingapp.controllers.UserWorkoutController;
import com.hv.springboot.fitnesstrackingapp.entity.GroupStatus;
import com.hv.springboot.fitnesstrackingapp.entity.UserEntity;
import com.hv.springboot.fitnesstrackingapp.entity.UserRole;
import com.hv.springboot.fitnesstrackingapp.entity.UserWorkoutEntity;
import com.hv.springboot.fitnesstrackingapp.entity.WorkoutEntity;
import com.hv.springboot.fitnesstrackingapp.repositories.UserRepository;
import com.hv.springboot.fitnesstrackingapp.repositories.UserWorkoutRepository;
import com.hv.springboot.fitnesstrackingapp.services.UserWorkoutService;
import com.hv.springboot.fitnesstrackingapp.services.WorkoutService;

import java.text.ParseException;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.any;

@ExtendWith(MockitoExtension.class)
public class UserWorkoutControllerTest {

    @InjectMocks
    private UserWorkoutController userWorkoutController;

    @Mock
    private UserWorkoutService userWorkoutService;
    @Mock
    private UserRepository userRepository;
    @Mock
    private WorkoutService workoutService;
    @Mock
    private UserWorkoutRepository userWorkoutRepository;

    private UserEntity user;
    private WorkoutEntity workout;
    private UserWorkoutEntity userWorkout;

    @BeforeEach
    public void setUp() {
        user = new UserEntity(1L, "Test User", "test@example.com", GroupStatus.ACCEPTED, "groupType", "password", "City", "State", "Country", UserRole.ROLE_USER);
        workout = new WorkoutEntity(1L, "Test Workout", List.of());
        userWorkout = new UserWorkoutEntity(1L, user, workout, "2022-01-01", null);
    }

    @Test
    public void testAssignWorkoutToUser() {
        when(workoutService.findById(1L)).thenReturn(Optional.of(workout));
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userWorkoutRepository.findByUserAndWorkout(user, workout)).thenReturn(Optional.empty());

        ResponseEntity<?> response = userWorkoutController.assignWorkoutToUser(1L, 1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testAssignWorkoutToUser_WorkoutAlreadyAssigned() throws ParseException {
        when(workoutService.findById(1L)).thenReturn(Optional.of(workout));
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userWorkoutRepository.findByUserAndWorkout(user, workout)).thenReturn(Optional.of(userWorkout));
        
        ResponseEntity<?> response = userWorkoutController.assignWorkoutToUser(1L, 1L);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Workout already assigned and not yet completed.", response.getBody());
    }

    @Test
    public void testAssignWorkoutToUser_WorkoutNotFound() {
        when(workoutService.findById(1L)).thenReturn(Optional.empty());
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        ResponseEntity<?> response = userWorkoutController.assignWorkoutToUser(1L, 1L);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
    @Test
    public void testMarkWorkoutAsDone_WorkoutIdNull() {
        ResponseEntity<?> response = userWorkoutController.markWorkoutAsDone(1L, null);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Invalid user or workout ID.", response.getBody());
    }
    @Test
    public void testGetUserWorkoutsByDate_InvalidDateFormat() {
        ResponseEntity<List<UserWorkoutEntity>> response = userWorkoutController.getUserWorkoutsByDate(1L, "invalid-date");
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Invalid date format.", response.getBody());
    }
    @Test
    public void testMarkWorkoutAsDone_UserIdNull() {
        ResponseEntity<?> response = userWorkoutController.markWorkoutAsDone(null, 1L);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Invalid user or workout ID.", response.getBody());
    }
    @Test
    public void testGetUserWorkoutsByDate_NoWorkoutsFound() {
        when(userWorkoutService.getUserWorkoutsByDate(1L, "2022-01-01")).thenReturn(Collections.emptyList());

        ResponseEntity<List<UserWorkoutEntity>> response = userWorkoutController.getUserWorkoutsByDate(1L, "2022-01-01");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(0, response.getBody().size());
    }
    @Test
    public void testAssignWorkoutToUser_UserNotFound() {
        when(workoutService.findById(1L)).thenReturn(Optional.of(workout));
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<?> response = userWorkoutController.assignWorkoutToUser(1L, 1L);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void testGetUserWorkouts() {
        when(userWorkoutService.getUserWorkouts(1L)).thenReturn(List.of(userWorkout));

        ResponseEntity<List<UserWorkoutEntity>> response = userWorkoutController.getUserWorkouts(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
        assertEquals(userWorkout, response.getBody().get(0));
    }

    @Test
    public void testMarkWorkoutAsDone() {
        doNothing().when(userWorkoutService).markWorkoutAsDone(1L, 1L);

        ResponseEntity<?> response = userWorkoutController.markWorkoutAsDone(1L, 1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testMarkWorkoutAsDone_Exception() {
        doNothing().when(userWorkoutService).markWorkoutAsDone(1L, 1L);

        ResponseEntity<?> response = userWorkoutController.markWorkoutAsDone(1L, 1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testGetUserWorkoutsByDate() {
        when(userWorkoutService.getUserWorkoutsByDate(1L, "2022-01-01")).thenReturn(List.of(userWorkout));

        ResponseEntity<List<UserWorkoutEntity>> response = userWorkoutController.getUserWorkoutsByDate(1L, "2022-01-01");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
        assertEquals(userWorkout, response.getBody().get(0));
    }

    @Test
    public void testGetAllCities() {
        List<String> cities = List.of("City1", "City2");
        when(userWorkoutService.getAllCities()).thenReturn(cities);

        ResponseEntity<List<String>> response = userWorkoutController.getAllCities();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(cities, response.getBody());
    }

    @Test
    public void testGetAllStates() {
        List<String> states = List.of("State1", "State2");
        when(userWorkoutService.getAllStates()).thenReturn(states);

        ResponseEntity<List<String>> response = userWorkoutController.getAllStates();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(states, response.getBody());
    }

    @Test
    public void testGetAllCountries() {
        List<String> countries = List.of("Country1", "Country2");
        when(userWorkoutService.getAllCountries()).thenReturn(countries);

        ResponseEntity<List<String>> response = userWorkoutController.getAllCountries();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(countries, response.getBody());
    }

    @Test
    public void testGetUserWorkoutsByCity() {
        when(userWorkoutService.getUserWorkoutsByCity("City")).thenReturn(List.of(userWorkout));

        ResponseEntity<List<UserWorkoutEntity>> response = userWorkoutController.getUserWorkoutsByCity("City");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
        assertEquals(userWorkout, response.getBody().get(0));
    }

    @Test
    public void testGetUserWorkoutsByState() {
        when(userWorkoutService.getUserWorkoutsByState("State")).thenReturn(List.of(userWorkout));

        ResponseEntity<List<UserWorkoutEntity>> response = userWorkoutController.getUserWorkoutsByState("State");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
        assertEquals(userWorkout, response.getBody().get(0));
    }

    @Test
    public void testGetUserWorkoutsByCountry() {
        when(userWorkoutService.getUserWorkoutsByCountry("Country")).thenReturn(List.of(userWorkout));

        ResponseEntity<List<UserWorkoutEntity>> response = userWorkoutController.getUserWorkoutsByCountry("Country");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
        assertEquals(userWorkout, response.getBody().get(0));
    }

    @Test
    public void testGetUsersByGroupTypeAndStatus() {
        List<UserEntity> users = List.of(user);
        when(userRepository.findByGroupTypeAndGroupStatus("morning", GroupStatus.ACCEPTED)).thenReturn(users);

        ResponseEntity<List<UserEntity>> response = userWorkoutController.getUsersByGroupTypeAndStatus("morning");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
        assertEquals(user, response.getBody().get(0));
    }

    // Additional tests for edge cases and error handling

    @Test
    public void testGetUserWorkouts_NoWorkoutsFound() {
        when(userWorkoutService.getUserWorkouts(1L)).thenReturn(Collections.emptyList());

        ResponseEntity<List<UserWorkoutEntity>> response = userWorkoutController.getUserWorkouts(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(0, response.getBody().size());
    }

    @Test
    public void testAssignWorkoutToUser_InvalidUserId() {
        ResponseEntity<?> response = userWorkoutController.assignWorkoutToUser(null, 1L);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Invalid user or workout ID.", response.getBody());
    }

    @Test
    public void testAssignWorkoutToUser_InvalidWorkoutId() {
        ResponseEntity<?> response = userWorkoutController.assignWorkoutToUser(1L, null);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Invalid user or workout ID.", response.getBody());
    }
   

    @Test
    public void testMarkWorkoutAsDone_UserWorkoutNotFound() {
        doNothing().when(userWorkoutService).markWorkoutAsDone(1L, 1L);
        
        // Assuming service layer handles exceptions appropriately
        ResponseEntity<?> response = userWorkoutController.markWorkoutAsDone(1L, 1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testGetAllCities_NoCitiesFound() {
        when(userWorkoutService.getAllCities()).thenReturn(Collections.emptyList());

        ResponseEntity<List<String>> response = userWorkoutController.getAllCities();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(0, response.getBody().size());
    }

    @Test
    public void testGetAllStates_NoStatesFound() {
        when(userWorkoutService.getAllStates()).thenReturn(Collections.emptyList());

        ResponseEntity<List<String>> response = userWorkoutController.getAllStates();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(0, response.getBody().size());
    }

    @Test
    public void testGetAllCountries_NoCountriesFound() {
        when(userWorkoutService.getAllCountries()).thenReturn(Collections.emptyList());

        ResponseEntity<List<String>> response = userWorkoutController.getAllCountries();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(0, response.getBody().size());
    }

    @Test
    public void testGetUserWorkoutsByCity_NoWorkoutsFound() {
        when(userWorkoutService.getUserWorkoutsByCity("City")).thenReturn(Collections.emptyList());

        ResponseEntity<List<UserWorkoutEntity>> response = userWorkoutController.getUserWorkoutsByCity("City");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(0, response.getBody().size());
    }

    @Test
    public void testGetUserWorkoutsByState_NoWorkoutsFound() {
        when(userWorkoutService.getUserWorkoutsByState("State")).thenReturn(Collections.emptyList());

        ResponseEntity<List<UserWorkoutEntity>> response = userWorkoutController.getUserWorkoutsByState("State");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(0, response.getBody().size());
    }

    @Test
    public void testAssignWorkoutToUser_RuntimeException() {
        when(workoutService.findById(1L)).thenThrow(new RuntimeException("Mock runtime exception"));

        ResponseEntity<?> response = userWorkoutController.assignWorkoutToUser(1L, 1L);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }
    @Test
    public void testGetUserWorkoutsByCountry_NoWorkoutsFound() {
        when(userWorkoutService.getUserWorkoutsByCountry("Country")).thenReturn(Collections.emptyList());

        ResponseEntity<List<UserWorkoutEntity>> response = userWorkoutController.getUserWorkoutsByCountry("Country");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(0, response.getBody().size());
    }
    @Test
    public void testAssignWorkoutToUser_WorkoutIdNull() {
        ResponseEntity<?> response = userWorkoutController.assignWorkoutToUser(null, 1L);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Invalid user or workout ID.", response.getBody());
    }

    @Test
    public void testAssignWorkoutToUser_UserIdNull() {
        ResponseEntity<?> response = userWorkoutController.assignWorkoutToUser(1L, null);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Invalid user or workout ID.", response.getBody());
    }
}

