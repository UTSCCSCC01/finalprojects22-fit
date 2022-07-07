import * as React from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Text } from 'react-native';
import { cleanString } from '../../utility/format.js';
import { styles } from '../../style/styles';

export const workouts = Array.apply(null, Array(7)).map(function (x, i) { return []; })

export function CreateExercisePlan({ navigation, route }) {

  const { day } = route.params;

  const [frequency, setFrequency] = React.useState(0);
  const [duration, setDuration] = React.useState(1);
  const [canSave, setCanSave] = React.useState(false);
  const [, updateState] = React.useState();

  // Use this array to dynamically create buttons
  const arr = [1,2,3,4,5,6,7];

  // Initialize workout spots for max number of days
  const workoutDay = cleanString(day);

  // Function for forcing components to update
  const forceUpdate = React.useCallback(() => updateState({}), []);

  // Handlers for dynamic styling
  const getFrequencyButtonStyle = (num) => {
    return frequency == num ? 
    styles.sideButtonAlt : 
    styles.sideButton;
  }

  const getSaveButtonStyle = (num) => {
    return canSave ? 
    styles.generalButton :
    styles.generalButtonGray
  }

  // Functions for creating dynamic components
  // Create warnings if a workout doesn't have at least one exercise
  const renderWarning = (day) => {
    if (workouts[day].length == 0){
      return <View>
        <Text style={styles.finePrintWarning}> Need at least one exercise per workout </Text>
        </View>
    }
  }

  // Generate the workout day components 
  const renderWorkoutDays = () => {
    return Array.apply(null, Array(frequency)).map(function (x, i) { return i; });
  }

  // Handlers for touchable components
  // Increase workout plan duration
  const incrementDuration = () => {
    duration >= 52 ? setDuration(52) : setDuration(duration + 1);
  }

  // Decrease workout plan duration
  const decrementDuration = () => {
    duration <= 1 ? setDuration(1) : setDuration(duration - 1);
  }

  // Handle logic for manually changing workout plan duration
  const changeTextHandler = (weeks) => {
    setDuration(parseInt(weeks));
    if (weeks == '' || parseInt(weeks) < 1){
      setDuration(1);
    }
    else if (parseInt(weeks) > 52){
      setDuration(52);
    }
  }

  // Handle logic for saving workout
  const saveHandler = () => {

  }

  // Enable save option if conditions are met.
  const checkSaveAvailability = () => {
    if (frequency == 0 ){
      return false;
    }
    for (let i = 0; i < frequency; i++)
    {
      if (workouts[i].length == 0){
         return false;
      }
    }
    return true;
  }

  // Allow user to save once they select a workout frequency
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      setCanSave(checkSaveAvailability());
      forceUpdate();
    });
    setCanSave(checkSaveAvailability());
    forceUpdate();
  }, [frequency]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headercontainer2}>
          <Text style={styles.subheader1}> Select Workouts Per Week </Text>
        </View>
        <View style={styles.multiOptionContainer}>
          {arr.map(i=>{
          return <TouchableOpacity
            style={getFrequencyButtonStyle(i)}
            onPress={() => setFrequency(i)}
            key={"button " + i}
          >
            <View>
              <Text style={styles.generalButtonFont} key={"text1 " + i}> {i} </Text>
            </View>
          </TouchableOpacity>
          })}
        </View>
        <View>
          {renderWorkoutDays().map(i=>{
          return <View>
            <TouchableOpacity
              style={styles.generalButtonSmall}
              onPress={() => navigation.navigate('Create Workout', {
                day : i + 1,
              })}
              key={"workout " + i}
            >
              <View>
                <Text style={styles.generalButtonFontSmall} key={"text2 " + i}> Edit workout {i + 1} </Text>
              </View>
            </TouchableOpacity>
            {renderWarning(i)}
          </View>
          })}
        </View>
        <View style={styles.spacingSmall}></View>
        <View style={styles.headercontainer2}>
          <Text style={styles.subheader1}> Select Number of Weeks </Text>
        </View>
        <View style={styles.exerciseInputContainer}>
            <TouchableOpacity
              style={styles.sideButton}
              onPress={() => decrementDuration()}
              >
              <Text style={styles.sideButtonFont}> - </Text>
            </TouchableOpacity>
            <TextInput
              style={styles.exerciseMetricsInput}
              selectTextOnFocus={true}
              value={cleanString(duration)}
              onChangeText={text => changeTextHandler(text)}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.sideButton}
              onPress={() => incrementDuration()}
            >
              <Text style={styles.sideButtonFont}> + </Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
      <View>
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity
            style={getSaveButtonStyle()}
            disabled={!canSave}
            onPress={() => saveHandler()}
          >
            <Text style={styles.generalButtonFont}> Start Exercise Plan </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
