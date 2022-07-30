import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../../style/styles';
import { cleanString } from '../../utility/format.js';
import { retrieveUserId } from '../../utility/dataHandler.js';
import { getBodyMetric } from '../../controller/BodyMetric/bodyMetricLogController' ;
import { postUserActivity, getUserActivity, patchUserActivity } from '../../controller/UserActivity/userActivityController';
import moment from 'moment';

export function BodyMetricLog({ navigation, route }) {
    /* Create hooks */
    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [activityData, setActivityData] = React.useState(null);

    const { date } = route.params;

    const cleanDate = moment(date).toDate()
    cleanDate.setHours(0,0,0,0);

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

    /* Pull activity for today */
    const getActivity = async () => {
        try {
            const json = await getUserActivity(cleanString(date));
            setActivityData(json.data);
        } catch (error) {
            console.error(error);
        }
    }

    const hasData = () => {
        const results = cleanString(data === undefined ? null : data.filter(function (entry) {
            return entry.date === cleanDate.toISOString()
        }));
        if (results == null || results === '[]'){
            return false;
        }
        return true;
    }

    const createUserActivity = async () => {
        const userId = await retrieveUserId();
        /* bundle parameters into JSON format */
        const body = JSON.stringify({
            userId: userId, 
            body_activity: hasData(),
            date: date,
        });
    
        const json = await postUserActivity(body);
    }
    
    const updateUserActivity = async (id) => {
        const userId = await retrieveUserId();
        // Need function to check if there was body metric activity recorded on this day
        /* bundle parameters into JSON format */
        const body = JSON.stringify({
            userId: userId, 
            body_activity: hasData(),
            date: date,
        });
    
        const json = await patchUserActivity(id, body);
    }

    // Create activity if none exists. Update as necessary if it does
    const addExerciseActivity = () => {
        if (cleanString(activityData) === '[]'){
            createUserActivity();
        }
        else {
            const activity = JSON.stringify(activityData[0]);
            var json = JSON.parse(activity);
            var id = JSON.stringify(json._id);
            updateUserActivity(cleanString(id));
        }
    }

    React.useEffect(() => {
        navigation.addListener('focus', () => {
            // Reset activityData so event is triggered later
            setActivityData(null);
            Promise.resolve(getBMetric())
            .then(() => getActivity());
        });
    }, []);

    React.useEffect(() => {
        if (activityData != null){
            if (data != null){
                addExerciseActivity();
            }
        }
    }, [activityData]);

    return (
        <View style={styles.container}>
            <Text style={styles.header2}> Basic Metrics </Text>
            <TouchableOpacity
                style={styles.generalButton}
                onPress={() => navigation.navigate('Record Body Metric', {
                    metricType: 'Body Weight',
                    metricRecord: data === undefined ? [] : data.filter(function (entry) {
                        return entry.date === cleanDate.toISOString() &&
                            entry.metric === 'Body Weight';
                    }),
                    date: cleanDate,
                })}
            >
                <Text style={styles.generalButtonFont}> Body Weight </Text>
            </TouchableOpacity>

            <Text style={styles.header2}> Advanced Metrics </Text>
            <TouchableOpacity
                style={styles.generalButton}
                onPress={() => navigation.navigate('Record Body Metric', {
                    metricType: 'Left Arm Measurement',
                    metricRecord: data === undefined ? [] : data.filter(function (entry) {
                        return entry.date === cleanDate.toISOString() &&
                            entry.metric === 'Left Arm Measurement';
                    }),
                    date: cleanDate,
                })}
            >
                <Text style={styles.generalButtonFont}> Left Arm Measurement </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.generalButton}
                onPress={() => navigation.navigate('Record Body Metric', {
                    metricType: 'Right Arm Measurement',
                    metricRecord: data === undefined ? [] : data.filter(function (entry) {
                        return entry.date === cleanDate.toISOString() &&
                            entry.metric === 'Right Arm Measurement';
                    }),
                    date: cleanDate,
                })}
            >
                <Text style={styles.generalButtonFont}> Right Arm Measurement </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.generalButton}
                onPress={() => navigation.navigate('Record Body Metric', {
                    metricType: 'Left Leg Measurement',
                    metricRecord: data === undefined ? [] : data.filter(function (entry) {
                        return entry.date === cleanDate.toISOString() &&
                            entry.metric === 'Left Leg Measurement';
                    }),
                    date: cleanDate,
                })}
            >
                <Text style={styles.generalButtonFont}> Left Leg Measurement </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.generalButton}
                onPress={() => navigation.navigate('Record Body Metric', {
                    metricType: 'Right Leg Measurement',
                    metricRecord: data === undefined ? [] : data.filter(function (entry) {
                        return entry.date === cleanDate.toISOString() &&
                            entry.metric === 'Right Leg Measurement';
                    }),
                    date: cleanDate,
                })}
            >
                <Text style={styles.generalButtonFont}> Right Leg Measurement </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.generalButton}
                onPress={() => navigation.navigate('Record Body Metric', {
                    metricType: 'Chest Measurement',
                    metricRecord: data === undefined ? [] : data.filter(function (entry) {
                        return entry.date === cleanDate.toISOString() &&
                            entry.metric === 'Chest Measurement';
                    }),
                    date: cleanDate,
                })}
            >
                <Text style={styles.generalButtonFont}> Chest Measurement </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.generalButton}
                onPress={() => navigation.navigate('Record Body Metric', {
                    metricType: 'Waist Measurement',
                    metricRecord: data === undefined ? [] : data.filter(function (entry) {
                        return entry.date === cleanDate.toISOString() &&
                            entry.metric === 'Waist Measurement';
                    }),
                    date: cleanDate,
                })}
            >
                <Text style={styles.generalButtonFont}> Waist Measurement </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.generalButton}
                onPress={() => navigation.navigate('Record Body Metric', {
                    metricType: 'Hip Measurement',
                    metricRecord: data === undefined ? [] : data.filter(function (entry) {
                        return entry.date === cleanDate.toISOString() &&
                            entry.metric === 'Hip Measurement';
                    }),
                    date: cleanDate,
                })}
            >
                <Text style={styles.generalButtonFont}> Hip Measurement </Text>
            </TouchableOpacity>
        </View>
    );
}