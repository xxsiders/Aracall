import { View } from 'native-base';
import React from 'react';
import Modal from "react-native-modal";


const LoadModal = (props) => {
  return <Modal isVisible={props.isVisible}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {props.children}
    </View>
  </Modal>
}
export default LoadModal