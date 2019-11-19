import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
	StyleSheet, View, Image, Text, 
	TouchableOpacity, ImageBackground}
	from 'react-native';
import firebase from 'react-native-firebase'

import BgImg from '../../images/ChatBack.png';
import ManImg from '../../images/Profile.png';

export default class Contact extends Component {
	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		this.props.navigation.navigate('SendChat', {email: this.props.receiver, name: this.props.name});
	}

	render() {
		const {
			img,
			name,
		} = this.props;
		return (
			<TouchableOpacity onPress={this.onClick}>
				<View style={styles.container}>
					<Image style={styles.personImg} source={this.props.img}></Image>
					<Text style={styles.personName}>{this.props.name}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		margin: 10,
	},
	personImg: {
		width: 70,
		height: 70,
		resizeMode: 'cover',
	},
	personName: {
		color: '#ffffff',
		marginTop: 10,
		fontSize: 15,
		
	},
});
