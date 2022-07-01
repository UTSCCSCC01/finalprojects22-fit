import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Text, TextInput, View, ScrollView } from 'react-native';
import axios from 'axios';

export default function EditProfileScreen ({ route, navigation }) {

  const [didChange, setDidChange] = useState(false);
  const { data } = route.params;
  const [user, setUser] = useState(data)
  const [name, onChangeName] = useState(data.display_name);
  const [bio, onChangeBio] = useState(data.bio);
  
  const url = 'http://localhost:3000'
  const userId = '629d5b035a1cbd7d22664018'

  const handleSave = () => {
    try {
      axios.put(`${url}/users/${user._id}`, {"display_name": name, "bio": bio})
        .then((res) => {
          // go back to the profile page and update profile
          alert("Profile Successfully Updated!");
        })
    } catch (err) {
      console.log(err);
    }
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
          <Text style={{ color: primaryPurple, fontSize: 15, fontWeight: "bold"}}>Name:</Text>  
        </View>
        <View style={{flex:1}}>
          <TextInput
            color={primaryPurple}
            borderColor={primaryPurple}
            style={styles.nameInput}
            value={name}
            onChangeText={onChangeName}
            fontSize={15}
          />
        </View>
      </View>

      <View style={{flexDirection: "row", paddingTop: 20, paddingLeft: 30, paddingRight: 30}}>
        <View>
          <Text style={{ color: primaryPurple, fontSize: 15, fontWeight: "bold"}}>Bio:</Text>  
        </View>
        <View style={{flex:1}}>
          <TextInput
            multiline
            numberOfLines={4}
            color={primaryPurple}
            borderColor={primaryPurple}
            style={styles.bioInput}
            value={bio}
            onChangeText={onChangeBio}
            fontSize={15}
          />
        </View>
      </View>

      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20}}>
        <TouchableOpacity
          onPress={() => {
            handleSave()
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