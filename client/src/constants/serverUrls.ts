const baseUrl = 'http://192.168.43.206:2130'

const serverUrls = {
  workoutUrl: `${baseUrl}/workouts`,
  scheduleUrl: `${baseUrl}/schedules`,
  userUrl: `${baseUrl}/users`,
  addSessionUrl: `${baseUrl}/users/addSession`,
  removeSessionUrl: `${baseUrl}/users/removeSession`,
  updateResultUrl: `${baseUrl}/users/updateResult`,
  toggleActiveUrl: `${baseUrl}/users/toggleActive`,
  programURL: `${baseUrl}/programs`
}

export default serverUrls
