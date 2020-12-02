export interface workoutInterface {
  description?: string,
  gym?: string,
  date: string,
  type?: string,
  title?: string
}

export interface sessionInterface {
  finishHour: string,
  startHour: string,
  type: string
}

export interface scheduleInterface {
  day: string,
  gym?: string,
  hours: [sessionInterface]
}

export interface dateObject {
  day: number,
  month: number,
  year: number,
  todayString?: string,
}

export interface props {
  dispatch: Function,
  workout?: workoutInterface,
  weekDay: string
}

export interface dayScheduleProps {
  weekDay: scheduleInterface
}
