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
  sessions: SessionInterface[]
}

export interface SessionInterface {
  finishHour: string
  startHour: string
  type: string
}

export interface dateObject {
  day: number
  month: number
  year: number
  hour: string
  dayString: string
  formattedDate: string
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
  day: string
  dispatch: AppDispatch
  navigation: StackNavigationProp< RootStackParamList>
  schedule: scheduleInterface
  schedules: scheduleInterface[]
  schedulesLoading: boolean
  session: SessionInterface
  user: userInterface
  userCanBook: boolean
  weekDay: string
  workout: workoutInterface
  workoutLoading: boolean
}

export interface dayScheduleProps {
  day?: string
  weekDay: scheduleInterface
  user?: userInterface
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

export interface ReservedSession extends SessionInterface {
  day: string
}

export interface PastSession extends ReservedSession {
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
  affiliatedBox?: BoxInterface,
  affiliatedProgram: affiliatedProgram | string,
  connection: string,
  email: string,
  name: string,
  ownerOfBox?: BoxInterface,
  pastSessions: PastSession[],
  reservedSessions: ReservedSession[],
  signInDate: string,
  userId: string
}

export interface BoxInterface {
  _id: string,
  name: string,
  owner: string,
  direction: string,
  affiliates: string[]
}
