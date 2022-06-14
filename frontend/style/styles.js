import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    justifyContent: 'space-around',
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
  },
  exerciseInput: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 3,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 80,
    borderWidth: 1,
  },
  deleteItem: {
    padding: 10,
    fontSize: 18,
    height: 80,
    color: 'red',
    borderWidth: 1,
    borderColor: 'red',
  },
  updateItem: {
    padding: 10,
    fontSize: 18,
    height: 80,
    color: 'green',
    borderWidth: 1,
    borderColor: 'green',
  },
});
