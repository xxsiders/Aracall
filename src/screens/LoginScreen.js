import React from 'react';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, StatusBar, Linking } from 'react-native';
import CardBlock from '../component/CardBlock';
import { Text } from 'native-base';
import RowBlock from '../component/RowBlock';
import Arabcall from '../handlerMethods/arabcallApi';
import AsyncStorage from '@react-native-community/async-storage';

export default class LoginScreen extends React.Component {
  state = {
    email: '',
    password: ''
  }
  _login = () => {
    const { email, password } = this.state
    if (email && password) {
      Arabcall.shared.loginMethod(email, password).then(res => {
        return res.json()
      }).then(async (data) => {
        console.log(data)
        if (data.status == 1) {
          await AsyncStorage.setItem('userToken', JSON.stringify(data))
          this.props.navigation.navigate('App')
        }else{
          alert('Email or Password is wrong')
        }
      }).catch(err => {
        alert(err)
      })
    } else {
      alert('Empty Email or Password')
    }
  }
  _Register = () => {
    return Linking.canOpenURL("arabface://app").then(supported => {
      if (supported) {
        Linking.openURL("arabface://app");
      } else {
        alert('sorry invalid url')
      }
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle='light-content' />
        <View style={styles.container}>
          <Image source={require('../../assets/aracall.png')} style={{ width: 175, height: 175 }} resizeMode='contain' />
          <View style={{ width: '100%', alignItems: 'center' }}>
            <CardBlock width='85%' color='transparent' radius={5} style={{ padding: 5, marginTop: 20, borderWidth: 1, borderColor: 'silver', height: 40 }}>
              <TextInput style={{ height: 40, fontWeight: '400', color: 'white', }} value={this.state.email} onChangeText={email => this.setState({ email })} placeholder='Email' placeholderTextColor='silver' />
            </CardBlock>
            <CardBlock width='85%' color='transparent' radius={5} style={{ padding: 5, marginTop: 20, borderWidth: 1, borderColor: 'silver', height: 40 }}>
              <TextInput style={{ height: 40, fontWeight: '400', color: 'white' }} value={this.state.password} onChangeText={password => this.setState({ password })} placeholder='Password' secureTextEntry placeholderTextColor='silver' />
            </CardBlock>
            <TouchableOpacity onPress={this._login} style={{ width: '85%', height: 42, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: '#ffca28', marginTop: 20, }}>
              <Text style={{ color: 'gray', fontWeight: '400', fontSize: 18 }}>Login</Text>
            </TouchableOpacity>
            <RowBlock width='100%' space='between' style={{ marginTop: 40 }}>
              <View
                style={{
                  borderBottomColor: 'silver',
                  borderBottomWidth: 1,
                  width: '40%'
                }}
              />
              <Text style={{ fontSize: 20, color: 'silver', fontWeight: '400' }}>or</Text>
              <View
                style={{
                  borderBottomColor: 'silver',
                  borderBottomWidth: 1,
                  width: '40%'
                }}
              />
            </RowBlock>
            <TouchableOpacity onPress={this._Register} style={{ width: '85%', height: 42, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: 'silver', marginTop: 40, }}>
              <Text style={{ color: 'white', fontWeight: '400', fontSize: 18 }}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5c0632',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
