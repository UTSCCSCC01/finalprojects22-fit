import React from 'react';
import { Button, Text, View } from 'react-native';
import Login from './components/LoginComponents';
import { styles, lightGray } from './style';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import MainPage from './components/MainPage';
import UserSurvey from './components/NewUserSurvey';
import ColorTheme  from './view/Settings/ColorTheme.js';

import { Calendar } from './view/calendarView';
import { TrackActivitySelect } from './view/trackActivitySelectView';

import { ExerciseSelect } from './view/exerciseSelectView';
import { ExerciseGroupSelect } from './view/exerciseGroupSelectView';
import { ExerciseRecorder } from './view/exerciseRecorderView';
import { ExerciseLog } from './view/exerciseLogView';

import { BodyMetricLog } from './view/BodyMetric/BodyMetricLogView';
import { BodyMetricRecorder } from './view/BodyMetric/BodyMetricRecorder';

import { SelectFoodCategory } from './view/SelectFoodCategory';
import { SelectFood } from './view/SelectFood';
import { RecordFood } from './view/RecordFood';
import { FoodLog } from './view/FoodLog';

import ProfileScreen from './view/Profile/ProfileScreen.js';
import EditProfileScreen from './view/Profile/EditProfileScreen';

import { UserProvider } from './context/UserContext';

import { Settings } from './view/Settings/Settings.js';
import { OptionalSurvey } from './view/Settings/Survey';
import { Plan } from './view/Settings/Plan.js';
import {SelectGoal} from './view/LongtermGoal/selectGoal.js';
import {WeightGoal} from './view/LongtermGoal/weightGoal.js';
import {CompletePlan} from './view/LongtermGoal/completePlan.js';
import {TrackLongTermGoal} from './view/LongtermGoal/trackLongTermGoal.js';

import { ExerciseCustomized } from './view/exerciseCustomizedView.js';

const Stack = createNativeStackNavigator();
const Tabbar = createBottomTabNavigator();
const ProfileStack = createStackNavigator();

const primaryOrange = "#FF8C42";
const secondaryPurple = "#717FC0";
const primaryPurple = "#4E598C";

const App = () => {

  //routing for the whole app
  const Profile_Stack = () => {
    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen name="Profile" component={ProfileScreen} />
        <ProfileStack.Screen
          name="Edit Profile"
          component={EditProfileScreen}
          options= {{
            headerRightContainerStyle: {
              paddingRight: 10,
            },
            headerLeftContainerStyle: {
              paddingLeft: 10,
            },
            headerTintColor: 'black',
            headerBackTitleVisible: false
          }}/>
      </ProfileStack.Navigator>
    )
  }

  const Tracking_Stack = () => {
    return (
      <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#4E598C' },
            headerTintColor: '#fff',
        }}
        initialRouteName="Calendar"
      >
        <Stack.Group>
          <Stack.Screen name="Calendar" component={Calendar} />
          <Stack.Screen name="Track Activity Select" component={TrackActivitySelect} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="Exercise Log" component={ExerciseLog} />
          <Stack.Screen name="Select Exercise Group" component={ExerciseGroupSelect} />
          <Stack.Screen name="Select Exercise" component={ExerciseSelect} />
          <Stack.Screen name="Record Exercise" component={ExerciseRecorder} />
          <Stack.Screen name="Create Exercise" component={ExerciseCustomized} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="Food Log" component={FoodLog} />
          <Stack.Screen name="Select Food Category" component={SelectFoodCategory} />
          <Stack.Screen name="Select Food" component={SelectFood} />
          <Stack.Screen name="Record Food" component={RecordFood} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="Body Metric Log" component={BodyMetricLog}/>
          <Stack.Screen name="Record Body Metric" component={BodyMetricRecorder}/>
        </Stack.Group>
      </Stack.Navigator>
    )
  }

  const Setting_Stack = () => {
    return (
      <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#4E598C' },
            headerTintColor: '#fff',
        }}
        initialRouteName="Settings"
      >
        <Stack.Screen name= "Settings" component={Settings} />
        <Stack.Screen name= "Select Long Term Goal" component={SelectGoal} />
        <Stack.Screen name = "Create Long Term Goal - Weight Goal" component = {WeightGoal} /> 
        <Stack.Screen name="Create Long Term Goal - Complete Plan" component={CompletePlan} />
      </Stack.Navigator>
    )
  }
  const Tabbar_Stack = () => {
    return (
      <Tabbar.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'MainPage') {
                iconName = focused
                  ? 'home'
                  : 'home';
              } else if (route.name === 'ProfileTab') {
                iconName = focused ? 'account-circle' : 'account-circle';
              } else if (route.name === 'TrackingStack') {
                iconName = focused ? 'calendar-today' : 'calendar-today';
              } else if (route.name ==='SettingStack') {
                iconName = focused ? 'settings' : 'settings';
              }
              return <MaterialIcons name={iconName} size={35} color={color} />;
            },
            tabBarShowLabel: false,
            tabBarActiveTintColor: primaryOrange,
            tabBarInactiveTintColor: secondaryPurple,
            tabBarStyle: {
              height: 80,
              borderRadius: 40,
              paddingTop: 15,
              backgroundColor: primaryPurple
            }
          })}
        >
          <Tabbar.Screen
            name="MainPage"
            component={MainPage} />
          <Tabbar.Screen
            name="ProfileTab"
            component={Profile_Stack}
            options={{headerShown: false}} />
          <Tabbar.Screen
            name="TrackingStack"
            component={Tracking_Stack}
            options={{headerShown: false}}
            />
            <Tabbar.Screen
            name="SettingStack"
            component={Setting_Stack}
            options={{headerShown: false}}
            />
      </Tabbar.Navigator>
    )
  }

  return (
    <UserProvider value = {false}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#4E598C' },
            headerTintColor: '#fff',
        }}
        initialRouteName="Welcome"
        >
          <Stack.Group>
            <Stack.Screen name="Welcome" component={Login} />
            <Stack.Screen name="Main Page" component={MainPage} />
            <Stack.Screen name="Track Long Term Goal" component={TrackLongTermGoal} />
            <Stack.Screen name="Survey" component={UserSurvey} />
            
            <Stack.Screen
              name="Main TabBar"
              component={Tabbar_Stack}
              options={{headerShown: false}}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
