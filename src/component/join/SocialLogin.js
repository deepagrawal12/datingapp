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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import facebook from '../../images/facebook.png';

export default class SocialLogin extends Component {

	facebookLogin = async () => {
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
	    try {
	    	firebase.firestore().collection('users')
			.doc(firebaseUserCredential.user.email)
			.update({
				Status: 'online',
			}).then(() => {
				firebase.firestore().collection('users')
				.doc(firebaseUserCredential.user.email).get().then(snap => {
					// alert(snap.data().Latitude);
					this.props.navigation.navigate('Home', {
						email: firebaseUserCredential.user.email,
						Latitude: snap.data().Latitude,
						Longitude: snap.data().Longitude,
					});
				});
			}).catch((error) => {
				alert('Sign up first!');
			});
			
		}
		catch (e) {
	    	alert('Sign up with facebook first!');
	  	}
	  } catch (e) {
	    console.error(e);
	  }
	}
	render() {
		return (
			<TouchableOpacity style={styles.social} activeOpacity={0.5} onPress={this.facebookLogin}>
				<Image source={facebook}  style={styles.facebook}/>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	facebook: {
		// flex: 1,
		resizeMode: 'contain',
		height: hp(4),
		width: hp(4),
	},
	social: {
		// flex: 1.5,
		height: hp(15),
		borderRadius: 50,
		backgroundColor: '#ffffff',
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 11,
		marginTop: hp('2.5%'),
	},
});
