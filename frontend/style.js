import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        padding: 10
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginVertical: 5
    },
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 0.5,
        padding: 10,
        textAlign: 'left',
    },
    foodInput: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        borderWidth: 1,
    },
    button:{
        padding: 10,
        justifyContent: 'left',
    }
});