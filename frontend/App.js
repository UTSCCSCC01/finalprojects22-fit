import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProfileScreen from './view/Profile/ProfileScreen.js';
import EditProfileScreen from './view/Profile/EditProfileScreen';
import HomeScreen from './view/HomeScreen.js';

const Tabbar = createBottomTabNavigator();
const Stack = createStackNavigator();
const SurveyStack = createStackNavigator();

const primaryOrange = '#FF8C42'
const primaryPurple = '#4E598C'
const secondaryPurple = '#717FC0'

function Profile() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen 
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
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tabbar.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
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
          name="Home" 
          component={HomeScreen} />
        <Tabbar.Screen 
          name="ProfileTab" 
          component={Profile}
          options={{headerShown: false}} />
      </Tabbar.Navigator>
    </NavigationContainer>
  );
}