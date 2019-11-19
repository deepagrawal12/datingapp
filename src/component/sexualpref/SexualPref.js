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

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import bgSrc from '../../images/Background.png';
import LogoPrefer from '../../images/LogoPrefer.png';

export default class SexualPref extends Component {
	constructor(props) {
		super(props);

		global.Gender = this.props.navigation.getParam('Gender');
	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
			<ImageBackground style={styles.container} imagestyles={styles.picture} source={bgSrc}>
				<Image style={styles.logo} source={LogoPrefer}></Image>
				<Text style={styles.title}>
					Sexual Prefrence
				</Text>

				<TouchableOpacity
				 style={styles.button}
				 onPress={() => this.props.navigation.navigate('University', {Prefer: 'Male'})}
				>
					<Text>Male</Text>
				</TouchableOpacity>

				<TouchableOpacity
				 style={styles.button}
				 onPress={() => this.props.navigation.navigate('University', {Prefer: 'Female'})}
				>
					<Text>Female</Text>
				</TouchableOpacity>

				<TouchableOpacity
				 style={styles.button}
				 onPress={() => this.props.navigation.navigate('University', {Prefer: 'Both'})}
				>
					<Text>Both</Text>
				</TouchableOpacity>
			</ImageBackground>
			</SafeAreaView>
		);
	}
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	logo: {
		resizeMode: 'contain',
		height: hp(23),
		width: wp(70),
		marginTop: hp(6),
	},
	title: {
		color: '#ffffff',
		fontWeight: 'bold',
		marginTop: hp(8),
		marginBottom: 10,
		fontSize: 19,
	},
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
	button: {
		width: 200,
		height: 40,
		marginTop: 15,
		color: '#000000',
		backgroundColor: '#ffffff',
		alignItems: 'center',
		padding: 10,
		borderRadius: 14,
		shadowColor: 'rgba(0,0,0, .4)', // IOS
		shadowOffset: { height: 1, width: 1 }, // IOS
		shadowOpacity: 1, // IOS
		shadowRadius: 1, //IOS
		backgroundColor: '#fff',
		elevation: 54, // Android
	}
});
