import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../../style/styles';

export function Settings({ navigation }) {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.settingsOptionsContiner}
        onPress={() => navigation.navigate('Select Long Term Goal')}
      >
      <View style={styles.settingsOption}>
        <Text style={styles.flatListText}> Select Long Term Goal </Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsOptionsContiner}
      >
      <View style={styles.settingsOption}>
        <Text style={styles.flatListText}> Other settings... </Text>
      </View>
      </TouchableOpacity>
    </View>
  );
}