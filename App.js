import { observer } from 'mobx-react';
import React from 'react';
import CallsStore from './src/CustomComponent/callsStore';
import AuthNavigation from './src/navigation/AuthNavigation';
import IncomingCallScreen from './src/screens/CallScreen/IncomingCallScreen';
import VideoCallScreen from './src/screens/CallScreen/VideoCallScreen';

@observer
export default class App extends React.Component {
  render() {
    if (CallsStore.AudioCallState) {
      return <IncomingCallScreen />
    }
    else if (CallsStore.VideoCallState) {
      return <VideoCallScreen />
    }
    else {
      return <AuthNavigation />
    }
  }
}

