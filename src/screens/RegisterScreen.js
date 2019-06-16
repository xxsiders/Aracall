import { Text } from 'native-base';
import React from 'react';
import { StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import CardBlock from '../component/CardBlock';

export default class RegisterScreen extends React.Component {
  _login=()=>{
    this.props.navigation.navigate('App')
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle='light-content' />
        <View style={styles.container}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <CardBlock width='85%' color='transparent' radius={5} style={{ padding: 5, marginTop: 20, borderWidth: 1, borderColor: 'silver', }}>
              <TextInput style={{ height: 40, fontWeight: '400', color: 'white' }} placeholder='First Name' placeholderTextColor='silver' />
            </CardBlock>
            <CardBlock width='85%' color='transparent' radius={5} style={{ padding: 5, marginTop: 20, borderWidth: 1, borderColor: 'silver', }}>
              <TextInput style={{ height: 40, fontWeight: '400', color: 'white' }} placeholder='Last Name' placeholderTextColor='silver' />
            </CardBlock>
            <CardBlock width='85%' color='transparent' radius={5} style={{ padding: 5, marginTop: 20, borderWidth: 1, borderColor: 'silver', }}>
              <TextInput style={{ height: 40, fontWeight: '400', color: 'white' }} placeholder='Email' placeholderTextColor='silver' />
            </CardBlock>
            <CardBlock width='85%' color='transparent' radius={5} style={{ padding: 5, marginTop: 20, borderWidth: 1, borderColor: 'silver', }}>
              <TextInput style={{ height: 40, fontWeight: '400', color: 'white' }} placeholder='Password' secureTextEntry placeholderTextColor='silver' />
            </CardBlock>
            <CardBlock width='85%' color='transparent' radius={5} style={{ padding: 5, marginTop: 20, borderWidth: 1, borderColor: 'silver', }}>
              <TextInput style={{ height: 40, fontWeight: '400', color: 'white' }} placeholder='Confirm Password' secureTextEntry placeholderTextColor='silver' />
            </CardBlock>
            <TouchableOpacity onPress={this._login} style={{ width: '85%', height: 42, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: '#ffca28', marginTop: 20, }}>
              <Text style={{ fontWeight: '400', fontSize: 18 }}>Create Account</Text>
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
