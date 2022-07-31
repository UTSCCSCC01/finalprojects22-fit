import React, { Component,useState } from 'react';
import { Text, View, Button, ScrollView, Pressable} from 'react-native';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { styles } from '../style';
import CircularProgress from 'react-native-circular-progress-indicator';
import { add } from 'react-native-reanimated';
const baseURL = 'http://10.0.2.2:3000';

class MainPage extends Component{
    static contextType = UserContext;

    state = {
        displayName: '',
        progress:[{'exerciseName': 'cal',
                    'metric': 700,
                    'goal': 1000,},
                    {'exerciseName': 'ml',
                    'metric': 800,
                    'goal': 1000},
                    {'exerciseName': 'km',
                    'metric': 2,
                    'goal': 5},
                    {'exerciseName': 'pushups',
                    'metric': 5,
                    'goal': 50}],
                    
        goal:[{'exerciseName': 'pushup',
                'metric': 3,
                'goal': 5},
                {'exerciseName': 'L water',
                'metric': 0.6,
                'goal': 2},],
        longTermGoal:[{'exerciseName': 'kg',
                'metric': 3,
                'goal': 5},]
    }

    render(){
        const api = axios.create({
            baseURL: baseURL
        })
        var loginIndicator = 0;
        if(this.state.displayName == ''){
            api.get('/users/list').then((res) => {
                for(var i = 0; i < res.data.data.length; i++){
                    if(res.data.data[i].email == this.context){
                        this.setState({displayName: res.data.data[i].display_name});
                        loginIndicator = 1;
                        break;
                    }
                }
                if(loginIndicator == 0){
                    alert('Login error, please log in again!');
                    this.props.navigation.navigate('Welcome');
                }
            })
        }
        
    

        return(
            <ScrollView style={{
                paddingHorizontal: 10,
                paddingVertical:20,
                margin: 5
            }}>
                <this.WelcomeText/>
                <this.ProgressList/>
                <this.TrackMetrics/>
                <Text style={styles.mainPageText}>Daily Goals</Text>
                <this.DailyGoalList/>
                <Text style={styles.mainPageText}>Long Term Goals</Text>
                {this.longTermGoalList()}       
            </ScrollView>
        );  
    }

    WelcomeText = ()=>{
        return(
            <View>
                <Text style={styles.primaryOrangeText}>Welcome, {this.state.displayName}!</Text>
                <Text style={styles.mainPageText}>Here's your progress today</Text>
            </View>
        );
    }

    TrackMetrics = ()=>{
        return(
            <View style={styles.mainPageElement}>
                <View style={styles.grid}>
                    <Pressable
                        onPress={()=>{
                            this.props.navigation.navigate('Set Short Term')
                        }}
                        >
                        <CircularProgress
                            activeStrokeColor = '#FF8C42'
                            radius={70}
                            titleFontSize={15}
                            maxValue={10}
                            title={'+ Add metrics'}
                            showProgressValue={false}/>
                    </Pressable>
                </View>
                
            </View>
        )
    }

    ProgressList = ()=>{
        //Returns the progress list. Mock data by now and awaits for further implementation
        return(           
                <View>
                    <Text>700 calories to burn</Text>
                    <Text>800L water to go</Text>
                    <Text>2km to run</Text>
                    <Text>5 push-ups to do</Text>
                </View>
            
        );
        
        
    }

    DailyGoalList = ()=>{
        //Returns the daily goal list. Mock data by now and awaits for further implementation
        const [needUpDate, updateNeedUpDate] = useState(0)
        const [id, updateId] = useState('')


        const api = axios.create({
            baseURL: baseURL
        })
        if(needUpDate != 1){
            api.get('/shorttermgoals/'+ this.context).then((res) => {
                if(res == null){
                    this.setState({goals: null})
                }else{
                    this.setState({goals: res.data.data})
                }
                console.log(this.state.goals)
                this.setState({dataRetrieved: 1})
                updateNeedUpDate(1)
            })
        }

        return(
            <View>
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
                    </View> : <View style={styles.mainPageElement}><Text style={styles.title}>No goals now. Add your goal right now!</Text></View>
                     : <Text>Loading goals...</Text>}
            </View>
        );
     }

    longTermGoalList(){
        //Returns the long term goal list. Mock data by now and awaits for further implementation
        return( 
            <View style={styles.mainPageElement}>
                    <View style={styles.grid}>
                        {
                            this.state.longTermGoal.map((exercise)=>{
                                return(
                                    <View style={styles.progressBar} key={exercise.exerciseName}>
                                        <CircularProgress
                                        activeStrokeColor = '#FF8C42'
                                        radius={80}
                                        progressValueFontSize={15}
                                        value={exercise.metric}
                                        maxValue={exercise.goal}
                                        valueSuffix={'/ '+exercise.goal +" " + exercise.exerciseName+' to go'}/>
                                        <Text style={styles.primaryOrangeText}>1000 xp</Text>
                                    </View>
                                    
                                    // <Text>{exercise.metric}{exercise.exerciseName} to go</Text>
                                )
                            })
                        }
                    </View>
                    
                </View>
        );
    }


}

export default MainPage;