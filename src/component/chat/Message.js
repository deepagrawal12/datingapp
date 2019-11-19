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
	}

	convertTime = (time) => {
		let d = new Date(time);
		let c = new Date();
		
		// if (c.getDay() != d.getDay()) {
		// 	d.getDay() - c.getDay() 
		// }
		let result = "";
		if (d.getHours() > 12) {
			result = (d.getHours() - 12) + ':';	
			result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
			result += " PM"; 
		}
		else {
			result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';	
			result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
			result += " AM";
		}
		return result;
	}

	render() {
		const {
			sender,
			message,
			me,
			img,
			time,
		} = this.props;
		const isMe = sender != me;
		return (
			<View>
			{
				isMe ? (
					<View style={styles.left}>
						<Image style={styles.leftImg} source={this.props.img}></Image>
						<Text style={styles.leftTxt}>{this.props.message}</Text>
					</View>
					) : (
						<LinearGradient colors={['rgb(234,111,97)', 'rgb(236,62,90)']}
							style={styles.right}>
							<Text style={{color: '#fff', padding: 7, fontSize: 16}}>{message}</Text>
						</LinearGradient>  
					)
			}
			<Text style={{
				alignSelf: isMe ? 'flex-start' : 'flex-end',
				color: '#a0a0a0',
				fontSize: 12,
				marginLeft: isMe ? 65 : 0,
				marginRight: isMe ? 0 : 15,
			}}>{this.convertTime(time)}</Text>
			</View>
		);
	}
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	left: {
		flexDirection: 'row', width: '60%', 
		alignSelf: 'flex-start',
		backgroundColor: '#ffffff',
		marginTop: 10,
		padding: 10,
		marginLeft:15,
	},
	leftImg: {
		width: 25,
		height: 25,
		resizeMode: 'cover',
	},
	leftTxt: {
		marginLeft: 15,
		color: '#000',
		fontSize: 16
	},
	right: {
		width: '60%', 
		alignSelf: 'flex-end',
		marginTop: 10,
		marginRight:15,
		padding: 10,
		borderBottomEndRadius: 0,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 0,
		borderBottomStartRadius: 20,
		borderTopEndRadius: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		borderTopStartRadius: 20,
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
