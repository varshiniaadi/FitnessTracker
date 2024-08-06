import workoutPictures from '../WorkoutPictures';
import Chest from '../../images/chest.PNG';
import LowerBack from '../../images/lowerback.PNG';
import Biceps from '../../images/biceps.png';
import Triceps from '../../images/triceps.PNG';
import shoulders from '../../images/shoulders.PNG';
import Calves from '../../images/calves.PNG';
import Lats from '../../images/lats.PNG';
import forearms from '../../images/forearms.PNG';
import Glutes from '../../images/glutes.png';
import workout from '../../images/workout.png';
import Abdominals from '../../images/abdominals.PNG';

describe('workoutPictures', () => {
  test('should have the correct image mappings', () => {
    expect(workoutPictures).toEqual({
      "Chest": Chest,
      "Lower Back": LowerBack,
      "Biceps": Biceps,
      "Triceps": Triceps,
      "Shoulder": shoulders,
      "Lats": Lats,
      "Forearms": forearms,
      "Glutes": Glutes,
      "Workout": workout,
      "Calves": Calves,
      "Abdominals": Abdominals
    });
  });

  test('should contain all expected images', () => {
    const expectedKeys = [
      "Chest",
      "Lower Back",
      "Biceps",
      "Triceps",
      "Shoulder",
      "Lats",
      "Forearms",
      "Glutes",
      "Workout",
      "Calves",
      "Abdominals"
    ];

    expectedKeys.forEach(key => {
      expect(workoutPictures[key]).toBeDefined();
    });
  });
});
