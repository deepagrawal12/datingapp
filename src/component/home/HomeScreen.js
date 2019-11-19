import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
	StyleSheet, View, Image, Text,
	TouchableOpacity, ImageBackground}
	from 'react-native';
import firebase from 'react-native-firebase'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-navigation';

import BgImg from '../../images/HomeBg.png';

export default class HomeScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeCnt: 0,
		}
		global.__Email = this.props.navigation.getParam('email');
		global.__Long = this.props.navigation.getParam('Longitude'),
		global.__Lat = this.props.navigation.getParam('Latitude'),
		global.__activePeople = [];

	}

	degreesToRadians(degrees) {
	  return degrees * Math.PI / 180;
	}

	distanceInKm(lat1, lon1) {
		lat2 = global.__Lat;
		lon2 = global.__Long;

		var earthRadiusKm = 6371;

		var dLat = this.degreesToRadians(lat2-lat1);
		var dLon = this.degreesToRadians(lon2-lon1);

		lat1 = this.degreesToRadians(lat1);
		lat2 = this.degreesToRadians(lat2);

		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			  Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		return earthRadiusKm * c;
	}

	componentDidMount() {
		console.warn("lat => ", global.__Lat);
		firebase.firestore().collection('users')
		.onSnapshot((doc) => {
			global.__activePeople = [];

			doc.docs.forEach((childSnapshot) => {
				var value = childSnapshot.data();
				console.log("User:\n" + JSON.stringify(value))

				if (value.Status == 'online' &&
					value.Email != global.__Email &&
					this.distanceInKm(value.Latitude, value.Longitude) < 101) {
					global.__activePeople.push(childSnapshot.data());
				}
			});

			this.setState({activeCnt: global.__activePeople.length});
		});
	}

	// componentWillUnmount(){
	// 	this.abortController.abort()
	// }
	render() {
		return (
			<SafeAreaView style={{flex: 1}}>
				<ImageBackground style={styles.container} imageStyle={styles.picture} source={BgImg}>
					<Text style={[styles.activeCnt, {marginTop: 30}]}>People active Nearby</Text>
					<Text style={styles.activeCnt}>{this.state.activeCnt}</Text>

					<TouchableOpacity style={styles.startSession} activeOpacity={0.8} onPress={this.onLogin}>
						<Text style={styles.sessionTxt}>Start Session</Text>
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
		flex: 1,
		alignItems: 'center',
	},
	picture: {
		width: wp(100),
		height: wp(201),
		top: (wp(201) - hp(100) > 48) ? (hp(100) - wp(201) - 48) : -48,
		resizeMode: 'cover',
	},
	activeCnt: {
		color: '#ffffff',
		fontWeight: 'bold',
		marginTop: 10,
		fontSize: 25,

	},
	startSession: {
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		top: hp(22),
		padding: 15,
		position: 'absolute',
		borderWidth: 1,
		borderColor: 'white'
	},
	sessionTxt: {
		color: '#ffffff',
		fontWeight: 'bold',
		fontSize: 25,

	},

});
