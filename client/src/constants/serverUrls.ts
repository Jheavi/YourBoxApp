const baseUrl = 'http://192.168.1.131:2130'

const serverUrls = {
  workoutUrl: `${baseUrl}/workouts`,
  scheduleUrl: `${baseUrl}/schedules`,
  userUrl: `${baseUrl}/users`,
  addSessionUrl: `${baseUrl}/users/addSession`,
  removeSessionUrl: `${baseUrl}/users/removeSession`,
  updateResultUrl: `${baseUrl}/users/updateResult`,
  programURL: `${baseUrl}/programs`
}

export default serverUrls
