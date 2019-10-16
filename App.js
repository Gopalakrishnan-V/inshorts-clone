import React, {Component, Fragment} from 'react';
import {Platform, View} from 'react-native';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import DetectNavbar from 'react-native-detect-navbar-android';
import AppContainer from './src/navigator';
import rootReducer from './src/reducers';
import {setScreenHeight} from './src/helpers/DimensionsHelper';

console.disableYellowBox = true;
const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends Component {
  state = {
    isLoaded: false,
  };

  render() {
    const {isLoaded} = this.state;
    if (isLoaded) {
      return (
        <Provider store={store}>
          <AppContainer />
        </Provider>
      );
    } else {
      return (
        <View
          style={{flex: 1}}
          onLayout={event => {
            var {x, y, width, height} = event.nativeEvent.layout;
            setScreenHeight(height);
            this.setState({isLoaded: true});
          }}></View>
      );
    }
  }
}
export default App;
