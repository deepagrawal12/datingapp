import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	Image,
	ImageBackground,
	Button,
} from 'react-native';
import firebase from 'react-native-firebase'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import bgSrc from '../../images/Background.png';
import LogoPrefer from '../../images/LogoPrefer.png';

export default class ProfileScreen extends Component {
	constructor(props) {
		super(props);
	}

	signOutUser = async () => {
	    try {
	        await firebase.auth().signOut();
	        this.props.navigation.navigate('Login');
	    } catch (e) {
	        console.log(e);
	    }
	}

	render() {
		return (
			<ImageBackground style={styles.container} imagestyles={styles.picture} source={bgSrc}>
				<Text style={styles.title}>
					Profile
				</Text>
				<Button
		          title="Sign Out"
		          onPress={this.signOutUser}
		        />
			</ImageBackground> 
		);
	}
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		width: DEVICE_WIDTH,
		height: DEVICE_HEIGHT,
		alignItems: 'center',
	},
	picture: {
		width: DEVICE_WIDTH,
		height: DEVICE_HEIGHT,
		resizeMode: 'cover',
		alignItems: 'center',
	},
	title: {
		color: '#ffffff',
		fontWeight: 'bold',
		marginTop: hp(8),
		marginBottom: 10,
		fontSize: 19,
	},
});
