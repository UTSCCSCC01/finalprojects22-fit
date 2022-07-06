import * as React from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Text } from 'react-native';
import { cleanString } from '../../utility/format.js';
import { styles } from '../../style/styles';

export function CreateExercisePlan({ navigation }) {

  const [frequency, setFrequency] = React.useState(0);
  const [duration, setDuration] = React.useState(1);
  const [canSave, setCanSave] = React.useState(false);
  const arr = [1,2,3,4,5,6,7];

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

  // Handlers for touchable components
  const incrementDuration = () => {
    duration >= 52 ? setDuration(52) : setDuration(duration + 1);
  }

  const decrementDuration = () => {
    duration <= 1 ? setDuration(1) : setDuration(duration - 1);
  }

  const changeTextHandler = (weeks) => {
    setDuration(parseInt(weeks));
    if (weeks == '' || parseInt(weeks) < 1){
      setDuration(1);
    }
    else if (parseInt(weeks) > 52){
      setDuration(52);
    }
  }

  const saveHandler = () => {

  }

  // Generate the workout day components 
  const renderWorkoutDays = () => {
    return Array.apply(null, Array(frequency)).map(function (x, i) { return i; });
  }

  // Allow user to save once they select a workout frequency
  React.useEffect(() => {
    if (frequency != 0) {
      setCanSave(true);
    }
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
            key={i}
          >
            <View>
              <Text style={styles.generalButtonFont} key={i}> {i} </Text>
            </View>
          </TouchableOpacity>
          })}
        </View>
        <View tyle={styles.multiOptionContainer}>
          {renderWorkoutDays().map(i=>{
          return <TouchableOpacity
            style={styles.generalButtonSmall}
            onPress={() => navigation.navigate('Create Workout')}
            key={i}
          >
            <View>
              <Text style={styles.generalButtonFontSmall} key={i}> Edit workout {i + 1} </Text>
            </View>
          </TouchableOpacity>
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
