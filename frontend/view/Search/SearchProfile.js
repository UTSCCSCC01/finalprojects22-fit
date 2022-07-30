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
import { useFocusEffect } from '@react-navigation/native';
import { getUserDetails, getUserProfilePicture } from '../../controller/Search/searchProfileController';
import { medalDict } from '../../utility/constants';

export default function SearchProfile ({ route, navigation }) {

  const INITIAL_USER = {
    _id: "",
    display_name: "",
    username: "",
    xp: 0,
    body_metrics: [],
    bio: "",
  }

  const INITIAL_WEIGHT = {
    data: [],
    labels: [],
  }

  const primaryOrange = '#FF8C42'
  const primaryPurple = '#4E598C'
  const secondaryPurple = '#717FC0'

  const { userId } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(INITIAL_USER);
  const [userLvl, setUserLvl] = useState(0);
  const [xpProgress, setXpProgress] = useState(0);
  const [image, setImage] = useState('');

  const getUser = async () => {
    try {
      const json = await getUserDetails(userId);
      setUser(json.data)
      
      if (json.data.profile_pic !== undefined) {
        const pImg_link = json.data.profile_pic;
        if (pImg_link !== '') {
          const pic = await getUserProfilePicture(pImg_link);
          setImage(pic.img_data);
        }
      }

      if(!user.hasOwnProperty('medals')) {
        let u1 = user;
        u1.medals = [];
        setUser(u1);
      }
      if(!user.hasOwnProperty('profile_pic')) {
        let u1 = user;
        u1.profile_pic = "";
        setUser(u1);
      }
      if(!user.hasOwnProperty('xp')) {
        let u1 = user;
        u1.xp = 0;
        setUser(u1);
        setUserLvl(1);
        setXpProgress(0);
      } else {
        setUserLvl(Math.floor(json.data.xp / 10000) + 1);
        setXpProgress(json.data.xp % 10000 / 10000);
      }
      if(!user.hasOwnProperty('bio')) {
        let u1 = user;
        u1.bio = "";
        setUser(u1);
      }
      navigation.setOptions({ title: json.data.username });
      console.log(user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

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
    <ScrollView>
      <View style={{ paddingTop: 20 }}>
        {isLoading ? <ActivityIndicator/> :(
          <View>
            <View style={styles.pImg}>
              {
                image === undefined || image === '' ? 
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
            
            {/* Medals Section 
            <View style={{position: 'absolute', right: 30, flexDirection: 'row'}}>
              { user.medals.slice(0,3).map(medal => {
                const medalSrc = medalDict.find(m => m.name === medal).src;
                return (
                  <View key={medal} style={{ flexDirection: 'column', width: 60}}>
                    <Image
                      source={medalSrc}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                        overflow: 'hidden',
                        marginBottom: 5,
                        marginLeft: 10
                      }} />
                    <Text style={{color: primaryPurple, fontSize: 10, textAlign: "center", fontWeight: 'bold'}}>{medal}</Text>
                  </View>
                )
              })}
              </View>*/}
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
                <Text style={styles.appButtonText}>+ Add Friend</Text>
              </TouchableOpacity>

              {/* Bio Section */}
              <View style={{paddingTop: 20}}>
                <Text style={styles.sectionTitle}>About Me</Text>
                <View
                  style={styles.displayContainer}
                >
                  <Text style={styles.displayText}>{user.bio === '' ? "~ User has not added a bio yet ~": user.bio}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}