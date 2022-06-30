import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import {StyleSheet, View} from 'react-native';
import { globalVar_colorTheme} from './global';

export function ColorTheme({navigation}) {
  // const [color,setColor]=useState('');
  const handleSelect=(e)=>{
    //setColor(e);
    globalVar_colorTheme.colorTheme = e;
    navigation.navigate('Survey');
  }
//   const gotoSurvey = () => {
//     globalVar_colorTheme.colorTheme = color.toString();
//     navigation.navigate('Survey');
// }
  return (
    <View>
          <div className="ColorTheme">
              <DropdownButton
                  //   alignRight
                  title="Select Color Theme"
                  id="dropdown-menu-align-right"
                  onSelect={handleSelect}
              >
                  <Dropdown.Item eventKey="blue">blue</Dropdown.Item>
                  <Dropdown.Item eventKey="gold">gold</Dropdown.Item>
                  <Dropdown.Item eventKey="grey">grey</Dropdown.Item>
                  {/* <Dropdown.Divider />
                  <Dropdown.Item eventKey="some link">some link</Dropdown.Item> */}
              </DropdownButton>
              {/* <h2><button onClick={() => navigation.navigate('Survey')}>Go to Survey</button></h2> */}
          </div>
    </View>
  );
};


