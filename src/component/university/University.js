import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	TextInput,
	Image,
	ImageBackground,
	Keyboard
} from 'react-native';

import Wallpaper from '../Wallpaper.js'
import LogoUni from '../../images/LogoUni.png';
import BtnImg from '../../images/JoinBg.png';

export default class University extends Component {
	constructor(props) {
		super(props);
		
		global.Prefer = this.props.navigation.getParam('Prefer');
		
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit() {
		Keyboard.dismiss();
		this.props.navigation.navigate('Location');
	}

	render() {
		return (
			<Wallpaper>
				<Image style={styles.logo} source={LogoUni}></Image>
				<Text style={styles.title}>
					University Name
				</Text>
				<TextInput style={styles.input} onChangeText={(text) => global.University = text}/>
				<TouchableOpacity style={styles.btnContainer} activeOpacity={0.8} onPress={this.onSubmit}>
					<ImageBackground source={BtnImg} style={styles.btn} imageStyle={{ borderRadius: 50}}>
						<Text style={styles.btnTxt}>SUBMIT</Text>
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
		marginTop: 90,
		marginBottom: 20,
		fontSize: 19,
	},
	input: {
		backgroundColor: '#ffffff',
		width: DEVICE_WIDTH / 4 * 3,
		borderRadius: 4,
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

