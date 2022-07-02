import * as React from 'react';
import { View, Button, TextInput, Alert } from 'react-native';
import { styles } from '../style';

export function SelectFoodCategory({ navigation, route }) {
  const { date } = route.params;

    return (
         <View style={styles.container}>
            <TextInput
              style={styles.testInput}
              onSubmitEditing ={(event) => navigation.navigate('Select Food', {
                    foodType: event.nativeEvent.text,
                    SearchType: 'Search',
                    date: date,
              })}
              placeholder="Search for food"
            />
            <Button
              title="Dairy and Egg Products"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Dairy and Egg Products',
                SearchType: 'Group',
                date: date,
              })}
            />
            <Button
              title="Spices and Herbs"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Spices and Herbs',
                SearchType: 'Group',
                date: date,
              })}
            />
            <Button
              title="Babyfoods"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Babyfoods',
                SearchType: 'Group',
                date: date,
              })}
            />
            <Button
              title="Fats and Oils"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Fats and Oils',
                SearchType: 'Group',
                date: date,
              })}
            />
            <Button
              title="Poultry Products"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Poultry Products',
                SearchType: 'Group',
                date: date,
              })}
            />
            <Button
              title="Soups, Sauces and Gravies"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Soups, Sauces and Gravies',
                SearchType: 'Group',
                date: date,
              })}
            />
            <Button
              title="Sausages and Luncheon meats"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Sausages and Luncheon meats',
                SearchType: 'Group',
                date: date,
              })}
            />
            <Button
              title="Breakfast cereals"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Breakfast cereals',
                SearchType: 'Group',
                date: date,
              })}
            />
            <Button
              title="Fruits and fruit juices"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Fruits',
                SearchType: 'Group',
                date: date,
              })}
            />
            <Button
              title="Pork Products"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Pork Products',
                SearchType: 'Group',
                date: date,
              })}
            />
            <Button
              title="Vegetables and Vegetable Products"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Vegetables and Vegetable Products',
                SearchType: 'Group',
                date: date,
              })}
            />
            <Button
              title="Nuts and Seeds"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Nuts and Seeds',
                SearchType: 'Group',
                date: date,
              })}
            />
            <Button
              title="Beef Products"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Beef',
                SearchType: 'Group',
                date: date,
              })}
            />
            <Button
              title="Beverages"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Beverages',
                SearchType: 'Group',
                date: date,
              })}
            />
            <Button
              title="Finfish and Shellfish Products"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Finfish and Shellfish Products',
                SearchType: 'Group',
                date: date,
              })}
            />
            <Button
              title="Legumes and Legume Products"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Legumes and Legume Products',
                SearchType: 'Group',
                date: date,
              })}
            />
            <Button
              title="Lamb, Veal and Game"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Lamb, Veal and Game',
                SearchType: 'Group',
                date: date,
              })}
            />
            <Button
              title="Baked Products"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Baked Products',
                SearchType: 'Group',
                date: date,
              })}
            />
            <Button
              title="Sweets"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Sweets',
                SearchType: 'Group',
                date: date,
              })}
            />
            <Button
              title="Cereals, Grains and Pasta"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Cereals, Grains and Pasta',
                SearchType: 'Group',
                date: date,
              })}
            />
            <Button
              title="Fast Foods"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Fast Foods',
                SearchType: 'Group',
                date: date,
              })}
            />
            <Button
              title="Mixed Dishes"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Mixed Dishes',
                SearchType: 'Group',
                date: date,
              })}
            />
            <Button
              title="Snacks"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Snacks',
                SearchType: 'Group',
                date: date,
              })}
            />
         </View>
    );
}