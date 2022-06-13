import React, { Component } from 'react';
import { StyleSheet, Button, Text, View, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Home!</Text>
    <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('ProfileTab')}
    />
    </View>
);
}