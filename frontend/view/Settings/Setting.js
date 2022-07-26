import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../../style/styles';

export function Setting({ navigation }) {

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.settingsOptionsContiner}
          onPress={() => navigation.navigate('Create Exercise Plan')}
        >
        <View style={styles.settingsOption}>
          <Text style={styles.flatListText}> Create Exercise Plan </Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsOptionsContiner}
          onPress={() => navigation.navigate('Select Exercise Plan')}
        >
        <View style={styles.settingsOption}>
          <Text style={styles.flatListText}> Select Exercise Plan </Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsOptionsContiner}
        >
        <View style={styles.settingsOption}>
          <Text style={styles.flatListText}> Set Caloric Budget </Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsOptionsContiner}
          onPress={() => navigation.navigate('Color Theme')}
        >
        <View style={styles.settingsOption}>
          <Text style={styles.flatListText}> Color Theme </Text>
        </View>
        </TouchableOpacity>
      </View>
    );
  }