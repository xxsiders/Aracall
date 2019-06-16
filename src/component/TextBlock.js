import { Text } from 'native-base';
import React from 'react';
import { View } from 'react-native';

const TextBlock=(props)=>{
  const styles={
    flexWrap: 'wrap', width: props.width, alignSelf: 'center',
  }
   return<View style={[styles,props.style]}>
    <Text style={{color:props.color,fontWeight:props.weight,fontSize:props.size}}>{props.children}</Text>
  </View>
}
export default TextBlock