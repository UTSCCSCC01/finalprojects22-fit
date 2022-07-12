import React, { Component } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import { styles } from '../../style';

export function Setting ({ navigation }) {
    return(
        <View>
            <Button style={styles.button} title='Color Theme' onPress={()=>{
                navigation.navigate('Color Theme')
            }}></Button>
            <Button style={styles.button} title='Set Exercise Plan' onPress={()=>{
                // navigation.navigate('Optional Survey')
            }}></Button>
            <Button style={styles.button} title='Set Calories Budget' onPress={()=>{
                // navigation.navigate('Color Theme')
            }}></Button>
        </View>
    );  
s
}