import React from 'react';
import { Image } from 'react-native';

const Thumbnail = (props) => (
  <Image source={{ uri: props.uri }} style={[{ width: props.size, height: props.size, borderRadius: props.size / 2, overflow: 'hidden' },props.style]} />
)

export default Thumbnail