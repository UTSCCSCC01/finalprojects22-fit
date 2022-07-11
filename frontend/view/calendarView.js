import * as React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator  } from 'react-native';
import { styles } from '../style/styles';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { getAllUserActivity } from '../controller/calendarController';

export function Calendar({ navigation }) {
  const [selectedStartDate, setSelectedStartDate] = React.useState(moment());
  const [userActivity, setUserActivity] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [arrayLength, setArrayLength] = React.useState(0);
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';

  // Pull history of user activity
  const getUserActivity = async () => {
    try {
      const json = await getAllUserActivity();
      setUserActivity(json.data);
      setArrayLength(json.data.length);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Perform event on date change
  const onDateChange = (date) => {
    setSelectedStartDate(date);
  }

  /* Checks if second date is the same day as first date */
  const sameDay = (firstDate, secondDate) => {
    const lowerBound = new Date(secondDate).setHours(0,0,0,0);
    const targetDate = new Date(firstDate).getTime();
    const upperBound = new Date(secondDate).setHours(24,0,0,0);
    return (lowerBound <= targetDate) && (targetDate < upperBound);
  }

const hasActivity = (activity) => {
  if (((JSON.stringify(activity.exercise_activity)) == "true") || 
    (JSON.stringify(activity.food_activity) == "true") ||
    (JSON.stringify(activity.body_activity) == "true"))
    {
      return true;
    }
    return false;
}

  // Return true if day has activity recorded on it
  const checkDatesForActivity = (date) => {
    var result = false;
    for (var i = 0; i < arrayLength; i++)
    {
      var activity = JSON.stringify(userActivity[i]);
      var activityJson = JSON.parse(activity);
      if (sameDay(activityJson.date, date))
      {
        if (hasActivity(activityJson))
        {
          result = true;
        }
        break;
      }
    }
    return result;
  }

  const formatDate = (date) => {
    const ISOdate = new Date(date).getTime();
    return moment(ISOdate).format('MMMM D, YYYY');
  }

  // Change colour in individual dates if they have activity on them
  const customDatesStylesCallback = (date) => {

    if (checkDatesForActivity(date))
    {
      if (moment().isAfter(date))
      {
        // PAST DAY
        return {
          style:{
            backgroundColor: '#F9C784',
          }
        };
      }
      else
      {
        // FUTURE DAY
        return {
          style:{
            backgroundColor: '#717FC0',
          }
        };
      }
    }
    else {
      return {
        style:{
          backgroundColor: 'transparent',
        }
      };
    }
  }

  // Perform event upon navigation to screen
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      getUserActivity()
    });
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (<CalendarPicker
        todayBackgroundColor='transparent'
        selectedDayColor='#FF8C42'
        customDatesStyles={customDatesStylesCallback}
        onDateChange={onDateChange}
      />
      )}
      <TouchableOpacity
        style={styles.generalButton}
        onPress={() => navigation.navigate('Track Activity Select', {
          date: startDate
        })}
      >
        <Text style={styles.generalButtonFont}> Track activity for: {formatDate(startDate)} </Text>
      </TouchableOpacity>

    </View>
  );
}