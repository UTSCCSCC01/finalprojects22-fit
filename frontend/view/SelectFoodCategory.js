import * as React from 'react';
import { View, Button, TextInput, Alert } from 'react-native';
import { styles } from '../style';

export function SelectFoodCategory({ navigation }) {
    return (
         <View style={styles.container}>
            <TextInput
              style={styles.testInput}
              onSubmitEditing ={(event) => navigation.navigate('Select Food', {
                    foodType: event.nativeEvent.text,
                    SearchType: 'Search',
              })}
              placeholder="Search for food"
            />
            <Button
              title="Dairy and Egg Products"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Dairy and Egg Products',
              })}
            />
            <Button
              title="Spices and Herbs"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Spices and Herbs',
              })}
            />
            <Button
              title="Babyfoods"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Babyfoods',
              })}
            />
            <Button
              title="Fats and Oils"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Fats and Oils',
              })}
            />
            <Button
              title="Poultry Products"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Poultry Products',
              })}
            />
            <Button
              title="Soups, Sauces and Gravies"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Soups, Sauces and Gravies',
              })}
            />
            <Button
              title="Sausages and Luncheon meats"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Sausages and Luncheon meats',
              })}
            />
            <Button
              title="Sausages and Luncheon meats"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Sausages and Luncheon meats',
              })}
            />
            <Button
              title="Breakfast cereals"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Breakfast cereals',
              })}
            />
            <Button
              title="Fruits and fruit juices"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Fruits',
              })}
            />
            <Button
              title="Pork Products"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Pork Products',
              })}
            />
            <Button
              title="Vegetables and Vegetable Products"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Vegetables and Vegetable Products',
              })}
            />
            <Button
              title="Nuts and Seeds"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Nuts and Seeds',
              })}
            />
            <Button
              title="Beef Products"
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
              title="Finfish and Shellfish Products"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Finfish and Shellfish Products',
              })}
            />
            <Button
              title="Legumes and Legume Products"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Legumes and Legume Products',
              })}
            />
            <Button
              title="Lamb, Veal and Game"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Lamb, Veal and Game',
              })}
            />
            <Button
              title="Baked Products"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Baked Products',
              })}
            />
            <Button
              title="Sweets"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Sweets',
              })}
            />
            <Button
              title="Cereals, Grains and Pasta"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Cereals, Grains and Pasta',
              })}
            />
            <Button
              title="Fast Foods"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Fast Foods',
              })}
            />
            <Button
              title="Mixed Dishes"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Mixed Dishes',
              })}
            />
            <Button
              title="Snacks"
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Snacks',
              })}
            />
         </View>
    );
}