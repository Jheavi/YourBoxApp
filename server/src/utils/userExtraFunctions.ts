import { extractDataFromDate } from './dateFunctions'
import userModel, { reservedSessionInterface } from '../models/userModel'

export async function changeReservedSessionsToPastSessions () {
  try {
    const actualDay = extractDataFromDate()
    const query = { admin: false }

    const users = await userModel.find(query)

    const bulkOps = []

    for (let index = 0; index < users.length; index += 1) {
      const alreadyPastSessions = users[index].reservedSessions.filter(
        (reservedSession: reservedSessionInterface) =>
          actualDay.dayString > reservedSession.day
            ? true
            : actualDay.dayString < reservedSession.day
              ? false
              : +actualDay.hour.split(':')[0] + 1 > +reservedSession.startHour.split(':')[0]
      )

      if (alreadyPastSessions.length) {
        bulkOps.push({
          updateOne: {
            filter: { userId: users[index].userId },
            update: { $addToSet: { pastSessions: { $each: alreadyPastSessions } } }
          }
        })
        bulkOps.push({
          updateOne: {
            filter: { userId: users[index].userId },
            update: { $pullAll: { reservedSessions: [...alreadyPastSessions] } }
          }
        })
      }
    }

    if (bulkOps.length) {
      await userModel.bulkWrite(bulkOps, { ordered: true }, () => {
        console.log('Moved reservedSessions to pastSessios')
      })
    }
  } catch (error) {
    console.log(error)
  }
}
