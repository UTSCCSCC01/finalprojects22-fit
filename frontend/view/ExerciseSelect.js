import * as React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { styles } from '../style/styles';

export function ExerciseSelect({ route, navigation }) {
  /* Create hooks */
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  const { exerciseType, SearchType } = route.params;

  /* stringify and clean route params */
  const exerciseTypeClean = JSON.stringify(exerciseType).replace(/['"]+/g, '');
  const SearchTypeClean = JSON.stringify(SearchType).replace(/['"]+/g, '');

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
const getItem = (name) => {
 
  navigation.navigate('Record Exercise', {
    exerciseName: name,
  })

}

  return (
    <View style={styles.container}>
      <Text>exerciseType: {JSON.stringify(exerciseType)}</Text>
      {isLoading ? <ActivityIndicator/> : (
      <FlatList
        data={data}
        keyExtractor={({ id }, index) => id}
        renderItem={({item}) => <Text style={styles.item} onPress={()=> getItem(item.ExerciseName)}>{item.ExerciseName}</Text>}
      />
      )}
    </View>
  );
}