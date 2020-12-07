import { StackNavigationProp } from '@react-navigation/stack'
import { AppDispatch } from '../redux/configureStore'

export interface workoutInterface {
  description?: string,
  gym?: string,
  date: string,
  type?: string,
  title?: string
}

export interface scheduleInterface {
  day: string,
  gym?: string,
  sessions: sessionInterface[]
}

export interface sessionInterface {
  finishHour: string,
  startHour: string,
  type: string
}

export interface dateObject {
  day: number,
  month: number,
  year: number,
  dayString: string,
  formattedDate: string,
  weekDay: string
}

type RootStackParamList = {
  UserView: undefined
  Home: undefined
  AdminWorkout: undefined
  AdminSchedules: undefined
  Login: undefined
  Logout: undefined
  UserHome: undefined
  UserWorkout: undefined
  UserSchedules: undefined
};

export interface props {
  dispatch: AppDispatch,
  user?: userInterface,
  navigation?: StackNavigationProp< RootStackParamList>
  weekDay: string,
  workout?: workoutInterface,
  workoutLoading: boolean,
}

export interface dayScheduleProps {
  weekDay: scheduleInterface
}

export interface StringMap {
  [key: string]: string;
}

export interface Auth0UserInterface {
  connection: string,
  email?: string,
  name?: string,
  userId: string
}

export interface reservedSession extends sessionInterface {
  day: string
}

export interface pastSession extends reservedSession {
  result?: string
}

export interface affiliatedProgram {
  name: string
  gym?: string
  sessionsPerMonth: number
}

export interface userInterface {
  active: boolean
  readonly admin: boolean,
  affiliatedGym?: string,
  affiliatedProgram: affiliatedProgram | string,
  connection: string,
  email: string,
  name: string,
  pastSessions: pastSession[],
  reservedSessions: reservedSession[],
  signInDate: string,
  userId: string
}
