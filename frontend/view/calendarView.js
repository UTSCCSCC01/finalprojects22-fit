import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../style/styles';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

export function Calendar({ navigation }) {
  const [selectedStartDate, setSelectedStartDate] = React.useState(moment())
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';

  // Perform event on date change
  const onDateChange = (date) => {
    setSelectedStartDate(date);
  }

  // Return true if day has activity recorded on it
  const hasActivity = (date) => {
    // To do: implement
    return true;
  }

  const formatDate = (date) => {
    return moment(date).format('MMMM D, YYYY');
  }

  // Change colour in individual dates if they have activity on them
  const customDatesStylesCallback = date => {

    if (hasActivity(date))
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
  }

  return (
    <View style={styles.container}>
      <CalendarPicker
        todayBackgroundColor='transparent'
        selectedDayColor='#FF8C42'
        customDatesStyles={customDatesStylesCallback}
        onDateChange={onDateChange}
      />

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