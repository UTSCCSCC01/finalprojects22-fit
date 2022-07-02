import * as React from 'react';
import { Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../style/styles';
import { cleanString } from '../../utility/format.js';
import { patchAddBMetric, patchUpdateBMetric } from '../../controller/BodyMetric/bodyMetricRecorderController'

export function BodyMetricRecorder({ route, navigation }) {
  /* Create hooks */
  const [value, setValue] = React.useState(0);

  const { metricType, metricRecord, date } = route.params;

  /* create new body metric record */
  const createBodyMetric = async () => {

    /* bundle parameters into JSON format */
    const body = JSON.stringify({
      metric: metricType,
      value: value,
      date: date,
    });
    
    /* Post body metric */
    const json = await patchAddBMetric(body);
  
    /* go back to exercise log page */
    navigation.goBack();
  }

  /* update body metric record */
  const updateBodyMetric = async () => {

    const bid = metricRecord[0]._id;

    /* bundle parameters into JSON format */
    const body = JSON.stringify({
        value: value,
    });

    /* patch body metric record */
    const json = patchUpdateBMetric(body, bid);

    /* go back to body metric category log page */
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
    if (metricRecord.length == 0) {
        setValue(value);
    } else {
        setValue(metricRecord[0].value);
    }
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
            onPress={() => metricRecord.length == 0 ? createBodyMetric() : updateBodyMetric()}
          >
          <Text style={styles.generalButtonFont}>{metricRecord.length == 0 ? 'Save Measurement' : 'Edit Measurement'}</Text>
        </TouchableOpacity>
      </View>
  );
}
