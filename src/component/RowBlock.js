import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

const RowBlock = (props) => {
  var spacing;
  switch (props.space) {
    case 'between':
      spacing = 'space-between'
      break;
    case 'around':
      spacing = 'space-around'
      break;
    case 'evenly':
      spacing = 'space-evenly'
      break;
    case 'start':
      spacing = 'flex-start'
      break;
    case 'end':
      spacing = 'flex-end'
      break;
    default:
      spacing = 'center'
      break;
  }
  const styles = {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: props.self ? props.self : 'center',
    width: props.width, alignSelf: 'center',
    justifyContent: spacing,
  }

  return <View style={[styles, props.style]}>
    {props.children}
  </View>
}


export default RowBlock