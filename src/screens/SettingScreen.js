import { Text } from 'native-base';
import React, { Component } from 'react';
import { StatusBar, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class SettingScreen extends Component {
  _logout=async()=>{
    await AsyncStorage.removeItem('userToken')
    return this.props.navigation.navigate('Auth')
 }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle='light-content' />
        <View style={{ marginTop: 80, }} bounces={false}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('AccountScreen')} style={{ width: '100%', borderBottomWidth: 1.5, borderBottomColor: '#f5f5f5', backgroundColor: 'white', height: 60, justifyContent: 'center', paddingLeft: '10%', paddingRight: '10%' }}>
            <Text style={{ color: '#5c0632', fontSize: 18, fontWeight: '400' }}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ChatSettingScreen')} style={{ width: '100%', borderBottomWidth: 1.5, borderBottomColor: '#f5f5f5', backgroundColor: 'white', height: 60, justifyContent: 'center', paddingLeft: '10%', paddingRight: '10%' }}>
            <Text style={{ color: '#5c0632', fontSize: 18, fontWeight: '400' }}>Chat Setting</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('BlockedScreen')}  style={{ width: '100%', borderBottomWidth: 1.5, borderBottomColor: '#f5f5f5', backgroundColor: 'white', height: 60, justifyContent: 'center', paddingLeft: '10%', paddingRight: '10%' }}>
            <Text style={{ color: '#5c0632', fontSize: 18, fontWeight: '400' }}>Blocked Members</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._logout} style={{ width: '100%', borderBottomWidth: 1.5, borderBottomColor: '#f5f5f5', backgroundColor: 'white', height: 60, justifyContent: 'center', paddingLeft: '10%', paddingRight: '10%' }}>
            <Text style={{ color: '#5c0632', fontSize: 18, fontWeight: '400' }}>Logout</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}
