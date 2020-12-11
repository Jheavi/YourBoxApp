import schedulesReducer from './schedulesReducer'
import actionTypes from '../actions/action-types'
import { scheduleInterface } from '../../interfaces/interfaces'

describe('schedulesReducer', () => {
  let fakeSchedules: scheduleInterface[]
  let fakeSchedule: scheduleInterface

  beforeEach(() => {
    fakeSchedules = [
      {
        day: '1',
        sessions: [
          { finishHour: '3', startHour: '3', type: '3' },
          { finishHour: '1', startHour: '1', type: '1' },
          { finishHour: '2', startHour: '2', type: '2' }
        ]
      }
    ]
    fakeSchedule = {
      day: '2',
      sessions: [
        { finishHour: '6', startHour: '6', type: '6' },
        { finishHour: '4', startHour: '4', type: '4' },
        { finishHour: '5', startHour: '5', type: '5' }
      ]
    }
  })

  it('should return the default state', () => {
    const state = schedulesReducer(undefined, { type: 'null' })

    expect(state).toEqual({})
  })

  it('should return the schedules in a property called schedules if action type is LOAD_SCHEDULES', () => {
    const fakeAction = {
      type: actionTypes.LOAD_SCHEDULES,
      schedules: fakeSchedules
    }

    const state = schedulesReducer(undefined, fakeAction)

    expect(state).toEqual({ schedules: fakeSchedules, schedulesLoading: false })
  })

  it('should return the schedules in a property called schedules if action type is UPDATE_SESSION', () => {
    const fakeAction = {
      type: actionTypes.UPDATE_SESSION,
      schedules: fakeSchedules
    }

    const state = schedulesReducer(undefined, fakeAction)

    expect(state).toEqual({ schedules: fakeSchedules, schedulesLoading: false })
  })

  it('should return the schedules in a property called schedules if action type is CREATE_SESSION', () => {
    const fakeAction = {
      type: actionTypes.CREATE_SESSION,
      schedules: fakeSchedules
    }

    const state = schedulesReducer(undefined, fakeAction)

    expect(state).toEqual({ schedules: fakeSchedules, schedulesLoading: false })
  })

  it('should return the property schedulesLoading if action type is SCHEDULES_LOADING', () => {
    const fakeAction = {
      type: actionTypes.SCHEDULES_LOADING
    }
    const state = schedulesReducer(undefined, fakeAction)

    expect(state).toEqual({ schedulesLoading: true })
  })

  it('should return the schedule in a property called schedule if action type is LOAD_SCHEDULE', () => {
    const fakeAction = {
      type: actionTypes.LOAD_SCHEDULE,
      schedule: fakeSchedule
    }

    const state = schedulesReducer(undefined, fakeAction)

    expect(state).toEqual({ schedule: fakeSchedule, schedulesLoading: false })
  })

  it('should return the schedules in a property called schedules if action type is DELETE_SESSION', () => {
    const fakeAction = {
      type: actionTypes.DELETE_SESSION,
      schedules: fakeSchedules
    }

    const state = schedulesReducer(undefined, fakeAction)

    expect(state).toEqual({ schedules: fakeSchedules, schedulesLoading: false })
  })
})
