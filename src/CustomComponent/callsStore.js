import { observable } from 'mobx';
class CallStore {
  @observable AudioCallState = false;
  @observable AudioAnswerd = false;
  @observable VideoCallState = false;
  @observable VideoAnswerd = false;
  AnswerAudioCall() {
    this.AudioCallState = true;
  }
  CancelAudioCall() {
    this.AudioCallState = false;
  }
  MakeAudioCall() {
    this.AudioAnswerd = true;
  }
  CloseAudioCall(){
    this.AudioAnswerd = false;
    this.AudioCallState = false;
  }
  AnswerVideoCall() {
    this.VideoCallState = true;
  }
  CancelVideoCall() {
    this.VideoCallState = false;
  }
  MakeVideoCall() {
    this.VideoAnswerd = true;
  }
  CloseVideoCall(){
    this.VideoAnswerd = false;
    this.VideoCallState = false;
  }

}
export default new CallStore();