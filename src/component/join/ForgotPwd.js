import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet,
	Text,
	TouchableOpacity 
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class ForgotPwd extends Component {
	render() {
		return (
			<TouchableOpacity style={styles.container}>
				<Text  style={styles.text} numberOfLines={1}>
					Forgot Password too?
				</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		marginTop: hp(2),
		height: hp('5.6%'),
		backgroundColor: 'transparent',
	},
	text: {
		textAlign: "center",
		color: '#ffffff',
		backgroundColor: "transparent",
		borderBottomColor: '#ffffff',
		borderBottomWidth: 1,
	},
});
