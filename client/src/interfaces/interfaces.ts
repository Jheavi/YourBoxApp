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
  todayString?: string,
}

export interface props {
  dispatch: AppDispatch,
  workout?: workoutInterface,
  workoutLoading: boolean
  weekDay: string
}

export interface dayScheduleProps {
  weekDay: scheduleInterface
}

export interface StringMap {
  [key: string]: string;
}
