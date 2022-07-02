import * as React from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../../style/styles';
import { cleanString, numberToTime } from '../../utility/format.js';
import { getBodyMetric } from '../../controller/bodyMetricLogController' 

export function BodyMetricLog({ navigation }) {
    /* Create hooks */
    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);

    /* Pull user's body metrics */
    const getBMetric = async () => {
        try {
            const json = await getBodyMetric();
            setData(json.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const date = new Date();

    React.useEffect(() => {
        navigation.addListener('focus', () => {
            getBMetric();
        });
    }, []);

  return (
    <View style={styles.container}>
        <Text style={styles.header2}> Basic Metrics </Text>
        <TouchableOpacity
            style={styles.generalButton}
            onPress={() => navigation.navigate('Record Body Metric', {
                metricType: 'Body Weight',
                metricRecord: data.filter(function (entry) {
                    return entry.date === date.setHours(0, 0, 0, 0) &&
                           entry.metric === 'Body Weight';
                }),
            })}
        >
            <Text style={styles.generalButtonFont}> Body Weight </Text>
        </TouchableOpacity>

        <Text style={styles.header2}> Advanced Metrics </Text>
        <TouchableOpacity
            style={styles.generalButton}
            onPress={() => navigation.navigate('Record Body Metric', {
                metricType: 'Left Arm Measurement',
                metricRecord: data.filter(function (entry) {
                    return entry.date === date.setHours(0, 0, 0, 0) &&
                           entry.metric === 'Left Arm Measurement';
                }),
            })}
        >
            <Text style={styles.generalButtonFont}> Left Arm Measurement </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.generalButton}
            onPress={() => navigation.navigate('Record Body Metric', {
                metricType: 'Right Arm Measurement',
                metricRecord: data.filter(function (entry) {
                    return entry.date === date.setHours(0, 0, 0, 0) &&
                           entry.metric === 'Right Arm Measurement';
                }),
            })}
        >
            <Text style={styles.generalButtonFont}> Right Arm Measurement </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.generalButton}
            onPress={() => navigation.navigate('Record Body Metric', {
                metricType: 'Left Leg Measurement',
                metricRecord: data.filter(function (entry) {
                    return entry.date === date.setHours(0, 0, 0, 0) &&
                           entry.metric === 'Left Leg Measurement';
                }),
            })}
        >
            <Text style={styles.generalButtonFont}> Left Leg Measurement </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.generalButton}
            onPress={() => navigation.navigate('Record Body Metric', {
                metricType: 'Right Leg Measurement',
                metricRecord: data.filter(function (entry) {
                    return entry.date === date.setHours(0, 0, 0, 0) &&
                           entry.metric === 'Right Leg Measurement';
                }),
            })}
        >
            <Text style={styles.generalButtonFont}> Right Leg Measurement </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.generalButton}
            onPress={() => navigation.navigate('Record Body Metric', {
                metricType: 'Chest Measurement',
                metricRecord: data.filter(function (entry) {
                    return entry.date === date.setHours(0, 0, 0, 0) &&
                           entry.metric === 'Chest Measurement';
                }),
            })}
        >
            <Text style={styles.generalButtonFont}> Chest Measurement </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.generalButton}
            onPress={() => navigation.navigate('Record Body Metric', {
                metricType: 'Waist Measurement',
                metricRecord: data.filter(function (entry) {
                    return entry.date === date.setHours(0, 0, 0, 0) &&
                           entry.metric === 'Waist Measurement';
                }),
            })}
        >
            <Text style={styles.generalButtonFont}> Waist Measurement </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.generalButton}
            onPress={() => navigation.navigate('Record Body Metric', {
                metricType: 'Hip Measurement',
                metricRecord: data.filter(function (entry) {
                    return entry.date === date.setHours(0, 0, 0, 0) &&
                           entry.metric === 'Hip Measurement';
                }),
            })}
        >
            <Text style={styles.generalButtonFont}> Hip Measurement </Text>
        </TouchableOpacity>
    </View>
  );
}