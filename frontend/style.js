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
    bottomWrapper:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginVertical: 5
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
        backgroundColor:primaryOrange
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
        marginVertical:10,
        backgroundColor: '#FFFFFF'
    },
    mainPageText:{
        fontSize:15,
        fontWeight: 'bold'
    }
});