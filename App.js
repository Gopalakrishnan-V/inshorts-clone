import React, {Component, Fragment} from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import AppContainer from './src/navigator';
import rootReducer from './src/reducers';

console.disableYellowBox = true;
const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
export default App;
