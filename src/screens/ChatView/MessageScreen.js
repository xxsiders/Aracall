import { observer } from 'mobx-react';
import { Text } from 'native-base';
import React, { Component } from 'react';
import { StatusBar, TouchableOpacity, View } from 'react-native';
import { GiftedChat, InputToolbar, MessageImage, Bubble } from 'react-native-gifted-chat';
import { Menu, Provider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RowBlock, Thumbnail } from '../../component';
import CallsStore from '../../CustomComponent/callsStore';
import navigationStore from '../../CustomComponent/navigationStore';
import Sound from "react-native-sound";
import Arabcall from '../../handlerMethods/arabcallApi';
@observer
export default class MessageScreen extends Component {
  state = {
    isDropdown: false,
    isOptions: false,
    cid: this.props.navigation.getParam('cid'),
    title: this.props.navigation.getParam('title'),
    avatar: this.props.navigation.getParam('avatar'),
    data: [],
    playAudio: false,
  }
  componentDidMount() {
    let uid = 87
    let cid = 10
    Arabcall.shared.getSpecificChatMethod(uid, cid).then(res => {
      return res.json()
    }).then(data => {
      console.log(new Date().getTime())
      let items = []
      data.map(item => {
        console.log(new Date(item.created_at*1000))
        items.push({
          _id: item.id,
          text: item.text,
          CreatedAt: new Date(item.created_at*1000),
          user: {
            _id: item.user.id,
            name: item.user.name,
            avatar: 'https://arabface.online/' + item.user.avatar
          },
          image: item.photo,
          video: item.video,
          audio: item.music,
          location: item.location
        })
      })
      this.setState({ data: items })
    }).catch(err => {
      console.log(err);
    })
  }

  _toggleMenu = () => this.setState({ isDropdown: !this.state.isDropdown });

  renderAudio = props => {
    return !props.currentMessage.audio ? (
      <View />
    ) : (
        <TouchableOpacity
          onPress={() => {
            this.setState({
              playAudio: true
            });
            const sound = new Sound(props.currentMessage.audio, "", error => {
              if (error) {
                console.log("failed to load the sound", error);
              }
              sound.play(success => {
                console.log(success, "success play");
                this.setState({ playAudio: false });
              });
            });
          }}
        >
          <Ionicons
            name={this.state.playAudio ? "ios-pause" : 'ios-play'}
            size={35}
            color={this.state.playAudio ? "red" : "blue"}
            style={{
              left: 90,
              position: "relative",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.5,
              backgroundColor: "transparent"
            }}
          />
        </TouchableOpacity>
      );
  };
  onSend(messages) {
    console.log(messages[0])
  }

  blockUser = () => {
    let uid = 1
    return Arabcall.shared.blockUserMethod(uid, 6).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }

  report = () => {
    let uid = 87
    let cid = 10
    return Arabcall.shared.reportConversation(uid, cid).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }

  clearConversation = () => {
    let uid = 87
    let cid = 10
    return Arabcall.shared.clearConversation(uid, cid).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }
  renderDropDown = () => {
    return <Menu
      visible={this.state.isDropdown}
      onDismiss={this._toggleMenu}
      anchor={
        <TouchableOpacity style={{ padding: 5, }} onPress={this._toggleMenu}>
          <Ionicons name='ios-information-circle' size={25} color='white' />
        </TouchableOpacity>
      }
    >
      <Menu.Item onPress={this.clearConversation} title="Clear conversation" />
      <Menu.Item onPress={this.report} title="Report conversation" />
      <Menu.Item onPress={this.blockUser} title="Block" />
    </Menu>
  }
  renderInputToolbar(props) {
    //Add the extra styles via containerStyle
    return <InputToolbar {...props} containerStyle={{ borderTopWidth: 5, borderTopColor: '#f5f5f5', }} />
  }
  _toggleOption = () => {
    this.setState({ isOptions: !this.state.isOptions })
  }

