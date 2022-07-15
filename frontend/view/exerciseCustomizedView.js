import React, { Component, useEffect, useState, Alert} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Text, TextInput, View, ScrollView } from 'react-native';
import axios from 'axios';
import { retrieveUserId } from '../utility/dataHandler.js'
import { baseURI } from '../utility/constants.js';
import { postCustomizedExercises } from '../controller/exerciseCustomerizedController'

export function ExerciseCustomized ({ navigation }) {

  const [MuscleGroup, onChangeMuscleGroup] = useState("");
  const [ExerciseName, onChangeExerciseName] = useState("");
  const [NeedsGym, onChangeNeedsGym] = useState("");
  
  /* check input validilty */
  const tryCreateExercise = async () => {
    console.log(MuscleGroup);
    if (!((MuscleGroup === 'Abdominals') || (MuscleGroup ==='Back') || (MuscleGroup ==='Biceps') || 
    (MuscleGroup ==='Calves') || (MuscleGroup ==='Cardio') || (MuscleGroup ==='Legs') || 
    (MuscleGroup ==='Shoulders') || (MuscleGroup ==='Triceps'))) {
        console.log("mgfault");
        alert('please select a muscle group from the list');
    }
    else if (!((NeedsGym === 'Y')||(NeedsGym === 'N'))){
        console.log("ngfault");
        alert('please select Y or N');
    }
    else {
        createExercise();
        console.log("create");
    }
  }

  /* create exercise */
  const createExercise = async () => {
    // valid user input
    const userId = await retrieveUserId();
    const body = JSON.stringify({
        userId: userId,
        MuscleGroup: MuscleGroup,
        ExerciseName: ExerciseName,
        NeedsGym: NeedsGym,
    });

    /* Post set */
    try{
        const json = await postCustomizedExercises(body);
        alert('exercise added succesfully')
    } catch {
    }
  }
  
  const validateMuscleGroup = (MuscleGroup) => {
    return MuscleGroup === 'Abdominals' || 'Back' || 'Biceps' || 
    'Calves' || 'Cardio' || 'Legs' || 'Shoulders' || 'Triceps';
  }

  const primaryOrange = '#FF8C42'
  const primaryPurple = '#4E598C'
  const secondaryPurple = '#717FC0'

  const styles = StyleSheet.create({
    nameInput: {
      marginTop: -10,
      marginLeft: 10,
      height: 40,
      borderBottomWidth: 1,
      paddingBottom: 0
    },
    bioInput: {
      height: 120,
      marginLeft: 30,
      borderWidth: 1,
      padding: 10,
    },
    appButtonContainer: {
      backgroundColor: primaryOrange,
      borderRadius: 15,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    appButtonText: {
      fontSize: 15,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
    },
  });

  return (
    <View style={{ paddingTop: 30 }}>
      <View style={{flexDirection: "row", paddingTop: 20, paddingLeft: 30, paddingRight: 30}}>
        <View>
          <Text style={{ color: primaryPurple, fontSize: 15, fontWeight: "bold"}}>MuscleGroup:(Abdominals/Back/Biceps/Calves/Cardio/Chest/Legs/Shoulders/Triceps)</Text>  
        </View>
        <View style={{flex:1}}>
          <TextInput
            value={MuscleGroup}
            onChangeText={onChangeMuscleGroup}
            // onChangeText={onChangeMuscleGroup => validateMuscleGroup ? onChangeMuscleGroup : 
            //     Alert.alert('please select a muscle group from the list')}
            // onChangeText={text => text === '' ? setHours(0) : validateHours(parseInt(text))}
            fontSize={15}
          />
        </View>
      </View>
     
      <View style={{flexDirection: "row", paddingTop: 20, paddingLeft: 30, paddingRight: 30}}>
        <View>
          <Text style={{ color: primaryPurple, fontSize: 15, fontWeight: "bold"}}>ExerciseName:</Text>  
        </View>
        <View style={{flex:1}}>
          <TextInput
            value={ExerciseName}
            onChangeText={onChangeExerciseName}
            fontSize={15}
          />
        </View>
      </View>

      <View style={{flexDirection: "row", paddingTop: 20, paddingLeft: 30, paddingRight: 30}}>
        <View>
          <Text style={{ color: primaryPurple, fontSize: 15, fontWeight: "bold"}}>NeedsGym:(Y/N)</Text>  
        </View>
        <View style={{flex:1}}>
          <TextInput
            value={NeedsGym}
            onChangeText={onChangeNeedsGym}
            fontSize={15}
          />
        </View>
      </View>

      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20}}>
        <TouchableOpacity
          onPress={() => {
            tryCreateExercise();
            navigation.goBack();
          }}
          style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}