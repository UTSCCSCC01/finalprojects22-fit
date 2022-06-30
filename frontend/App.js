import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Survey} from './view/Survey.js';
import {Plan} from './view/Plan.js';
import {ColorTheme} from './view/ColorTheme.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName= "ColorTheme">
        <Stack.Group>
          <Stack.Screen name= "ColorTheme" component={ColorTheme} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name= "Survey" component={Survey} />
          <Stack.Screen name = "Plan" component = {Plan} />
        </Stack.Group>
      </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;


// import React,{useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown'


// function App() {
//   const [value,setValue]=useState('');
//   const handleSelect=(e)=>{
//     console.log(e);
//     setValue(e)
//   }
//   return (
//     <div className="App container">
      
//       <DropdownButton
//       alignRight
//       title="Dropdown right"
//       id="dropdown-menu-align-right"
//       onSelect={handleSelect}
//         >
//               <Dropdown.Item eventKey="option-1">option-1</Dropdown.Item>
//               <Dropdown.Item eventKey="option-2">option-2</Dropdown.Item>
//               <Dropdown.Item eventKey="option-3">option 3</Dropdown.Item>
//               <Dropdown.Divider />
//               <Dropdown.Item eventKey="some link">some link</Dropdown.Item>
//       </DropdownButton>
//       <h4>You selected {value}</h4>
//     </div>
//   );
// }

// export default App;
