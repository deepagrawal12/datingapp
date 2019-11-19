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
	PermissionsAndroid,
	Platform,
	SafeAreaView
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import BgImg from '../../images/Background.png';
import LogoLocation from '../../images/LogoLocation.png';
import LocationIcon from '../../images/LocationIcon.png';
import BtnImg from '../../images/JoinBg.png';

export default class LocationScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			btnTxt: 'Allow Location Access'
		}

		this.onSubmit = this.onSubmit.bind(this);
		this.getLocation = this.getLocation.bind(this);
	}

	getLocation() {
		this.setState({btnTxt: "Getting Location..."});
		Geolocation.getCurrentPosition(
			(position) => {
				global.latitude = position.coords.latitude;
				global.longitude = position.coords.longitude;
				if (global.isFB == false)
					this.props.navigation.navigate('SendCode');
				else
					this.props.navigation.navigate('Success');
			},
			(error) => {
				// this.setState({btnTxt: "Allow Location Access"});
				// if(error.code == 3)
				// 	alert('Request Timed Out.\nIf you are in the office(house), please try again outside.');
				global.latitude = 0;
				global.longitude = 0;
				if (global.isFB == false)
					this.props.navigation.navigate('SendCode');
				else
					this.props.navigation.navigate('Success');	
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
		);
	}

	requestPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
					'title': 'Location Access Required',
					'message': 'This App needs to Access your location'
				}
			)
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				//To Check, If Permission is granted
				this.getLocation();
			} else {
				alert("Permission Denied");
			}
		} catch (err) {
			console.log(err)
		}
	}

	onSubmit() {
		
		if(Platform.OS === 'ios'){
			this.getLocation();
		}else{
			this.requestPermission();
		}  	
	}

	onLearnmore() {

	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
			<ImageBackground style={styles.container} imagestyles={styles.picture} source={BgImg}>
				<Image style={styles.logo} source={LogoLocation}></Image>
				<Text style={styles.title}>
					Location Access Required
				</Text>
				<Image style={styles.icon} source={LocationIcon}></Image>
				<TouchableOpacity style={styles.btnContainer} activeOpacity={0.8} onPress={this.onSubmit}>
					<ImageBackground source={BtnImg} style={styles.btn} imageStyle={{ borderRadius: 50}}>
						<Text style={styles.btnTxt}>{this.state.btnTxt}</Text>
					</ImageBackground>
				</TouchableOpacity>
				
				<TouchableOpacity
					style={styles.learnContainer}
					onPress={this.onLearnmore} >
					<Text style={styles.learnMore}>Learn More</Text>
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
		marginTop: hp(7),
	},
	icon: {
		resizeMode: 'contain',
		height: hp(16),
		width: wp(25),
		marginTop: hp(1),
	},
	title: {
		color: '#ffffff',
		fontWeight: 'bold',
		marginTop: hp(8),
		fontSize: 19,
	},
	learnContainer: {
		borderBottomColor: '#f0f0f0',
		borderBottomWidth: 1,
		marginTop: hp(2),
	},
	learnMore: {
		color: '#fff',
	},
	btnContainer: {
		height: DEVICE_HEIGHT /  31 * 2,
		width: DEVICE_WIDTH / 4 * 3,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: hp(1),
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
});
