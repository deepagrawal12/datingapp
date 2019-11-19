import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet, View, Image, Text, Animated} from 'react-native';

import firebase from 'react-native-firebase';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import SwitchSelector from '../SwitchSelector.js'
import Wallpaper from '../Wallpaper.js'

import LoginForm from './LoginForm.js'
import ForgotPwd from './ForgotPwd.js'
import SocialLogin from './SocialLogin.js'

import SignupForm from './signup/SignupForm.js'
import SocialSignup from './signup/SocialSignup.js'

import LogoJoin from '../../images/LogoJoin.png';
import OrImg from '../../images/Or.png';

export default class JoinScreen extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			isLogin: true,
			animatedMarginLogin: new Animated.Value( 0),
			animatedMarginSignup: new Animated.Value( 2 * DEVICE_WIDTH),
		};
		this.switchChanged = this.switchChanged.bind(this);
	}

	componentWillMount() {
		Animated.timing(this.state.animatedMarginLogin, {
			toValue: 0,
			duration: 500
		}).start();

	}

	switchChanged(value) {
		if (value == "login") {
			this.setState({isLogin: true});
			this.setState({animatedMarginSignup: new Animated.Value( 2 * DEVICE_WIDTH)});
		}

		if (value == "signup") {
			this.setState({isLogin: false});
			this.setState({animatedMarginLogin: new Animated.Value( 2 * DEVICE_WIDTH)});
		}
		
		Animated.timing(this.state.animatedMarginLogin, {
			toValue: 0,
			duration: 500
		}).start();
		Animated.timing(this.state.animatedMarginSignup, {
			toValue: 0,
			duration: 500
		}).start();
	}

	render() {
		const animatedStyleLogin = { marginLeft: this.state.animatedMarginLogin }
		const animatedStyleSignup = { marginRight: this.state.animatedMarginSignup }
		return (
			<Wallpaper>
				<Image style={styles.logo} source={LogoJoin}></Image>
				<Text style={{color: '#fff'}}>By logging in or signing up, you are agreeing</Text>
				<Text style={{color: '#fff'}}>to Topspot’s terms and conditions</Text>
				<SwitchSelector
				  value={0}
				  onPress={this.switchChanged}
				  textColor={'rgb(255, 255, 255)'}
				  selectedColor={'rgb(0, 0, 0)'}
				  buttonColor={'rgb(255,255,255)'}
				  backgroundColor={'rgba(10,10,10,0.15)'}
				  borderColor={'rgba(10,10,10,0.15)'}
				  options={options}
				  bold
				  style={styles.switchStyle}
				  valuePadding={5}
				  hasPadding
				/>
				{
					this.state.isLogin &&
					<Animated.View style = {[{flex: 10.7, alignItems: 'center'}, animatedStyleLogin]}>
						<LoginForm navigation={this.props.navigation} />
						<ForgotPwd />
						<Image source={OrImg} style={styles.orpic}/>
						<SocialLogin navigation={this.props.navigation} />
					</Animated.View>	
				}
				{
					!this.state.isLogin &&
					<Animated.View style = {[{flex: 10.7, alignItems: 'center'}, animatedStyleSignup]}>
						<SignupForm navigation={this.props.navigation} />
						<ForgotPwd />
						<Image source={OrImg} style={styles.orpic}/>
						<SocialSignup navigation={this.props.navigation} />
					</Animated.View>	
				}
			</Wallpaper>
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
		//flex: 3.5,
		marginTop: hp(2),
	},
	switchStyle: {
		height: hp(8),
		width: wp(53),
		// flex: 1,
		paddingTop: hp(2),
	},
	orpic: {
		height: hp('1.6'),
		width: wp(60),
		resizeMode: 'contain',
		marginTop: hp(1),
		// flex: 1,
	},
});

const options = [
	{ label: 'Existing', value: 'login' },
	{ label: 'New', value: 'signup' }
];
