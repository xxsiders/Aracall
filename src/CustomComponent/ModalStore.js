import { observable } from 'mobx';
class ModalStore {
  @observable ModalState = false;
  ToggleModal() {
    this.ModalState = !this.ModalState;
  }
}
export default new ModalStore();