import programReducer from './programReducer'
import actionTypes from '../actions/action-types'
import { ProgramInterface } from '../../interfaces/interfaces'

describe('programReducer', () => {
  let fakePrograms: ProgramInterface[]
  let fakeUpdatedProgram: ProgramInterface
  let fakeNewProgram: ProgramInterface

  beforeEach(() => {
    fakePrograms = [
      {
        _id: '12345',
        name: 'a',
        sessionsPerMonth: 8,
        box: '456'
      },
      {
        _id: '13456',
        name: 'ab',
        sessionsPerMonth: 13,
        box: '456'
      },
      {
        _id: '14567',
        name: 'abc',
        sessionsPerMonth: 10,
        box: '456'
      }
    ]
    fakeUpdatedProgram = {
      _id: '12345',
      name: 'a',
      sessionsPerMonth: 12,
      box: '456'
    }
    fakeNewProgram = {
      _id: '1234567',
      name: 'b',
      sessionsPerMonth: 12,
      box: '456'
    }
  })

  it('should return the default state', () => {
    const state = programReducer(undefined, { type: 'null' })

    expect(state).toEqual({ programs: [] })
  })

  it('should return the programs ordered in a property called programs if action type is LOAD_PROGRAMS', () => {
    const fakeAction = {
      type: actionTypes.LOAD_PROGRAMS,
      programs: fakePrograms
    }

    const state = programReducer(undefined, fakeAction)

    expect(state).toEqual({ programs: fakePrograms })
  })

  it('should return the programs updated with the changed program and ordered if action type is UPDATE_PROGRAM', () => {
    const fakeAction = {
      type: actionTypes.UPDATE_PROGRAM,
      program: fakeUpdatedProgram
    }
    const previousState = { programs: fakePrograms }

    const state = programReducer(previousState, fakeAction)

    expect(state).toEqual({
      programs: [
        {
          _id: '14567',
          name: 'abc',
          sessionsPerMonth: 10,
          box: '456'
        },
        fakeUpdatedProgram,
        {
          _id: '13456',
          name: 'ab',
          sessionsPerMonth: 13,
          box: '456'
        }

      ]
    })
  })

  it('should return the programs updated with the new program and ordered if action type is CREATE_PROGRAM', () => {
    const fakeAction = {
      type: actionTypes.CREATE_PROGRAM,
      newProgram: fakeNewProgram
    }

    const previousState = { programs: fakePrograms }

    const state = programReducer(previousState, fakeAction)

    expect(state).toEqual({
      programs: [
        {
          _id: '12345',
          name: 'a',
          sessionsPerMonth: 8,
          box: '456'
        },
        {
          _id: '14567',
          name: 'abc',
          sessionsPerMonth: 10,
          box: '456'
        },
        fakeNewProgram,
        {
          _id: '13456',
          name: 'ab',
          sessionsPerMonth: 13,
          box: '456'
        }
      ]
    })
  })
})
