import React, { Component } from 'react';
import { Text, List, Spinner } from 'native-base';
import { View, StatusBar, ScrollView, TouchableOpacity, TextInput, StyleSheet, ListView, TouchableHighlight, } from 'react-native';
import { RowBlock, Thumbnail, CardBlock } from '../component';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Arabcall from '../handlerMethods/arabcallApi';
import AsyncStorage from '@react-native-community/async-storage';

import Modal from "react-native-modal";

export default class GroupScreen extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: [],
      loadedItem: 10,
      maxNumber: 0,
      isVisible: false
    };
  }
  async componentDidMount() {
    let a = await AsyncStorage.getItem('userToken')
    let uid = 1
    Arabcall.shared.chatListMethod(uid).then(res => {
      return res.json()
    }).then(data => {
      let listViewData = []
      data.forEach(element => {
        if (element.type == 'multiple') {
          listViewData.push(element)
        }
      });
      this.setState({ listViewData, maxNumber: listViewData.length })
      console.log(listViewData)
    }).catch(err => {
      console.log(err);
    })
  }
  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 10;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  ToggleModal = () => {
    return this.setState({ isVisible: !this.state.isVisible })
  }
  renderModal = () => {
    return <Modal isVisible={this.state.isVisible} style={styles.container} hardwareAccelerated useNativeDriver onBackdropPress={this.ToggleModal} onBackButtonPress={this.ToggleModal}>
      <View style={{ width: '95%', height: 400, backgroundColor: 'white', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ height: 60, justifyContent: 'center', alignSelf: 'center', width: '100%', borderBottomWidth: 1.5, borderBottomColor: '#f5f5f5' }}>
          <RowBlock width='90%' space='between'>
            <Text style={{ color: '#5c0632', fontSize: 18, }}>ADD NEW GROUP</Text>
            <TouchableOpacity style={{ padding: 5 }} onPress={this.ToggleModal}>
              <AntDesign name='close' size={30} color='silver' />
            </TouchableOpacity>
          </RowBlock>
        </View>
        <View style={{ height: 280, width: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: '10%', paddingRight: '10%', borderBottomWidth: 1.5, borderBottomColor: '#f5f5f5' }}>
          <Text style={{ color: 'gray' }}>GROUP NAME</Text>
          <CardBlock style={{ padding: 5, marginTop: 5, width: '100%', borderWidth: 1.5, borderColor: '#f5f5f5', borderRadius: 5, }}>
            <TextInput style={{ height: 30, fontSize: 16 }} />
          </CardBlock>
          <Text style={{ color: 'gray', marginTop: 20 }}>GROUP DESCRIPTION</Text>
          <CardBlock style={{ padding: 5, marginTop: 5, width: '100%', borderWidth: 1.5, borderColor: '#f5f5f5', borderRadius: 5, }}>
            <TextInput style={{ maxHeight: 60, fontSize: 16, minHeight: 30 }} multiline />
          </CardBlock>
          <RowBlock style={{ marginTop: 20, alignSelf: 'flex-start', }}>
            <TouchableOpacity style={{ height: 35, width: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray' }}>
              <Ionicons name='md-add' size={30} color='white' />
            </TouchableOpacity>
            <Text style={{ color: 'gray', marginLeft: 10 }}>UPLOAD A PHOTO</Text>
          </RowBlock>
        </View>
        <View style={{ height: 60, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={this.ToggleModal} style={{ height: 30, width: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: '#5c0632' }}>
            <Text style={{ color: 'white' }}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>

    </Modal>
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle='light-content' />
        <ScrollView onScroll={({ nativeEvent }) => {
          if (this.isCloseToBottom(nativeEvent)) {
            if (this.state.loadedItem < this.state.maxNumber) {
              this.setState({ loadedItem: this.state.loadedItem + 5 })
            }
          }
        }}
          scrollEventThrottle={0}
          style={{ marginTop: 80, flex: 1 }} bounces={false}>
          {this.state.listViewData.length == 0 ? <Spinner /> : <List
            bounces={false}
            leftOpenValue={150}
            disableLeftSwipe
            dataSource={this.ds.cloneWithRows(this.state.listViewData.slice(0, this.state.loadedItem))}
            removeClippedSubviews={true}
            renderRow={(data) => {
              return <TouchableHighlight style={{ height: 100, width: '100%' }} onPress={() => this.props.navigation.navigate('MessageScreen')}>
                <RowBlock width='90%' space='between' style={{ height: 100 }}>
                  <RowBlock>
                    <Thumbnail uri={data.avatar} size={60} />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={{ fontSize: 18, fontWeight: '400', }}>{data.group_name}</Text>
                      <Text note>{data.message}</Text>
                    </View>
                  </RowBlock>
                  <Text note style={{ fontSize: 14, }}>{data.time}</Text>
                </RowBlock>
              </TouchableHighlight>
            }
            }
            renderLeftHiddenRow={data => {
              return <View style={{ height: 100, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: 'white' }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('MessageScreen')} style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray', borderRadius: 40, marginRight: 5 }}>
                  <Ionicons name='ios-chatboxes' size={20} color='white' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => CallsStore.AnswerAudioCall()} style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', borderRadius: 40, marginRight: 5 }}>
                  <Ionicons name='ios-call' size={20} color='white' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => CallsStore.AnswerVideoCall()} style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', borderRadius: 40 }}>
                  <Ionicons name='ios-videocam' size={20} color='white' />
                </TouchableOpacity>
              </View>
            }
            }
          />
          }
        </ScrollView>
        <TouchableOpacity onPress={this.ToggleModal} style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 40, position: 'absolute', backgroundColor: '#5c0632', right: 25, bottom: 20 }}>
          <Ionicons name='ios-add' size={30} color='white' />
        </TouchableOpacity>
        {this.renderModal()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


