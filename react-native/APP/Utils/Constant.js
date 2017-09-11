import {
    Platform,
    Dimensions,
    PixelRatio,
    NativeModules
} from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const android = Platform.OS === 'android';
const iOS = Platform.OS === 'ios';
const platformStyle = undefined;
const LiveRCTmanager = NativeModules.LiveRCTManager;
const LiveViewManager = NativeModules.LiveView;

export default {
    platformStyle,
    android,
    iOS,
    deviceWidth,
    deviceHeight,
    LiveRCTmanager,
    LiveViewManager,
};
