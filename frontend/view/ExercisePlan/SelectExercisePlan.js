import * as React from 'react';
import { View, ActivityIndicator, TouchableOpacity, Text, FlatList } from 'react-native';
import { cleanString } from '../../utility/format.js';
import { styles } from '../../style/styles';
import { getDefaultWorkoutPlan } from '../../controller/Exercise/workoutPlanController.js';

export function SelectExercisePlan({ navigation, route }) {

  const [data, setData] = React.useState("[]");
  const [isLoading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState(null);

  /* Search via the search bar */
  const searchWorkoutPlans = async () => {
    try {
      const json = await getDefaultWorkoutPlan();
      setData(json.data);
    }catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const formatCell = (item) => {
    if (selected == item){
      return <View style={styles.flatListSearchItemHighlighted}>
        <Text> {item.name} </Text>
      </View>
    }
    else {
      return <View style={styles.flatListSearchItem}>
        <Text> {item.name} </Text>
      </View>
    }
  }

  const handlePress = (item) => {
    setSelected(item);
  }
  
  const handleSaveWorkout = () => {
    if (selected != null){
      console.log("not implemented");
    }
  }

  const handleViewWorkout = () => {
    if (selected != null){
      navigation.navigate('View Exercise Plan', {
        workout: selected,
      });
    }
  }

  // perform event upon accessing page
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      searchWorkoutPlans();
    });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
          style={styles.generalButton}
          onPress={() => handleViewWorkout()}
        >
        <View>
          <Text style={styles.generalButtonFont}> View Workout </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
          style={styles.generalButton}
          onPress={() => handleSaveWorkout()}
        >
        <View>
          <Text style={styles.generalButtonFont}> Save Plan </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.flatListContainer}>
        {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => item._id}
          renderItem={({item}) => <TouchableOpacity onPress={() => handlePress(item)}>{formatCell(item)}</TouchableOpacity>}
        />
        )}
      </View>
    </View>
  );
}
