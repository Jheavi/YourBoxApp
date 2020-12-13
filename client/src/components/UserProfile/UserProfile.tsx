import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, Dimensions } from 'react-native'
import { images } from '../../constants/images'
import { logout } from '../../redux/actions/userActions'
import { connect } from 'react-redux'
import { props } from '../../interfaces/interfaces'
import { extractDataFromDate } from '../../utils/dateFunctions'

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0d0d0d',
    flex: 1,
    maxHeight: height,
    width,
    position: 'relative'
  },
  avatarView: {
    width: 150,
    height: 120,
    marginVertical: 30,
    overflow: 'hidden'
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 240,
    resizeMode: 'contain'
  },
  buttonView: {
    backgroundColor: '#cb1313',
    padding: 10,
    margin: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8
  },
  buttonsText: {
    color: 'white',
    fontSize: 30
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
  text: {
    color: '#ffffff',
    fontSize: 15,
    marginBottom: 10,
    textAlign: 'left'
  },
  biggestText: {
    color: '#ffffff',
    fontSize: 25,
    marginTop: 15,
    textAlign: 'left'
  },
  biggerText: {
    color: '#ffffff',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'left'
  },
  infoView: {
    width: '100%',
    alignItems: 'center'
  },
  textView: {
    width: '60%'
  }
})

function UserProfile ({ dispatch, user }: props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backImage}
        source={images.homeScreen}
      />
      <View style={styles.infoView}>
        <View style={styles.avatarView}>
          <Image source={{ uri: user?.avatar }} style={styles.avatar}/>
        </View>
        <View style={styles.textView}>
          <Text style={styles.text}>{`Name: ${user?.name}`}</Text>
          <Text style={styles.text}>{`E-mail: ${user?.email}`}</Text>
          <Text style={styles.text}>{`Sign in date: ${extractDataFromDate(user?.signInDate).formattedDate}`}</Text>
          {!user?.admin && <Text style={styles.text} testID="userActive">{`Active: ${user?.active ? 'Yes' : 'No'}`}</Text>}
            {user?.admin && user?.ownerOfBox
              ? <>
                  <Text style={styles.biggestText}>Your Box</Text>
                  <Text style={styles.biggerText} testID="boxOwnerName">{user?.ownerOfBox.name}</Text>
                  <Text style={styles.text}>{user?.ownerOfBox.direction}</Text>
                  <Text style={styles.text}>{`Affiliates: ${user?.ownerOfBox.affiliates.length}`}</Text>
                </>
              : user?.affiliatedBox
                ? <>
                    <Text style={styles.biggerText} testID="boxNonOwnerName">{user?.affiliatedBox && user?.affiliatedBox.name}</Text>
                    <Text style={styles.text} testID="programName">{`Active program: ${user?.affiliatedProgram ? `${user?.affiliatedProgram.name}` : 'No'}`}</Text>
                    <Text style={styles.text}>{`Sessions per month: ${user?.affiliatedProgram ? user?.affiliatedProgram.sessionsPerMonth : 0}`}</Text>
                  </>
                : <Text style={styles.text} testID="notAffiliated">Actually not affiliated</Text>
          }
        </View>
      </View>
      <TouchableOpacity
        style={styles.buttonView}
        onPress={() => dispatch(logout())}
        testID="logoutBtn"
      >
        <Text style={styles.buttonsText} testID="logoutBtnText">Logout</Text>
      </TouchableOpacity>
      <View style={{ flex: 10 }} />
    </View>
  )
}

function mapStateToProps ({ userReducer: { user } }: any) {
  return {
    user
  }
}

export default connect(mapStateToProps)(UserProfile)
