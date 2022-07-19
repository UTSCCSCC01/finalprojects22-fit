import React, { Component } from 'react'
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../../style/styles';
import { cleanString, numberToTime } from '../../utility/format';

export function AutoBudget () {
return (
    <View style={styles.container}>
       <Text>{"autobudget"}</Text>
     </View>
     );
};