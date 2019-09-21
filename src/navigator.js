import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';

const StackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    defaultNavigationOptions: {
      title: 'Inshorts',
      header: null,
    },
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;
