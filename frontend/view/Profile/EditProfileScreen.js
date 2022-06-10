import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Button, Text, View, ScrollView } from 'react-native';

export default function ProfileScreen ({ navigation }) {

  const [isLoading, setLoading] = useState(true);
  
  const updateUser = () => {
    axios.patch(`${url}/users/${userId}`, { user })
    .then((res) => {
      setUser(res.data.data);
    })
    .catch(err => console.log(err))
    .finally(() => setLoading(false))
  }

  return ()
}