import * as React from 'react';
import { Text, View, Button} from 'react-native';
import { styles } from '../style';

export function SelectFood({ route, navigation }) {
    const { foodType } = route.params;
    return (
        <View style={styles.container}>
            <Text>foodType: {JSON.stringify(foodType)}</Text>
            <Button
              title="Apple"
              onPress={() => navigation.navigate('Record Food', {
                exerciseName: 'Apple'
              })}
            />
        </View>
    );
}