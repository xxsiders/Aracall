import { List, Text, Spinner } from 'native-base';
import React, { Component } from 'react';
import { ListView, StatusBar, TouchableOpacity, View, ScrollView, TouchableHighlight } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createBottomTabNavigator } from 'react-navigation';
import { ContactScreen, GroupScreen, SearchScreen, SettingScreen } from './index';
import { RowBlock, Thumbnail } from '../component/index';
import CallsStore from '../CustomComponent/callsStore';
import Arabcall from '../handlerMethods/arabcallApi';
import AsyncStorage from '@react-native-community/async-storage';

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: [],
      loadedItem: 10,
      maxNumber: 0
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
        if (element.type == 'single') {
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle='light-content' />
        <ScrollView
          onScroll={({ nativeEvent }) => {
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
              return <TouchableHighlight style={{ height: 100, width: '100%' }} onPress={() => this.props.navigation.navigate('MessageScreen',{
                cid:data.cid,
                title:data.title,
                avatar:data.avatar
              })}>
                <RowBlock width='90%' space='between' style={{ height: 100 }}>
                  <RowBlock>
                    <Thumbnail uri={data.avatar} size={60} />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={{ fontSize: 18, fontWeight: '400', }}>{data.title}</Text>
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
      </View>
    );
  }
}
const TabNavigation = createBottomTabNavigator({
  ChatScreen: {
    screen: ChatScreen,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = `ios-chatboxes`;
        return <Ionicons name={iconName} size={32} color={tintColor} />;
      },
    },
  },
  GroupScreen: {
    screen: GroupScreen,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = `ios-people`;
        return <Ionicons name={iconName} size={35} color={tintColor} />;
      },
    },
  },
  ContactScreen: {
    screen: ContactScreen,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = `contacts`;
        return <AntDesign name={iconName} size={31} color={tintColor} />;
      },
    },
  },
  SettingScreen: {
    screen: SettingScreen,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = `ios-settings`;
        return <Ionicons name={iconName} size={31} color={tintColor} />;
      },
    },
  },
}, {
    tabBarOptions: {
      activeTintColor: 'white',
      style: {
        height: 80,
        padding: 10,
        paddingTop: 30,
        borderTopWidth: 0,
        position: 'absolute',
        width: '100%',
        backgroundColor: '#5c0632'
      },
      showLabel: false,
      inactiveTintColor: 'gray',
    },
    lazy: true,
  })

export default TabNavigation