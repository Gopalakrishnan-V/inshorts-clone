import {Dimensions, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

let {width, height} = Dimensions.get('screen');

export const setScreenHeight = calculatedHeight => {
  height = calculatedHeight;
};
export const getScreenWidth = () => width;
export const getScreenHeight = () => height;
