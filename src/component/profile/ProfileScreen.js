import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	TextInput,
	Image,
	ImageBackground,
	Keyboard
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Wallpaper from '../Wallpaper.js'
import Logo from '../../images/LogoPhoto.png';
import BtnImg from '../../images/JoinBg.png';

import UserImg from '../../images/user.png';

const options = {
  title: 'Select Your Photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class ProfileScreen extends Component {
	constructor(props) {
		super(props);
		
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			filePath: {},
			choosed: false,
		}
	}
	onChanged(text){
	    let newText = '';
	    let numbers = '0123456789';

	    for (var i=0; i < text.length; i++) {
	        if(numbers.indexOf(text[i]) > -1 ) {
	            newText = newText + text[i];
	        }
	        else {
	            // your call back function
	            alert("Please enter numbers only");
	        }
	    }
	    global.Age = text;
	}

	onSubmit() {
		Keyboard.dismiss();
		if (global.Name && global.Age && global.profilePic)
			this.props.navigation.navigate('Gender');
		else
			alert('Name, Age and Profile Picture are required.'); 
	}
	chooseImg = () => {
	    var options = {
	      title: 'Select Image',
	      storageOptions: {
	        skipBackup: true,
	        path: 'images',
	      },
	    };
	    ImagePicker.showImagePicker(options, response => {
			console.log('Response = ', response);
			global.profilePic = '';
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
				alert(response.customButton);
			} else {
				let source = response;
				global.profilePic = response;
				// You can also display the image using data:
				// let source = { uri: 'data:image/jpeg;base64,' + response.data };
				this.setState({
					choosed: true,
					filePath: source,
				});
			}
	    });
	};
	render() {
		return (
			<Wallpaper>
				<Image style={styles.logo} source={Logo}></Image>
				<View style={styles.inputContainer}>
					<Text style={{color: '#f0f0f0', marginRight: 14,}}>Name</Text>
					<TextInput
						style={styles.input}
						placeholder={this.props.placeholder}
						secureTextEntry={this.props.secureTextEntry}
						autoCorrect={this.props.autoCorrect}
						autoCapitalize={this.props.autoCapitalize}
						returnKeyType={this.props.returnKeyType}
						autoComplete={this.props.autoComplete}
						onChangeText={(text) => global.Name = text}
					/>
				</View>
				<View style={styles.inputContainer}>
					<Text style={{color: '#f0f0f0', marginRight: 28,}}>Age</Text>
					<TextInput
						style={styles.input}
						placeholder={this.props.placeholder}
						keyboardType={'numeric'}
						axLength={3}
						secureTextEntry={this.props.secureTextEntry}
						autoCorrect={this.props.autoCorrect}
						autoCapitalize={this.props.autoCapitalize}
						returnKeyType={this.props.returnKeyType}
						autoComplete={this.props.autoComplete}
						onChangeText={(text)=> this.onChanged(text)}
					/>
				</View>
				<Text style={{color: '#f0f0f0', marginTop: 15,}}>Choose Profile Picture</Text>
				{
					!this.state.choosed &&
					<TouchableOpacity onPress={this.chooseImg.bind(this)}>
						<Image
			            source={UserImg}
			            style={styles.userImg}
			        	/>
			        </TouchableOpacity>	
		    	}
				{
					this.state.choosed &&
					<TouchableOpacity onPress={this.chooseImg.bind(this)}>
						<Image
			            source={{ uri: this.state.filePath.uri }}
			            style={styles.userImg}
			            />
		            </TouchableOpacity>
		    	}
				<TouchableOpacity style={styles.btnContainer} activeOpacity={0.8} onPress={this.onSubmit}>
					<ImageBackground source={BtnImg} style={styles.btn} imageStyle={{ borderRadius: 50}}>
						<Text style={styles.btnTxt}>NEXT</Text>
					</ImageBackground>
				</TouchableOpacity>
			</Wallpaper>
	);
  }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	logo: {
		resizeMode: 'contain',
		height: hp(23),
		width: wp(70),
		marginTop: hp(6),
	},
	inputContainer: {
		backgroundColor: 'transparent',
		flexDirection: 'row',
		borderBottomColor: '#f0f0f0',
		borderBottomWidth: 1,
		width: wp(70),
		alignItems: 'center',
	},
	input: {
		backgroundColor: 'transparent',
		width: wp(50),
		color: '#f0f0f0',
	},
	userImg: {
		width: wp(30),
		height: wp(30),
		resizeMode: 'cover',
		borderRadius: 100,
		marginTop: 10, 
	},
	btnContainer: {
		height: hp('6.5%'),
		width: wp(75),
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 40,
	},
	btn: {
		resizeMode: 'cover',
		width: wp(75),
		height: hp('6.5%'),
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnTxt: {
		color: '#ffffff',
		fontWeight: 'bold',
		fontSize: 16,
		
	}
});

