import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';

import facebook from '../../../images/facebook.png';

export default class SocialLogin extends Component {
  facebookSignup = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        // handle this however suites the flow of your app
        return;
      }

      console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        // handle this however suites the flow of your app
        throw new Error('Something went wrong obtaining the users access token');
      }

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

      console.warn(JSON.stringify(firebaseUserCredential.user.email));

      firebase.firestore().collection('users')
      .doc(firebaseUserCredential.user.email).get().then(snap => {
        if(snap.exists) {
          alert('You already signed up!Go to Log in');
        }
        else {
          global.signup_email = firebaseUserCredential.user.email;
          global.isFB = true;
          this.props.navigation.navigate('Gender');  
        }       
      });
      
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    return (
        <TouchableOpacity style={styles.social} activeOpacity={0.5} onPress={this.facebookSignup}>
          <Image source={facebook}  style={styles.facebook}/>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
  },
  facebook: {
    flex: 1,
    resizeMode: 'contain',
    height: 20,
    width: 10,
  },
  social: {
    flex: 1.5,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 11,
    marginTop: 20,
  },
});
