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
import { LineChart, PieChart } from "react-native-chart-kit";
import { useFocusEffect } from '@react-navigation/native';
import { getUserDetails, getUserProfilePicture, getUserSavedFoods, sendFriendRequest } from '../../controller/Search/searchProfileController';
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

  const { userId, isFriend, reqSent, reqFrom, currUsername } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(INITIAL_USER);
  const [userLvl, setUserLvl] = useState(0);
  const [xpProgress, setXpProgress] = useState(0);
  const [image, setImage] = useState('');
  const [weight, setWeight] = useState(INITIAL_WEIGHT);
  const [food, setFood] = useState([]);
  const [reqIsSent, setReqIsSent] = useState(reqSent);
  const [hasReqFrom, setHasReqFrom] = useState(reqFrom);

  useEffect(() => {
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
      }
      if(!user.hasOwnProperty('bio')) {
        let u1 = user;
        u1.bio = "";
        setUser(u1);
      }
  }, [user]);

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
      getWeightData(json.data);
      await getFoodData(json.data._id);
      navigation.setOptions({ title: json.data.username });
      setUserLvl(Math.floor(json.data.xp / 10000) + 1);
      setXpProgress(json.data.xp % 10000 / 10000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  const getWeightData = (user_data) => {
    if (user_data.body_metrics === []) return;
    let data = user_data.body_metrics.filter(function (entry) {
      return entry.metric === 'Body Weight';
    })
    data.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    const weightData = data.map(function (a) {
      return a.value;
    }).slice(-5);
    const labelData = data.map(function (a) {
      return a.date.substring(0,10);
    }).slice(-5);
    
    const obj = {
      data: weightData,
      labels: labelData
    }
    setWeight(obj)
  }

  const getFoodData = async (id) => {
    const date = new Date();
    const foodData = await getUserSavedFoods(date.toISOString());
    if (foodData.data.length == 0) return;
    let calories = 0;
    let carbs = 0.00;
    let fat = 0.00;
    let protein = 0.0;

    foodData.data.forEach((record) => {
      calories += record.calorie;
      carbs += parseFloat(record.carbohydrate.$numberDecimal);
      fat += parseFloat(record.fat.$numberDecimal);
      protein += parseFloat(record.protein.$numberDecimal);
    });
    setFood([
      {
        name: "Carbohydrate",
        value: carbs,
        color: primaryOrange,
        legendFontColor: primaryPurple,
      },
      {
        name: "Fat",
        value: fat,
        color: primaryPurple,
        legendFontColor: primaryPurple,
      },
      {
        name: "Protein",
        value: protein,
        color: secondaryPurple,
        legendFontColor: primaryPurple,
      }
    ]);
  }

  const pChartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  }

  const lChartConfig = {
    backgroundGradientFrom: "#FFFF",
    backgroundGradientTo: "#FFFF",
    color: (opacity = 1) => primaryPurple,
    labelColor: (opacity = 1) => primaryPurple,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: true, // optional
    decimalPlaces: 1,
    propsForDots: {
      r: "2",
      strokeWidth: "4",
      stroke: primaryOrange
    }
  };

  const handleSendFReq = async () => {
    try {
        const json = await sendFriendRequest(userId, currUsername);
        setReqIsSent(true);
    } catch (error) {
        console.log(error)
    }
  }

  useFocusEffect( 
    React.useCallback(() => {
      getUser();
    }, [])
  );

  const styles = StyleSheet.create({
    disabledAppButtonContainer: {
        borderWidth: 2,
        borderColor: primaryOrange,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
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
    disabledAppbuttonText: {
        fontSize: 15,
        color: primaryOrange,
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
                image === undefined || image === '' 
                ?
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
            
            {/* Medals Section */}
            <View style={{position: 'absolute', right: 40, flexDirection: 'row'}}>
              { user.medals !== undefined && user.medals.slice(0,3).map(medal => {
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
                { (isFriend || reqIsSent || hasReqFrom)
                ? <View
                    style={styles.disabledAppButtonContainer}
                    >
                        { isFriend ?
                        <Text style={styles.disabledAppbuttonText}>Friends</Text>
                        : 
                        <Text style={styles.disabledAppbuttonText}>{hasReqFrom ? "Has Sent You a Request" : "Request Sent"}</Text>}
                </View>
                : <TouchableOpacity
                    onPress={() => {
                        handleSendFReq(userId);
                    }}
                    style={styles.appButtonContainer}
                >
                    <Text style={styles.appButtonText}>+ Add Friend</Text>
                </TouchableOpacity> }

              {/* Bio Section */}
              <View style={{paddingTop: 20}}>
                <Text style={styles.sectionTitle}>About Me</Text>
                <View
                  style={styles.displayContainer}
                >
                  <Text style={styles.displayText}>{user.bio === '' ? "~ User has not added a bio yet ~": user.bio}</Text>
                </View>
              </View>

              {/* Weight Section */}
              { isFriend 
              ?
              <View style={{paddingTop: 20}}>
                <Text style={styles.sectionTitle}>Body Weight</Text>
                <View
                  style={styles.displayContainer}
                >
                  { JSON.stringify(weight) === JSON.stringify(INITIAL_WEIGHT) ? 
                    <Text style={styles.displayText}>~ No Data Recorded ~</Text> :
                    <LineChart 
                      data={
                        {
                          labels: weight.labels,
                          datasets: [
                            {
                              data: weight.data,
                              color: () => primaryOrange, // optional
                              strokeWidth: 1.5 // optional
                            }
                          ]
                        }
                      }
                      width={Dimensions.get("window").width-100}
                      height={180}
                      chartConfig={lChartConfig}
                      yAxisSuffix="KG"
                    />
                  }
                </View>
              </View>
              : null }

              {/* Saved Foods Section */}
              { isFriend 
              ?
              <View style={{paddingTop: 20}}>
                <Text style={styles.sectionTitle}>Nutrition Today</Text>
                <View
                  style={styles.displayContainer}
                >
                  { JSON.stringify(food) === JSON.stringify([]) ? 
                    <Text style={styles.displayText}>~ No Data Recorded ~</Text> :
                    <PieChart 
                      data={food}
                      width={Dimensions.get("window").width-100}
                      height={220}
                      chartConfig={pChartConfig}
                      accessor={"value"}
                      paddingLeft={"5"}
                      center={[0, 0]}
                    />
                  }
                </View>
              </View>
              : null }
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}