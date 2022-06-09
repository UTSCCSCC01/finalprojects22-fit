import React, { Component, useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import MainPage from './MainPage';
import axios from 'axios';
const baseURL = '127.0.0.1:3000'
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
//const Stack = createNativeStackNavigator();

class Login extends Component {
    
    state = {
        register: 0,
        login: 0,
        username: '',
        email: '',
        password: ''
    }

    render() {
        return (
            <View>
                {this.loginPage()}
            </View>
        );
    }   
    TextHandler = () => {
        const [username, setUserName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        
        
        
        return (
            <View>
                <TextInput onChangeText={(text)=>{setUserName(text); this.setState({username: username}); }} placeholder='Enter your username'/>
                <TextInput onChangeText={(text)=>{setEmail(text); this.setState({username: email});}} placeholder='Enter your Email address'/>
                <TextInput onChangeText={(text)=>{setPassword(text); this.setState({password: password});}} placeholder='Enter your password'/>
                <Button onPress={()=>this.loginButtonClk()} title="Already have an account? Click here to login"></Button>
                <Button onPress={()=>this.registered(username, email, password)} title="Register">Register</Button>
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
                                <TextInput placeholder='Username'/>
                                <TextInput placeholder='Password'/>
                                <Button onPress={()=>this.registerClk()} title="New User? Click here to register"></Button>
                                <Button title="Login" onPress={()=>this.loginToMain()}></Button>
                            </View>
                        );
                    default: 
                        return(
                            <View>
                                <Text>Register</Text>
                                <this.TextHandler/>
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

    registered(username, email, password){
        console.log(email);
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
            alert("Email address invalid")
        }else{
            if(password.length < 8 || password.length > 32){
                alert("Password must be between 8-32 characters")
            }else{
                if(!/\d/.test(password)){
                    alert("Password must contain 1 number")
                }else{
                    if(!/[a-z]/.test(password)){
                        alert("Password must contain 1 lowercase letter")
                    }else{
                        if(!/[A-Z]/.test(password)){
                            alert("Password must contain 1 uppercase letter")
                        }else{
                            this.wut();
                            this.props.navigation.navigate('Survey');
                        }
                    }
                }
            }
        }   
    }


    async wut(){
        const username = this.state.username.toString;
        const email = this.state.email.toString;
        const password = this.state.password.toString;
        const api = axios.create({
            baseURL: 'http://10.0.2.2:3000'
        })
        await api.post('/users', {
            username: username,
            email: email,
            password: password
        })
        
        // try{
        //     await fetch('http://localhost:3000/users/',
        //     {
        //         method: 'post',
        //         mode: 'no-cors',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-type':'application/json'
        //         },
        //         body: JSON.stringify(
        //             {
        //                 username: username,
        //                 email: email,
        //                 password: password
        //             }
        //         )
        //     })

        // }catch(e){
        //     console.log(e);
        // }
        
        // setIsLoading(true);
        // try {
        //   const response = await axios.post(`${baseUrl}/users`, {
        //     username,
        //     email,
        //     password
        //   });
        //   if (response.status === 201) {
        //     alert(` You have created: ${JSON.stringify(response.data)}`);
        //     setIsLoading(false);
        //   } else {
        //     throw new Error("An error has occurred");
        //   }
        // } catch (error) {
        //   alert("An error has occurred");
        //   setIsLoading(false);
        // }
    };
}

export default Login;