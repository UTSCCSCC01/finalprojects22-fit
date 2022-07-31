import React from 'react';
import { LogBox  } from 'react-native';
import Login from './components/LoginComponents';
LogBox.ignoreAllLogs();
import { styles, lightGray } from './style';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import MainPage from './components/MainPage';
import UserSurvey from './components/NewUserSurvey';

import { Calendar } from './view/calendarView'
import { TrackActivitySelect } from './view/trackActivitySelectView'

import { ExerciseSelect } from './view/exerciseSelectView';
import { ExerciseGroupSelect } from './view/exerciseGroupSelectView';
import { ExerciseRecorder } from './view/exerciseRecorderView';
import { ExerciseLog } from './view/exerciseLogView';

import { BodyMetricLog } from './view/BodyMetric/BodyMetricLogView';
import { BodyMetricRecorder } from './view/BodyMetric/BodyMetricRecorder';

import { SelectFoodCategory } from './view/SelectFoodCategory'
import { SelectFood } from './view/SelectFood'
import { RecordFood } from './view/RecordFood'
import { FoodLog } from './view/FoodLog';

import ProfileScreen from './view/Profile/ProfileScreen.js';
import EditProfileScreen from './view/Profile/EditProfileScreen';
import SetShortTerm from './components/SetShortTermGoalComponent';

import { UserProvider } from './context/UserContext';

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

  const Main_Stack = () => {
    return(
      <Stack.Navigator
        screenOptions={{
        headerStyle: { backgroundColor: '#4E598C' },
        headerTintColor: '#fff',
    }}
        initialRouteName="MainPage">
        <Stack.Group>
          <Stack.Screen name="MainPage" component={MainPage} />
          <Stack.Screen name="Set Short Term" component={SetShortTerm} />
        </Stack.Group>
      </Stack.Navigator>
    );
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
        initialRouteName="Setting"
      >
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name= "Optional Survey" component={OptionalSurvey} />
        <Stack.Screen name ="Plan" component = {Plan} /> 
        <Stack.Screen name="Color Theme" component={ColorTheme} />
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
            component={Main_Stack} />
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