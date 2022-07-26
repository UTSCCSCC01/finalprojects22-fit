import * as React from 'react';
import { View, ActivityIndicator, TouchableOpacity, Text, FlatList } from 'react-native';
import { cleanString } from '../../utility/format.js';
import { styles } from '../../style/styles';

export function ViewExercisePlan({ navigation, route }) {

  const [data, setData] = React.useState("[]");

  return (
    <View style={styles.container}>
      <Text> Hello </Text>
    </View>
  );
}
