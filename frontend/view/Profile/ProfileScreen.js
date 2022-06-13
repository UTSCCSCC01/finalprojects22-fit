import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

export default function ProfileScreen ({ route, navigation }) {

  const INITIAL_USER = {
    _id: "",
    display_name: "",
    username: "",
    xp: 0,
    body_metrics: []
  }

  const primaryOrange = '#FF8C42'
  const primaryPurple = '#4E598C'
  const secondaryPurple = '#717FC0'

  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(INITIAL_USER);
  const [userLvl, setUserLvl] = useState(0);

  const url = 'http://localhost:3000'
  const userId = '629d5b035a1cbd7d22664018'

  const getUser = () => {
    axios.get(`${url}/users/${userId}`)
    .then((res) => {
      setUser(res.data.data);
      navigation.setOptions({ title: res.data.data.username });
      setUserLvl(Math.floor(res.data.data.xp / 10000) + 1);
    })
    .catch(err => console.log(err))
    .finally(() => setLoading(false))
  }

  //useEffect(() => {
  //  getUser();
  //}, []);

  useFocusEffect(
    React.useCallback(() => {
      getUser();
    }, [])
  );

  const styles = StyleSheet.create({
    appButtonContainer: {
      backgroundColor: primaryOrange,
      borderRadius: 15,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    displayContainer: {
      backgroundColor: 'white',
      borderRadius: 15,
      paddingVertical: 20,
      paddingHorizontal: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.7,
      shadowRadius: 1,  
      elevation: 5
    },
    appButtonText: {
      fontSize: 15,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
    },
    displayText: {
      fontSize: 15,
      color: primaryPurple,
      fontWeight: "bold",
      alignSelf: "center",
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      paddingBottom: 10,
    },
    level: {
      padding: 5,
      marginLeft: 30,
      width: 30,
      height: 30,
      borderWidth: 2,
      borderRadius: 30/2,
      borderColor: primaryPurple,
      alignItems: "center"
   }
  });

  return (
    <View style={{ paddingTop: 20 }}>
      {isLoading ? <ActivityIndicator/> :(
        <View>
          <View style={styles.level}>
              <Text>{userLvl}</Text>
          </View>
          <View style={{paddingLeft: 30, paddingRight: 30, flexDirection: "row"}}>
            <View style={{paddingTop: 10}}>
              <Text style={{color: primaryPurple}}>{user.display_name}</Text>
            </View>
            
            <View style={{position: 'absolute', right: 30}}>
              <Text style={{color: primaryPurple}}>{userLvl*10000 - user.xp} more xp to level {userLvl + 1}</Text>
              <Progress.Bar 
                progress={user.xp % 10000 / 10000} 
                width={200}
                color={primaryPurple}
                borderWidth={1.5} />
            </View>
          </View>
          <View style={{paddingTop: 20, paddingLeft: 30, paddingRight: 30,}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Edit Profile', { 
                  data: user
                });
              }}
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <View style={{paddingTop: 20}}>
              <Text style={styles.sectionTitle}>Bio</Text>
              <View
                style={styles.displayContainer}
              >
                <Text style={styles.displayText}>{user.bio}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
    
  );
}