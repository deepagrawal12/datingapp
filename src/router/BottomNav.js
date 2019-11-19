/**
 * React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Image,
} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFontisto from 'react-native-vector-icons/Fontisto'

import HomeScreen from '../component/home/HomeScreen';
import ContactList from '../component/chat/ContactList';
import SettingScreen from '../component/setting/SettingScreen';

const BottomNavigator = createBottomTabNavigator(
	{
		Setting: SettingScreen,
		Home: HomeScreen,
		Chat: ContactList,
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state;
				if (routeName === 'Home') {
					if (focused)
						return <IconFontisto style={{shadowColor: '#000', shadowOffset: { width: 3, height: 5 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 40,}} name="home" size={17} color="rgb(236,62,90)" />	
					return <IconFontisto name="home" size={20} color="#000" />
				}
				if (routeName === 'Setting') {
					if (focused)
						return <IconFontAwesome style={{shadowColor: '#000', shadowOffset: { width: 3, height: 5 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 40,}} name="user-circle" size={17} color="rgb(236,62,90)" />	
					return <IconFontAwesome name="user-circle" size={20} color="#000" />
				}
				if (routeName === 'Chat') {
					if (focused)
						return <IconAntDesign style={{shadowColor: '#000', shadowOffset: { width: 3, height: 5 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 40,}} name="wechat" size={17} color="rgb(236,62,90)" />	
					return <IconAntDesign name="wechat" size={20} color="#000" />
				}
				
			},
		}),
		tabBarOptions: {
			activeTintColor: '#42f44b',
			inactiveTintColor: 'gray',
			showLabel: false,
		},
		initialRouteName : 'Home',
	}
)

export default BottomNavigator;

const styles = StyleSheet.create({
	img: {
		width: 20,
		height: 20,
		resizeMode: 'contain'
	},
	focused: {
		width: 30,
		height: 30,
		resizeMode: 'contain'
	},
});