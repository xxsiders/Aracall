import React, { Component } from 'react';
import { View, StatusBar, TouchableOpacity, } from 'react-native';
import { Text, Switch, Spinner } from 'native-base';
import { RowBlock, TextBlock } from '../../component';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Arabcall from '../../handlerMethods/arabcallApi';

export default class AccountSettingScreen extends Component {
  state = {
    option1: false,
    option2: false,
    loaded: false
  }
  componentDidMount() {
    let uid = 1
    Arabcall.shared.getChatSettingsMethod(uid).then(res => {
      return res.json()
    }).then(data => {
      const option1 = data.last_seen_status == '0' ? false : true
      const option2 = data.read_receipt_status == '0' ? false : true
      this.setState({ option1, option2,loaded:true })
    }).catch(err => {
      alert(err)
    })
  }
  chagneSettingOpt1 = (opt) => {
    const uid = 1
    return Arabcall.shared.postChatSettingsMethod(uid, opt ? '1' : '0', this.state.option2 ? '1' : '0').then(res => {
    }).catch(err => {
      alert(err)
    })
  }
  chagneSettingOpt2 = (opt) => {
    const uid = 1
    return Arabcall.shared.postChatSettingsMethod(uid, this.state.option1 ? '1' : '0', opt ? '1' : '0').then(res => {
    }).catch(err => {
      alert(err)
    })
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }} >
        <StatusBar barStyle='light-content' />
        <View style={{ paddingTop: 20, height: 80, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5c0632' }}>
          <RowBlock width='90%' >
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ padding: 5, position: 'absolute', left: 0 }}>
              <AntDesign name='arrowleft' size={30} color='white' />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: '400', color: 'white', }} >Chat Settings</Text>
          </RowBlock>
        </View>
        {this.state.loaded ? <View style={{ flex: 1, width: '85%', alignSelf: 'center' }}>
          <View style={{ height: 120, justifyContent: 'center', borderBottomWidth: 1.5, borderBottomColor: 'silver' }}>
            <RowBlock width='100%' space='between' style={{}}>
              <Text style={{ fontSize: 16, fontWeight: '500', }} >Last seen</Text>
              <Switch value={this.state.option1} onValueChange={option1 => { this.setState({ option1 }); this.chagneSettingOpt1(option1) }} />
            </RowBlock>
            <TextBlock width='100%' style={{ marginTop: 10, }} size={14}>
              By enabling last seen, the time and date you were last online will be displayed to others.
            </TextBlock>
          </View>
          <View style={{ height: 120, justifyContent: 'center', borderBottomWidth: 1.5, borderBottomColor: 'silver' }}>
            <RowBlock width='100%' space='between' style={{}}>
              <Text style={{ fontSize: 16, fontWeight: '500', }} >Read receipt settings</Text>
              <Switch value={this.state.option2} onValueChange={option2 => { this.setState({ option2 }); this.chagneSettingOpt2(option2) }} />
            </RowBlock>
            <TextBlock width='100%' style={{ marginTop: 10, }} size={14}>
              By enabling read receipt you will see the time and date your messages are read.
            </TextBlock>
          </View>
        </View> : <Spinner />}
      </View>
    );
  }
}
