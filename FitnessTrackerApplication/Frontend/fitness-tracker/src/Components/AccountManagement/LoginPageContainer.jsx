
import React, { useState } from 'react';
import LoginPage from './LoginPage';

function RegistrationPageContainer() {
  const [userType, setUserType] = useState('trainer'); // Default userType is 'trainer'

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px'  }}>
        <div  style={{
            marginRight: '20px',
            cursor: 'pointer',
            padding: '10px 20px',
            borderBottom: userType === 'trainer' ? '3px solid #007BFF' : '3px solid transparent',
            fontWeight: userType === 'trainer' ? 'bold' : 'normal'
          }} onClick={() => setUserType('trainer')}>
          Trainers
        </div>
        <div style={{
            cursor: 'pointer',
            padding: '10px 20px',
            borderBottom: userType === 'trainee' ? '3px solid #007BFF' : '3px solid transparent',
            fontWeight: userType === 'trainee' ? 'bold' : 'normal'
          }}  onClick={() => setUserType('trainee')}>
          Trainees
        </div>
      </div>
      <div>
        {/* Show only the selected userType */}
        {userType === 'trainer' && <LoginPage userType="trainer" />}
        {userType === 'trainee' && <LoginPage userType="trainee" />}
      </div>
    </div>
  );
}

export default RegistrationPageContainer;
