## Development Environment

We will use [React Native](https://reactnative.dev/), [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/) to develop the app.

WorkStation setup: please refer to README.md

## Project Structure

The Fit-project is comprised of a frontend portion and backend portion. The summaries for each component is described below

## Backend:
**models:** directory that contains the data structure to model objects from response.

* Exercises.js: Contains models for exercises.
* Set.js: contains models for sets.
* User.js: contains models for users.
* Plan.js: contains models for plans.
* Foods.js: contains models for foods.
* SaveFood.js: contains models for SaveFoods.
* UserActivity.js: contains models for tracking user activity.
* WorkoutPlan.js: contains models for exercise plans

**routes:** directory that contains files that define server endpoints.

* exercises.js: defines endpoints for fetching exercise data by various means.
* set.js: defines endpoints for getting, updating, creating, and deleting sets.
* users.js: defines endpoints for getting, updating, creating and deleting users.
* plan.js: defines endpoints for getting plans.
* foods.js: defines endpoints for getting foods.
* savefodd.js: defines endpoints for getting, updating, creating and deleting savefoods.
* userActivity.js: defines enpoints for getting, updating, and creating user activity.
* workoutPlan.js: defines endpoints for getting, updating, and deleting workout plans.

**config.js:** config file that holds the credentials to connect to the MongoDB Atlas database

**index.js:** entry point of backend server

* package.json: dependencies: 
"dependencies": {
    "body-parser": "^1.20.0",
    "cors": "^2.8.5",
    "express": "^4.18.1",
    "mongoose": "^5.13.14",
    "morgan": "^1.10.0",
    "nodemon": "^2.0.16"
 }

## Frontend:
**assets**: directory that contains all icons/pictures used in the mobile app

**components**: directory that contains development components.

* LoginComponents.js: returns different register/login elements based on the state
* MainPage.js: returns lists (progress, daily goal, long term goal)
* NewUserSurvey.js: returns new user survey page

**style**: directory that contains style files

**view**: directory that contains all js files of the main screens of the mobile app

* Profile folder:
    * ProfileScreen.js: User Profile page
    * EditProfileScreen.js: Edit Profile page 
* BodyMetric folder:
    * BodyMetricLogView.js: Page containing categories of body metrics for users to input
    * BodyMetricRecorder.js: Page containing components for user input (ie. text input, buttons for adjusting input...etc)
* Exercise folder:
    * exerciseGroupSelectView.js: page containing search bar and exercise groups allowing users to narrow their search
    * exerciseLogView.js: A user's personalized log page containing all of their recorded exercise
    * exerciseRecorderView.js: A page which allows user to record exercise metrics and save them into their log
    * exerciseSelectView.js: A page that appears after exerciseGroupSelectView, shows all exercises that followed from previous query
* ExercisePlan folder:
    * CreateExercisePlan.js: Page which allows users to begin creating their exercise plans.
    * CreateWorkout.js: Page which allows users to add/delete specific exercises from the given workout
    * WorkoutExerciseSearch.js: Page which allows users to search for exercises to add to their workouts.
* Calendar folder:
    * calendarView.js: A page containing a calendar that acts as an interface for tracking user activity.
    * trackActivitySelectView.js: Intermediary page between the calendar page and tracking pages

**controller**: directory that contains js files corresponding to views that handles database calls.

* BodyMetric folder:
    * bodyMetricLogController.js: handles database calls for BodyMetricLogView.js
    * bodyMetricRecorderController.js: handles database calls for BodyMetricRecorder.js
* Exercise folder:
    * exerciseLogController.js: handles database calls for exerciseLogView.js
    * exerciseRecorderController.js: handles database calls for exerciseRecorderView.js
    * exerciseSelectController.js: handles database calls for exerciseSelectView.js
    * workoutPlanController.js: handles database calls for workout plan creation pages.
* UserActivity folder:
    * userActivityController.js: handles database calls dealing with keeping track of a user's general activity
    * calendarController.js: handles database calls for the calendar page.

**style**: directory containing stylesheets

* styles.js: contains stylesheet

**utility**: directory containing general helper functions

* format.js: contains functions for formatting, cleaning, and converting objects.
* constants.js: contains constants that are frequently used throughout the application
* dataHandler.js: contains variables that can be changed across different uses of the application but are otherwise used throughout

**App.js**: entry point of the react native frontend (contains tab bar navigation)

* pakage.json: dependencies
 "dependencies": {
    "@expo/ngrok": "^2.4.3",
    "@react-native-async-storage/async-storage": "^1.17.6",
    "@react-native-picker/picker": "^2.4.1",
    "@react-navigation/bottom-tabs": "^6.3.1",
    "@react-navigation/native": "^6.0.10",
    "@react-navigation/native-stack": "^6.6.2",
    "@react-navigation/stack": "^6.2.1",
    "axios": "^0.27.2",
    "expo": "~45.0.0",
    "expo-status-bar": "~1.3.0",
    "mongoose": "^6.3.6",
    "react": "17.0.2",
    "react-dom": "17.0.2",
    "react-native": "0.68.2",
    "react-native-gesture-handler": "^2.4.2",
    "react-native-safe-area-context": "4.2.4",
    "react-native-screens": "~3.11.1",
    "react-native-web": "0.17.7",
    "react-native-wheel-scrollview-picker": "^2.0.1",
    "react-navigation": "^4.4.4",
    "react-native-chart-kit": "^6.12.0",
    "react-native-progress": "^5.0.0",
    "react-native-svg": "^12.3.0"
 }
