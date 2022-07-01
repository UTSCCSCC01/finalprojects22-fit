import React, { Component, useContext, useState } from 'react';
import { Text, View, TextInput, Button, FlatList } from 'react-native';
import { styles } from '../style';
import MainPage from './MainPage';
import LoginCredHandler from './LoginCredHandler';
import axios from 'axios';
const baseURL = 'http://10.0.2.2:3000'
import { SetContext,useUpdateUserContext, useUserContext, UserContext, UpdateUserContext } from '../context/UserContext';

//import { createNativeStackNavigator } from '@react-navigation/native-stack';
//const Stack = createNativeStackNavigator();

// export const SetContext = (content) => {
//     console.log("reday");
//     const use = useContext(UpdateUserContext);
//     use(content);
//     return(
//         <View></View>
//     );
// }


export const Login = (navigation) => {
    //this component handles both login and register.
    //it will return different elements when this.state.register indicates differently



    const [register,setRegister] = useState(0);
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [displayName,setDisplayName] = useState('');
    const [logindata,setLogindata] = useState({});
    const [login,setLogin] = useState(false);
      

    static contextType=UserContext; 


    return (
        <View>
            <LoginCheck/>
        </View>
    );
}


    

    const TextHandler = ()=>{
        //this handles the interface for registration. Use the states to save the user input 
        //and send the input to the register handler
        const [username, setUserName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [displayName, setdisplayName] = useState('');
        
        
        
        return (
            <View style={styles.userInteractArea}>
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

    function LoginPageComp(register){
        //when this.state.register indicate 0, returns the login page. When indicates 1, returns the register page
            if(this.state.register == 0){
                return(
                    <View>
                        <Text style={styles.title}>Login</Text>
                        <View>
                            <View>
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
                                    <this.LoginToMain/>
                                </View>
                            </View>
                        </View>  
                    </View>
                );
            }else{
                return(
                    <View>
                        <Text style={styles.title}>Register</Text>
                        <this.TextHandler/>
                    </View>
                );
        }
    }



    LoginCheck = ()=>{
        
        var userLoginCheck = this.context;

        console.log(userLoginCheck);
        if(this.context == false){
            return(
                <View>
                     {this.LoginPageComp()}
                </View>
            )
        }else{
            console.log("login:"+userLoginCheck);
            this.props.navigation.navigate('MainPage');
            return(
                <View>
                    <Text>Logged in successfully!</Text>
                    <Button title='Log out' onPress={()=>{
                        this.context = false;
                    }}></Button>
                </View>
            )
        }
    }

    loginButtonClk() {
        //set register to 0 to let the main view return the login page
        this.setState({
            register: 0
        });
    }

    registerClk() {
        //set register to 1 to let the main view return the register page
        this.setState({
            register: 1
        });
        
    }
    
    LoginToMain = () => {
        //this is the login handler, get the user list with axio api and find 
        //if the user input and the user list in the db are the same.If there's a match, 
        //return the user home page, if not, return 'Email or password invalid!'
        const [login, setLogin] = useState(0);
        const [loginCred, setLoginCred] = useState(false);

        const setContext = ()=>{
            console.log("reday");
            useUpdateUserContext(loginCred);
            
        };
        //useUserContext();
        ///useUpdateUserContext();
        
        if(login == 1){
            console.log("???");
            var loginIndicator = 0;
            const api = axios.create({
                baseURL: baseURL
            })
            api.get('/users/list').then((res) => {
                //console.log(res.data.data);
                for(var i = 0; i < res.data.data.length; i++){
                    if(res.data.data[i].email == this.state.email){
                        if(res.data.data[i].password == this.state.password){
                            loginIndicator = 1;
                            setLoginCred(res.data.data[i].email);
                            console.log("yeah\n"+ res.data.data[i].email);
                            this.props.navigation.navigate('MainPage');
                            setLogin(0);
                        }
                    }
                }
                if(loginIndicator == 0){
                    alert('Email or password invalid!');
                    setLogin(0);
                }else{
                    return(
                        <View>
                            <Button 
                                style={styles.button}
                                title="Login" 
                                onPress={()=>{
                                    setLogin(1)}}></Button>
                            <LoginCredHandler val={loginCred}/>
                                
                        </View>
                    );
                }
            })
        }
        

        return(
            <View>
                <Button 
                    style={styles.button}
                    title="Login" 
                    onPress={() => {
                        setLogin(1);
                    }}></Button>
            </View>
        );
        
    }

    registered(username, email, password, displayName){
        //This is the register handler. Check if the email and the password matches the 
        //requirements. If not, return which requirements is invalid.
        //Else, use the method post(username, email, password, displayName) to add the user information to the database.
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
                            this.post(username, email, password, displayName);
                            this.props.navigation.navigate('Survey');
                        }
                    }
                }
            }
        }   
    }


    async post(username, email, password, displayName){
        //This is the post request handler. This uses the axios api to post a request to
        //the database.
        const api = axios.create({
            baseURL: baseURL
        })
        await api.post('/users', {
            username: username,
            display_name: displayName,
            email: email,
            password: password
        });
    };

    
}

export default Login;