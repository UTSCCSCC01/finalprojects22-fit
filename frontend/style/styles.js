import { StyleSheet } from 'react-native';

// The colours should probably go into their own "constants" file.

export const primaryOrange = '#FF8C42'
export const secondaryOrange ='F9C784'
export const primaryPurple = '#4E598C'
export const secondaryPurple = '#717FC0'
export const lightGray = '#CFD1D0'

export const styles = StyleSheet.create({
  recorderContainer: {
    marginHorizontal: 16,
    padding: 10,
    justifyContent: 'space-around',
  },
  trackActivityContainer:{
    flex: 1,
    marginHorizontal: 16,
    padding: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
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
    margin: 2,
    height: 70,
  },
  flatListUpdateItem: {

    backgroundColor: '#BBD794',
    borderColor: 'gray',
    borderBottomWidth: 1,
    padding: 10,
    margin: 2,
    height: 70,
  },
  exerciseMetricsInput: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    margin: 5,
    height: 40,
    width: 120,
    padding: 10,
    textAlign: 'center',
  },
  exerciseTimeInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 2,
    height: 40,
    width: 40,
    textAlign: 'center',
  },
  searchBarInput: {
    borderColor: 'black',
    borderBottomWidth: 1,
    margin: 5,
    textAlign: 'left',
    fontSize: 16,
  },
  sideButton:{
    backgroundColor: primaryPurple,
    borderRadius: 10,
    margin: 2,
    height: 40,
    width: 40,
    justifyContent: 'center',
  },
  sideButtonGray:{
    backgroundColor: lightGray,
    borderRadius: 10,
    margin: 2,
    height: 40,
    width: 40,
    justifyContent: 'center',
  },
  sideButtonFont:{
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  generalButton:{
    backgroundColor: primaryPurple,
    borderRadius: 10,
    margin: 5,
    height: 40,
    justifyContent: 'center',
  },
  generalButtonFont:{
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  roundButton:{
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: primaryOrange,
  },
  roundButtonFont:{
    fontSize: 22,
    color: primaryOrange,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
