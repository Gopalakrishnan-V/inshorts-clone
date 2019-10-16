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
} from '../reducers/news';

const SCREEN_WIDTH = getScreenWidth();
const SCREEN_HEIGHT = getScreenHeight();
const STATUS_BAR_HEIGHT = getStatusBarHeight();
const ITEM_HEIGHT = SCREEN_HEIGHT - STATUS_BAR_HEIGHT;

console.log('SCREEN_HEIGHT', SCREEN_HEIGHT);

class NewsStackScreen extends Component {
  state = {};
  // carouselRef = React.createRef();

  _renderItem({item, index}) {
    return <NewsCard key={String(index)} data={item} />;
  }

  componentDidMount = () => {
    const {selectedCategory} = this.props;
    this.props.actions.fetchCategoryNews(selectedCategory);
  };

  handleEndReached = () => {
    const {selectedCategory, newsOffset} = this.props;
    console.log('handleEndReached', selectedCategory, newsOffset);
    if (!this.props.isLoading) {
      this.props.actions.fetchCategoryNews(selectedCategory, newsOffset);
    }
  };

  onSlideChange = slideIndex => {
    this.props.actions.setCurrentNewsSlideIndex(slideIndex);
  };

  renderEmptyState = () => {
    return (
      <View
        style={[
          styles.container,
          {
            height: getScreenHeight(),
          },
        ]}>
        <Text>Loading...</Text>
      </View>
    );
  };

  componentDidUpdate = () => {
    if (this.state.scrollToTopPending) {
      this.setState({scrollToTopPending: false});
      console.log('carouselRef', this.carouselRef);
      // this.carouselRef.scrollToTop();
    }
  };

  componentWillReceiveProps(nextProps) {
    const currentProps = this.props;
    if (currentProps.newsList.length === 0 && nextProps.newsList.length > 1) {
      this.setState({scrollToTopPending: true});
    }
  }

  render() {
    const {newsList} = this.props;
    console.log('renderNewsList', newsList);
    const isEmpty = newsList.length === 0;

    // if(isEmpty){
    //   return this.renderEmptyState();
    // }

    return (
      <View style={{flex: 1}}>
        <Carousel
          ref={ref => (this.carouselRef = ref)}
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
          ListEmptyComponent={this.renderEmptyState}
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
    currentNewsSlideIndex: state.news.currentNewsSlideIndex,
    selectedCategory: state.news.selectedCategory,
    newsOffset: state.news.newsOffset,
  }),
  dispatch => ({
    actions: bindActionCreators(
      {
        fetchNewsList,
        setCurrentNewsSlideIndex,
        fetchCategoryNews,
      },
      dispatch,
    ),
  }),
)(NewsStackScreen);
