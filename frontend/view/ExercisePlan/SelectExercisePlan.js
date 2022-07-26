import * as React from 'react';
import { View, ActivityIndicator, TouchableOpacity, Text, FlatList } from 'react-native';
import { cleanString } from '../../utility/format.js';
import { styles } from '../../style/styles';

export function SelectExercisePlan({ navigation, route }) {

  const [data, setData] = React.useState("[]");

  const handlePress = (item) => {
  }

  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        {(cleanString(data) === "[]") ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => item._id}
          renderItem={({item}) => <Text style={styles.flatListSearchItem} onPress={() => handlePress(item)}>{item.ExerciseName}</Text>}
        />
        )}
      </View>
      <TouchableOpacity
          style={styles.generalButton}
          onPress={() => navigation.navigate('Setting')}
        >
        <View>
          <Text style={styles.generalButtonFont}> go back </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
          style={styles.generalButton}
          onPress={() => navigation.navigate('View Exercise Plan')}
        >
        <View>
          <Text style={styles.generalButtonFont}> test </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
