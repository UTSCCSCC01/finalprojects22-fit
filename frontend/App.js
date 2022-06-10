import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProfileScreen from './view/Profile/ProfileScreen.js';
import HomeScreen from './view/HomeScreen.js';

const Tabbar = createBottomTabNavigator();

const primaryOrange = '#FF8C42'
const primaryPurple = '#4E598C'
const secondaryPurple = '#717FC0'

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
            } else if (route.name === 'Profile') {
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
          name="Profile" 
          component={ProfileScreen} />
      </Tabbar.Navigator>
    </NavigationContainer>
  );
}