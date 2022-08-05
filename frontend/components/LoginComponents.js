import React, { Component, useContext, useEffect, useState } from 'react';
import { Text, View, TextInput, Button, Pressable, Image } from 'react-native';
import { styles } from '../style';
import axios from 'axios';
const baseURL = 'http://10.0.2.2:3000'
import { UserContext, UpdateUserContext } from '../context/UserContext';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

//import { createNativeStackNavigator } from '@react-navigation/native-stack';
//const Stack = createNativeStackNavigator();

export const SetContextComp = (content) => {
    const use = useContext(UpdateUserContext);
    const loginCred = useContext(UserContext);
    //console.log("check if the same: "+loginCred + content.content)
    console.log("call set context: " + content.content + " " + loginCred);
    let isMounted = true;
    useEffect(()=>{
        console.log("useEffect: "+ isMounted)
        if(loginCred == false && content.content != loginCred && isMounted == true && content.content != undefined && content.indicator == true ){     
            console.log("set "+content.content + loginCred);
            use(content.content);
        }
        return(()=>{
            isMounted=false
        })
    })
    
    return(null);
}

export const LogOutComp = (content) => {
    //console.log("Log out: " + content.content);
    const use = useContext(UpdateUserContext);
    const loginCred = useContext(UserContext);
    useEffect(()=>{
        let isMounted = true;
        if(content.content == false && loginCred != false && isMounted == true){
            use(false);
        }
        return(()=>{isMounted =false;});
    })

    return(null);
}


class Login extends Component {
    //this component handles both login and register.
    //it will return different elements when this.state.register indicates differently


    state = {
        register: 0,
        username: '',
        email: '',
        password: '',
        displayName: '',
        checkIn: 0,
        logindata:{},
        login: false
    }

    static contextType=UserContext; 

    

    render() {
        if(this.state.login != false || this.state.checkIn == 1){
            return(
                <View style={{
                    backgroundColor:'#FFFFFF',
                    padding: 5,
                    height: '100%'
                }}>
                    <this.LoginCheck/>
                </View>
            )
        }
        return (
            <View style={{
                backgroundColor:'#FFFFFF',
                padding: 5,
                height: '100%'
            }}>
                <this.GreetingInterface/>
            </View>
        )
    }   

    GreetingInterface = () => {
        return(
            <View style={styles.mainInterface}>
                <View style={
                    {
                        alignItems: 'center'
                    }
                }>
                    <Image 
                        style={{
                            resizeMode: 'contain',
                            width: 250,
                            height: 250,
                            alignItems:'center'
                            }}
                        source={require('../assets/icon.png')}/>
                    <Text style={
                        {
                            color:'#4E598C',
                            fontSize: 20
                        }
                    }>Making fitness easier for every one</Text>
                </View>
                
                <View style={{
                    marginTop: 80
                }}>
                    <View style={styles.container}>
                        <Pressable 
                            style={styles.mainPressable}
                            onPress={()=>(this.setState({
                                checkIn: 1,
                                login: 0
                            }))}>
                                <Text style={styles.textInPressable}>Login</Text>
                            </Pressable>
                        <Text style={styles.breakingLine}></Text>
                        <Pressable 
                            style={styles.subPressable}
                            onPress={()=>(this.setState({
                                checkIn: 1,
                                login: 1
                            }))}>
                                <Text style={styles.textInPressable}>Register</Text>
                            </Pressable>
                    </View>
                </View>
                
            </View>
            
        );
    }

    

    TextHandler = ()=>{
        //this handles the interface for registration. Use the states to save the user input 
        //and send the input to the register handler
        const [username, setUserName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [displayName, setdisplayName] = useState('');
        
        
        
        return (
            <View style={styles.mainInterface}>
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
                    <Pressable 
                        style={styles.mainPressable}
                        onPress={()=>this.loginButtonClk()} 
                        >
                            <Text style={styles.textInPressable}>Already have an account? Click here to login</Text>
                        </Pressable>
                    <Text style={styles.breakingLine}></Text>
                    <Pressable 
                        style={styles.subPressable}
                        onPress={()=>this.registered(username, email, password, displayName)}>
                            <Text style={styles.textInPressable}>Register</Text>
                        </Pressable>
                </View>
            </View>
        );
      }

    LoginPageComp(){
        //when this.state.register indicate 0, returns the login page. When indicates 1, returns the register page
            if(this.state.register == 0){
                return(
                    <View>
                        <Text style={styles.title}>Welcome Back</Text>
                        <View style={styles.mainInterface}>
                            <View style={styles.mainInterface}>
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
                                    <Pressable 
                                        style={styles.mainPressable}
                                        onPress={()=>this.registerClk()} >
                                            <Text style={styles.textInPressable}>New User? Click here to register</Text>
                                        </Pressable>
                                        <Text style={styles.breakingLine}></Text>
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

        //console.log("login check:"+this.context);
        if(this.context == false){
            return(
                <View>
                     {this.LoginPageComp()}
                </View>
            )
        }else{
            //console.log("login:"+userLoginCheck+"\n");
            
            return(
                <View>
                    <Text>Logged in successfully!</Text>
                    <Button title='Log out' onPress={()=>{
                       this.setState({login: false,
                    checkIn: 0,
                    email: '',
                    password: ''});
                    }}></Button>
                    <Button title='Direct to main page' onPress={()=>{
                       this.props.navigation.navigate('Main TabBar');
                    }}></Button>
                    <LogOutComp content = {this.state.login}/>
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
        const [loginCred, setLoginCred] = useState(this.context);
        const [found, setFound] = useState(false);

        //useUserContext();
        ///useUpdateUserContext();
        useEffect(()=>{
            if(login == 1){
                setLogin(0);
                let isAPISubscribed = true
                var loginIndicator = 0;
                const api = axios.create({
                    baseURL: baseURL
                })
                api.get('/users/list').then((res) => {
                    //console.log(res.data.data);
                    if(isAPISubscribed){
                        for(var i = 0; i < res.data.data.length; i++){
                            if(res.data.data[i].email == this.state.email){
                                if(res.data.data[i].password == this.state.password){
                                    loginIndicator = 1;
                                    this.setState({login: res.data.data[i].email});
                                    console.log("found yeah\n"+ res.data.data[i].email);
                                    setFound(true);                                    
                                    setFound(false);
                                    this.props.navigation.navigate('Main TabBar');
                                    
                                }
                            }
                        }
                        if(loginIndicator == 0){
                            alert('Email or password invalid!');
                        }else{
                            //console.log("cnmshould work")
                        }
                    } 
                })
            }
            return(()=>{isAPISubscribed = false})
        })
        
        

        return(
            
            <View>
                <Pressable 
                    style={styles.subPressable} 
                    onPress={() => {
                        setLogin(1);
                    }}>
                        <Text style={styles.textInPressable}>Login</Text>
                    </Pressable>
                <SetContextComp content = {this.state.login} indicator = {found}/>
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
            password: password,
            xp: 0,
            body_metrics: [],
            bio: "",
            profile_pic: "",
            medals: []
        });
    };

    
}

export default Login;