import { Text } from 'native-base';
import React, { Component } from 'react';
import { ScrollView, StatusBar, TextInput, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { CardBlock, RowBlock, Thumbnail } from '../../component/';
import Arabcall from '../../handlerMethods/arabcallApi';

export default class AccountScreen extends Component {
  state={
    data:{}
  }
  componentDidMount(){
    Arabcall.shared.getAccountInfoMethod(1).then(res=>{
      return res.json()
    }).then(data=>{
      console.log(data);
      this.setState({data})
    }).catch(err=>{
      console.log(err);
    })
  }
  render() {
    return (
      <View style={{ flex: 1 }} >
        <StatusBar barStyle='light-content' />
        <View style={{ paddingTop: 20, height: 80, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5c0632' }}>
          <RowBlock width='90%' >
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{ padding: 5, position: 'absolute', left: 0 }}>
            <AntDesign name='arrowleft' size={30} color='white' />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: '400', color: 'white', }} >Account</Text>
          </RowBlock>
        </View>
        
        <ScrollView bounces={false} showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
          <RowBlock width='70%' space='between' style={{ marginTop: 25, }}>
            <Thumbnail size={100} uri={this.state.data.avatar} />
            <Text style={{ fontSize: 14, fontWeight: '400', color: '#5c0632', }} >CHANGE YOUR PHOTO</Text>
          </RowBlock>
          <View style={{ width: '70%', alignSelf: 'center', marginTop: 30 }}>
            <Text style={{ fontSize: 14, fontWeight: '400', color: '#5c0632', marginBottom: 10 }} >FULL NAME</Text>
            <CardBlock width='100%' color='white' radius={5} style={{ padding: 5, alignSelf: 'flex-start', }}>
              <TextInput value={this.state.data.name} returnKeyType='done' style={{ fontSize: 16, height: 40, fontWeight: '400', color: 'gray', width: '100%', }} />
            </CardBlock>
          </View>
          <View style={{ width: '70%', alignSelf: 'center', marginTop: 25 }}>
            <Text style={{ fontSize: 14, fontWeight: '400', color: '#5c0632', marginBottom: 10 }} >EMAIL</Text>
            <CardBlock width='100%' color='white' radius={5} style={{ padding: 5, alignSelf: 'flex-start', }}>
              <TextInput value={' '} returnKeyType='done' style={{ fontSize: 16, height: 40, fontWeight: '400', color: 'gray', width: '100%', }} />
            </CardBlock>
          </View>
          <View style={{ width: '70%', alignSelf: 'center', marginTop: 25 }}>
            <Text style={{ fontSize: 14, fontWeight: '400', color: '#5c0632', marginBottom: 10 }} >PHONE</Text>
            <CardBlock width='100%' color='white' radius={5} style={{ padding: 5, alignSelf: 'flex-start', }}>
              <TextInput value={' '} returnKeyType='done' style={{ fontSize: 16, height: 40, fontWeight: '400', color: 'gray', width: '100%', }} />
            </CardBlock>
          </View>
          <View style={{ width: '70%', alignSelf: 'center', marginTop: 25 }}>
            <Text style={{ fontSize: 14, fontWeight: '400', color: '#5c0632', marginBottom: 10 }} >ADDRESS</Text>
            <CardBlock width='100%' color='white' radius={5} style={{ padding: 5, alignSelf: 'flex-start', }}>
              <TextInput value={' '} returnKeyType='done' style={{ fontSize: 16, height: 40, fontWeight: '400', color: 'gray', width: '100%', }} />
            </CardBlock>
          </View>
          <View style={{ width: '70%', alignSelf: 'center', marginTop: 25,marginBottom:10 }}>
            <TouchableOpacity style={{backgroundColor:'#5c0632',justifyContent:'center',alignItems:'center',width:75,height:40,borderRadius:5}}>
            <Text style={{ fontSize: 14, fontWeight: '400', color: 'white', }} >UPDATE</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
