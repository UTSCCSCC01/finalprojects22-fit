## Development Environment

We will use [React Native](https://reactnative.dev/), [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/) to develop the app.

WorkStation setup: please refer to README.md

## Project Structure
**Backend:**
* models: directory that contains the data structure to model objects from response e.g. Users.js, Exercise.js
* routes: directory that contains files that define server endpoints e.g. users.js, Exercise.js
* config.js: config file that holds the credentials to connect to the MongoDB Atlas database
* index.js: entry point of backend server
* package.json: dependencies: 
"dependencies": {
    "body-parser": "^1.20.0",
    "cors": "^2.8.5",
    "express": "^4.18.1",
    "mongoose": "^5.13.14",
    "morgan": "^1.10.0"
 }

**Frontend:**
* view: directory that contains all js files of the main screens of the mobile app
* App.js: entry point of the react native frontend (contains tab bar navigation)
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
