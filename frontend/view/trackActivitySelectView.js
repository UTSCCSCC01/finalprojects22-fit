import * as React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { styles } from '../style/styles';

export function TrackActivitySelect({ navigation }) {

  return (
    <View style={styles.trackActivityContainer}>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.roundButton}
          // TO DO - navigate to food log
          //onPress={() => navigation.navigate('')}
        >
          <Text style={styles.roundButtonFont}> Diet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.roundButton}
          // TO DO - navigate to body metrics
          //onPress={() => navigation.navigate('')}
        >
          <Text style={styles.roundButtonFont}> Body Metrics</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}> 
        <TouchableOpacity
            style={styles.roundButton}
            onPress={() => navigation.navigate('Exercise Log')}
          >
            <Text style={styles.roundButtonFont}> Exercise</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}
