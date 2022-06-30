import React from 'react';
import { Button, Text, View } from 'react-native';
import Login from './components/LoginComponents';
import { styles, lightGray } from './style';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainPage from './components/MainPage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UserSurvey from './components/NewUserSurvey';
import { ExerciseSelect } from './view/exerciseSelectView';
import { ExerciseGroupSelect } from './view/exerciseGroupSelectView';
import { ExerciseRecorder } from './view/exerciseRecorderView';
import { ExerciseLog } from './view/exerciseLogView';
import ProfileScreen from './view/Profile/ProfileScreen.js';
import EditProfileScreen from './view/Profile/EditProfileScreen';

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
      </Tabbar.Navigator>
    )
  }

  return (
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
            <Stack.Screen
              name="Main TabBar"
              component={Tabbar_Stack}
              options={{headerShown: false}}
              />
            <Stack.Screen name="Survey" component={UserSurvey} />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen name="Exercise Log" component={ExerciseLog} />
            <Stack.Screen name="Select Exercise Group" component={ExerciseGroupSelect} />
            <Stack.Screen name="Select Exercise" component={ExerciseSelect} />
            <Stack.Screen name="Record Exercise" component={ExerciseRecorder} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
