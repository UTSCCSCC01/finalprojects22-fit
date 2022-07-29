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
<<<<<<< Updated upstream
=======
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
    primaryOrangeTextAlt:{
        color: primaryOrange,
        maxWidth: 175
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
    },
    mainSelectionElement:{
        minWidth: 180,
        maxWidth:180,
        padding:20,
        marginVertical:12,
        backgroundColor: '#FFFFFF',
        borderRadius: 17
    },
>>>>>>> Stashed changes
});