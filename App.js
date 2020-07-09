import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import InstagramLogin from 'react-native-instagram-login'
 //import store from 'react-native-simple-store'

class App extends React.Component{
  constructor(){
    super();
    this.state={
      resp:'',
      NAME:'',
      EMAIL:'',
      ID:'',
       token:'',
      // igToken,
      // igUserId
    }
    
  }

  async componentDidMount(){
    console.log('responst instagram1',this.state.token);
    // console.log('responst instagram2',this.state.igUserId);
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true }).then(()=>{
      //dssd
    })
    .catch((err)=>{
      console.log("play service array",err);
    })
GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:'459075606066-j0n7ndakh0o0vq305frfjhmgsc9i5585.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      //offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      //hostedDomain: '', // specifies a hosted domain restriction
      //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      //forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      //accountName: '', // [Android] specifies an account name on the device that should be used
      //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });

  }
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("response google",userInfo);
      this.setState({ NAME:userInfo.user.name });
      this.setState({ EMAIL:userInfo.user.email });
      this.setState({ ID:userInfo.user.id });
  
        console.log("response of google login email",userInfo.user.email);
        console.log("response of google login name",userInfo.user.name);
        console.log("response of google login id",userInfo.user.id);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

//   setIgToken = async (data) => {
//     await store.save('igToken', data.access_token)
//     await store.save('igUserId', data.user_id)
//     this.setState({ igToken: data.access_token, igUserId: data.user_id})
// }

  render(){
  return (
  <View style={{alignItems:'center',justifyContent:'center',marginTop:20}}>
    <Text style={{fontSize:30}}>
      Google Login
    </Text>
    <GoogleSigninButton
    style={{ width: 192, height: 48 }}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={this.signIn}
     />

  <Text style={{color:'blue',fontSize:20}}> name: {this.state.NAME} </Text>
  <Text style={{color:'blue',fontSize:20}} > email: {this.state.EMAIL} </Text>
  <Text style={{color:'blue',fontSize:20}}> id: {this.state.ID} </Text>

<View style={{backgroundColor:'grey'}}>
  <Text> ---------------------------------------------------------------------------------</Text>
</View >
<View style={{paddingTop:20}}>
  <Text style={{color:'red',fontSize:25}}>
  Instagram Login
  </Text>
 
   <TouchableOpacity onPress={()=> this.instagramLogin.show()}>
        <Text style={{color: 'green',fontSize:30}}>Login</Text>
    </TouchableOpacity>
   
     <InstagramLogin
        ref={ref => (this.instagramLogin = ref)}
       
        // client_id="1669306143209222"
        // redirect_uri="https://api.instagram.com/oauth/authorize"
        // scope="user_profile,user_media"
        // response_type="code"

        appId="1669306143209222"
        appSecret='b3e2c37dd1624d44062e346a5b117dc8'
        redirectUrl="https://www.google.com/"
        scopes={['user_profile', 'user_media']}
         onLoginSuccess={(token)=> this.setState({token}) }
        // onLoginSuccess={ this.setIgToken }
        onLoginFailure={(data) => console.log("response data of instagram",data)}
    /> 
    <Text>Token Id: {this.state.token} </Text>

    <View style={{backgroundColor:'grey'}}>
  <Text> ---------------------------------------------------------------------------------</Text>
</View >

<View>
  <Text style={{fontSize:25,paddingTop:20,color:'orange'}}>
    Facebook Login
  </Text>
</View>

</View>

  </View>
  
  );
}
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
