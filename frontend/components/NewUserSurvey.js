import React, { Component } from 'react';
import { Text, View, TextInput, Button, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker';

class UserSurvey extends Component{
    //The whole page is only for demo and for display purposes. Should be replaced by a well designed page
    //by another developer.
    state = {
        surveystage: 0,
        unit: 1,

    }

    render(){
        return(
            <View>
                <this.SurveyView/>
                <Button title='Next' onPress={()=>{
                    this.setState({
                        surveystage: this.state.surveystage+1
                    })
                    if(this.state.surveystage == 5){
                        //this.props.navigation.navigate('Main Page');
                        this.props.navigation.navigate('Color Theme');
                    }
                }}></Button>
            </View>
        );
        
    }

    WeightMetric(){
        if(this.state.unit == 0){
            return(<TextInput>weight in lb</TextInput>);
        }else{
            return(<TextInput>weight in kg</TextInput>);
        }
    }

    HeightMetric(){
        if(this.state.unit == 0){
            return(<View><TextInput>height in inch</TextInput></View>);
        }else{
            return(<TextInput>height in cm</TextInput>);
        }
    }


    SurveyView = ()=>{
        switch(this.state.surveystage){
            default:
                return(
                    <View>
                        <Text>What is your preferred metrics?</Text>
                        <Picker
                           style={{ height: 50, width: 150 }}
                           onValueChange={(itemValue, itemIndex) => {
                            this.setState(
                                {unit: itemValue}
                            );
                        }}
                         >
                           <Picker.Item label="Imperial Units (mile, gallon, lb)" value="0" />
                           <Picker.Item label="Metric Units (km, L, kg)" value="1" />
                        </Picker>
                    </View>
                )
            case 1:
                return(
                    <View>
                        <Text>What is your weight?</Text>
                        {this.WeightMetric()}
                    </View>
                )
            case 2:
                return(
                    <View>
                        <Text>What is your height?</Text>
                        {this.HeightMetric()}
                    </View>
                )
            case 3:
                return(
                    <View>
                        <Text>Do you have access to the gym?</Text>
                        <Picker
                           selectedValue={0}
                           style={{ height: 50, width: 150 }}
                           onValueChange={(itemValue, itemIndex) => {
                            this.setState(
                                {unit: selectedIndex}
                            )
                        }}
                         >
                           <Picker.Item label="Yes" value="0" />
                           <Picker.Item label="No" value="1" />
                        </Picker>
                    </View>
                )
            case 4:
                return(
                    <View>
                        <Text>Are you over 21 years old?</Text>
                        <Picker
                           selectedValue={0}
                           style={{ height: 50, width: 150 }}
                           onValueChange={(itemValue, itemIndex) => {
                            this.setState(
                                {unit: selectedIndex}
                            )
                        }}
                         >
                           <Picker.Item label="Yes" value="0" />
                           <Picker.Item label="No" value="1" />
                        </Picker>
                    </View>
                )
            case 5:
                return(
                    <View>
                        <Text>What is your main fitness goal?</Text>
                        <Picker
                           selectedValue={0}
                           style={{ height: 50, width: 150 }}
                           onValueChange={(itemValue, itemIndex) => {
                            this.setState(
                                {unit: selectedIndex}
                            )
                        }}
                         >
                           <Picker.Item label="be healthy" value="0" />
                           <Picker.Item label="body building" value="1" />
                           <Picker.Item label="strength training" value="2" />
                           <Picker.Item label="look good" value="3" />
                        </Picker>
                    </View>
                )
            case 6:
                return(
                    <View>
                        <Text>Thanks! Now loading</Text>
                    </View>
                );
        }
    }
}

export default UserSurvey;