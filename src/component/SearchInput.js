import React, { Component } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
export default class SearchInput extends Component {
  state = {
    isOpen: false,
    query: '',
    data: ['cairo', 'newyork', 'dubai', 'rio', 'toronto', 'dulhi'],
    newData:[]
  }
  searchFilterFunction = text => {
    this.setState({ query: text })
    if(text.length>0){
      const newData = this.state.data.filter(item => {
        const itemData = `${item.toUpperCase()}   
        ${item.toUpperCase()}`;
  
        const textData = text.toUpperCase();
  
        return itemData.indexOf(textData) > -1;
      });
      this.setState({ newData,isOpen:true });   
    }else{
      this.setState({newData:[]})
    }
  };


  render() {
    return (
      <View>
        <TextInput autoCapitalize='none' onChangeText={query => { this.searchFilterFunction(query) }} value={this.state.query} placeholder="Enter a name of city you're travelling to" style={{ height: 30, fontWeight: '500' }} />
        <View style={{ }}>
          <FlatList
            data={this.state.newData}
            renderItem={({ item }) => (
              <Text onPress={()=>this.setState({query:item,newData:[]})} style={{padding:5}}>{item}</Text>
            )}
            keyExtractor={item => item}
          />
        </View>
      </View>
    );
  }
}
