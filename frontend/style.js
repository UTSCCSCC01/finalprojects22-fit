import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
   container: {
       flex: 1,
       justifyContent: 'space-around',
       marginHorizontal: 16,
   },
   textInput: {
       height: 40,
       margin: 12,
       borderWidth: 1,
       padding: 10,
       textAlign: 'center',
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
});