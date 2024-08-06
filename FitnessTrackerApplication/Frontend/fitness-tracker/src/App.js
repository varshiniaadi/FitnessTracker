
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import AggregateData from './Components/AggregateData';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Workouts from './Components/Workouts';
import RegistrationPageContainer from './Components/AccountManagement/RegistrationPageContainer';
import LoginPageContainer from './Components/AccountManagement/LoginPageContainer';
import Profile from './Components/Profile';
import HomePage from './Components/HomePage';
import DisplayWorkouts from './Components/DisplayWorkouts';
import TrainerHomePage from './Components/TrainerHomePage';
import TraineeHomePage from './Components/TraineeHomePage';
// import Login from './Components/Login';
import DisplayTrainees from './Components/DisplayTrainees';
import UserWorkouts from './Components/UserWorkouts';
import Invite from './Components/Invite';



function App() {
  return (
    <Router>
    <Routes>
   <Route path="/googlesignin" element={<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}><Login /></GoogleOAuthProvider>} />
    <Route path="AggregateData" element={<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}><AggregateData /></GoogleOAuthProvider>} />
    <Route path="/register" element={<RegistrationPageContainer/>}/>
    <Route path="/login" element={<LoginPageContainer/>}/>
    <Route path="/workouts" element={<Workouts/>}/>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/profile/:userId" element={<Profile/>}/>
    <Route path="/userWorkouts/:userId"
          element={<UserWorkouts/>}/>
    <Route path="/displayworkouts" element={<DisplayWorkouts/>}/>
    <Route path="/trainerhome/:trainerId" element={<TrainerHomePage/>}/>
    <Route path="/displaytrainees" element={<DisplayTrainees/>}/>
    <Route path="/invite/:trainerId" element={<Invite/>}/>
    <Route path="/traineehome/:traineeId" element={<TraineeHomePage/>}/>
  </Routes>
  </Router>
  );
}

export default App;
