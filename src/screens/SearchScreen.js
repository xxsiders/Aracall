import React, { Component } from 'react';
import { Text } from 'native-base';
import { View, StatusBar, ScrollView, TouchableOpacity, TextInput,FlatList } from 'react-native';
import { observer } from 'mobx-react';
import { CardBlock, RowBlock, Thumbnail } from '../component';
import Ionicons from 'react-native-vector-icons/Ionicons';

@observer

export default class SearchScreen extends Component {
  state = {
    data: ['Sara Mai', 'Sam Dore', 'John Smith', 'Tara Ren',],
    newData: [],
    query: '',
  }
  searchFilterFunction = text => {
    this.setState({ query: text })
    if (text.length > 0) {
      const newData = this.state.data.filter(item => {
        const itemData = `${item.toUpperCase()}   
        ${item.toUpperCase()}`;

        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      this.setState({ newData, isOpen: true });
    } else {
      this.setState({ newData: [] })
    }
  };

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 80 }}>
        <StatusBar barStyle='light-content' />
        <RowBlock width='100%' style={{ backgroundColor: 'white' }}>
          <Ionicons name='ios-search' size={25} color='silver' />
          <CardBlock width='70%' style={{ padding: 5, paddingLeft: '5%', paddingRight: '5%', }}>
            <TextInput onChangeText={query => { this.searchFilterFunction(query) }} value={this.state.query} placeholder='Type here' returnKeyType='done' style={{ fontSize: 16, height: 40, fontWeight: '400', color: 'gray', width: '100%', }} />
          </CardBlock>
        </RowBlock>
        <ScrollView style={{ flex: 1, marginTop: 10 }}>
          <FlatList
            data={this.state.newData}
            renderItem={({ item }) => (
              <TouchableOpacity key={item} style={{ backgroundColor: 'white' }}>
                <RowBlock width='90%' space='between' style={{ height: 100 }}>
                  <RowBlock>
                    <Thumbnail uri='https://thumbor.forbes.com/thumbor/1280x868/https%3A%2F%2Fblogs-images.forbes.com%2Fnomanazish%2Ffiles%2F2018%2F01%2Ftravel-1749508_1280-1200x766.jpg' size={60} />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={{ fontSize: 18, fontWeight: '400' }}>{item}</Text>
                      <Text note>hello world</Text>
                    </View>
                  </RowBlock>
                </RowBlock>
              </TouchableOpacity>
            )}
            keyExtractor={item => item}
          />
        </ScrollView>
      </View>
    );
  }
}
