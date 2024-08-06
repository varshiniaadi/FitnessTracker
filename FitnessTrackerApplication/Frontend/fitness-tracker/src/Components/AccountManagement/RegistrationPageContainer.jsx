
import React, { useState } from 'react';
import RegistrationPage from './RegistrationPage';

function RegistrationPageContainer() {
  const [userType, setUserType] = useState('trainer'); // Default userType is 'trainer'

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
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
        {userType === 'trainer' && <RegistrationPage userType="trainer" />}
        {userType === 'trainee' && <RegistrationPage userType="trainee" />}
      </div>
    </div>
  );
}

export default RegistrationPageContainer;
