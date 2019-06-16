import React from 'react';
import { View } from 'react-native';

const CardBlock = (props) => {
  const styles = {
    width: props.width,
    borderRadius: props.radius,
    backgroundColor: props.color,
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    height:40
  }
  return <View style={[styles, props.style]}>
    {props.children}
  </View>
}
export default CardBlock
