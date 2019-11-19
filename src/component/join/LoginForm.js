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
	Alert,
	Keyboard,
	AsyncStorage
} from 'react-native';

import firebase from 'react-native-firebase'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import UserInput from './UserInput';

import usernameImg from '../../images/email.png';
import passwordImg from '../../images/password.png';
import eyeImg from '../../images/show.png';
import BtnImg from '../../images/JoinBg.png';

export default class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			showPass: true,
			press: false,
			loginTxt: 'LOGIN',
		};
		this.showPass = this.showPass.bind(this);
		this.onLogin = this.onLogin.bind(this);
	}

	validate() {
		if (this.state.email == "")
			return "Email required!";

		if (this.state.password == "")
			return "Pwd required!";

		return "valid";
	}
	onLogin() {
		Keyboard.dismiss();
		var isValid = this.validate();
		if (isValid != "valid") {
			alert("Email required");
			return;
		}
		this.setState({loginTxt: "LOGGING IN..."});
		firebase
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then(() => {
				this.setState({loginTxt: "LOGIN"});
				firebase.firestore().collection('users')
				.doc(this.state.email)
				.update({
					Status: 'online',
				})
				firebase.firestore().collection('users')
				.doc(this.state.email).get().then(snap => {
					// alert(snap.data().Latitude);
					AsyncStorage.setItem('userDetails', this.state.email)
					this.props.navigation.navigate('Home', {
						email: this.state.email,
						Latitude: snap.data().Latitude,
						Longitude: snap.data().Longitude,
					});
				});
			})
			.catch(error => {
				this.setState({loginTxt: "LOGIN"});
				if (error.code == "auth/user-not-found")
					alert("There is no such a user! Please sign up.");
				else
					alert(error.code + error.message );
			});
	}

	showPass() {
		this.state.press === false
			? this.setState({showPass: false, press: true})
			: this.setState({showPass: true, press: false});
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.inputContainer}>
					<UserInput
						source={usernameImg}
						placeholder="Email Address"
						autoCapitalize={'none'}
						returnKeyType={'done'}
						autoCorrect={false}
						autoComplete={"email"}
						style={styles.underline}
						onChangeText={text => this.setState({email: text})}
					/>
					<UserInput
						source={passwordImg}
						secureTextEntry={this.state.showPass}
						placeholder="Password"
						returnKeyType={'done'}
						autoCapitalize={'none'}
						autoCorrect={false}
						autoComplete={"password"}

						onChangeText={text => this.setState({password: text})}
					/>
					<TouchableOpacity
						activeOpacity={0.7}
						style={styles.btnEye}
						onPress={this.showPass}>
						<Image source={eyeImg} style={styles.iconEye} />
					</TouchableOpacity>
				</View>
				<TouchableOpacity style={styles.btnContainer} activeOpacity={0.8} onPress={this.onLogin}>
					<ImageBackground source={BtnImg} style={styles.btn} imageStyle={{ borderRadius: 4}}>
						<Text style={styles.btnTxt}>{this.state.loginTxt}</Text>
					</ImageBackground>
				</TouchableOpacity>
			</View>
		);
	}
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		paddingTop: hp(2),
		backgroundColor: 'rgba(0,0,0,0)',
		// flex: 5.5,
		height: hp(25),
		width: wp(80),
		alignItems: 'center',
	},
	inputContainer: {
		backgroundColor: '#ffffff',
		paddingRight: wp(2),
		paddingLeft: wp(2),
		borderRadius: 3,
		// flex: 4,
		height: hp(19),
		width: wp(75),
	},
	underline: {
		borderBottomColor: '#f0f0f0',
		borderBottomWidth: 1,
	},
	btnEye: {
		position: 'absolute',
		top: hp('11.5%'),
		right: 28,
	},
	iconEye: {
		width: hp(2),
		height: hp(2),
		resizeMode: 'contain',
	},
	btnContainer: {
		// flex: 1.5,
		height: hp("6%"),
		top: -hp("3%"),
		width: wp(45),
		alignItems: 'center',
		justifyContent: 'center',
	},
	btn: {
		// flex: 1,
		resizeMode: 'cover',
		width: wp(45),
		height: hp("6%"),
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnTxt: {
		color: '#ffffff',
		fontWeight: 'bold',
		fontSize: hp('2.4%'),

	}
});
