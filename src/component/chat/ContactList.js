import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
	StyleSheet, View, Image, Text,
	TouchableOpacity, ImageBackground, ScrollView}
	from 'react-native';
import firebase from 'react-native-firebase'
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-navigation';

import Contact from './Contact'
import ContactChat from './ContactChat'

import BgImg from '../../images/ChatBack.png';
import ManImg from '../../images/Profile.png';

const contacts = [
	{id: 1,name: 'BBB', img: "", email: "b@b.com"}, 
	{id: 2,name: 'AAA', img: "", email: "a@a.com"}]

export default class ContactList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<LinearGradient colors={['rgb(238,113,97)', 'rgb(218,53,82)']} style={{paddingBottom: 30}}>
					<Text style={styles.header}>Chat</Text>
					<ScrollView contentContainerStyle={styles.contacts}
					  horizontal={true}
					  showsHorizontalScrollIndicator={false}>
						{
							contacts.map((item) => (
								<Contact key={item.id} img={ManImg} name={item.name} receiver={item.email} navigation={this.props.navigation} />
							))
						}
					</ScrollView>
				</LinearGradient>	
				<View style={styles.chats}>
					<ScrollView>
						{contacts.map((item) => (
							<ContactChat key={item.id} img={ManImg} name={item.name} receiver={item.email} unreadCnt={3} time={"11:13 AM"} navigation={this.props.navigation} />
						))}
					</ScrollView>
				</View>
			</SafeAreaView>
		);
	}
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	picture: {
		flex: 1,
		width: DEVICE_WIDTH,
		height: DEVICE_HEIGHT / 10 * 3,
		resizeMode: 'cover',
	},
	header: {
		color: '#ffffff',
		fontWeight: 'bold',
		marginTop: 20,
		marginBottom: 10,
		fontSize: 25,
		
		marginLeft: 40,
	},
	contacts: {
		marginLeft: 20,
	},
	chats: {
		flex: 1,
		flexDirection: 'column',
		borderRadius: 30,
		top: -30,
		paddingTop: 40,
		backgroundColor: 'white'
	}
});
