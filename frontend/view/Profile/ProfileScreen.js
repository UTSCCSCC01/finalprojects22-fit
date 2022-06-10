import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Button, Text, View, ScrollView } from 'react-native';
import axios from 'axios';

export default function ProfileScreen ({ navigation }) {

  const INITIAL_USER = {
    _id: "",
    display_name: "",
    username: "",
    xp: 0,
    body_metrics: []
  }

  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(INITIAL_USER);
  
  const url = 'http://localhost:3000'
  const userId = '629d5b035a1cbd7d22664018'


  const getUser = () => {
    axios.get(`${url}/users/${userId}`)
    .then((res) => {
      setUser(res.data.data);
    })
    .catch(err => console.log(err))
    .finally(() => setLoading(false))
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isLoading ? <ActivityIndicator/> :(
        <View style={{ margin: 50 }}>
          <Text>Username: {user.username}</Text>
          <Text>Name: {user.display_name}</Text>
          <Text>xp: {user.xp}</Text>
          <Text>Level: {Math.floor(user.xp / 10000)} </Text>
          <FlatList
            data={user.body_metrics}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <Text key={item.id} >{item.metric}: {item.value}{item.unit}</Text>
            )}
          />
          <Button
            title="Edit Profile"
            onPress={(user) => navigation.navigate('Home')}
            color="orange"
          />
        </View>
      )}
    </View>
  );
}