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

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

export default {
    platformStyle,
    android,
    iOS,
    deviceWidth,
    deviceHeight,
    LiveRCTmanager,
    LiveViewManager,
    isIphoneX,
};


function isIphoneX() {
    return (
        Platform.OS === 'ios' &&
        ((deviceHeight === X_HEIGHT && deviceWidth === X_WIDTH) ||
        (deviceHeight === X_WIDTH && deviceWidth === X_HEIGHT))
    )
}