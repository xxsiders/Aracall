import React, { Component } from 'react';
import { View, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'native-base';
import { RowBlock, TextBlock, Thumbnail } from '../../component';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Arabcall from '../../handlerMethods/arabcallApi';

export default class BlockedScreen extends Component {
  state = {
    loaded: false,
    users: []
  }

  componentDidMount() {
    this.loadUsers()
  }
  loadUsers(){
    let uid = 1
    Arabcall.shared.getBlockedListMethod(uid).then(res => {
      return res.json()
    }).then(data => {
      this.setState({ users: data, loaded: true })
      console.log(data);
    }).catch(err => {
      alert(err)
    })
  }
  unblockUser=(id)=>{
    let uid = 1
    Arabcall.shared.unblockUserMethod(uid,id).then(res=>{
      console.log(res)
    }).catch(err=>alert(err))
    this.loadUsers()
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
            <Text style={{ fontSize: 20, fontWeight: '400', color: 'white', }} >Blocked Members</Text>
          </RowBlock>
        </View>
        <ScrollView bounces={false} style={{ flex: 1, }}>
            {this.state.users.map((item,i) => {
              return <TouchableOpacity key={i} activeOpacity={0.5} onLongPress={()=>this.unblockUser(item.id)}>
                <RowBlock width='90%' space='between' style={{ height: 100 }}>
                  <RowBlock>
                    <Thumbnail uri={item.avatar} size={60} />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={{ fontSize: 18, fontWeight: '400' }}>{item.name}</Text>
                      <Text note>{item.username}</Text>
                    </View>
                  </RowBlock>
                </RowBlock>
              </TouchableOpacity>
            })}
        </ScrollView>
      </View>
    );
  }
}
