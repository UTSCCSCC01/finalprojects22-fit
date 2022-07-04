import React, { Component } from 'react'  
import {StyleSheet,View, Text, Button} from 'react-native'  
import {Picker} from '@react-native-picker/picker';
import { globalVar_colorTheme} from './global';

export default class ColorTheme extends Component {  
    state = {  
        choosenIndex: 0 ,
        color:""
    };  
  
    // set global variable color and navigates to optional survey
    navigationHandler () {
      globalVar_colorTheme.colorTheme = this.state.color;
      this.props.navigation.navigate('Optional Survey')
    }

    render() {  
        return (  
            <View style={styles.container}>  
                {/* <Text style={styles.textStyle}>Picker Example</Text>   */}
                <Picker style={styles.pickerStyle}  
                        selectedValue={this.state.color}  
                        onValueChange={(itemValue, itemPosition) =>  
                            this.setState({color: itemValue, choosenIndex: itemPosition})}  
                    >  
                    <Picker.Item label="select color" value="" />  
                    <Picker.Item label="Blue" value="blue" />
                    <Picker.Item label="Gold" value="gold" />  
                    <Picker.Item label="Grey" value="grey" />  
                </Picker>  
                <Text style={styles.textStyle}> {"background color set to "+this.state.color}</Text>  
                {/* <Text>global var is set to : {globalVar_colorTheme.colorTheme}</Text> */}
                <Button 
                  title="go to Optional Survey"
                  onPress={()=>this.navigationHandler()}>
							  </Button>
            </View>  
        );  
    }  
}  
const styles = StyleSheet.create ({  
     container: {  
         flex: 1,  
         alignItems: 'center',  
         justifyContent: 'center',  
        //  backgroundColor: this.state.color
     },  
    textStyle:{  
        margin: 24,  
        fontSize: 25,  
        fontWeight: 'bold',  
        textAlign: 'center',  
    },  
    pickerStyle:{  
        height: 150,  
        width: "80%",  
        color: '#344953',  
        justifyContent: 'center',  
    }  
})  
