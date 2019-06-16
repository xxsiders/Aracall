import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import {observer} from 'mobx-react';
import ModalStore from './ModalStore';

@observer
export default class NativeModal extends React.Component {
  state = {
    modalVisible: false,
  }
  setModalVisible() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }
  render() {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={ModalStore.ModalState}
        hardwareAccelerated
        onRequestClose={() => {
          ModalStore.ToggleModal()
        }}>
        <TouchableHighlight
          style={[styles.container, { backgroundColor: 'rgba(0,0,0,0.6)' }]}
          onPress={() => {
            ModalStore.ToggleModal()
          }}>
          <TouchableWithoutFeedback >
            {this.props.children}
          </TouchableWithoutFeedback>
        </TouchableHighlight>
      </Modal>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


