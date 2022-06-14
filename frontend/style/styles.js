import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    padding: 10,
  },
  flatListContainer:{
    flex: 4,
  },
  exerciseLogButtonsContainer:{
    flex:1,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  header1: {
    flex: 1,
    color: "#FF8C42",
    fontSize: 30,
    padding: 10,
    justifyContent: 'center',
  },
  header2: {
    flex: 1,
    color: "#FF8C42",
    fontSize: 20,
    padding: 10,
  },
  exerciseInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flatListItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#F9C784',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    margin: 2,
    fontSize: 16,
    height: 80,
    fontSize: 16,
    color: '#717FC0',
  },
  flatListTextContainer: {
    margin: 2,
    padding: 5,
    justifyContent: 'center',
  },
  flatListText: {
    fontSize: 14,
  },
  flatListDeleteItem: {
    flex: 1,
    backgroundColor: '#FF7272',
    borderColor: '#DC1818',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    margin: 2,
    fontSize: 16,
    height: 80,
    fontSize: 16,
    color: '#000000',
  },
  flatListUpdateItem: {
    flex: 1,
    backgroundColor: '#BBD794',
    borderColor: '#3E5622',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    margin: 2,
    fontSize: 16,
    height: 80,
    fontSize: 16,
    color: '#717FC0',
  },
  exerciseMetricsInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#F9C784',
    borderWidth: 2,
    borderRadius: 10,
    margin: 2,
    height: 40,
    padding: 10,
    textAlign: 'center',
  },
  searchBarInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#F9C784',
    borderWidth: 2,
    borderRadius: 10,
    margin: 5,
    textAlign: 'center',
    fontSize: 16,
  },
  sideButton:{
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#F9C784',
    borderWidth: 2,
    borderRadius: 10,
    margin: 2,
    height: 40,
    width: 40,
    justifyContent: 'center',
  },
  sideButtonFont:{
    flex: 1,
    fontSize: 30,
    color: '#717FC0',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  generalButton:{
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#F9C784',
    borderWidth: 2,
    borderRadius: 10,
    margin: 5,
    height: 40,
    width: 40,
    justifyContent: 'center',
  },
  stretchButton:{
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#F9C784',
    borderWidth: 2,
    borderRadius: 10,
    margin: 5,
    height: 40,
    justifyContent: 'center',
  },
  generalButtonFont:{
    fontSize: 16,
    color: '#717FC0',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
