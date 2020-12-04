const auth0Url = `
https://javierlasogymapp.eu.auth0.com/authorize?
response_type=code&
client_id=mGtaMlEolzco2eZAlpDld8F8sUAW3wjV&
redirect_uri=GymApp://javierlasogymapp.eu.auth0.com/android/GymApp/callback&
state=gymapp12345`

const auth0data = {
  domain: 'javierlasogymapp.eu.auth0.com',
  clientId: 'mGtaMlEolzco2eZAlpDld8F8sUAW3wjV',
  redirectUri: 'GymApp://javierlasogymapp.eu.auth0.com/android/GymApp/callback',
  logoutUri: 'GymApp://javierlasogymapp.eu.auth0.com/android/GymApp/callback'
}

export default auth0data
