import * as React from 'react';
import { Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../style/styles';
import { cleanString } from '../../utility/format.js';
import { patchBMetric } from '../../controller/bodyMetricRecorderController'
import { retrieveUserId } from '../../utility/dataHandler.js'

export function BodyMetricRecorder({ route, navigation }) {
  /* Create hooks */
  const [value, setValue] = React.useState(0);

  const { metricType, metricRecord } = route.params;

  /* create new set */
  const createSet = async () => {

    /* Clean/set body parameters */
    const currentDate = new Date();
    const userId = await retrieveUserId();

    /* bundle parameters into JSON format */
    const body = JSON.stringify({
      metricType: metricType,
      value: value,
      date: currentDate.setHours(0, 0, 0, 0),
    });
    
    /* Post set */
    const json = await patchBMetric(body);
  
    /* go back to exercise log page */
    navigation.goBack();
  }

   /* Determines which format to use to represent value */
   const bodyMetricConverter = () => {
    if (value < 0) {      
      setValue(0);
    }
    let unit = "CM";

    if (metricType === "Body Weight") unit = "KG";

    return cleanString(value) + unit;
  }

  React.useEffect(() => {
    setValue(value);
  }, []);

  return (
      <View style={styles.recorderContainer}>
        <Text style={styles.header1}>{cleanString(metricType)}</Text>
        <View style={styles.headercontainer2}>
          <Text style={styles.header2}>Measurement</Text>
        </View>
        <View style={styles.exerciseInputContainer}>
          <TouchableOpacity
            style={styles.sideButton}
            onPress={() => value <= 0 ? setValue(0) : setValue(value - 1)}
            >
            <Text style={styles.sideButtonFont}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.exerciseMetricsInput}
            value={bodyMetricConverter()}
            onChangeText={text => text === "CM" || text === "KG" ? setValue(0) : setValue(parseInt(text))}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.sideButton}
            onPress={() => setValue(value + 1)}
          >
            <Text style={styles.sideButtonFont}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
            style={styles.generalButton}
            onPress={() => cleanString(exercise_id) === 'N/A' ? createSet() : updateSet()}
          >
          <Text style={styles.generalButtonFont}>{metricRecord === [] ? 'Save Measurement' : 'Edit Measurement'}</Text>
        </TouchableOpacity>
      </View>
  );
}
