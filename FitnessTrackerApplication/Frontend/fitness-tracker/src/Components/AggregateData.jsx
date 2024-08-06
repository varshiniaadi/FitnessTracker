import React, { useEffect, useState } from 'react';
import axios from 'axios';
import activityTypes from './ActivityTypes'; 
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 

function AggregateData() {
  const [formattedData, setFormattedData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dataAvailable, setDataAvailable] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        const currentDate = new Date();
        const startTime = new Date(currentDate);
        startTime.setDate(currentDate.getDate() - 7);
        startTime.setHours(0, 0, 0, 0);
        const startTimeInMillis = startTime.getTime();
        const endTime = new Date(currentDate);
        endTime.setHours(23, 59, 59, 999);
        const endTimeInMillis = endTime.getTime();

        const requestBody = {
          aggregateBy: [
            { dataTypeName: 'com.google.step_count.delta' },
            { dataTypeName: 'com.google.blood_glucose' },
            { dataTypeName: 'com.google.blood_pressure' },
            { dataTypeName: 'com.google.heart_rate.bpm' },
            { dataTypeName: 'com.google.weight' },
            { dataTypeName: 'com.google.height' },
            { dataTypeName: 'com.google.sleep.segment' },
            { dataTypeName: 'com.google.body.fat.percentage' },
            { dataTypeName: 'com.google.menstruation' },
            { dataTypeName: 'com.google.speed' },
            { dataTypeName: 'com.google.distance.delta' },
            { dataTypeName: 'com.google.calories.expended' },
            { dataTypeName: 'com.google.activity.segment' },
          ],
          bucketByTime: { durationMillis: 86400000 },
          startTimeMillis: startTimeInMillis,
          endTimeMillis: endTimeInMillis,
        };

        const response = await axios.post('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', requestBody, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        const fitnessData = response.data.bucket;
        const formattedData = [];

        fitnessData.forEach((data) => {
          const date = new Date(parseInt(data.startTimeMillis));
          const formattedDate = date.toDateString();
          const formattedEntry = {
            date: formattedDate,
            step_count: 0,
            glucose_level: 0,
            blood_pressure: [],
            heart_rate: 0,
            distance: 0,
            weight: 0,
            height_in_cms: 0,
            calories_expended: 0,
            sleep_hours: 0,
            body_fat_in_percent: 0,
            menstrual_cycle_start: "",
            speed: 0,
            activity_segment: [[]],
          };

          const datasetMap = data.dataset;
          datasetMap.forEach((mydataset) => {
            const point = mydataset.point;
            if (point && point.length > 0) {
              const value = point[0].value;
              switch (mydataset.dataSourceId) {
                case "derived:com.google.step_count.delta:com.google.android.gms:aggregated":
                  formattedEntry.step_count = value[0]?.intVal || 0;
                  break;
                case "derived:com.google.blood_glucose.summary:com.google.android.gms:aggregated":
                  let glucoseLevel = 0;
                  if (mydataset.point[0]?.value) {
                    const dataArray = mydataset.point[0]?.value;
                    dataArray.forEach((data) => {
                      if (data.fpVal) {
                        glucoseLevel = data.fpVal * 10;
                      }
                    });
                  }
                  formattedEntry.glucose_level = glucoseLevel;
                  break;
                case "derived:com.google.blood_pressure.summary:com.google.android.gms:aggregated":
                  let finalData = [0, 0];
                  if (mydataset.point[0]?.value) {
                    const BParray = mydataset.point[0]?.value;
                    if (BParray.length > 0) {
                      BParray.forEach((data) => {
                        if (data.fpVal) {
                          if (data.fpVal > 100) {
                            finalData[0] = data.fpVal;
                          } else if (data.fpVal < 100) {
                            finalData[1] = data.fpVal;
                          }
                        }
                      });
                    }
                  }
                  formattedEntry.blood_pressure = finalData;
                  break;
                case "derived:com.google.heart_rate.summary:com.google.android.gms:aggregated":
                  let heartData = 0;
                  if (mydataset.point[0]?.value) {
                    const heartArray = mydataset.point[0]?.value;
                    heartArray.forEach((data) => {
                      if (data.fpVal) {
                        heartData = data.fpVal;
                      }
                    });
                  }
                  formattedEntry.heart_rate = heartData;
                  break;
                case "derived:com.google.weight.summary:com.google.android.gms:aggregated":
                  formattedEntry.weight = value[0]?.fpVal || 0;
                  break;
                case "derived:com.google.height.summary:com.google.android.gms:aggregated":
                  formattedEntry.height_in_cms = value[0]?.fpVal * 100 || 0;
                  break;
                case "derived:com.google.sleep.segment:com.google.android.gms:merged":
                  formattedEntry.sleep_hours = mydataset.point[0]?.value || 0;
                  break;
                case "derived:com.google.body.fat.percentage.summary:com.google.android.gms:aggregated":
                  let bodyFat = 0;
                  if (mydataset.point[0]?.value) {
                    bodyFat = mydataset.point[0].value[0]?.fpVal || 0;
                  }
                  formattedEntry.body_fat_in_percent = bodyFat;
                  break;
                case "derived:com.google.menstruation:com.google.android.gms:aggregated":
                  formattedEntry.menstrual_cycle_start = mydataset.point[0]?.value[0]?.intVal || 0;
                  break;
                case "derived:com.google.speed.summary:com.google.android.gms:aggregated":
                  formattedEntry.speed = mydataset.point.reduce((sum, point) => sum + (point.value[0]?.fpVal || 0), 0) / mydataset.point.length || 0;
                  break;
                case "derived:com.google.distance.delta:com.google.android.gms:aggregated":
                  formattedEntry.distance = value[0]?.fpVal || 0;
                  break;
                case "derived:com.google.calories.expended:com.google.android.gms:aggregated":
                  formattedEntry.calories_expended = value[0]?.fpVal || 0;
                  break;
                case "derived:com.google.activity.summary:com.google.android.gms:aggregated":
                  const valueArrays = mydataset.point.map(point => point.value.map(valObj => valObj.intVal ?? 0));
                  formattedEntry.activity_segment = [].concat(...valueArrays);
                  break;
                default:
                  break;
              }
            }
          });
          formattedData.push(formattedEntry);
        });
        
        setFormattedData(formattedData);
        setDataAvailable(formattedData.some(entry => entry.date === selectedDate.toDateString()));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, [selectedDate]);

  return (
    <div style={{ width: '100%', padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <DatePicker 
          selected={selectedDate} 
          onChange={handleDateChange} 
          maxDate={new Date()}
        />
      </div>
      {dataAvailable ? (
        <>
      
        {formattedData
          .filter(entry => entry.date === selectedDate.toDateString()) // Filter entries for selected date
          .map((entry, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h4 style={{ textAlign: 'center' }}>{entry.date}</h4>
              <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                <div style={{ backgroundColor: '#6a5acd', color: 'rgba(255, 255, 255, 0.9)', padding: '10px', borderRadius: '8px', flex: '1 1 200px', margin: '10px' }}>
                  <p>Step Count</p>
                  <p style={{ margin: '0' }}>{entry.step_count}</p>
                </div>
                <div style={{ backgroundColor: '#fc46aa', color: 'rgba(255, 255, 255, 0.9)', padding: '10px', borderRadius: '8px', flex: '1 1 200px', margin: '10px' }}>
                  <p>Glucose Level</p>
                  <p style={{ margin: '0' }}>{entry.glucose_level}</p>
                </div>
                <div style={{ backgroundColor: '#03b1b4', color: 'rgba(255, 255, 255, 0.9)', padding: '10px', borderRadius: '8px', flex: '1 1 200px', margin: '10px' }}>
                  <p>Blood Pressure</p>
                  <p style={{ margin: '0' }}>{entry.blood_pressure.join('/')}</p>
                </div>
                <div style={{ backgroundColor: '#80aaff', color: 'rgba(255, 255, 255, 0.9)', padding: '10px', borderRadius: '8px', flex: '1 1 200px', margin: '10px' }}>
                  <p>Heart Rate</p>
                  <p style={{ margin: '0' }}>{entry.heart_rate}</p>
                </div>
                <div style={{ backgroundColor: '#03adfc', color: 'rgba(255, 255, 255, 0.9)', padding: '10px', borderRadius: '8px', flex: '1 1 200px', margin: '10px' }}>
                  <p>Distance (m)</p>
                  <p style={{ margin: '0' }}>{(entry.distance/1000).toFixed(2)}</p>
                </div>
                <div style={{ backgroundColor: '#03b1b4', color: 'rgba(255, 255, 255, 0.9)', padding: '10px', borderRadius: '8px', flex: '1 1 200px', margin: '10px' }}>
                  <p>Weight</p>
                  <p style={{ margin: '0' }}>{entry.weight}</p>
                </div>
                <div style={{ backgroundColor: '#6a5acd', color: 'rgba(255, 255, 255, 0.9)', padding: '10px', borderRadius: '8px', flex: '1 1 200px', margin: '10px' }}>
                  <p>Height (cm)</p>
                  <p style={{ margin: '0' }}>{entry.height_in_cms.toFixed(2)}</p>
                </div>
                <div style={{ backgroundColor: '#fc46aa', color: 'rgba(255, 255, 255, 0.9)', padding: '10px', borderRadius: '8px', flex: '1 1 200px', margin: '10px' }}>
                  <p>Calories Expended</p>
                  <p style={{ margin: '0' }}>{Math.floor(entry.calories_expended)}</p>
                </div>
                <div style={{ backgroundColor: '#fc8403', color: 'rgba(255, 255, 255, 0.9)', padding: '10px', borderRadius: '8px', flex: '1 1 200px', margin: '10px' }}>
                  <p>Sleep Hours</p>
                  <p style={{ margin: '0' }}>{entry.sleep_hours}</p>
                </div>
                <div style={{ backgroundColor: '#6a5acd', color: 'rgba(255, 255, 255, 0.9)', padding: '10px', borderRadius: '8px', flex: '1 1 200px', margin: '10px' }}>
                  <p>Body Fat (%)</p>
                  <p style={{ margin: '0' }}>{entry.body_fat_in_percent}</p>
                </div>
                <div style={{ backgroundColor: '#ff03b6', color: 'rgba(255, 255, 255, 0.9)', padding: '10px', borderRadius: '8px', flex: '1 1 200px', margin: '10px' }}>
                  <p>Menstrual Cycle Start</p>
                  <p style={{ margin: '0' }}>{entry.menstrual_cycle_start}</p>
                </div>
                <div style={{ backgroundColor: '#bd03ff', color: 'rgba(255, 255, 255, 0.9)', padding: '5px', borderRadius: '8px', flex: '1 1 200px', margin: '10px' }}>
                  <p>Speed</p>
                  <p style={{ margin: '0' }}>{entry.speed.toFixed(2)}</p>
                </div>
                {/* <div style={{ backgroundColor: '#000000', color: 'rgba(255, 255, 255, 0.9)', padding: '10px', borderRadius: '8px', flex: '1 1 200px', margin: '10px' }}>
                  <p>Activity Segment</p>
                  <p style={{ margin: '0' }}>
                    {entry.activity_segment.map(segment => activityTypes[segment]?.name || "Unknown Activity").join(", ")}
                  </p>
                </div> */}
              </div>
            </div>
          ))}
  <div style={{ textAlign: 'center', marginBottom: '10px' }}>You are doing great! 😊</div> 
           </>
           
      ) : (
        <div style={{ textAlign: 'center' }}>No data available for the selected date</div>
      )}
    </div>
  );
}

export default AggregateData;

