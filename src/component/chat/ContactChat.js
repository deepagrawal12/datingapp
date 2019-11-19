import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
	StyleSheet, View, Image, Text, 
	TouchableOpacity, ImageBackground}
	from 'react-native';
import firebase from 'react-native-firebase'
import LinearGradient from 'react-native-linear-gradient';

import BgImg from '../../images/ChatBack.png';
import ManImg from '../../images/Profile.png';

export default class ContactChat extends Component {
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
			unreadCnt,
		} = this.props;
		return (
			<TouchableOpacity onPress={this.onClick}>
				<View style={styles.container}>
				{ this.props.unreadCnt != 0 &&
					<LinearGradient colors={['rgb(234,111,97)', 'rgb(236,62,90)']} style={styles.badge}>
						<Text style={styles.badgeTxt}>{this.props.unreadCnt}</Text>	
					</LinearGradient>	
				}	
					<Image style={styles.personImg} source={this.props.img}></Image>
					<View style={{flexDirection: 'column', marginLeft: 20}}>
						<Text style={styles.personName}>{this.props.name}</Text>
						<Text style={styles.lastMsg}>Hey</Text>
					</View>	
					<Text style={styles.lastTime}>{this.props.time}</Text>
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
		flexDirection: 'row',
		marginLeft: 20,
	},
	badge: {
		backgroundColor : 'rgb(236,67,91)',
		width: 25,
		marginRight: 15,
		height: 25,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 15
	},
	badgeTxt: {
		color: '#ffffff',
	},
	personImg: {
		width: 70,
		height: 70,
		resizeMode: 'cover',
	},
	personName: {
		color: '#000000',
		marginTop: 10,
		fontSize: 15,
		
	},
	lastMsg: {
		color: '#a0a0a0',
		marginTop: 10,
		fontSize: 15,
		
	},
	lastTime: {
		color: '#000000',
		fontSize: 13,
		
		position: 'absolute',
		right: 40,
	}
});
