import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Text, TextInput, View, ScrollView } from 'react-native';
import axios from 'axios';
import { retrieveUserId } from '../utility/dataHandler.js'
import { baseURI } from '../utility/constants.js';
import { postCustomizedExercises } from '../controller/exerciseCustomerizedController'

export function ExerciseCustomized ({ navigation }) {

  const [MuscleGroup, onChangeMuscleGroup] = useState("");
  const [ExerciseName, onChangeExerciseName] = useState("");
  const [NeedsGym, onChangeNeedsGym] = useState("");


  // const handleSave = async() => {
  //   const userId = await retrieveUserId();
  //   try {
  //     axios.put(`${baseURI}/customizedExercises/`, { 
  //       "userId": userId, "MuscleGroup": MuscleGroup, "ExerciseName": ExerciseName, "NeedsGym": NeedsGym})
  //       .then((res) => {
  //         // go back to the profile page and update profile
  //         alert("Exercise Saved!");
  //       })
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  
  /* create exercise */
  const createExercise = async () => {
    
    const userId = await retrieveUserId();

    /* bundle parameters into JSON format */
    const body = JSON.stringify({
      userId: userId, 
      MuscleGroup: MuscleGroup,
      ExerciseName: ExerciseName,
      NeedsGym: NeedsGym,
    });
    
    /* Post set */
    const json = await postCustomizedExercises(body);
  
    /* go back to exercise log page */
    // navigation.navigate("Exercise Log", {date : date});
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
            createExercise();
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