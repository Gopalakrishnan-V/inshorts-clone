import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import NewsCard from '../components/NewsCard';
import {getScreenWidth, getScreenHeight} from '../helpers/DimensionsHelper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  fetchNewsList,
  setCurrentNewsSlideIndex,
  fetchCategoryNews,
  fetchTopicNews,
} from '../reducers/news';
import ShortsLoader from '../components/ShortsLoader';

const SCREEN_WIDTH = getScreenWidth();

class NewsStackScreen extends Component {
  state = {};

  _renderItem({item, index}) {
    return <NewsCard key={String(index)} data={item} />;
  }

  componentDidMount = () => {
    // const {selectedCategory} = this.props;
    // this.props.actions.fetchCategoryNews(selectedCategory);
  };

  handleEndReached = () => {
    const {selectedCategory, newsOffset, selectedTopicId, page} = this.props;
    if (!this.props.isLoading) {
      if (selectedCategory) {
        this.props.actions.fetchCategoryNews(selectedCategory, newsOffset);
      } else {
        this.props.actions.fetchTopicNews(selectedTopicId, page + 1);
      }
    }
  };

  onSlideChange = slideIndex => {
    this.props.actions.setCurrentNewsSlideIndex(slideIndex);
  };

  render() {
    const {newsList} = this.props;
    console.log('NewsStackProps', {...this.props});

    return (
      <View style={{flex: 1}}>
        <Carousel
          data={newsList}
          renderItem={this._renderItem}
          sliderWidth={SCREEN_WIDTH}
          sliderHeight={getScreenHeight()}
          itemWidth={SCREEN_WIDTH}
          itemHeight={getScreenHeight()}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          vertical={true}
          swipeThreshold={70}
          onEndReached={this.handleEndReached}
          nestedScrollEnabled
          windowSize={5}
          onSnapToItem={this.onSlideChange}
          // ListEmptyComponent={<ShortsLoader />}
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
    newsList: state.news.newsList,
    selectedCategory: state.news.selectedCategory,
    newsOffset: state.news.newsOffset,
    selectedTopicId: state.news.selectedTopicId,
    page: state.news.page,
  }),
  dispatch => ({
    actions: bindActionCreators(
      {
        fetchNewsList,
        setCurrentNewsSlideIndex,
        fetchCategoryNews,
        fetchTopicNews,
      },
      dispatch,
    ),
  }),
)(NewsStackScreen);
