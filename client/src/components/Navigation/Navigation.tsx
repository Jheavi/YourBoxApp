import React from 'react'
import { connect } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { props } from '../../interfaces/interfaces'
import Workout from '../Workout/Workout'
import Header from '../Header/Header'
import AdminHome from '../AdminHome/AdminHome'
import Schedules from '../Schedules/Schedules'
import Login from '../UserControl/Login/Login'
import UserWorkout from '../UserWorkout/UserWorkout'
import Logout from '../UserControl/Logout/Logout'
import UserHome from '../UserHome/UserHome'

const { Navigator, Screen } = createStackNavigator()

const header = {
  header: () => <Header />
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
          ? <Screen
              name="Login"
              component={Login}
              options={header}
            />
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
                  name="Logout"
                  component={Logout}
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
                  name="Logout"
                  component={Logout}
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
