import { StyleSheet } from 'react-native'

const primaryOrange = '#FF8C42'
const secondaryOrange ='F9C784'
const primaryPurple = '#4E598C'
const secondaryPurple = '#717FC0'
const lightGray = '#CFD1D0'

export const styles = StyleSheet.create({

    title: {
        color: primaryOrange,
        fontSize: 40,
        padding: 10
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginVertical: 5
    },
    mainInterface:{
        marginTop: 150,
        height: '100%',
        // position: 'absolute', //Here is the trick
        // bottom: 0, //Here is the trick
    },
    userInteractArea: {
        color: primaryOrange,
        height: 50,
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
    },
    textInput: {
        fontSize: 20,
        height: 40,
        margin: 12,
        textDecorationLine: 'underline',
        padding: 10,
        textAlign: 'left',
        borderBottomColor: '#000', // Add this to specify bottom border color
        borderBottomWidth: 2     // Add this to specify bottom border thickness
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
    mainPressable:{
        backgroundColor:primaryOrange,
        padding: 10,
        borderRadius: 6,
    },
    subPressable:{
        backgroundColor:primaryPurple,
        padding: 10,
        borderRadius: 6,
    },
    textInPressable:{
        fontSize: 18,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    primaryOrangeText:{
        color: primaryOrange
    },
    breakingLine: {
        marginVertical: 8,
        textAlign: 'left',
        borderBottomColor: '#a0a0a0', 
        borderBottomWidth: 1, 
        fontSize:0
    },
    mainPageElement:{
        padding:10,
        marginVertical:12,
        backgroundColor: '#FFFFFF',
        borderRadius: 17
    },
    mainPageText:{
        fontSize:25,
        fontWeight: 'bold'
    },
    grid:{
        margin:10,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: "auto",
    },
    progressBar:{
        margin: 10
    }
});