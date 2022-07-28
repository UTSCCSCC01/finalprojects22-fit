import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../../style/styles';

export function SelectGoal({ navigation }) {

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.settingsOptionsContiner}
        onPress={() => navigation.navigate('Create Long Term Goal - Weight Goal')}
      >
      <View style={styles.settingsOption}>
        <Text style={styles.flatListText}> Weight Goal </Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingsOptionsContiner}
        onPress={() => navigation.navigate('Create Long Term Goal - Complete Plan')}
      >
      <View style={styles.settingsOption}>
        <Text style={styles.flatListText}> Complete Current Workout Plan </Text>
      </View>
      </TouchableOpacity>

    </View>
  );
}