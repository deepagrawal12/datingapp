/**
 * React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, AppState, StackActions, NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase'

import JoinScreen from '../component/join/JoinScreen';
import ProfileScreen from '../component/profile/ProfileScreen';
import SexualPref from '../component/sexualpref/SexualPref';
import GenderSelect from '../component/gender/GenderSelect';
import University from '../component/university/University';
import SendCode from '../component/auth/SendCode';
import VerifyCode from '../component/auth/VerifyCode';
import BottomNavigator from './BottomNav'
import SendChat from '../component/chat/SendChat';
import LocationScreen from '../component/location/LocationScreen';
import SuccessScreen from '../component/success/SuccessScreen';

const AppNavigator = createStackNavigator(
		{
			Login: JoinScreen,
			Prefer: SexualPref,
			Profile: ProfileScreen,
			Gender: GenderSelect,
			University: University,
			BottomNav: BottomNavigator,
			SendCode: SendCode,
			VerifyCode: VerifyCode,
			SendChat: SendChat,
			Location: LocationScreen,
			Success: SuccessScreen
		},
		{
			initialRouteName: 'Login',   // this key needs to be set dynamically
			headerMode: 'none',
			navigationOptions: {
				gesturesEnabled: false
			}
		}
	)

const AppContainer = createAppContainer(AppNavigator)


export default class Navigator extends Component {

    state = {}

    render = () => <AppContainer ref={r => this.navigation = r._navigation} />

    componentDidMount() {
        this.startObservingAuthState(user => {

            let initialRouteName = 'Login'
            if(user) initialRouteName = 'BottomNav'

            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: initialRouteName })],
            })
            this.navigation.dispatch(resetAction)
        })
    }

    startObservingAuthState = (callback = () => null) => {
        // if(Platform.OS == 'ios') return // Listner only applicable on android devices.
        try {
            this.removeAuthStateChangedListner = firebase.auth().onAuthStateChanged(user => {
                if(user) {
                    // user is verified and logged in
                    if(__DEV__) console.log("Observing Auth State Changes", JSON.stringify(user))
                    callback(user)
                } else {
                    if(__DEV__) console.log("Stopped Observing Auth State Changes")
                    this.user = undefined
                    callback()
                    this.removeAuthStateChangedListner()
                }
            })
        } catch (e) {
                if(__DEV__) console.log('[Firebase] ', e)
            }
        }



}
