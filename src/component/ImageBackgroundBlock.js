import React from 'react';
import { Dimensions, ImageBackground } from 'react-native';
const deviceWidth = Dimensions.get('window').width;

const ImageBackgroundBlock = (props) => {
  return <ImageBackground style={[{ width: props.width, minHeight: props.height, zIndex: 5 }, props.style]} imageStyle={[props.imgStyle]} resizeMode='cover' source={{ uri: props.uri }}>
    {props.children}
  </ImageBackground>
}
export default ImageBackgroundBlock