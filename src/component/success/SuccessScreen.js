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
	SafeAreaView
} from 'react-native';
import firebase from 'react-native-firebase'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import BgImg from '../../images/Background.png';
import LogoCreated from '../../images/LogoCreated.png';
import BtnImg from '../../images/JoinBg.png';

export default class SuccessScreen extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);

		firebase.firestore().collection('users').doc(global.signup_email)
		.set({
			Name: global.Name,
			Age: global.Age,
			Gender: global.Gender,
			Prefer: global.Prefer,
			Email: global.signup_email,
			University: global.University,
			Latitude: global.latitude,
			Longitude: global.longitude,
			Status: 'online',
		});
	}

	onSubmit() {

	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
			<ImageBackground style={styles.container} imagestyles={styles.picture} source={BgImg}>
				<Image style={styles.logo} source={LogoCreated}></Image>
				<Text style={styles.title}>
					Account Created!
				</Text>
				<TouchableOpacity style={styles.btnContainer} activeOpacity={0.8} onPress={this.onSubmit}>
					<ImageBackground source={BtnImg} style={styles.btn} imageStyle={{ borderRadius: 50}}>
						<Text style={styles.btnTxt}>Watch Tutorial</Text>
					</ImageBackground>
				</TouchableOpacity>
				
				<TouchableOpacity
					style={styles.learnContainer}
					onPress={() => this.props.navigation.navigate('Home', {email: global.signup_email, Latitude: global.latitude, Longitude: global.longitude})} >
					<Text style={styles.learnMore}>Skip and go to home page</Text>
				</TouchableOpacity>
		 </ImageBackground>
		 </SafeAreaView>
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
	logo: {
		resizeMode: 'contain',
		height: hp(23),
		width: wp(70),
		marginTop: hp(8),
	},
	title: {
		color: '#ffffff',
		fontWeight: 'bold',
		marginTop: hp(6),
		fontSize: 19,
	},
	btnContainer: {
		height: DEVICE_HEIGHT /  31 * 2,
		width: DEVICE_WIDTH / 4 * 3,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: hp(5),
	},
	btn: {
		resizeMode: 'cover',
		width: wp(75),
		height: hp(7),
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnTxt: {
		color: '#ffffff',
		fontWeight: 'bold',
		fontSize: 16,
		
	},
	learnContainer: {
		borderBottomColor: '#f0f0f0',
		borderBottomWidth: 1,
		marginTop: hp(2),
	},
	learnMore: {
		color: '#fff',
	},
});
