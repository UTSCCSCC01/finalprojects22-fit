import React, { Component, useEffect, useState, Alert} from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Text, TextInput, View, ScrollView } from 'react-native';
import axios from 'axios';
import { retrieveUserId } from '../utility/dataHandler.js'
import { baseURI } from '../utility/constants.js';
import { postCustomizedExercises } from '../controller/exerciseCustomerizedController'
import { styles, primaryPurple } from '../style/styles.js';

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
        navigation.goBack();
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

  return (
    <View style={styles.container}>

      <View style={styles.customExerciseComponentContainers}>
        <View>
          <Text style={styles.customExerciseText}>Enter muscle group (One of Abdominals/Back/Biceps/Calves/Cardio/Chest/Legs/Shoulders/Triceps):</Text>  
        </View>
        <View style={styles.headercontainer2}>
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
     
      <View style={styles.customExerciseComponentContainers}>
        <View>
          <Text style={styles.customExerciseText}>Enter exercise name:</Text>  
        </View>
        <View style={styles.headercontainer2}>
          <TextInput
            value={ExerciseName}
            onChangeText={onChangeExerciseName}
            fontSize={15}
          />
        </View>
      </View>

      <View style={styles.customExerciseComponentContainers}>
        <View>
          <Text style={styles.customExerciseText}>Does this exercise require gym equipment? (Y/N):</Text>  
        </View>
        <View style={styles.headercontainer2}>
          <TextInput
            value={NeedsGym}
            onChangeText={onChangeNeedsGym}
            fontSize={15}
          />
        </View>
      </View>

      <View style={styles.customExerciseComponentContainers}>
        <TouchableOpacity
          onPress={() => {
            tryCreateExercise();
          }}
          style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}