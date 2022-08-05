import React, { Component, useEffect, useState } from 'react';
import { Text, View, Button, ScrollView, Pressable} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { styles } from '../style';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { baseURI } from '../utility/constants.js';


class SetShortTerm extends Component{

    static contextType = UserContext;

    state = {
        selectionList: [
            {description: "Use the food log at least once per day", xp: 1000},
            {description: "Use the exercise log at least once per day", xp: 1000},
            {description: "Track my body metrics at least once per day", xp: 1000}
                        ],
        dataRetrieved: 0,
        goals: null
    }
    render(){
        return(
            <View>
                {<this.TermSelectionList/>}
            </View>)
    }

    TermSelectionList = () => {
        
                        
        var goalAlreadyLogged = 1
        const [needUpDate, updateNeedUpDate] = useState(0)
        const [id, updateId] = useState('')


        const api = axios.create({
            baseURL: baseURI
        })
        if(needUpDate != 1){
            api.get('/shorttermgoals/'+ this.context).then((res) => {
                if(res == null){
                    this.setState({goals: null})
                }else{
                    this.setState({goals: res.data.data})
                }
                // console.log(this.state.goals)
                this.setState({dataRetrieved: 1})
                updateNeedUpDate(1)
            })
        }
        

        return(
            <ScrollView>
                <View >
                    <Text style={styles.mainPageText}>Current Goals</Text>
                    {this.state.dataRetrieved == 1? 
                    this.state.goals != null ?
                    <View style={styles.grid}> 
                        {this.state.goals.map((item)=>{return(
                        <View style={styles.mainSelectionElement} key={item._id}>
                            <Text style={styles.primaryOrangeTextAlt}>{item.description}</Text>
                            <Pressable
                                onPress={()=>{updateId(item._id)}}>
                                <CircularProgress
                                    activeStrokeColor = '#FF8C42'
                                    radius={70}
                                    titleFontSize={15}
                                    maxValue={10}
                                    title={item.xp+ "XP"}
                                    showProgressValue={false}/>
                            </Pressable>
                        </View>)})}
                    </View> : <Text>No goals now. Add your goal right now!</Text>
                     : <Text>Loading goals...</Text>}
                    {this.state.goals != null ? <Pressable onPress={()=>{api.delete("/shorttermgoals/"+id);updateNeedUpDate(0)}} style={styles.mainPressable}><Text style={styles.textInPressable}>cancel current goal</Text></Pressable> : null}
                    <View style={styles.grid}>
                        {
                            this.state.selectionList.map((item)=>{
                                return(
                                <View style={styles.mainSelectionElement} key={item.description}>
                                    <Text style={styles.primaryOrangeTextAlt}>{item.description}</Text>
                                    <Pressable
                                        onPress={()=>{this.post(this.context,item.description, item.xp)
                                            updateNeedUpDate(0)}}>
                                        <CircularProgress
                                            activeStrokeColor = '#FF8C42'
                                            radius={70}
                                            titleFontSize={15}
                                            maxValue={10}
                                            title={item.xp + "XP"}
                                            showProgressValue={false}/>
                                    </Pressable>
                                </View>)

                            })
                        }
                    </View>
                </View>
            </ScrollView>
            
        )
    }

    async post(email, description, xp){
        //This is the post request handler. This uses the axios api to post a request to
        //the database.
        const api = axios.create({
            baseURL: baseURI
        })
        await api.post('/shorttermgoals', {
            description: description,
            userId: email,
            xp: xp,
        });
    };

    GetGoal = () => {
        // console.log(this.state.goals)
        return(
            <View>
                <Text>nb</Text>
            </View>
            
            
            
        )
        
    }
    
}



export default SetShortTerm; 