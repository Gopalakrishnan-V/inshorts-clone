import {Dimensions, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import ExtraDimensions from 'react-native-extra-dimensions-android';

// console.log(
//   'RealWindowHeight: ' + ExtraDimensions.getRealWindowHeight(),
//   'StatusBarHeight: ' + ExtraDimensions.getStatusBarHeight(),
//   'SoftMenuBarHeight: ' + ExtraDimensions.getSoftMenuBarHeight(),
//   'isSoftMenuBarEnabled: ' + ExtraDimensions.isSoftMenuBarEnabled(),
// );

let {width, height} = Dimensions.get('screen');

export const setScreenHeight = calculatedHeight => {
  height = calculatedHeight;
};
export const getScreenWidth = () => width;
export const getScreenHeight = () => height;
