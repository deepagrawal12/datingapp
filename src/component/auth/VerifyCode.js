import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	TouchableOpacity,
	Text,
	Image,
	ImageBackground,
	Alert,
	Keyboard
} from 'react-native';
import firebase from 'react-native-firebase'
import CodeInput from 'react-native-confirmation-code-input';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import Wallpaper from '../Wallpaper.js'

import bgSrc from '../../images/Background.png';
import LogoChat from '../../images/LogoChat.png';
import BtnImg from '../../images/JoinBg.png';

export default class VerifyCode extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: true
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onResend = this.onResend.bind(this);

		this.state = {
			phoneNumber: this.props.navigation.getParam('PN'),
		}
	}
	
	onSubmit(verifyCode) {
		confirmResult = global.confirmResult;
		confirmResult.confirm(verifyCode)
		.catch((error) => {
		  const { code, message } = error;
		  if (code == "auth/invalid-verification-code") {
			alert("Verification Code is incorrect!");
			this.refs.verifyCode.clear();
		  }
		  else
		  	alert(code + " => " + message);
		});
	}

	onResend() {
		// Keyboard.dismiss();
		// firebase.auth().signInWithPhoneNumber(this.state.phoneNumber)
		// .then((confirmResult) => {
		// 	global.confirmResult = confirmResult;
		// })
		// .catch((error) => {
		//   const { code, message } = error;
		//   alert(code + " - " + message);
		// });

		this.setState({btnTxt: "Sending..."});
		Keyboard.dismiss();
		console.warn(this.state.phoneNumber);
		firebase.auth().signInWithPhoneNumber(this.state.phoneNumber)
		.then((confirmResult) => {
			console.log('confirmResult', confirmResult)
			global.confirmResult = confirmResult;
			this.props.navigation.navigate('VerifyCode', {PN: this.state.phoneNumber});
			// document.getElementById("resend").disabled = true;
			// setTimeout(function(){ document.getElementById("resend").disabled = false; }, 30000);
		})
		.catch((error) => {
			console.log('confirmResult error', error)
		  const { code, message } = error;
		  alert(code + " - " + message);
		  this.setState({btnTxt: 'Send Verification Code'});
		});
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				if(user.phoneNumber == this.state.phoneNumber && user.email == null) {
					const credential = firebase.auth.EmailAuthProvider.credential(global.signup_email, global.signup_pwd);
					user.linkWithCredential(credential)
					.then(() => this.props.navigation.navigate('Success'))
					.catch(err => console.warn(err.message));
				}
			}
		});
	}
	render() {
		return (
			<Wallpaper>
				<Image style={styles.logo} source={LogoChat}></Image>
				<Text style={styles.title}>
					Enter Verification Code
				</Text>

				<Text style={styles.explain}>
					A 6-digit verification has been
				</Text>
				<Text style={styles.explain}>
					sent to you
				</Text>

				<CodeInput
					keyboardType="numeric"
				  ref="verifyCode"
				  secureTextEntry
				  codeLength={6}
				  className={'border-b'}
				  space={5}
				  size={30}
				  inputPosition='left'
				  onFulfill={(code) => this.onSubmit(code)}
				  activeColor={'rgba(0, 0, 0, 1)'}
				  inactiveColor={'rgba(0, 0, 0, 0.5)'}
				/>

				<TouchableOpacity style={styles.btnContainer} activeOpacity={0.8} onPress={this.onResend}>
					<IconFontAwesome name="repeat" size={25} color="#fff" />
					<Text style={styles.btnTxt}>Resend Verification Code</Text>
				</TouchableOpacity>
			</Wallpaper> 
		);
	}
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	logo: {
		resizeMode: 'contain',
		height: DEVICE_HEIGHT / 31 * 7,
		width: DEVICE_WIDTH / 10 * 7,
		marginTop: 50,
	},
	title: {
		color: '#ffffff',
		fontWeight: 'bold',
		marginTop: 30,
		marginBottom: 30,
		fontSize: 19,
	},
	explain: {
		color: '#ffffff',
		fontWeight: 'bold',
		marginBottom: 10,
		fontSize: 17,
	},
	input: {
		backgroundColor: 'transparent',
		width: DEVICE_WIDTH / 4 * 2,
		borderRadius: 4,
		marginTop: 20,
		borderBottomColor: '#000000',
		borderBottomWidth: 1,
		padding: 8,
	},
	btnContainer: {
		height: DEVICE_HEIGHT /  31 * 2,
		width: DEVICE_WIDTH / 4 * 3,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 40,
		flexDirection: 'row'
	},
	btnTxt: {
		color: '#ffffff',
		fontWeight: 'bold',
		fontSize: 16,
		
		marginLeft: 10,
	}
});
