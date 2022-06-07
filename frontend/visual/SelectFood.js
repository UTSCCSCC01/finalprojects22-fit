import * as React from 'react';
import { Text, View, Button} from 'react-native';

export function SelectFood({ route, navigation }) {
    const { foodType } = route.params;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Text>foodType: {JSON.stringify(foodType)}</Text>
            <Button
              title="Go to Home Screen"
              onPress={() => navigation.goBack()}
            />
        </View>
    );
}