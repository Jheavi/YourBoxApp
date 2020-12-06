import React from 'react'
import { connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { props } from '../../interfaces/interfaces'
import Workout from '../Workout/Workout'
import Header from '../Header/Header'
import AdminHome from '../AdminHome/AdminHome'
import Schedules from '../Schedules/Schedules'
import Login from '../UserControl/Login/Login'
import UserView from '../UserView/UserView'
import Logout from '../UserControl/Logout/Logout'

const { Navigator, Screen } = createStackNavigator()

const header = {
  header: () => <Header />
}

function Navigation ({ user }: props) {
  return (
    <NavigationContainer>
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
                name="UserView"
                component={UserView}
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
    </NavigationContainer>
  )
}

function mapStateToProps ({ userReducer }: any) {
  return {
    user: userReducer.user
  }
}

export default connect(mapStateToProps)(Navigation)
