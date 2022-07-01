import React, { Component, useContext, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { UpdateUserContext } from '../context/UserContext';
import { styles } from '../style';
import axios from 'axios';
const baseURL = 'http://10.0.2.2:3000'

class LoginCredHandler extends Component{
    static contextType = UpdateUserContext;
    

    HandleLoginContext = () => {
        const [cred, setCred] = useState(this.context);
        var loginIndicator = 0;
        const api = axios.create({
            baseURL: baseURL
        })
        api.get('/users/list').then((res) => {
            //console.log(res.data.data);
            for(var i = 0; i < res.data.data.length; i++){
                if(res.data.data[i].email == this.props.email){
                    if(res.data.data[i].password == this.props.password){
                        setCred(this.props.val);
                        console.log("yeah\n"+ this.props.val);
                        loginIndicator = 1;
                    }
                }
            }
            if(loginIndicator == 0){
                alert('Email or password invalid!');
            }
        }
        )
        console.log("wut"+this.props.val);
    }

    render(){
        return(
            <View>
                <Button 
                    style={styles.button}
                    title="Login" 
                    onPress={this.HandleLoginContext}></Button>

            </View>
        )
    }
}

export default LoginCredHandler;