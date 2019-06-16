import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from 'native-base';
import React, { Component } from 'react';
import { StatusBar, TouchableOpacity, View } from 'react-native';
import { RowBlock, Thumbnail } from '../component';

export default class RequestScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }} >
        <StatusBar barStyle='light-content' />
        <View style={{ paddingTop: 20, height: 80, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5c0632' }}>
          <RowBlock width='90%' >
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ padding: 5, position: 'absolute', left: 0 }}>
              <Ionicons name='ios-arrow-dropleft-circle' size={30} color='white' />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: '400', color: 'white', }} >Contact Request</Text>
          </RowBlock>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white', alignItems: 'center', }}>
          <View style={{ marginBottom: 50, alignItems: 'center' }}>
            <Thumbnail uri='https://thumbor.forbes.com/thumbor/1280x868/https%3A%2F%2Fblogs-images.forbes.com%2Fnomanazish%2Ffiles%2F2018%2F01%2Ftravel-1749508_1280-1200x766.jpg' size={100} />
            <Text style={{ fontSize: 20, fontWeight: '400', color: '#5c0632', marginTop: 25 }}>Sara Mai</Text>
            <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 5 }}>Hello world</Text>
          </View>
          <View style={{ width: '75%', alignSelf: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'gray' }}>
              Sara Mai has sent you a contact Request. Do you want to accept?
            </Text>
          </View>
          <View style={{ alignSelf: 'center', alignItems: 'center', width: '100%', marginTop: 15 }}>
            <RowBlock space='between' width='50%'>
              <TouchableOpacity style={{ width: 75, height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5c0632', borderRadius: 5 }}>
                <Text style={{ color: 'white', fontWeight: '400' }}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 75, height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5c0632', borderRadius: 5 }}>
                <Text style={{ color: 'white', fontWeight: '400' }}>Ignore</Text>
              </TouchableOpacity>
            </RowBlock>
          </View>
        </View>

      </View>
    );
  }
}
