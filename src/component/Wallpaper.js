import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet,Text, ImageBackground, SafeAreaView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import BgImg from '../images/Background.png';

export default class Wallpaper extends Component {
	render() {
		return (
			<SafeAreaView style={styles.container}>
				<ImageBackground style={styles.container} imageStyle={styles.picture} source={BgImg}>
					<KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={styles.keyboardView} enableOnAndroid>
						{this.props.children}
					</KeyboardAwareScrollView>
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
		width: DEVICE_WIDTH,
		height: DEVICE_HEIGHT,
	},
	picture: {
		flex: 1,
		width: DEVICE_WIDTH,
		height: DEVICE_HEIGHT,
		resizeMode: 'cover',
	},
	keyboardView: {
		alignItems: 'center',
	},
});
