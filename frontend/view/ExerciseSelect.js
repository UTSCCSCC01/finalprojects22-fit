import * as React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { styles } from '../style/styles';
import { cleanString } from '../utility/format.js';

export function ExerciseSelect({ route, navigation }) {
  /* Create hooks */
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  const { exerciseType, SearchType } = route.params;

  /* stringify and clean route params */
  const exerciseTypeClean = cleanString(exerciseType);
  const SearchTypeClean = cleanString(SearchType);

  /* Search by muscle group (including cardio) */
  const getGroupExercises = async () => {
    try {
      const response = await fetch('http://localhost:3000/exercises/Groups/'.concat(exerciseTypeClean));
      const json = await response.json();
      setData(json.data);
    }catch (error) {
      console.error(error);
    }finally {
      setLoading(false);
    }
  }

  /* Search via the search bar */
  const searchExercises = async () => {
    try {
      const response = await fetch('http://localhost:3000/exercises/Search/'.concat(exerciseTypeClean));
      const json = await response.json();
      setData(json.data);
    }catch (error) {
      console.error(error);
    }finally {
      setLoading(false);
    }
  }

  /* Trigger Query */
  React.useEffect(() => {
    if (SearchTypeClean === 'Search'){
      searchExercises();
    }
    else{
      getGroupExercises();
    }
  }, []);

/* Navigates to next page  */
const getItem = (item) => {
 
  navigation.navigate('Record Exercise', {
    exercise_name: item.ExerciseName,
    exercise_group: item.MuscleGroup,
  })

}

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
      <FlatList
        data={data}
        keyExtractor={({ id }, index) => id}
        /* need to also pull muscle group into get item to push it into next page to check if cardio*/
        renderItem={({item}) => <Text style={styles.item} onPress={()=> getItem(item)}>{item.ExerciseName}</Text>}
      />
      )}
    </View>
  );
}