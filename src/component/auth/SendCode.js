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
	TextInput,
	Alert,
	Keyboard,
} from 'react-native';
import firebase from 'react-native-firebase'
import PhoneInput from 'react-native-phone-input'
import CountryPicker from 'react-native-country-picker-modal'

import Wallpaper from '../Wallpaper.js'

import bgSrc from '../../images/Background.png';
import LogoPhone from '../../images/LogoPhone.png';
import BtnImg from '../../images/JoinBg.png';

const countries = ['CA', 'MX', 'US', 'CN', 'IN']

export default class SendCode extends Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);

		this.onPressFlag = this.onPressFlag.bind(this);
		this.selectCountry = this.selectCountry.bind(this);

		this.state = {
		 phoneNumber: '+16505553333',
		 cca2: 'US',
		 btnTxt: 'Send Verification Code'
		};
	}
	
	onSubmit() {
		this.setState({btnTxt: "Sending..."});
		Keyboard.dismiss();
		console.warn(this.state.phoneNumber);
		firebase.auth().signInWithPhoneNumber(this.state.phoneNumber)
		.then((confirmResult) => {
			console.log('confirmResult', confirmResult)
			global.confirmResult = confirmResult;
			this.props.navigation.navigate('VerifyCode', {PN: this.state.phoneNumber});
		})
		.catch((error) => {
		  const { code, message } = error;
		  alert(code + " - " + message);
		  this.setState({btnTxt: 'Send Verification Code'});
		});
	}

	componentDidMount() {
		this.setState({
			pickerData: this.phone.getPickerData(),
		});
	}

	onPressFlag() {
		this.countryPicker.openModal();
	}

	selectCountry(country) {
		this.phone.selectCountry(country.cca2.toLowerCase());
		this.setState({ cca2: country.cca2 });
		this.setState({ phoneNumber: "+" + country.callingCode });
		this.phone.focus();
	}

	render() {
		return (
			<Wallpaper>
				<Image style={styles.logo} source={LogoPhone}></Image>
				<Text style={styles.title}>
					Phone Verification
				</Text>

				<Text style={styles.explain}>
					Please enter your phone number
				</Text>
				<Text style={styles.explain}>
					and wait untill you receive
				</Text>
				<Text style={styles.explain}>
					the verification code
				</Text>
				
				<PhoneInput
				  ref={(ref) => { this.phone = ref; }}
				  onPressFlag={this.onPressFlag}
				  style={styles.phoneInput}
				  textStyle={{color:'#ffffff'}}
				  onChangePhoneNumber={number => this.setState({phoneNumber: number})}
				  value={this.state.phoneNumber}
				/>

				<CountryPicker
				  ref={(ref) => {
					this.countryPicker = ref;
				  }}
				  onChange={value => this.selectCountry(value)}
				  translation="eng"
				  cca2={this.state.cca2}
				  countryList={countries}
				>
					<View></View>
				</CountryPicker>

				<TouchableOpacity style={styles.btnContainer} activeOpacity={0.8} onPress={this.onSubmit}>
					<ImageBackground source={BtnImg} style={styles.btn} imageStyle={{ borderRadius: 50}}>
						<Text style={styles.btnTxt}>{this.state.btnTxt}</Text>
					</ImageBackground>
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
	phoneInput: {
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
	},
	btn: {
		resizeMode: 'cover',
		width: DEVICE_WIDTH / 4 * 3,
		height: DEVICE_HEIGHT /  31 * 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnTxt: {
		color: '#ffffff',
		fontWeight: 'bold',
		fontSize: 16,
		
	}
});
