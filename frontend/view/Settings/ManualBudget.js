import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../style/styles';
import { cleanString, numberToTime } from '../../utility/format';

export function ManualBudget ({ navigation }) {

const [budget, setBudget] = React.useState(2000);

return (
   <View style={styles.recorderContainer}>
            <View style={styles.headercontainer2}>
               <Text style={styles.header2}>{"Calorie Budget: (g)"}</Text>
           </View>
        <View style={styles.exerciseInputContainer}>
            <TouchableOpacity
              style={styles.sideButton}
              onPress={() => budget <= 99 ? setBudget(0)  : setBudget(budget - 100) }
              >
              <Text style={styles.sideButtonFont}> - 100g </Text>
            </TouchableOpacity>

        <TextInput
           style={styles.exerciseMetricsInput}
           selectTextOnFocus={true}
           value={cleanString(budget)}
           onChangeText={text => text === '' ? setBudget(2000) : setBudget(parseInt(text))}
           keyboardType="numeric"
        />

            <TouchableOpacity
              style={styles.sideButton}
              onPress={() => setBudget(budget + 100)}
            >
              <Text style={styles.sideButtonFont}> + 100g </Text>
            </TouchableOpacity>
    </View>

    <TouchableOpacity
      style={styles.generalButton}
      onPress={() => navigation.navigate('Calorie Budget')}
    >
    <Text style={styles.generalButtonFont}> Update Calorie Budget </Text>
    </TouchableOpacity>
   </View>
);
};