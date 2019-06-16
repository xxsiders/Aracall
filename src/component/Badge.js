import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

const Badge = (props) => {
  return <View style={[{ width: 35, height: 20, borderRadius: 15, justifyContent: 'center', backgroundColor: props.color, alignItems: 'center' },props.style]}>
    <Text style={{ fontWeight: '700',fontSize:props.size,color:props.fcolor }}>{props.children}</Text>
  </View>

}
export default Badge