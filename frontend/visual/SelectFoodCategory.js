import * as React from 'react';
import { View, Button, TextInput, Alert } from 'react-native';
import { styles } from '../style';

export function SelectFoodCategory({ navigation }) {
    return (
         <View style={styles.container}>
            <TextInput
              style={styles.input}
              onSubmitEditing ={(event) => (Alert.alert(event.nativeEvent.text))}
              placeholder="Search for food"
            />
            <Button
              title="Dairy and Egg Products"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Dairy and Egg Products',
              })}
            />
            <Button
              title="Poultry"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Poultry',
              })}
            />
            <Button
              title="Soups"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Soups',
              })}
            />
            <Button
              title="Baked Products"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Sausage and Luncheon meats',
              })}
            />
            <Button
              title="Cereals, Grains and Pasta"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Breakfast Cereals',
              })}
            />
            <Button
              title="Fruits"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Fruits',
              })}
            />
            <Button
              title="Pork"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Pork',
              })}
            />
            <Button
              title="Vegetables"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Vegetables',
              })}
            />
            <Button
              title="Fish and Seafood"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Fish and Seafood',
              })}
            />
            <Button
              title="Beef"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Beef',
              })}
            />
            <Button
              title="Beverages"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Beverages',
              })}
            />
            <Button
              title="Sweets"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Sweets',
              })}
            />
            <Button
              title="Fast Food"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Fast Food',
              })}
            />
         </View>
    );
}