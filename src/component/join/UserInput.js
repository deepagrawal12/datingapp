import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet, View, TextInput, Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class UserInput extends Component {
	render() {
		const {
			source,
			placeholder,
			secureTextEntry,
			autoCorrect,
			autoCapitalize,
			returnKeyType,
			autoComplete,
			onChangeText,
			style
		} = this.props;
		return (
			<View style={[styles.inputWrapper, style]}>
				<Image source={this.props.source} style={styles.inlineImg} />
				<TextInput
					style={styles.input}
					placeholder={this.props.placeholder}
					secureTextEntry={this.props.secureTextEntry}
					autoCorrect={this.props.autoCorrect}
					autoCapitalize={this.props.autoCapitalize}
					returnKeyType={this.props.returnKeyType}
					autoComplete={this.props.autoComplete}
					onChangeText={this.props.onChangeText}
				/>
			</View>
		);
	}
}

styles = StyleSheet.create({
	input: {
		backgroundColor: '#ffffff',
		paddingLeft: 55,
		paddingTop: 0,
		paddingBottom: 0,
	},
	inputWrapper: {
		// flex: 1,
		paddingRight: 20,
		paddingTop: 12,
		paddingBottom: 5,
		height: hp(8),
	},
	inlineImg: {
		position: 'absolute',
		resizeMode: 'contain',
		zIndex: 10,
		width: 27,
		height: 27,
		left: 10,
		top: 11,
	},
});

UserInput.defaultProps = {
	style: {},
};