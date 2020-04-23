import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

export default class LoginC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      photo: '',
      email: '',
    };
  }
  render() {
    return (
      <View style={styles.body}>
        <Text>CoronaFind 1.0</Text>
        <Text style={styles.highlight}>
          Logue e veja quem proximo a você pode estar coronado
        </Text>
        <View style={styles.sectionContainer}>
          <GoogleSigninButton
            style={{width: 192, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._signIn}
          />
          <Text> {this.state.name} </Text>
          <Image
            style={{height: 40, width: 40}}
            source={{uri: this.state.photo}}
          />
        </View>
      </View>
    );
  }
  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '578490576541-9c7m64k0qth1mne518u4pebe6g5kuks6.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      //hostedDomain: '', // specifies a hosted domain restriction
      //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      //accountName: '', // [Android] specifies an account name on the device that should be used
      //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }
  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      this.setState({
        name: userInfo.user.name,
        photo: userInfo.user.photo,
      });
      //this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      console.log(error);
    }
  };
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.orange,
  },

  sectionContainer: {
    marginTop: 100,
    paddingHorizontal: 200,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  highlight: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.black,
    paddingTop: 100,
    color: 'green',
    textAlign: 'center',
  },
});
