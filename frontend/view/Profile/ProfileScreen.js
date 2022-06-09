import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Button, Text, View, ScrollView } from 'react-native';

export default function ProfileScreen ({ navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState({
  });
  
  const getUser = async () => {
    try {
      const res = await fetch('http://localhost:3000/users/629d5b035a1cbd7d22664018');
      const json = await res.json();
      setUser(json);
      console.log(json.data)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isLoading ? <ActivityIndicator/> :(
        <Text>{user.data.username}, {user.data.xp}</Text>
      )}
      <Button
        title="Edit Profile"
        onPress={(user) => navigation.navigate('Home')}
      />
    </View>
  );
}