import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	ImageBackground,
	Image,
	Text,
	Keyboard
} from 'react-native';
import firebase from 'react-native-firebase'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import UserInput from '../UserInput';

import usernameImg from '../../../images/email.png';
import passwordImg from '../../../images/password.png';
import eyeImg from '../../../images/show.png';
import BtnImg from '../../../images/JoinBg.png';

export default class SignupForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showPass: true,
			showConf: true,
			pressPass: false,
			pressConf: false,
			email: "",
			password: "",
			confirm: "",
		};
		this.showPass = this.showPass.bind(this);
		this.showConf = this.showConf.bind(this);
		this.onSignup = this.onSignup.bind(this);
	}
	
	validate() {
		if (this.state.email == "")
			return "Email required!";

		if (this.state.password == "")
			return "Pwd required!";

		if (this.state.password.length < 6)
			return "Pwd must be more than 6 letters!";

		if (this.state.password != this.state.confirm)
			return "Pwd not match!";

		return "valid";
	}

	onSignup() {
		Keyboard.dismiss();
		var isValid = this.validate();
		if (isValid != "valid") {
			alert(isValid);
			return;
		}
		firebase.firestore().collection('users')
		.doc(this.state.email).get().then(snap => {
			if(snap.exists) {
				alert('The same email exist');
			}
			else {
				global.signup_email = this.state.email;
				global.signup_pwd = this.state.password;
				global.isFB = false;
				this.props.navigation.navigate('Profile');	
			}				
		});
		
	}

	showPass() {
		this.state.pressPass === false
			? this.setState({showPass: false, pressPass: true})
			: this.setState({showPass: true, pressPass: false});
	}

	showConf() {
		this.state.pressConf === false
			? this.setState({showConf: false, pressConf: true})
			: this.setState({showConf: true, pressConf: false});
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
						style={styles.underline}
						onChangeText={text => this.setState({password: text})}
					/>
					<TouchableOpacity
						activeOpacity={0.7}
						style={styles.btnEye_pwd}
						onPress={this.showPass}>
						<Image source={eyeImg} style={styles.iconEye} />
					</TouchableOpacity>
					<UserInput
						source={passwordImg}
						secureTextEntry={this.state.showConf}
						placeholder="Password"
						returnKeyType={'done'}
						autoCapitalize={'none'}
						autoCorrect={false}
						autoComplete={"password"}
						onChangeText={text => this.setState({confirm: text})}
					/>
					<TouchableOpacity
						activeOpacity={0.7}
						style={styles.btnEye_cfm}
						onPress={this.showConf}>
						<Image source={eyeImg} style={styles.iconEye} />
					</TouchableOpacity>
				</View>
				<TouchableOpacity style={styles.btnContainer} activeOpacity={0.8} onPress={this.onSignup}>
					<ImageBackground source={BtnImg} style={styles.btn} imageStyle={{ borderRadius: 4}}>
						<Text style={styles.btnTxt}>SIGNUP</Text>
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
		height: hp(33),
		width: wp(80),
		alignItems: 'center',
	},
	inputContainer: {
		backgroundColor: '#ffffff',
		paddingRight: wp(2),
		paddingLeft: wp(2),
		borderRadius: 3,
		// flex: 4,
		height: hp(27),
		width: wp(80),
	},
	underline: {
		borderBottomColor: '#f0f0f0',
		borderBottomWidth: 1,
	},
	btnEye_pwd: {
		position: 'absolute',
		top: hp('11.5%'),
		right: 28,
	},
	btnEye_cfm: {
		position: 'absolute',
		top: hp('19.5%'),
		right: 28,
	},
	iconEye: {
		width: hp(2),
		height: hp(2),
		resizeMode: 'contain',
	},
	btnContainer: {
		// flex: 1.5,
		top: -hp(3),
		height: hp(6),
		width: wp(55),
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
	},
	btn: {
		flex: 1,
		resizeMode: 'contain',
		width: wp(55),
		height: hp(6),
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnTxt: {
		color: '#ffffff',
		fontWeight: 'bold',
		fontSize: hp('2.7%'),
		
	}
});
