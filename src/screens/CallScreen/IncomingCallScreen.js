import React, { Component } from 'react';
import { Text } from 'native-base';
import { View, StatusBar, Animated, TouchableOpacity, } from 'react-native';
import { observer } from 'mobx-react';
import { Thumbnail, RowBlock } from '../../component';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CallsStore from '../../CustomComponent/callsStore';
@observer
export default class IncomingCallScreen extends Component {
  state = {
    fadeAnim: new Animated.Value(0.01),  // Initial value for opacity: 0
    timer: '00:15'
  }

  componentDidMount() {
    if (!CallsStore.AudioAnswerd) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(this.state.fadeAnim, {
            toValue: 0.01,
            duration: 1000,
          }),
          Animated.timing(this.state.fadeAnim, {
            toValue: 15,
            duration: 1000,
          }),
          Animated.timing(this.state.fadeAnim, {
            toValue: 0.01,
            duration: 1000,
          })
        ])
      ).start();
    }
  }
  renderRinging = () => {
    let { fadeAnim } = this.state;
    return <View style={{ flex: 1, alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'white', fontSize: 28, alignSelf: 'center', fontWeight: '400', marginBottom: 30 }}>Incoming Call</Text>
      <View>
        <Animated.View style={{ borderWidth: fadeAnim, borderRadius: 200, overflow: 'hidden', borderColor: '#6F1244', }}>
          <Thumbnail uri='https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/05/19/09/instagram-selfie.jpg?w968h681' size={100} />
        </Animated.View>
      </View>
      <Text style={{ color: 'white', fontSize: 24, fontWeight: '400', marginTop: 25, marginBottom: 50 }}>Sara Mai</Text>
      <RowBlock width='70%' space='between' style={{ marginTop: 50, position: 'absolute', bottom: 100 }}>
        <TouchableOpacity onPress={() => CallsStore.MakeAudioCall()} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 75, width: 75, height: 75, backgroundColor: 'green' }}>
          <Ionicons name='ios-call' size={40} color='white' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => CallsStore.CancelAudioCall()} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 75, width: 75, height: 75, backgroundColor: 'red' }}>
          <AntDesign name='close' size={30} color='white' />
        </TouchableOpacity>
      </RowBlock>
    </View>

  }
  renderAcceptedCall = () => {
    return <View style={{ flex: 1, alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'white', fontSize: 28, alignSelf: 'center', fontWeight: '400', marginBottom: 30 }}>Call Started</Text>
      <View style={{ borderWidth: 10, borderRadius: 200, overflow: 'hidden', borderColor: '#6F1244', }}>
        <Thumbnail uri='https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/05/19/09/instagram-selfie.jpg?w968h681' size={100} />
      </View>
      <Text style={{ color: 'white', fontSize: 24, fontWeight: '400', marginTop: 25 }}>Sara Mai</Text>
      <Text style={{ color: 'white', fontSize: 22, fontWeight: '400', marginTop: 25, marginBottom: 50 }}>{this.state.timer}</Text>
      <RowBlock width='70%' space='between' style={{ marginTop: 50, position: 'absolute', bottom: 100 }}>
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'white', borderRadius: 75, width: 75, height: 75, }}>
          <Ionicons name='ios-mic-off' size={40} color='white' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => CallsStore.CloseAudioCall()} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', borderRadius: 75, width: 75, height: 75, }}>
          <Ionicons name='ios-call' size={40} color='white' />
        </TouchableOpacity>
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'white', borderRadius: 75, width: 75, height: 75, }}>
          <MaterialCommunityIcons name='volume-high' size={40} color='white' />
        </TouchableOpacity>
      </RowBlock>

    </View>
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#5c0632', }}>
        <StatusBar barStyle='light-content' />
        {CallsStore.AudioAnswerd ? this.renderAcceptedCall() : this.renderRinging()}
      </View>
    );
  }
}
