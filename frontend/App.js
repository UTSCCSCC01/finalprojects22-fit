import React from 'react';
import { LogBox  } from 'react-native';
import Login from './components/LoginComponents';
LogBox.ignoreAllLogs();
import { styles, lightGray } from './style';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import MainPage from './components/MainPage';
import UserSurvey from './components/NewUserSurvey';
import ColorTheme  from './view/Settings/ColorTheme.js';

import { Calendar } from './view/Calendar/calendarView'
import { TrackActivitySelect } from './view/Calendar/trackActivitySelectView'

import { ExerciseSelect } from './view/ExerciseLog/exerciseSelectView';
import { ExerciseGroupSelect } from './view/ExerciseLog/exerciseGroupSelectView';
import { ExerciseRecorder } from './view/ExerciseLog/exerciseRecorderView';
import { ExerciseLog } from './view/ExerciseLog/exerciseLogView';

import { BodyMetricLog } from './view/BodyMetric/BodyMetricLogView';
import { BodyMetricRecorder } from './view/BodyMetric/BodyMetricRecorder';

import { SelectFoodCategory } from './view/FoodLog/SelectFoodCategory'
import { SelectFood } from './view/FoodLog/SelectFood'
import { RecordFood } from './view/FoodLog/RecordFood'
import { FoodLog } from './view/FoodLog/FoodLog';

import ProfileScreen from './view/Profile/ProfileScreen.js';
import EditProfileScreen from './view/Profile/EditProfileScreen';
import SetShortTerm from './components/SetShortTermGoalComponent';

import SearchScreen from './view/Search/SearchScreen.js';
import SearchProfile from './view/Search/SearchProfile.js';

import { UserProvider } from './context/UserContext';
import { CreateExercisePlan } from './view/ExercisePlan/CreateExercisePlan';
import { CreateWorkout } from './view/ExercisePlan/CreateWorkout';
import { WorkoutExerciseSearch } from './view/ExercisePlan/WorkoutExerciseSearch';
import { SelectExercisePlan } from './view/ExercisePlan/SelectExercisePlan';
import { ViewExercisePlan } from './view/ExercisePlan/ViewExercisePlan';

import { Setting } from './view/Settings/Setting';
import { OptionalSurvey } from './view/Settings/Survey';
import { Plan } from './view/Settings/Plan.js';
import {CalorieBudget}  from './view/Settings/CalorieBudget.js';
import {ManualBudget}  from './view/Settings/ManualBudget.js';
import {AutoBudget}  from './view/Settings/AutoBudget.js';

import { ExerciseCustomized } from './view/exerciseCustomizedView.js';

const Stack = createNativeStackNavigator();
const Tabbar = createBottomTabNavigator();
const ProfileStack = createStackNavigator();
const SearchStack = createStackNavigator();

const primaryOrange = "#FF8C42";
const secondaryPurple = "#717FC0";
const primaryPurple = "#4E598C";

