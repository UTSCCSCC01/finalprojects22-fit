## Development Environment

We will use [React Native](https://reactnative.dev/), [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/) to develop the app.

WorkStation setup: please refer to README.md

## Project Structure

The Fit-project is comprised of a frontend portion and backend portion. The summaries for each component is described below

## Backend:
**models:** directory that contains the data structure to model objects from response.

* Exercises.js: Contains models for exercises.
* Set.js: contains models for sets.
* User.js: contains models for users

**routes:** directory that contains files that define server endpoints.

* exercises.js: defines endpoints for fetching exercise data by various means
* set.js: defines endpoints for getting, updating, creating, and deletcing sets
* users.js: TO DO

**config.js:** config file that holds the credentials to connect to the MongoDB Atlas database

**index.js:** entry point of backend server

* package.json: dependencies: 
"dependencies": {
    "body-parser": "^1.20.0",
    "cors": "^2.8.5",
    "express": "^4.18.1",
    "mongoose": "^5.13.14",
    "morgan": "^1.10.0"
 }

## Frontend:
**view**: directory that contains all js files of the main screens of the mobile app

* exerciseGroupSelectView.js: page containing search bar and exercise groups allowing users to narrow their search
* exerciseLogView.js: A user's personalized log page containing all of their recorded exercise
* exerciseRecorderView.js: A page which allows user to record exercise metrics and save them into their log
* exerciseSelectView.js: A page that appears after exerciseGroupSelectView, shows all exercises that followed from previous query

**controller**: directory that contains js files corresponding to views that handles database calls.

* exerciseLogController.js: handles database calls for exerciseLogView.js
* exerciseRecorderController.js: handles database calls for exerciseRecorderView.js
* exerciseSelectController.js: handles database calls for exerciseSelectView.js

**style**: directory containing stylesheets

* styles.js: contains stylesheet

**utility**: directory containing general helper functions

* format.js: contains functions for formatting, cleaning, and converting objects.

**App.js**: entry point of the react native frontend (contains tab bar navigation)

* pakage.json: dependencies
 "dependencies": {
    "@react-navigation/native": "^6.0.10",
    "@react-navigation/native-stack": "^6.6.2",
    "expo": "~45.0.0",
    "expo-splash-screen": "~0.15.1",
    "expo-status-bar": "~1.3.0",
    "react": "17.0.2",
    "react-dom": "17.0.2",
    "react-native": "0.68.2",
    "react-native-web": "0.17.7"
 }
