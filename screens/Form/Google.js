import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import FormApi from '../../api/formApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
WebBrowser.maybeCompleteAuthSession();

export default function GoogleLogin(props) {
  const [accessToken, setAccessToken] = React.useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '1078973887846-tqjppum63363sps2s29aqqnje5mbbhd6.apps.googleusercontent.com',
    iosClientId: '1078973887846-spr38i0se9kbuufbsqd6q0lqlfg3bt3a.apps.googleusercontent.com',
    androidClientId: '1078973887846-akmhcfpbk676bm8rgqpsvfbjjkpmbq1u.apps.googleusercontent.com',
    webClientId: '1078973887846-tqjppum63363sps2s29aqqnje5mbbhd6.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);
  console.log(accessToken);
  if(accessToken) redirectToHome();
  async function redirectToHome() {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    userInfoResponse.json().then(data => {
      let dataSend = {
        firstName: data.given_name,
        lastName: data.family_name,
        email: data.email,
        // image: data.picture,
        fullName: data.name
      }
      FormApi.loginGoogle({ data: dataSend });
      AsyncStorage.setItem('token', accessToken);
      AsyncStorage.setItem('refreshToken', accessToken);
      props.redirect('Home', data);
    }).catch(err => { 
      console.log(err);
      props.redirect('Home', {});
    });
  }
  return (
    <View>
      <Button
        icon="google" mode="text"
        onPress={accessToken ? redirectToHome : () => { promptAsync({ useProxy: true, showInRecents: false }) }}
      >
        {accessToken ? "Đã đăng nhập với google" : "Đăng nhập với google"}
      </Button>
    </View>
  );
}