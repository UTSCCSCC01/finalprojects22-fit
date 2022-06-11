import React, { Component, useState } from 'react';
import { Text, View, TextInput, Button, FlatList } from 'react-native';
import { styles } from '../style';
import MainPage from './MainPage';
import axios from 'axios';
const baseURL = 'http://10.0.2.2:3000'
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
//const Stack = createNativeStackNavigator();

class Login extends Component {
    
    state = {
        register: 0,
        login: 0,
        username: '',
        email: '',
        password: '',
        displayName: '',
        logindata:{}
    }

    render() {
        return (
            <View>
                {this.LoginPage()}
            </View>
        );
    }   

    TextHandler = ()=>{
        const [username, setUserName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [displayName, setdisplayName] = useState('');
        
        
        
        return (
            <View>
                <TextInput
                    style={styles.textInput} 
                    onChangeText={(text)=>{
                    setUserName(text); }} placeholder='Enter your username'/>
                <TextInput 
                    style={styles.textInput}
                    onChangeText={(text)=>{
                    setEmail(text);}} placeholder='Enter your Email address'/>
                <TextInput 
                    style={styles.textInput}
                    onChangeText={(text)=>{
                    setPassword(text);}} placeholder='Enter your password'/>
                <TextInput 
                    style={styles.textInput}
                    onChangeText={(text)=>{
                    setdisplayName(text);}} placeholder='Enter your preferred display name'/>
                <View style={styles.container}>
                    <Button 
                        style={styles.button}
                        onPress={()=>this.loginButtonClk()} 
                        title="Already have an account? Click here to login"></Button>
                </View>
                <View style={styles.container}>
                    <Button 
                        style={styles.button}
                        onPress={()=>this.registered(username, email, password, displayName)} 
                        title="Register">Register</Button>
                </View>
            </View>
        );
      }

    LoginPage(){
        switch(this.state.login){
            case 0:
                switch(this.state.register){
                    case 0:
                        return(
                            <View>
                                <Text style={styles.title}>Login</Text>
                                <TextInput 
                                    style={styles.textInput}
                                    onChangeText={(text)=>{
                                    var loginUserName = text;
                                    this.setState({
                                        email: loginUserName
                                    })}} placeholder='Email'/>
                                <TextInput 
                                    style={styles.textInput}
                                    onChangeText={(text)=>{
                                    var loginPassword = text;                              
                                    this.setState({
                                        password: loginPassword
                                    })}} placeholder='Password'/>
                                <View style={styles.container}>
                                    <Button 
                                        style={styles.button}
                                        onPress={()=>this.registerClk()} 
                                        title="New User? Click here to register"></Button>
                                </View>
                                <View style={styles.container}>
                                    <Button 
                                        style={styles.button}
                                        title="Login" 
                                        onPress={()=>this.loginToMain()}></Button>
                                </View>
                            </View>
                        );
                    default: 
                        return(
                            <View>
                                <Text style={styles.title}>Register</Text>
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
        var loginIndicator = 0;
        const api = axios.create({
            baseURL: baseURL
        })
        api.get('/users/list').then(res => {
            //console.log(res.data.data);
            for(var i = 0; i < res.data.data.length; i++){
                if(res.data.data[i].email == this.state.email){
                    if(res.data.data[i].password == this.state.password){
                        loginIndicator = 1;
                        this.props.navigation.navigate('MainPage');
                    }else{
                        alert('Email or password invalid!');
                        break;
                    }
                }
            }
            if(loginIndicator == 0){
                alert('Email or password invalid!');
            }
        })
        
    }

    registered(username, email, password, displayName){
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
                            this.wut(username, email, password, displayName);
                            this.props.navigation.navigate('Survey');
                        }
                    }
                }
            }
        }   
    }


    async wut(username, email, password, displayName){
        const api = axios.create({
            baseURL: baseURL
        })
        await api.post('/users', {
            username: username,
            display_name: displayName,
            email: email,
            password: password
        });
        
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