const App = () => {

  //routing for the whole app
  const Profile_Stack = () => {
    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen name="Profile" component={ProfileScreen} />
        <ProfileStack.Screen
          name="Edit Profile"
          component={EditProfileScreen}
          options= {{
            headerRightContainerStyle: {
              paddingRight: 10,
            },
            headerLeftContainerStyle: {
              paddingLeft: 10,
            },
            headerTintColor: 'black',
            headerBackTitleVisible: false
          }}/>
      </ProfileStack.Navigator>
    )
  }

  const Main_Stack = () => {
    return(
      <Stack.Navigator
        screenOptions={{
        headerStyle: { backgroundColor: '#4E598C' },
        headerTintColor: '#fff',
    }}
        initialRouteName="MainPage">
        <Stack.Group>
          <Stack.Screen name="Home" component={MainPage} />
          <Stack.Screen name="Set Short Term" component={SetShortTerm} />
        </Stack.Group>
      </Stack.Navigator>
    );
  }

  const Tracking_Stack = () => {
    return (
      <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#4E598C' },
            headerTintColor: '#fff',
        }}
        initialRouteName="Calendar"
      >
        <Stack.Group>
          <Stack.Screen name="Calendar" component={Calendar} />
          <Stack.Screen name="Track Activity Select" component={TrackActivitySelect} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="Exercise Log" component={ExerciseLog} />
          <Stack.Screen name="Select Exercise Group" component={ExerciseGroupSelect} />
          <Stack.Screen name="Select Exercise" component={ExerciseSelect} />
          <Stack.Screen name="Record Exercise" component={ExerciseRecorder} />
          <Stack.Screen name="Create Exercise" component={ExerciseCustomized} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="Food Log" component={FoodLog} />
          <Stack.Screen name="Select Food Category" component={SelectFoodCategory} />
          <Stack.Screen name="Select Food" component={SelectFood} />
          <Stack.Screen name="Record Food" component={RecordFood} />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="Body Metric Log" component={BodyMetricLog}/>
          <Stack.Screen name="Record Body Metric" component={BodyMetricRecorder}/>
        </Stack.Group>
      </Stack.Navigator>
    )
  }

  const Setting_Stack = () => {
    return (
      <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#4E598C' },
            headerTintColor: '#fff',
        }}
        initialRouteName="Setting"
      >
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name= "Optional Survey" component={OptionalSurvey} />
        <Stack.Screen name ="Plan" component = {Plan} /> 
        <Stack.Screen name="Color Theme" component={ColorTheme} />
        <Stack.Screen name="Calorie Budget" component={CalorieBudget} />
        <Stack.Screen name="Automatic Budget" component={AutoBudget} />
        <Stack.Screen name="Manual Budget" component={ManualBudget} />
        <Stack.Group>
          <Stack.Screen name="Create Exercise Plan" component={CreateExercisePlan}/>
          <Stack.Screen name="Select Exercise Plan" component={SelectExercisePlan}/>
          <Stack.Screen name="View Exercise Plan" component={ViewExercisePlan}/>
          <Stack.Screen name="Create Workout" component={CreateWorkout}/>
          <Stack.Screen name="Workout Exercise Search" component={WorkoutExerciseSearch}/>
        </Stack.Group>
      </Stack.Navigator>
    )
  }

  const Search_Stack = () => {
    return (
      <SearchStack.Navigator>
        <SearchStack.Screen name="Explore" component={SearchScreen} options={{headerShown: false}}/>
        <SearchStack.Screen name="Profile" component={SearchProfile}/>
      </SearchStack.Navigator>
    )
  }

  const Tabbar_Stack = () => {
    return (
      <Tabbar.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'MainPage') {
                iconName = focused
                  ? 'home'
                  : 'home';
              } else if (route.name === 'ProfileTab') {
                iconName = focused ? 'account-circle' : 'account-circle';
              } else if (route.name === 'TrackingStack') {
                iconName = focused ? 'calendar-today' : 'calendar-today';
              } else if (route.name ==='SettingStack') {
                iconName = focused ? 'settings' : 'settings';
              } else if (route.name === 'SearchTab') {
                iconName = focused ? 'search' : 'search';
              }
              return <MaterialIcons name={iconName} size={35} color={color} />;
            },
            tabBarShowLabel: false,
            tabBarActiveTintColor: primaryOrange,
            tabBarInactiveTintColor: secondaryPurple,
            tabBarStyle: {
              height: 80,
              borderRadius: 40,
              paddingTop: 15,
              backgroundColor: primaryPurple
            }
          })}
        >
          <Tabbar.Screen
            name="MainPage"
            component={Main_Stack} 
            options={{headerShown: false}}/>
          <Tabbar.Screen
            name="SearchTab"
            component={Search_Stack}
            options={{headerShown: false}} />
          <Tabbar.Screen
            name="TrackingStack"
            component={Tracking_Stack}
            options={{headerShown: false}} />
          <Tabbar.Screen
            name="ProfileTab"
            component={Profile_Stack}
            options={{headerShown: false}} />
          <Tabbar.Screen
            name="SettingStack"
            component={Setting_Stack}
            options={{headerShown: false}} />
      </Tabbar.Navigator>
    )
  }

  return (
    <UserProvider value = {false}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#4E598C' },
            headerTintColor: '#fff',
        }}
        initialRouteName="Welcome"
        >
          <Stack.Group>
            <Stack.Screen name="Welcome" component={Login} />
            <Stack.Screen name="Main Page" component={MainPage} />
            <Stack.Screen name="Survey" component={UserSurvey} />
            
            <Stack.Screen
              name="Main TabBar"
              component={Tabbar_Stack}
              options={{headerShown: false}}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;