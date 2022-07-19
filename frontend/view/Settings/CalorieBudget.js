import React, { Component } from 'react'
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../../style/styles';
import { cleanString, numberToTime } from '../../utility/format';

export function CalorieBudget ({ navigation }) {
return (
    <View style={styles.container}>
       <View style={styles.exerciseLogButtonsContainer}>
         <View style={styles.rowContainer}>
           <TouchableOpacity
             style={styles.generalButton}
             onPress={() => navigation.navigate('Manual Budget')}
           >
           <Text style={styles.generalButtonFont}> Manually Set Calories Budget </Text>
           </TouchableOpacity>
         </View>
         <View style={styles.rowContainer}>
           <TouchableOpacity
             style={styles.generalButton}
             onPress={() => navigation.navigate('Automatic Budget')}
           >
             <Text style={styles.generalButtonFont}> Automatically set Caloric Budget </Text>
           </TouchableOpacity>
         </View>
       </View>
     </View>
    );
};
       /*<View style={styles.flatListContainer}>
         {isLoading ? <ActivityIndicator/> : (
         <FlatList
           data={data}
           keyExtractor={(item, index) => item._id}
           renderItem={({item}) => <Text style= {selectStyle()} onPress={()=> doEvent(item)}>{formatCell(item)}</Text>}
         />
         )
       </View>*/

