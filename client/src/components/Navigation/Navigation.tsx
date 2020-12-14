import React from 'react'
import { connect } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { props } from '../../interfaces/interfaces'
import Workout from '../Workout/Workout'
import Header from '../Header/Header'
import AdminHome from '../AdminHome/AdminHome'
import Schedules from '../Schedules/Schedules'
import Login from '../Login/Login'
import UserWorkout from '../UserWorkout/UserWorkout'
import UserProfile from '../UserProfile/UserProfile'
import UserHome from '../UserHome/UserHome'
import UserSchedules from '../UserSchedules/UserSchedules'
import Programs from '../Programs/Programs'
import UserResults from '../UserResults/UserResults'
import AdminUserList from '../AdminUserList/AdminUserList'

const { Navigator, Screen } = createStackNavigator()

const header = {
  header: ({ navigation }:any) => {
    return <Header navigation={navigation}/>
  }
}

function Navigation ({ user }: props) {
  return (
      <Navigator initialRouteName={
        !user
          ? 'Login'
          : user.admin
            ? 'Home'
            : 'UserView'}>
        {!user
          ? <>
              <Screen
                name="Login"
                component={Login}
                options={header}
              />
              <Screen
                name="AdminSchedules"
                component={Schedules}
                options={header}
              />
            </>
          : user.admin
            ? <>
                <Screen
                  name="Home"
                  component={AdminHome}
                  options={header}
                />
                <Screen
                  name="AdminWorkout"
                  component={Workout}
                  options={header}
                />
                <Screen
                  name="AdminSchedules"
                  component={Schedules}
                  options={header}
                />
                <Screen
                  name="AdminPrograms"
                  component={Programs}
                  options={header}
                />
                <Screen
                  name="AdminUsers"
                  component={AdminUserList}
                  options={header}
                />
                <Screen
                  name="UserProfile"
                  component={UserProfile}
                  options={header}
                />
              </>
            : <>
                <Screen
                  name="UserHome"
                  component={UserHome}
                  options={header}
                />
                <Screen
                  name="UserWorkout"
                  component={UserWorkout}
                  options={header}
                />
                <Screen
                  name="UserSchedules"
                  component={UserSchedules}
                  options={header}
                />
                <Screen
                  name="UserResults"
                  component={UserResults}
                  options={header}
                />
                <Screen
                  name="UserProfile"
                  component={UserProfile}
                  options={header}
                />
              </>
        }
      </Navigator>
  )
}

function mapStateToProps ({ userReducer }: any) {
  return {
    user: userReducer.user
  }
}

export default connect(mapStateToProps)(Navigation)
