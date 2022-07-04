// import React,{useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown'
// import {StyleSheet, View} from 'react-native';
// import { globalVar_colorTheme} from './global';

// export function ColorTheme({navigation}) {
//   const handleSelect=(e)=>{
//     globalVar_colorTheme.colorTheme = e;
//     navigation.navigate('Survey');
//   }

//   return (
//     <View>
//           <div className="ColorTheme">
//               <DropdownButton
//                   //   alignRight
//                   title="Select Color Theme"
//                   id="dropdown-menu-align-right"
//                   onSelect={handleSelect}
//               >
//                   <Dropdown.Item eventKey="blue">blue</Dropdown.Item>
//                   <Dropdown.Item eventKey="gold">gold</Dropdown.Item>
//                   <Dropdown.Item eventKey="grey">grey</Dropdown.Item>
//                   {/* <Dropdown.Divider />
//                   <Dropdown.Item eventKey="some link">some link</Dropdown.Item> */}
//               </DropdownButton>
//               {/* <h2><button onClick={() => navigation.navigate('Survey')}>Go to Survey</button></h2> */}
//           </div>
//     </View>
//   );
// };

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
                <Text style={styles.textStyle}>Picker Example</Text>  
                <Picker style={styles.pickerStyle}  
                        selectedValue={this.state.color}  
                        onValueChange={(itemValue, itemPosition) =>  
                            this.setState({color: itemValue, choosenIndex: itemPosition})}  
                    >  
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
