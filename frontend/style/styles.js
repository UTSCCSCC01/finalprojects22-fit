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
  subheader1: {
    color: 'gray',
    fontSize: 14,
    padding: 2,
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
  multiOptionContainer: {
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
  flatListSearchDeleteItem: {
    backgroundColor: '#FF7272',
    borderColor: 'gray',
    borderBottomWidth: 1,
    padding: 10,
    margin: 2,
    fontSize: 16,
    height: 45,
    fontSize: 16,
  },
  flatListTextContainer: {
    flex: 4,
    margin: 2,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  setInfoContainer: {
    flex: 4,
    borderColor: 'black',
    borderwidth: 1,
    justifyContent: 'flex-start',
  },
  setButtonContainer: {
    flex: 4,
    borderColor: 'black',
    borderwidth: 1,
    justifyContent: 'flex-end',
  },
  saveButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  flatListText: {
    fontSize: 14,
  },
  flatListItem: {
    flex: 1,
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
  flatListDeleteItem: {
    flex: 1,
    backgroundColor: '#FF7272',
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
  flatListUpdateItem: {
    flex: 1,
    backgroundColor: '#BBD794',
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
  flatListIncompleteItem: {
    flex: 1,
    backgroundColor: '#c7c7c7',
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
  settingsOptionsContiner: {
    justifyContent: 'flex-start',
  },
  settingsOption: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    padding: 10,
    margin: 2,
    height: 35,
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
  sideButtonAlt:{
    backgroundColor: primaryOrange,
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
  ExerciseLogUtilityButton:{
    backgroundColor: primaryPurple,
    borderRadius: 10,
    margin: 5,
    height: 40,
    width: 150,
    justifyContent: 'center',
  },
  generalButtonGray:{
    backgroundColor: lightGray,
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
  generalButtonSmall:{
    backgroundColor: primaryPurple,
    borderRadius: 10,
    margin: 5,
    height: 20,
    justifyContent: 'center',
  },
  generalButtonFontSmall:{
    fontSize: 12,
    color: 'white',
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
  smallRoundButton:{
    height: 45,
    width: 45,
    elevation: 3,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
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
  smallRoundButtonFont:{
    fontSize: 16,
    color: primaryOrange,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  smallHeaderFont:{
    fontSize: 10,
    color:'gray',
  },
  spacingSmall:{
    padding: 10,
  },
  finePrintWarning:{
    fontSize: 10,
    textAlign: "center",
    color: "red",
  },
  finePrintConfirmation:{
    fontSize: 10,
    textAlign: "center",
    color: "green",
  },
});
