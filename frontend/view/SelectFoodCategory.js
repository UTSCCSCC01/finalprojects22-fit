import * as React from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from '../style/styles';

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
            <ScrollView vertical>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Dairy and Egg Products',
                SearchType: 'Group',
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Dairy and Egg Products </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Spices and Herbs',
                SearchType: 'Group',
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Spices and Herbs </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Babyfoods',
                SearchType: 'Group',
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Babyfoods </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Fats and Oils',
                SearchType: 'Group',
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Fats and Oils </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Poultry Products',
                SearchType: 'Group',
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Poultry Products </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Soups, Sauces and Gravies',
                SearchType: 'Group',
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Soups, Sauces and Gravies </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Sausages and Luncheon meats',
                SearchType: 'Group',
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Sausages and Luncheon meats </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Breakfast cereals',
                SearchType: 'Group',
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Breakfast cereals </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Fruits',
                SearchType: 'Group',
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Fruits </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Pork Products',
                SearchType: 'Group',
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Pork Products </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Vegetables and Vegetable Products',
                SearchType: 'Group',
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Vegetables and Vegetable Products </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Nuts and Seeds',
                SearchType: 'Group',
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Nuts and Seeds </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Beef',
                SearchType: 'Group',
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Beef </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Beverages',
                SearchType: 'Group',
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Beverages </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Finfish and Shellfish Products',
                SearchType: 'Group',
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Finfish and Shellfish Products </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Legumes and Legume Products',
                SearchType: 'Group',
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Legumes and Legume Products </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Lamb, Veal and Game',
                SearchType: 'Group',
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Lamb, Veal and Game </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Baked Products',
                SearchType: 'Group',
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Baked Products </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Sweets',
                SearchType: 'Group',
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Sweets </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Cereals, Grains and Pasta',
                SearchType: 'Group',
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Cereals, Grains and Pasta </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Fast Foods',
                SearchType: 'Group',
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Fast Foods </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Mixed Dishes',
                SearchType: 'Group',
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Mixed Dishes </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.generalButton}
              onPress={() => navigation.navigate('Select Food', {
                foodType: 'Snacks',
                SearchType: 'Group',
                date: date,
              })}
            >
              <Text style={styles.generalButtonFont}> Snacks </Text>
            </TouchableOpacity>
            </ScrollView>
         </View>
    );
}