import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import NewsCard from '../components/NewsCard';
import {getScreenWidth, getScreenHeight} from '../helpers/DimensionsHelper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchNewsList, setCurrentSlideIndex} from '../reducers/news';

const SCREEN_WIDTH = getScreenWidth();
const SCREEN_HEIGHT = getScreenHeight();
const STATUS_BAR_HEIGHT = getStatusBarHeight();
const ITEM_HEIGHT = SCREEN_HEIGHT - STATUS_BAR_HEIGHT;

class NewsStackScreen extends Component {
  _renderItem({item, index}) {
    return <NewsCard key={String(index)} data={item} />;
  }

  componentDidMount = () => {
    const {query} = this.props;
    // this.props.actions.fetchNewsList(query, 1);
  };

  handleEndReached = () => {
    const {query, page} = this.props;
    if (!this.props.isLoading) {
      // this.props.actions.fetchNewsList(query, page + 1);
    }
  };

  onSlideChange = slideIndex => {
    this.props.actions.setCurrentSlideIndex(slideIndex);
  };

  render() {
    const {newsList} = this.props;

    return (
      <View style={styles.container}>
        <Carousel
          data={newsList}
          renderItem={this._renderItem}
          sliderWidth={SCREEN_WIDTH}
          sliderHeight={ITEM_HEIGHT}
          itemWidth={SCREEN_WIDTH}
          itemHeight={ITEM_HEIGHT}
          firstItem={0}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          vertical={true}
          swipeThreshold={70}
          onEndReached={this.handleEndReached}
          nestedScrollEnabled
          windowSize={5}
          onSnapToItem={this.onSlideChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(
  state => ({
    isLoading: state.news.isLoading,
    query: state.news.query,
    page: state.news.currentPage,
    newsList: state.news.newsList,
    currentSlideIndex: state.news.currentSlideIndex,
  }),
  dispatch => ({
    actions: bindActionCreators(
      {
        fetchNewsList,
        setCurrentSlideIndex,
      },
      dispatch,
    ),
  }),
)(NewsStackScreen);
