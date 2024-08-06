package com.hv.springboot.fitnesstrackingapp.services.impl.test;



import com.hv.springboot.fitnesstrackingapp.entity.*;
import com.hv.springboot.fitnesstrackingapp.repositories.UserWorkoutRepository;
import com.hv.springboot.fitnesstrackingapp.services.impl.UserWorkoutServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.text.SimpleDateFormat;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserWorkoutServiceImplTest {

    @Mock
    private UserWorkoutRepository userWorkoutRepository;

    @InjectMocks
    private UserWorkoutServiceImpl userWorkoutService;

    private UserWorkoutEntity userWorkout;
    private UserEntity user;
    private WorkoutEntity workout;

    @BeforeEach
    void setUp() {
        user = new UserEntity();
        user.setId(1L);
        user.setUsername("testuser");
        user.setEmail("test@example.com");

        workout = new WorkoutEntity();
        workout.setId(1L);
        workout.setName("Workout 1");

        userWorkout = new UserWorkoutEntity();
        userWorkout.setId(1L);
        userWorkout.setUser(user);
        userWorkout.setWorkout(workout);
        userWorkout.setAssignedDate("2024-07-15");
    }

    @Test
    void testMarkWorkoutAsDone() {
        when(userWorkoutRepository.findByUserIdAndWorkoutId(1L, 1L)).thenReturn(Optional.of(userWorkout));

        userWorkoutService.markWorkoutAsDone(1L, 1L);

        verify(userWorkoutRepository, times(1)).save(userWorkout);
        assertNotNull(userWorkout.getCompletedDate());
    }

    @Test
    void testGetUserWorkouts() {
        List<UserWorkoutEntity> workouts = Collections.singletonList(userWorkout);
        when(userWorkoutRepository.findByUserId(1L)).thenReturn(workouts);

        List<UserWorkoutEntity> result = userWorkoutService.getUserWorkouts(1L);

        assertEquals(1, result.size());
        assertEquals("Workout 1", result.get(0).getWorkout().getName());
    }

    @Test
    void testGetUserWorkoutsByDate() {
        List<UserWorkoutEntity> workouts = Collections.singletonList(userWorkout);
        when(userWorkoutRepository.findByUserIdAndAssignedDate(1L, "2024-07-15")).thenReturn(workouts);

        List<UserWorkoutEntity> result = userWorkoutService.getUserWorkoutsByDate(1L, "2024-07-15");

        assertEquals(1, result.size());
        assertEquals("2024-07-15", result.get(0).getAssignedDate());
    }

    @Test
    void testGetUserWorkoutsByCity() {
        List<UserWorkoutEntity> workouts = Collections.singletonList(userWorkout);
        when(userWorkoutRepository.findByUserCity("City")).thenReturn(workouts);

        List<UserWorkoutEntity> result = userWorkoutService.getUserWorkoutsByCity("City");

        assertEquals(1, result.size());
        assertEquals("City", result.get(0).getUser().getCity());
    }

    @Test
    void testGetUserWorkoutsByState() {
        List<UserWorkoutEntity> workouts = Collections.singletonList(userWorkout);
        when(userWorkoutRepository.findByUserState("State")).thenReturn(workouts);

        List<UserWorkoutEntity> result = userWorkoutService.getUserWorkoutsByState("State");

        assertEquals(1, result.size());
        assertEquals("State", result.get(0).getUser().getState());
    }

    @Test
    void testGetUserWorkoutsByCountry() {
        List<UserWorkoutEntity> workouts = Collections.singletonList(userWorkout);
        when(userWorkoutRepository.findByUserCountry("Country")).thenReturn(workouts);

        List<UserWorkoutEntity> result = userWorkoutService.getUserWorkoutsByCountry("Country");

        assertEquals(1, result.size());
        assertEquals("Country", result.get(0).getUser().getCountry());
    }

    @Test
    void testGetAllCities() {
        List<String> cities = Arrays.asList("City1", "City2");
        when(userWorkoutRepository.findAllCities()).thenReturn(cities);

        List<String> result = userWorkoutService.getAllCities();

        assertEquals(2, result.size());
        assertTrue(result.contains("City1"));
        assertTrue(result.contains("City2"));
    }

    @Test
    void testGetAllStates() {
        List<String> states = Arrays.asList("State1", "State2");
        when(userWorkoutRepository.findAllStates()).thenReturn(states);

        List<String> result = userWorkoutService.getAllStates();

        assertEquals(2, result.size());
        assertTrue(result.contains("State1"));
        assertTrue(result.contains("State2"));
    }

    @Test
    void testGetAllCountries() {
        List<String> countries = Arrays.asList("Country1", "Country2");
        when(userWorkoutRepository.findAllCountries()).thenReturn(countries);

        List<String> result = userWorkoutService.getAllCountries();

        assertEquals(2, result.size());
        assertTrue(result.contains("Country1"));
        assertTrue(result.contains("Country2"));
    }
}
