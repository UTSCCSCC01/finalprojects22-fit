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
import { LineChart, PieChart } from "react-native-chart-kit";
import { 
  getUserProfile, 
  getUserProfilePicture,
  getUserSavedFoods
} from '../../controller/Profile/profileController';
import { medalDict } from '../../utility/constants';

export default function ProfileScreen ({ route, navigation }) {

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

  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(INITIAL_USER);
  const [userLvl, setUserLvl] = useState(0);
  const [xpProgress, setXpProgress] = useState(0);
  const [image, setImage] = useState('');
  const [weight, setWeight] = useState(INITIAL_WEIGHT);
  const [food, setFood] = useState([]);

  const getUser = async () => {
    try {
      const json = await getUserProfile();
      if (json.data.profile_pic !== undefined) {
        const pImg_link = json.data.profile_pic;
        if (pImg_link !== '') {
          const pic = await getUserProfilePicture(pImg_link);
          setImage(pic.img_data);
        }
      }
      setUser(json.data)
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
            
            {/* Medals Section */}
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
                <Text style={styles.sectionTitle}>About Me</Text>
                <View
                  style={styles.displayContainer}
                >
                  <Text style={styles.displayText}>{user.bio === '' ? "~ User has not added a bio yet ~": user.bio}</Text>
                </View>
              </View>

              {/* Weight Section */}
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

              {/* Saved Foods Section */}
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
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}