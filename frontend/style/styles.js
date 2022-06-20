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
    padding: 10,
  },
  flatListContainer:{
    flex: 4,
  },
  exerciseLogButtonsContainer:{
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  addLogContainer: {
  },
  header1: {
    color: primaryOrange,
    fontSize: 28,
    padding: 10,
    fontWeight: "bold",
    justifyContent: 'center',
    textAlign: 'center',
  },
  header2: {
    color: 'gray',
    fontSize: 20,
    padding: 10,
  },
  headercontainer2:{
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
  exerciseInputContainer: {
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flatListSearchItem: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    padding: 10,
    margin: 2,
    fontSize: 16,
    height: 45,
    fontSize: 16,
  },
  flatListItem: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    padding: 10,
    margin: 2,
    height: 70,
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
    backgroundColor: '#FF7272',
    borderColor: 'gray',
    borderBottomWidth: 1,
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
