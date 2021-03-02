# YourBoxApp

This is a project built during the Skylab bootcamp.

The app is a react Native app optimized for Android OS with Typescript, and a server app to connect with mongo database also writed with Typescript.
The app is made for crossfit users and crossfit box owners where you can:

### As no logged user

- See a list of near boxes.
- See the schedules from that box to see every day sessions.
- Login to access to the rest of functions.


### As an admin 

- See your planned workouts for every day interacting with the calendar, with the possibility of create or modify the workout.
- See your session schedules, with the possibility of create a new session, modify any existing session or delete them.
- See your programs and modify them, to change the name or the quantity of monthly sessions.
- See your box affiliates, in which you can activate or deactivate them to let them book sessions. Also you can change their program to change the number of monthly sessions they can book.
- See your profile, your gym affiliates and your box info.

### As a user

- See the planned or past workouts of your actual box for every day interacting with the calendar.
- Book a future session to train, until you reach your maximum monthly sessions. Not allowed to book past sessions.
- See your past sessions and add a result of the trainings.
- See your profile.

## Author

- Javier Laso(Jheavi)

## To run the project (scripts)

First of all, after downloading, run npm install alternatively in client app and server app.

The sensitive variables are not included, so you will have to add your mongo database with the requested collections. Also for the login you will have to add your auth0 app, the variables indicated in client/src/constants/auth0data.ts file.

The scripts you can run with npm (or yarn) in both apps are:

- npm start (to start the react app)
- npm test (to see unit & component tests)

## Tech Stack & Libraries

- Typescript
- React Native
- Expo
- Redux
- React Native Testing Library
- Express
- Mongoose

## Unit & Component testing:

### Client App
![tests](/images/testsClient.jpg)
![test coverage](/images/coverageClient.jpg)

### Server App
![tests](/images/testsServer.jpg)
![test coverage](/images/coverageServer.jpg)

## Other Libraries & Tools:

- axios
- dotenv
- react-navigation
- react-native-calendars
- react-native-dotenv
- react-native-elements
- react-native-modal"
- react-native-picker-select
- react-native-reanimated
- react-native-safe-area-context
- react-native-screens
- react-native-unimodules
- react-native-vector-icons
- redux-thunk
