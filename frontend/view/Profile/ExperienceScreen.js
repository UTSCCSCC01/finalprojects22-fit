import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import { LineChart } from "react-native-chart-kit";
import axios from 'axios';

export default function ExperienceScreen ({ route, navigation }) {

  const { data } = route.params;
  const [user, setUser] = useState(data)
  const [userLvl, setUserLvl] = useState(0);
  const [isLoading, setLoading] = useState(true);

   const primaryPurple = '#4E598C'
    const secondaryPurple = '#717FC0'
    const primaryOrange = '#FF8C42'

  const url = 'http://192.168.2.69:3000'
  const userId = '629d5b035a1cbd7d22664018'

  const getUser = () => {
      axios.get(`${url}/users/${userId}`)
      .then((res) => {
        setUser(res.data.data);
        setUserLvl(Math.floor(res.data.data.xp / 10000) +1);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }

   useFocusEffect(
      React.useCallback(() => {
        getUser();
      }, [])
    );


const styles = StyleSheet.create({
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
    displayMission: {
      fontSize: 15,
      color: primaryPurple,
      fontWeight: "bold",
      alignSelf: "flex-start",
    },
    displayReward: {
          fontSize: 15,
          color: primaryOrange,
          fontWeight: "bold",
          alignSelf: "flex-end",
    },
    expTitle: {
      fontSize: 20,
      fontWeight: "bold",
      paddingBottom: 10,
      alignSelf: "center",
    },
    sectionTitle: {
          fontSize: 20,
          fontWeight: "bold",
          paddingBottom: 10,
    },
    level: {
      padding: 3.5,
      marginTop: -30,
      marginLeft: 160,
      width: 100,
      height: 100,
      borderWidth: 2,
      borderRadius: 50,
      borderColor: primaryPurple,
      alignItems: "center",
      backgroundColor: "white"
    },
    pImg: {
      marginLeft: 30,
      width: 80,
      height: 80,
      justiftyContent:"center",
      alignItems:"center"
    }
  });

 return (
        <View style={{ paddingTop: 50 }}>
           <View style={styles.level}>
             <Text style={{color: primaryPurple, fontWeight: "bold", fontSize: 25, marginTop: 27.5}}>Lvl {userLvl}</Text>
           </View>
           <View style={{paddingLeft: 30, paddingRight: 30, flexDirection: "row"}}>
            <View style={{position: 'absolute', right: 20}}>
              <Text style={styles.expTitle}>Total Experience: {user.xp}</Text>
              <Text style={{color: primaryPurple, left: 20}}>{userLvl*10000 - user.xp} more xp to level {userLvl + 1}</Text>
              <Progress.Bar
                progress={user.xp % 10000 / 10000}
                width={350}
                color={primaryPurple}
                borderWidth={1.5} />
            </View>
            </View>
            <View style={styles.flatListContainer}>
            <View style={{paddingTop: 80}}>
              <Text style={styles.sectionTitle}>Quests Log</Text>
              <View
                style={styles.displayContainer}
              >
                <Text style={styles.displayMission}>Log one food (daily)</Text>
                <Text style={styles.displayReward}>+1000 xp</Text>
              </View>
            </View>
            <View style={{paddingTop: 15}}>
              <View
                style={styles.displayContainer}
              >
                <Text style={styles.displayMission}>Log one exercise (daily)</Text>
                <Text style={styles.displayReward}>+1000 xp</Text>
              </View>
            </View>
            <View style={{paddingTop: 15}}>
               <View
                 style={styles.displayContainer}
               >
                 <Text style={styles.displayMission}>Complete all daily quests</Text>
                 <Text style={styles.displayReward}>+3000 xp</Text>
               </View>
             </View>

            <View style={{paddingTop: 15}}>
               <View
                 style={styles.displayContainer}
               >
                 <Text style={styles.displayMission}>Complete your body metrics</Text>
                 <Text style={styles.displayReward}>+5000 xp</Text>
               </View>
             </View>
             </View>
        </View>
 );
}