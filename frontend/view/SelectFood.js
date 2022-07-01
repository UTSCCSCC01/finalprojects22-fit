import * as React from 'react';
import { ActivityIndicator, FlatList, Text, View} from 'react-native';
import { styles } from '../style';
import { cleanString } from '../utility/format.js';
import { getFoodsByGroup, getFoodsBySearch } from '../controller/SelectFoodController.js'

export function SelectFood({ route, navigation }) {
    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);

    const { foodType, SearchType } = route.params;

    const foodTypeClean = cleanString(foodType);
    const SearchTypeClean = cleanString(SearchType);

     const getGroupFoods = async () => {
        try {
          const json = await getFoodsByGroup(foodTypeClean);
          setData(json.data);
        }catch (error) {
          console.error(error);
        }finally {
          setLoading(false);
        }
     }

     const searchFoods = async () => {
        try {
          const json = await getFoodsBySearch(foodTypeClean);
          setData(json.data);
        }catch (error) {
          console.error(error);
        }finally {
          setLoading(false);
        }
     }

     React.useEffect(() => {
         if (SearchTypeClean === 'Search'){
           searchFoods();
         }
         else{
           getGroupFoods();
         }
     }, []);

     const getItem = (item) => {
       navigation.navigate('Record Food', {
         food_name: item.FoodName,
         food_group: item.FoodGroup,
         food_id: 'N/A',
         calorie: 100,
         carbohydrate: item.Carbohydrate,
         fat: item.Fat,
         protein: item.Protein,
       })

     }

    return (
        <View style={styles.container}>
              {isLoading ? <ActivityIndicator/> : (
                  <FlatList
                    data={data}
                    keyExtractor={(item, index) => item._id}
                    renderItem={({item}) => <Text style={styles.item} onPress={()=> getItem(item)}>{item.FoodName}</Text>}
                  />
              )}
        </View>
    );
}