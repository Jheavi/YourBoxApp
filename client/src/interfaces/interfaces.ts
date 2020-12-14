import { StackNavigationProp } from '@react-navigation/stack'
import { AppDispatch } from '../redux/configureStore'

export interface workoutInterface {
  description?: string
  box?: string
  date: string
  type?: 'For Time' | 'AMRAP' | 'EMOM'
  title?: string
}

export interface scheduleInterface {
  day: string
  box?: string
  sessions: SessionInterface[]
}

export interface SessionInterface {
  finishHour: string
  startHour: string
  type: 'WOD' | 'Open Box' | 'Olympics'
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
  AdminPrograms: undefined
  AdminSchedules: undefined
  AdminWorkout: undefined
  Home: undefined
  Login: undefined
  Logout: undefined
  UserHome: undefined
  UserProfile: undefined
  UserResults: undefined
  UserSchedules: undefined
  UserView: undefined
  UserWorkout: undefined
};

export interface props {
  affiliatedUser: userInterface
  day: string
  box: BoxInterface
  boxes: BoxInterface[]
  dispatch: AppDispatch
  navigation: StackNavigationProp< RootStackParamList>
  pastSession: PastSession
  pastSessionsThisMonth: PastSession[]
  program: ProgramInterface
  programs: ProgramInterface[]
  reservedSessionsThisMonth: ReservedSession[]
  resultWorkout: workoutInterface
  schedule: scheduleInterface
  schedules: scheduleInterface[]
  schedulesLoading: boolean
  session: SessionInterface
  user: userInterface
  userCanBook: boolean
  users: userInterface[]
  weekDay: string
  workout: workoutInterface
  workoutLoading: boolean
  workouts: workoutInterface[]
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
  connection: string
  email?: string
  name?: string
  userId: string
}

export interface ReservedSession extends SessionInterface {
  day: string
}

export interface PastSession extends ReservedSession {
  result?: string
}

export interface ProgramInterface {
  _id: string
  name: string
  box: string
  sessionsPerMonth: number
}

export interface userInterface {
  active: boolean
  readonly admin: boolean
  avatar: string
  affiliatedBox?: BoxInterface
  affiliatedProgram?: ProgramInterface
  connection: string
  email: string
  name: string
  ownerOfBox?: BoxInterface
  pastSessions: PastSession[]
  reservedSessions: ReservedSession[]
  signInDate: string
  userId: string
}

export interface BoxInterface {
  _id: string
  name: string
  owner: string
  direction: string
  affiliates: string[]
  photos: string[]
}
