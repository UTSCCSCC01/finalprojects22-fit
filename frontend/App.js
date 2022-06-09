import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProfileScreen from './view/Profile/ProfileScreen.js';
import HomeScreen from './view/HomeScreen.js';

const Tabbar = createBottomTabNavigator();

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
              iconName = focused ? 'person-pin' : 'person-pin';
            }
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tabbar.Screen name="Home" component={HomeScreen} />
        <Tabbar.Screen name="Profile" component={ProfileScreen} />
      </Tabbar.Navigator>
    </NavigationContainer>
  );
}