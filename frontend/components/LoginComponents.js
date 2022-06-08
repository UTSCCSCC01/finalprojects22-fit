import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import MainPage from './MainPage';
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
                                <Text>Login</Text>
                                <TextInput>Username</TextInput>
                                <TextInput>Password</TextInput>
                                <Button onPress={()=>this.registerClk()} title="New User? Click here to register"></Button>
                                <Button title="Login" onPress={()=>this.loginToMain()}></Button>
                            </View>
                        );
                    default: 
                        return(
                            <View>
                                <Text>Register</Text>
                                <TextInput>Enter your username</TextInput>
                                <TextInput>Enter your Email address</TextInput>
                                <TextInput>Enter your password</TextInput>
                                <Button onPress={()=>this.loginButtonClk()} title="Already have an account? Click here to login"></Button>
                                <Button onPress={()=>this.registered()} title="Register">Register</Button>
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

    registered(){
        this.props.navigation.navigate('Survey');
    }
}

export default Login;