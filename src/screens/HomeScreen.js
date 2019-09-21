import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Platform} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import {connect} from 'react-redux';
import MenuNavigationScreen from './MenuNavigationScreen';
import NewsStackScreen from './NewsStackScreen';
import WebScreen from './WebScreen';
import Carousel from 'react-native-snap-carousel';
import {getScreenWidth} from '../helpers/DimensionsHelper';
import {BLACK} from '../constants/Colors';
import {setWebViewVisiblity} from '../reducers/news';
import {bindActionCreators} from 'redux';
const screens = ['menu-navigation', 'news-stack', 'web'];

class HomeScreen extends Component {
  currentNewsStackSlideIndex = 0;

  _renderItem({item, index}) {
    switch (item) {
      case 'menu-navigation':
        return <MenuNavigationScreen />;
      case 'news-stack':
        return <NewsStackScreen />;
      case 'web':
        return <WebScreen />;
    }
  }

  onPageSelected = ({nativeEvent: {position}}) => {
    console.log('onPageSelected', position);
    if (position === 2) {
      this.props.actions.setWebViewVisiblity(true);
    } else {
      this.props.actions.setWebViewVisiblity(false);
    }
  };

  render() {
    if (Platform.OS === 'android') {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor={BLACK} />
          <ViewPager
            style={styles.viewPager}
            initialPage={1}
            onPageSelected={this.onPageSelected}>
            <MenuNavigationScreen />
            <NewsStackScreen />
            <WebScreen />
          </ViewPager>
        </View>
      );
    } else if (Platform.OS === 'ios') {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor={BLACK} />
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={screens}
            renderItem={this._renderItem}
            sliderWidth={getScreenWidth()}
            itemWidth={getScreenWidth()}
            firstItem={2}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
          />
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  viewPager: {
    flex: 1,
  },
});

export default connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators(
      {
        setWebViewVisiblity,
      },
      dispatch,
    ),
  }),
)(HomeScreen);
