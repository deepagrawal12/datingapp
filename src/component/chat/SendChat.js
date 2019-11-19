import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
	StyleSheet, View, Image, Text, TextInput, FlatList, KeyboardAvoidingView, Keyboard, SafeAreaView,
	TouchableOpacity, ImageBackground, ScrollView, Alert, findNodeHandle, Platform}
	from 'react-native';
import firebase from 'react-native-firebase'
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Message from './Message'

import BgImg from '../../images/ChatBack.png';
import ManImg from '../../images/Profile.png';

export default class SendChat extends Component {
	constructor(props) {
		super(props);
		var receiver = this.props.navigation.getParam('email');

		this.state = {
			receiverName: props.navigation.getParam('name'),
			msgTxt: "",
			receiver: receiver,
			sender: global.__Email,
			msgList: [],
			showMore: false,
		}
	}

	componentDidMount() {
		firebase.firestore().collection('messages')
		.doc(this.state.sender)
		.collection(this.state.receiver)
		.orderBy('time')
		.onSnapshot((doc) => {
			this.setState({msgList: []});

			doc.docs.forEach((childSnapshot) => {
				this.setState(prevState => {
					return {
						msgList: [...prevState.msgList, childSnapshot.data()]
					}
				});
			});
		});
	}

	componentDidUpdate() {
		console.log("componentDidUpdate");
		
	}
	sendMsg = async () => {
		if (this.state.msgTxt.length > 0) {
			Keyboard.dismiss();
			firebase.firestore().collection('messages')
			.doc(this.state.sender)
			.collection(this.state.receiver)
			.add({
				message: this.state.msgTxt,
				from: this.state.sender,
				time: firebase.firestore.Timestamp.now().toMillis(),
			});
			firebase.firestore().collection('messages')
			.doc(this.state.receiver)
			.collection(this.state.sender)
			.add({
				message: this.state.msgTxt,
				from: this.state.sender,
				time: firebase.firestore.Timestamp.now().toMillis(),
			});
			this.setState({msgTxt: ''});
		}
	}

	render() {
		return (
			<SafeAreaView style={{flex:1}}>
				<KeyboardAwareScrollView 
					contentContainerStyle={{flex:1}}
					scrollEnabled={true}
					enableOnAndroid={true}
					enableAutomaticScroll={(Platform.OS === 'ios')}
					extraHeight={50}
					keyboardShouldPersistTaps={'handled'}
				>
				<LinearGradient colors={['rgb(234,111,97)', 'rgb(236,62,90)']} style={styles.container}>
					<View style={styles.header}>
						<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
							<IconFontAwesome name="chevron-left" size={30} color="#000" />
						</TouchableOpacity>	
						<View style={{width: '80%', alignItems: 'center'}}>
							<Image style={styles.personImg} source={ManImg}></Image>
							<Text style={styles.personName}>{this.state.receiverName}</Text>	
						</View>	
						<TouchableOpacity onPress={() => this.setState({showMore: !this.state.showMore})}>
							<IconFontAwesome5 name="ellipsis-h" size={20} color="#000" />
						</TouchableOpacity>
					</View>
					<View style={styles.chatsContainer}>
						<FlatList enableOnAndroid
							onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
							onLayout={() => this.flatList.scrollToEnd({animated: true})}
							ref={ref => this.flatList = ref}
							data={this.state.msgList}
							renderItem={({ item }) => 
								<Message 
								  img={ManImg}
								  me={this.state.sender}
								  sender={item.from}
								  message={item.message}
								  time={item.time}
								/>}
							keyExtractor={item => item.time.toString()}
						/>
					</View>
					<View style={styles.inputSpace}></View>
					<View style={styles.inputContainer}>
						<View style={styles.inputBar}>
							<TextInput style={styles.input}
								value={this.state.msgTxt}
								onChangeText={(text) => this.setState({msgTxt: text})}
							/>
							<TouchableOpacity style={styles.sendBtn} onPress={this.sendMsg}>
								<IconMaterialCommunityIcons name="send" size={20} color="#fff" />
							</TouchableOpacity>
						</View>
					</View>
					{
						this.state.showMore &&
						<View style={styles.more}>
							<TouchableOpacity style={{width: wp(40), height: hp(8), alignItems: 'center', justifyContent: 'center'}}>
								<Text style={{fontSize: hp('2.5%')}}>Report this user</Text>
							</TouchableOpacity>
							<TouchableOpacity style={{width: wp(40), height: hp(8), alignItems: 'center', justifyContent: 'center'}}>
								<Text style={{fontSize: hp('2.5%')}}>Remove this user</Text>
							</TouchableOpacity>
						</View>
					}
				</LinearGradient>
				</KeyboardAwareScrollView>
			</SafeAreaView>
		);
	}
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		width: DEVICE_WIDTH,
		height: DEVICE_HEIGHT,
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: hp('15%'),
		backgroundColor: '#fff',
		paddingTop: hp('3%'),
	},
	personImg: {
		width: hp('9%'),
		height: hp('9%'),
		resizeMode: 'cover',
	},
	personName: {
		color: '#000000',
		marginTop: hp('0.5%'),
		fontSize: hp('2.5%'),
		
	},
	chatsContainer: {
		backgroundColor: '#fff',
		height: hp('65%'),
	},
	inputContainer: {
		width: wp('100%'),
		height: hp('8%'),
		alignItems:'center', 
		justifyContent:'center',
		borderColor: '#00ff00',
	},
	input: {
		color: '#fff',
		width: wp('80%'),
	},
	inputBar: {
		borderRadius: 50,
		backgroundColor: 'rgba(10,10,10, 0.15)',
		width: wp('85%'),
		alignItems:'center', 
		justifyContent:'center',
		height: hp('5.5%'),
	},
	sendBtn: {
		position: 'absolute',
		right: 10,
	},
	inputSpace: {
		height: hp('6%'),
		backgroundColor: '#fff',
		borderBottomEndRadius: hp('6%'),
		borderBottomLeftRadius: hp('6%'),
		borderBottomRightRadius: hp('6%'),
		borderBottomStartRadius: hp('6%'),
	},
	more: {
		position: 'absolute',
		top:hp(11),
		right: 5,
		width: wp(40),
		height: hp(16),
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: { width: 3, height: 5 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 40,
	}
});
