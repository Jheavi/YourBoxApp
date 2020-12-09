import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Platform, Alert, ScrollView, Dimensions } from 'react-native'
import images from '../../../constants/images'
import { login } from '../../../redux/actions/userActions'
import { connect } from 'react-redux'
import IconFont5 from 'react-native-vector-icons/FontAwesome5'
import IconEntypo from 'react-native-vector-icons/Entypo'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import auth0data from '../../../constants/auth0data'
import { props } from '../../../interfaces/interfaces'
import UpperSawToothBorder from './SawToothBorders/UpperSawToothBorder'
import LowerSawToothBorder from './SawToothBorders/LowerSawToothBorder'

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    justifyContent: 'center',
    alignItems: 'center',
    height
  },
  scrollContent: {
    backgroundColor: '#0d0d0d',
    width: '100%'
  },
  loginButton: {
    backgroundColor: '#cb1313',
    padding: 10,
    marginVertical: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 130,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8
  },
  buttonsText: {
    color: 'white',
    fontSize: 30
  },
  secondaryTitles: {
    color: 'white',
    fontSize: 25,
    marginLeft: 30,
    marginBottom: 15
  },
  tertiaryTitles: {
    color: 'white',
    fontSize: 20,
    marginBottom: 25
  },
  backImage: {
    position: 'absolute',
    top: 0,
    marginVertical: 'auto',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.4
  },
  gymView: {
    zIndex: 10,
    flex: 1,
    minHeight: 200,
    maxHeight: 200,
    marginBottom: 30,
    width: '100%',
    position: 'relative'
  },
  triangleShape: {
    zIndex: 10,
    position: 'absolute',
    width: 0,
    height: 0,
    right: 0,
    bottom: 0,
    borderLeftWidth: 220,
    borderBottomWidth: 60,
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#000000'
  },
  gymBackImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  schedulesButton: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: 100,
    position: 'absolute',
    fontSize: 20,
    bottom: 20,
    width: '50%',
    marginLeft: 15,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  schedulesButtonText: {
    color: 'white',
    fontSize: 24
  },
  crossfitView: {
    height: 300,
    maxHeight: 300,
    marginBottom: 30,
    width: '100%',
    position: 'relative'
  },
  crossfitText: {
    color: 'white',
    fontSize: 20,
    padding: 40,
    textAlign: 'justify'
  },
  offersView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    marginBottom: 30,
    position: 'relative'
  },
  offersText: {
    color: 'white',
    fontSize: 15,
    paddingVertical: 20,
    paddingHorizontal: 30,
    textAlign: 'justify',
    marginBottom: 10
  }
})

function Login ({ dispatch, navigation }: props) {
  const useProxy = Platform.select({ web: false, default: true })
  const redirectUri = makeRedirectUri({ useProxy })

  const [, result, promptAsync] = useAuthRequest(
    {
      redirectUri,
      clientId: auth0data.clientId,
      responseType: 'id_token',
      scopes: ['openid', 'profile', 'email'],
      extraParams: {
        nonce: 'nonce'
      }
    },
    { authorizationEndpoint: `https://${auth0data.domain}/authorize` }
  )

  useEffect(() => {
    if (result) {
      if (result.type === 'error') {
        Alert.alert(
          'Authentication error',
          result.params.error_description || 'something went wrong'
        )
        return
      }
      if (result.type === 'success') {
        dispatch(login(result.params.id_token))
      }
    }
  }, [result])

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={true}
      >
        {/* <ImageBackground
          style={styles.backImage}
          source={images.homeScreen}
        /> */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => promptAsync({ useProxy })}
        >
          <Text style={styles.buttonsText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.secondaryTitles}>See gyms around you</Text>
        <View style={styles.gymView}>
          <ImageBackground
            style={styles.gymBackImage}
            source={images.gym1}
          />
          <View style={styles.triangleShape}/>
          <TouchableOpacity
            style={styles.schedulesButton}
            activeOpacity={0.4}
            onPress={() => navigation.navigate('AdminSchedules')}
          >
            <Text style={styles.schedulesButtonText}>See schedules</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.secondaryTitles}>What is crossfit?</Text>
        <View style={styles.crossfitView}>
          <ImageBackground
            style={{ ...styles.gymBackImage, opacity: 0.5 }}
            source={images.haltero1}
          />
        <Text style={styles.crossfitText}>CrossFit is a lifestyle characterized by safe, effective exercise and sound nutrition. CrossFit can be used to accomplish any goal, from improved health to weight loss to better performance. The program works for everyone — people who are just starting out and people who have trained for years.</Text>
        </View>
        <Text style={styles.secondaryTitles}>What out app offers</Text>
        <Text style={styles.tertiaryTitles}>As a gym affiliate</Text>
        <View style={styles.offersView}>
          <ImageBackground
            style={{ ...styles.gymBackImage, opacity: 0.5 }}
            source={images.homeScreen}
          />
          <UpperSawToothBorder />
          <View style={{ marginTop: 50 }}/>
          <IconFont5
            name="calendar"
            size={70}
            color="white"
          />
          <Text style={styles.offersText}>You can see your actual bookings, sign up for a session and cancel it within a touch</Text>
          <IconEntypo
            name="blackboard"
            size={70}
            color="white"
          />
          <Text style={styles.offersText}>You can see your trainings an upload your result to compare yourself with previous marks</Text>
          <View style={{ marginBottom: 20 }}/>
          <LowerSawToothBorder />
        </View>
        <Text style={{ ...styles.tertiaryTitles }}>As a gym owner</Text>
        <View style={styles.offersView}>
          <ImageBackground
            style={{ ...styles.gymBackImage, opacity: 0.5 }}
            source={images.workoutbackground}
          />
          <UpperSawToothBorder />
          <View style={{ marginTop: 50 }}/>
          <IconFont5
            name="user"
            size={70}
            color="white"
          />
          <Text style={styles.offersText}>You can manage your gym affiliates, their suscription and their sessions within a view</Text>
          <IconFont5
            name="dumbbell"
            size={70}
            color="white"
          />
          <Text style={styles.offersText}>You can set your workouts to show your athletes what will they face along the week</Text>
          <IconFont5
            name="calendar"
            size={70}
            color="white"
          />
          <Text style={styles.offersText}>You can set and change your week schedules with a few actions</Text>
          <IconFont5
            name="coins"
            size={70}
            color="white"
          />
          <Text style={styles.offersText}>You can manage the available programs for your users to set the number of sessions per month</Text>
          <View style={{ marginBottom: 20 }}/>
          <LowerSawToothBorder />
        </View>
      </ScrollView>
    </View>
  )
}

export default connect(null)(Login)
