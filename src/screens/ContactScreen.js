import { List, Text, Spinner } from 'native-base';
import React, { Component } from 'react';
import { ListView, ScrollView, StatusBar, StyleSheet, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CardBlock, RowBlock, Thumbnail } from '../component';
import CallsStore from '../CustomComponent/callsStore';
import Arabcall from '../handlerMethods/arabcallApi';

const w = (Dimensions.get('window').width * 0.6)
export default class ContactScreen extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      listViewData: [],
      isVisible: false,
      query: '',
      listViewTemp: [],
      loaded: false
    };
  }
  componentDidMount() {
    let uid = 1
    Arabcall.shared.contactListMethod(uid).then(res => {
      return res.json()
    }).then(data => {
      this.setState({ listViewData: data, listViewTemp: data, loaded: true })
    })
  }
  searchFilterFunction = text => {
    this.setState({ query: text })
    if (text.length > 0) {
      const newData = this.state.listViewData.filter(item => {
        const itemData = `${item.name.toUpperCase()}   
        ${item.name.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({ listViewData: newData, isOpen: true });
    } else {
      this.setState({ listViewData: this.state.listViewTemp })
    }
  };

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 80 }}>
        <StatusBar barStyle='light-content' />
        <RowBlock width='100%' style={{ backgroundColor: 'white', }}>
          <Ionicons name='ios-search' size={25} color='silver' />
          <CardBlock width='70%' style={{ padding: 5, paddingLeft: '5%', paddingRight: '5%', }}>
            <TextInput onChangeText={query => { this.searchFilterFunction(query) }} value={this.state.query} placeholder='Type here' returnKeyType='done' style={{ fontSize: 18, height: 40, fontWeight: '400', color: 'gray', width: '100%', }} />
          </CardBlock>
        </RowBlock>

        <ScrollView style={{ marginTop: 20 }} bounces={false}>
          {this.state.loaded ? <List
            bounces={false}
            leftOpenValue={150}
            disableLeftSwipe
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('MessageScreen')}>
                <RowBlock width='90%' space='between' style={{ height: 100 }}>
                  <RowBlock>
                    <Thumbnail uri={data.avatar} size={60} />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={{ fontSize: 18, fontWeight: '400', width: w }} adjustsFontSizeToFit={false}>{data.name}</Text>
                      <Text note>hello world</Text>
                    </View>
                  </RowBlock>
                  <View style={{ width: 12, height: 12, borderRadius: 12, backgroundColor: data.online_status == '1' ? 'green' : 'silver' }} />
                </RowBlock>
              </TouchableOpacity>
            }
            renderLeftHiddenRow={data =>
              <View style={{ height: 100, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: 'white' }}>
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
          /> : <Spinner />}
        </ScrollView>
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

