import * as React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from '../../style/styles';

export function Settings({ navigation }) {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.settingsOptionsContiner}
        onPress={() => navigation.navigate('Create Exercise Plan', {
          day : 0,
        })}
      >
      <View style={styles.settingsOption}>
        <Text style={styles.flatListText}> Create Exercise Plan </Text>
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
