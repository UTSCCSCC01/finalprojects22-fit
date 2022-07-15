import React, { Component, useEffect, useState } from 'react';
import { 
  ActivityIndicator, 
  Dimensions, 
  FlatList, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  View, 
  ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import { LineChart } from "react-native-chart-kit";
import { getUserProfile, getUserProfilePicture } from '../../controller/Profile/profileController';
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
  const [xpProgress, setXpProgress] = useState(0);
  const [image, setImage] = useState('');

  const getUser = async () => {
    try {
      const json = await getUserProfile();
      const pImg_link = json.data.profile_pic;
      if (pImg_link !== '') {
        const pic = await getUserProfilePicture(pImg_link);
        setImage(pic.img_data);
      }
      setUser(json.data)
      navigation.setOptions({ title: json.data.username });
      setUserLvl(Math.floor(json.data.xp / 10000) + 1);
      setXpProgress(user.xp % 10000 / 10000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: () => primaryOrange, // optional
        strokeWidth: 1.5 // optional
      }
    ]
  };

  const chartConfig = {
    backgroundGradientFrom: "#FFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFF",
    backgroundGradientToOpacity: 0.5,
    color: () => primaryOrange,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

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
      padding: 3.5,
      marginTop: -30,
      marginLeft: 95,
      width: 25,
      height: 25,
      borderWidth: 2,
      borderRadius: 25/2,
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
    <View style={{ paddingTop: 20 }}>
      {isLoading ? <ActivityIndicator/> :(
        <View>
          <View style={styles.pImg}>
            {
              image === undefined ? 
                <Image
                source={require('../../assets/default_p_img.png')}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                  overflow: 'hidden',
                  borderWidth: 3,
                  borderColor: primaryPurple,
                }} /> 
                : 
                <Image
                  source={{uri: 'data:image/png;base64,'.concat(image) }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                    overflow: 'hidden',
                    borderWidth: 3,
                    borderColor: primaryPurple,
                  }} />
            }
          </View>
          <View style={styles.level}>
            <Text style={{color: primaryPurple, fontWeight: "bold", fontSize: 12}}>{userLvl}</Text>
          </View>
          <View style={{paddingLeft: 30, paddingRight: 30, flexDirection: "row"}}>
            <View style={{paddingTop: 10}}>
              <Text style={{color: primaryPurple}}>{user.display_name}</Text>
            </View>
            
            <View style={{position: 'absolute', right: 30}}>
              <Text style={{color: primaryPurple, left: 20}}>{userLvl*10000 - user.xp} more xp to level {userLvl + 1}</Text>
              <Progress.Bar 
                progress={xpProgress} 
                width={200}
                color={primaryPurple}
                borderWidth={1.5} />
            </View>
          </View>
          <View style={{paddingTop: 20, paddingLeft: 30, paddingRight: 30,}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Edit Profile', { 
                  data: user,
                  image: image
                });
              }}
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            {/* Bio Section */}
            <View style={{paddingTop: 20}}>
              <Text style={styles.sectionTitle}>Bio</Text>
              <View
                style={styles.displayContainer}
              >
                <Text style={styles.displayText}>{user.bio}</Text>
              </View>
            </View>

            {/* Height Section */}
            <View style={{paddingTop: 20}}>
              <Text style={styles.sectionTitle}>Height</Text>
              <View
                style={styles.displayContainer}
              >
                <LineChart 
                  data={chartData}
                  width={Dimensions.get("window").width-100}
                  height={180}
                  chartConfig={chartConfig} 
                />
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
    
  );
}