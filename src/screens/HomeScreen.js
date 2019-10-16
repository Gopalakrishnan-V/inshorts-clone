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
  moveToPage = index => {
    this.viewpager.setPage(index);
  };

  onPageSelected = ({nativeEvent: {position}}) => {
    if (position === 2) {
      this.props.actions.setWebViewVisiblity(true);
    } else {
      this.props.actions.setWebViewVisiblity(false);
    }
  };

  render() {
    const {isNewsListEmpty} = this.props;
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor={BLACK} />
          <ViewPager
            ref={viewpager => {
              this.viewpager = viewpager;
            }}
            style={styles.viewPager}
            initialPage={1}
            onPageSelected={this.onPageSelected}>
            {!isNewsListEmpty && (
              <MenuNavigationScreen moveToPage={this.moveToPage} />
            )}
            <NewsStackScreen />
            {!isNewsListEmpty && <WebScreen />}
          </ViewPager>
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
  },
  viewPager: {
    flex: 1,
  },
});

export default connect(
  state => ({
    isNewsListEmpty: state.news.newsList.length === 0,
  }),
  dispatch => ({
    actions: bindActionCreators(
      {
        setWebViewVisiblity,
      },
      dispatch,
    ),
  }),
)(HomeScreen);
