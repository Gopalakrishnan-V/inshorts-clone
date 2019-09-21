import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const getScreenWidth = () => width;
export const getScreenHeight = () => height;
