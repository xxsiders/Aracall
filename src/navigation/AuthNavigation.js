import { observer } from 'mobx-react';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import ChatScreen from '../screens/ChatScreen';
import MessageScreen from '../screens/ChatView/MessageScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AccountScreen from '../screens/SettingScreen/AccountScreen';
import BlockedScreen from '../screens/SettingScreen/BlockedScreen';
import ChatSettingScreen from '../screens/SettingScreen/ChatSettingScreen';
import AsyncStorage from '@react-native-community/async-storage';

@observer

class AuthNavigation extends React.Component {

  async componentDidMount() {
    const token = await AsyncStorage.getItem('userToken')
    this.props.navigation.navigate(token ? 'App' : 'Auth');
  }

  render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={1} color='#5c0632' />
      </View>
    );
  }
}
const AppStack = createStackNavigator({
  ChatScreen,
  MessageScreen,
  AccountScreen,
  BlockedScreen,
  ChatSettingScreen
},
  { headerMode: 'none', }
);

const AuthStack = createStackNavigator({ LoginScreen, RegisterScreen }, { headerMode: 'none', });

export default createSwitchNavigator(
  {
    AuthLoading: AuthNavigation,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