  renderSend = props => {
    if (!props.text.trim()) { // text box empty
      return <TouchableOpacity style={{ padding: 5, paddingRight: 15, }} onPress={this._toggleOption}>
        <SimpleLineIcons name='options' size={25} color='#5c0632' />
      </TouchableOpacity>
    }
    return <TouchableOpacity {...props} style={{ padding: 5, paddingRight: 15, }} onPress={() => {
      props.onSend({ text: props.text }, true)
      this.setState({ isOptions: false })
    }
    }>
      <Text style={{ fontSize: 18, fontWeight: '400', color: '#536DFE' }}>Send</Text>
    </TouchableOpacity >

  }
  renderBubble = props => {
    return (
      <View>
        {this.renderAudio(props)}
        <Bubble {...props} />
      </View>
    );
  };
  renderMessageImage(props) {
    return (
      <MessageImage
        {...props}
        imageProps={{ fadeDuration: 0, }}
        containerStyle={{ alignItems: 'center', padding: 0, margin: 0, width: 200, minHeight: 100, maxHeight: 200, }}
        imageStyle={{ padding: 0, margin: 0, width: 200, minHeight: 100, maxHeight: 200, borderRadius: 0, }}
      />
    )
  }
  render() {
    return (
      <Provider >
        <View style={{ flex: 1 }}>
          {console.log(this.state.playAudio)}
          <StatusBar barStyle='light-content' />
          <View style={{ height: 100, width: '100%', backgroundColor: '#5c0632', paddingTop: 20, justifyContent: 'center' }}>
            <RowBlock width='90%' space='between'>
              <RowBlock width='50%' >
                <TouchableOpacity style={{ padding: 5, position: 'absolute', left: 0 }} onPress={() => this.props.navigation.goBack()}>
                  <AntDesign name='arrowleft' size={30} color='white' />
                </TouchableOpacity>
                <TouchableOpacity style={{ left: 55, position: 'absolute', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 150, padding: 5 }}>
                  <Thumbnail uri={this.state.avatar} size={50} />
                  <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: '400', color: 'white', width: 100 }} >{this.state.title.split(' ')[0]}</Text>
                </TouchableOpacity>
              </RowBlock>
              <RowBlock width='30%' space='between'>
                <TouchableOpacity style={{ padding: 5 }} onPress={() => { CallsStore.AnswerAudioCall(); navigationStore.SaveCurrentScreen('MessageScreen') }}>
                  <Ionicons name='ios-call' size={25} color='white' />
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 5 }} onPress={() => CallsStore.AnswerVideoCall()}>
                  <Ionicons name='ios-videocam' size={25} color='white' />
                </TouchableOpacity>
                {this.renderDropDown()}
              </RowBlock>
            </RowBlock>
          </View>
          <View style={{ flex: 1, }}>
            <GiftedChat
              renderBubble={this.renderBubble}
              renderMessageImage={this.renderMessageImage}
              renderUsernameOnMessage={true}
              renderInputToolbar={this.renderInputToolbar}
              messages={this.state.data.reverse()}
              renderSend={this.renderSend}
              renderChatFooter={props => (
                <View  {...props} style={{ width: '100%', height: 150, backgroundColor: 'white', display: this.state.isOptions ? 'flex' : 'none', paddingTop: 10, paddingBottom: 10, borderTopWidth: 5, borderTopColor: '#f5f5f5', }}>
                  <RowBlock width='80%' space='between'>
                    <View style={{ alignItems: 'center' }}>
                      <TouchableOpacity style={{ padding: 5, alignItems: 'center' }}>
                        <Ionicons name='ios-mic' size={30} color='#5c0632' />
                        <Text style={{ color: '#5c0632', fontSize: 12, fontWeight: '400' }}>AUDIO</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{ padding: 5, alignItems: 'center' }}>
                        <MaterialCommunityIcons name='map-marker' size={30} color='#5c0632' />
                        <Text style={{ color: '#5c0632', fontSize: 12, fontWeight: '400' }}>LOCATION</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <TouchableOpacity style={{ padding: 5, alignItems: 'center' }}>
                        <Ionicons name='ios-film' size={30} color='#5c0632' />
                        <Text style={{ color: '#5c0632', fontSize: 12, fontWeight: '400' }}>VIDEO</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{ padding: 5, alignItems: 'center' }}>
                        <Ionicons name='ios-image' size={30} color='#5c0632' />
                        <Text style={{ color: '#5c0632', fontSize: 12, fontWeight: '400' }}>GALLERY</Text>
                      </TouchableOpacity>

                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <TouchableOpacity style={{ padding: 5, alignItems: 'center' }}>
                        <MaterialCommunityIcons name='file-document' size={30} color='#5c0632' />
                        <Text style={{ color: '#5c0632', fontSize: 12, fontWeight: '400' }}>DOCUMENT</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{ padding: 5, alignItems: 'center' }}>
                        <MaterialCommunityIcons name='pencil' size={30} color='#5c0632' />
                        <Text style={{ color: '#5c0632', fontSize: 12, fontWeight: '400' }}>HANDWRITING</Text>
                      </TouchableOpacity>
                    </View>
                  </RowBlock>
                </View>
              )}
              isAnimated={false}
              onSend={messages => this.onSend(messages)}
              renders
              user={{
                _id: 1,
              }}
            />
          </View>
        </View>
      </Provider>
    );
  }
}

