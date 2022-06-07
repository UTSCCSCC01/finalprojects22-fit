import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import MainPage from './MainPage';
import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
//const Stack = createNativeStackNavigator();

class Login extends Component {
    
    state = {
        register: 0,
        login: 0
    }

    render() {
        return (
            <View>
                {this.loginPage()}
            </View>
        );
    }   

    loginPage() {
        switch(this.state.login){
            case 0:
                switch(this.state.register){
                    case 0:
                        return(
                            <View>
                                <TextInput>Username</TextInput>
                                <TextInput>Password</TextInput>
                                <Button onPress={()=>this.registerClk()} title="New User? Click here to log in"></Button>
                                <Button title="Login" onPress={()=>this.loginToMain()}></Button>
                            </View>
                        );
                    default: 
                        return(
                            <View>
                                <TextInput>Enter your username</TextInput>
                                <TextInput>Enter your password</TextInput>
                                <Button onPress={()=>this.loginButtonClk()} title="Register">Register</Button>
                            </View>
                        );
                }
            default:
                return(
                    <View>
                        <MainPage/>
                    </View>
                );
        }

        

    }

    loginButtonClk() {
        this.setState({
            register: 0
        });
    }

    registerClk() {
        this.setState({
            register: 1
        });
    }
    
    loginToMain(){
        this.props.navigation.navigate('MainPage');
    }
}

export default Login;