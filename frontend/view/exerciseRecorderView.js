import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../style/styles';
import { cleanString, numberToTime } from '../utility/format.js';
import { postSet, patchSet } from '../controller/exerciseRecorderController.js'
import { retrieveUserId } from '../utility/dataHandler.js'

export function ExerciseRecorder({ route, navigation }) {
  /* Create hooks */
  const [firstValue, setFirstValue] = React.useState(0);
  const [secondValue, setSecondValue] = React.useState(0);
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);

  const { exercise_name, exercise_group, exercise_id, first_value, second_value, date } = route.params;

  /* create new set */
  const createSet = async () => {

    /* Clean/set body parameters */
    const exerciseName = cleanString(exercise_name);
    const isCardio = cleanString(exercise_group) === 'Cardio' ? 'true' : 'false';
    const userId = await retrieveUserId();

    /* bundle parameters into JSON format */
    const body = JSON.stringify({
      userId: userId, 
      exercise_name: exerciseName,
      is_cardio: isCardio,
      first_value: firstValue,
      second_value: secondValue,
      date: date
    });
    
    /* Post set */
    const json = await postSet(body);
  
    /* go back to exercise log page */
    navigation.navigate("Exercise Log", {date : date});
  }

  /* Update set */
  const updateSet = async () => {

    /* Clean parameter */
    const setId = cleanString(exercise_id);

    /* bundle parameters into JSON format */
    const body = JSON.stringify({
      first_value: firstValue,
      second_value: secondValue,
    });

    /* patch st */
    const json = patchSet(setId, body);

    /* go back to exercise log page */
    navigation.navigate("Exercise Log", {date : date});
  }

  const updateTime = () => {
    setFirstValue(
    hours * 3600 +
    minutes * 60 + 
    seconds);
  }

  /* bound hours between 0 and 99*/
  const validateHours = (hours) => {
    if (0 <= hours && hours < 100)
    {
      setHours(hours);
    }
  }

  /* bound minutes between 0 and 59 */
  const validateMinutes = (minutes) => {
    if (0 <= minutes && minutes < 60)
    {
      setMinutes(minutes);
    }
  }

  /* bound seconds between 0 and 59 */
  const validateSeconds = (seconds) => {
    if (0 <= seconds && seconds < 60)
    {
      setSeconds(seconds);
    }
  }

  React.useEffect(() => {
    setFirstValue(first_value);
    setSecondValue(second_value);
    setHours(Math.floor(first_value / 3600));
    setMinutes(Math.floor((first_value % 3600) / 60));
    setSeconds((first_value % 3600) % 60);
  }, []);

  React.useEffect(() => {
    updateTime();
  }, [hours]);

  React.useEffect(() => {
    updateTime();
  }, [minutes]);

  React.useEffect(() => {
    updateTime();
  }, [seconds]);

  return (
      <View style={styles.recorderContainer}>
        <Text style={styles.header1}>{cleanString(exercise_name)}</Text>
        <View style={styles.headercontainer2}>
          <Text style={styles.header2}>{cleanString(exercise_group) === 'Cardio' ? 'Time (HH:MM:SS): ' : 'Weight: '}</Text>
        </View>
        <View style={styles.exerciseInputContainer}>
          {cleanString(exercise_group) === 'Cardio' ? 
          <TouchableOpacity
            style={styles.sideButtonGray}
            disabled={true}
            >
            <Text style={styles.sideButtonFont}> - </Text>
          </TouchableOpacity>
          :
          <TouchableOpacity
            style={styles.sideButton}
            onPress={() => firstValue <= 0 ? setFirstValue(0) : setFirstValue(firstValue - 5)}
            >
            <Text style={styles.sideButtonFont}> - </Text>
          </TouchableOpacity>
          }
          {cleanString(exercise_group) === 'Cardio' ? 
          <View style={styles.exerciseInputContainer}>
            <TextInput
              style={styles.exerciseTimeInput}
              value={cleanString(hours)}
              selectTextOnFocus={true}
              onChangeText={text => text === '' ? setHours(0) : validateHours(parseInt(text))}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.exerciseTimeInput}
              value={cleanString(minutes)}
              selectTextOnFocus={true}
              onChangeText={text => text === '' ? setMinutes(0) : validateMinutes(parseInt(text))}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.exerciseTimeInput}
              value={cleanString(seconds)}
              selectTextOnFocus={true}
              onChangeText={text => text === '' ? setSeconds(0) : validateSeconds(parseInt(text))}
              keyboardType="numeric"
            />
          </View>
          :
            <TextInput
              style={styles.exerciseMetricsInput}
              value={cleanString(firstValue)}
              onChangeText={text => text === '' ? setFirstValue(0) : setFirstValue(parseInt(text))}
              keyboardType="numeric"
            />
          }
          {cleanString(exercise_group) === 'Cardio' ? 
          <TouchableOpacity
            style={styles.sideButtonGray}
            disabled={true}
          >
            <Text style={styles.sideButtonFont}> + </Text>
          </TouchableOpacity>
          :
          <TouchableOpacity
            style={styles.sideButton}
            onPress={() => setFirstValue(firstValue + 5)}
          >
            <Text style={styles.sideButtonFont}> + </Text>
          </TouchableOpacity>
          }
        </View>
        <View style={styles.headercontainer2}>
          <Text style={styles.header2}>{cleanString(exercise_group) === 'Cardio' ? 'Distance (KM): ' : 'Reps: '}</Text>
        </View>
        <View style={styles.exerciseInputContainer}>
          <TouchableOpacity
            style={styles.sideButton}
            onPress={() => secondValue <= 0 ? setSecondValue(0) : setSecondValue(secondValue - 1)}
            >
            <Text style={styles.sideButtonFont}> - </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.exerciseMetricsInput}
            selectTextOnFocus={true}
            value={cleanString(secondValue)}
            onChangeText={text => text == '' ? setSecondValue(0) : setSecondValue(parseInt(text))}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.sideButton}
            onPress={() => setSecondValue(secondValue + 1)}
          >
            <Text style={styles.sideButtonFont}> + </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
            style={styles.generalButton}
            onPress={() => cleanString(exercise_id) === 'N/A' ? createSet() : updateSet()}
          >
          <Text style={styles.generalButtonFont}> {cleanString(exercise_id) === 'N/A' ? 'Log Exercise' : 'Update Exercise'} </Text>
        </TouchableOpacity>
      </View>
  );
}
