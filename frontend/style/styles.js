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
  customExerciseSubContainer: {
    flexDirection: 'row',
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
  exercisePlanViewHeader: {
    color: primaryOrange,
    fontSize: 22,
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
  customExerciseComponentContainers: {
    marginBottom: 12,
    marginTop: 12,
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
  WorkoutPlanContainer: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    flex: 1,
    padding: 5,
    justifyContent: 'flex-start',
    fontSize: 16,
  },
  WorkoutPlanContainerHighlighted: {
    borderColor: primaryOrange,
    borderWidth: 2,
    flex: 1,
    padding: 5,
    justifyContent: 'flex-start',
    fontSize: 16,
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
  ExerciseLogUtilityButtonGray:{
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
  pickerContainer: {
    flex: 1,
  },
  textStyle:{  
      fontSize: 20,  
      color: '#344953',
      textAlign: 'left',  
  },  
  pickerStyle: {  
      height: 150,
      width: "80%",
      color: '#344953',
      justifyContent: 'center',  
   },
   displayText: {
    fontSize: 15,
    alignItems: 'flex-start',
    color: primaryPurple,
    fontWeight: "bold"
  },
  nameInput: {
    marginTop: -10,
    marginLeft: 10,
    height: 40,
    borderBottomWidth: 1,
    paddingBottom: 0
  },
  bioInput: {
    height: 120,
    marginLeft: 30,
    borderWidth: 1,
    padding: 10,
  },
  appButtonContainer: {
    backgroundColor: primaryOrange,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  appButtonText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  customExerciseText: {
    color: primaryPurple,
    fontWeight: 'bold',
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
  searchTabTitle: {
    marginLeft: '12%',
    marginTop: 5,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: "left",
    color: primaryPurple
  },
  searchTabSubtitle: {
    marginLeft: '12%',
    marginBottom: 5,
    fontSize: 15,
    textAlign: "left",
    color: primaryPurple
  },
  freqConfirmText: {
    fontSize: 10,
    color: "#fff",
    alignSelf: "center",
    fontWeight: "bold",
  },
  freqDeleteText: {
    fontSize: 10,
    color: primaryOrange,
    alignSelf: "center",
    fontWeight: "bold",
  },
  freqConfirmContainer: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 8,
    width: 60,
    height: 30,
    backgroundColor: primaryOrange,
    borderRadius: 15,
  },
  freqDeleteContainer: {
    marginTop: 10,
    marginRight: 10,
    paddingVertical: 8,
    width: 60,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: primaryOrange,
  },
  freqHeader: {
    marginLeft: 20,
    color: primaryPurple,
    fontSize: 20,
    padding: 15
  }, 
  noFReq: {
    color: 'gray',
    fontSize: 20,
    padding: 10,
    textAlign: 'center'
  }
});