import {combineReducers} from 'redux';
import news from './news';

const AppReducer = combineReducers({
  news,
});

export default AppReducer;
