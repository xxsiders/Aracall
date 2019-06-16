import { observable } from 'mobx';
class NavigationStore {
  @observable CurrentScreen = null;
  SaveCurrentScreen(ScreenName) {
    this.CurrentScreen = ScreenName;
  }

}
export default new NavigationStore();