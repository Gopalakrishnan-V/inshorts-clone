import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Platform, Text} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import {connect} from 'react-redux';
import MenuNavigationScreen from './MenuNavigationScreen';
import NewsStackScreen from './NewsStackScreen';
import WebScreen from './WebScreen';
import Carousel from 'react-native-snap-carousel';
import {getScreenWidth, getScreenHeight} from '../helpers/DimensionsHelper';
import {BLACK} from '../constants/Colors';
import {setWebViewVisiblity, fetchCategoryNews} from '../reducers/news';
import {bindActionCreators} from 'redux';
import ShortsLoader from '../components/ShortsLoader';
const screens = ['menu-navigation', 'news-stack', 'web'];

class HomeScreen extends Component {
  // shouldComponentUpdate = nextProps => {
  //   const currentProps = this.props;
  //   return true;
  //   if (currentProps.isNewsListEmpty !== nextProps.isNewsListEmpty) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  componentDidMount() {
    this.props.actions.fetchCategoryNews('top_stories');
  }

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
    const {isNewsListEmpty, newsListLength} = this.props;
    console.log('isNewsListEmpty', isNewsListEmpty, newsListLength);
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
            <View>
              <MenuNavigationScreen moveToPage={this.moveToPage} />
            </View>
            <View>
              {isNewsListEmpty ? <ShortsLoader /> : <NewsStackScreen />}
            </View>
            <View>
              <WebScreen moveToPage={this.moveToPage} />
            </View>
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(
  state => ({
    isNewsListEmpty: state.news.newsList.length === 0,
    newsListLength: state.news.newsList.length,
  }),
  dispatch => ({
    actions: bindActionCreators(
      {
        setWebViewVisiblity,
        fetchCategoryNews,
      },
      dispatch,
    ),
  }),
)(HomeScreen);
