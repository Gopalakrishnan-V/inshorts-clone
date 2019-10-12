import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FastImage from 'react-native-fast-image';
import {getScreenHeight, getScreenWidth} from '../helpers/DimensionsHelper';
import {fetchNewsList, setQuery} from '../reducers/news';
import {LIGHT_BLUE, BLACK, DARKER_GRAY, GRAY} from '../constants/Colors';
import {FONT_SIZE_LARGE, FONT_SIZE_NORMAL} from '../constants/Dimens';
import {fetchTrendingTopics} from '../reducers/news';
import {FONT_BOLD, FONT_BLACK, FONT_REGULAR} from '../constants/Constants';

const SCREEN_WIDTH = getScreenWidth();
const SCREEN_HEIGHT = getScreenHeight();
const MARGIN_HORIZONTAL = 8;
const ITEM_WIDTH = (SCREEN_WIDTH - MARGIN_HORIZONTAL * 2) / 3;

const categories = [
  {
    id: 'top_stories',
    icon: 'https://inshorts.com/assets/images/cat_top_stories.png',
    label: 'TOP STORIES',
  },
  {
    id: 'all_news',
    icon: 'https://inshorts.com/assets/images/cat_all_news.png',
    label: 'ALL NEWS',
  },
  {
    id: 'trending',
    icon: 'https://inshorts.com/assets/images/cat_trending.png',
    label: 'TRENDING',
  },
  {
    id: 'bookmarks',
    icon: 'https://inshorts.com/assets/images/cat_bookmarks.png',
    label: 'BOOKMARKS',
  },
];

class MenuNavigationScreen extends Component {
  state = {
    selectedTopic: null,
  };

  componentDidMount = () => {
    this.props.actions.fetchTrendingTopics();
  };

  handleMenuOnPress = item => {
    // this.setState({selectedIndex: index});
    // const query = menus[index].query;
    // this.props.actions.setQuery(query);
    // this.props.actions.fetchNewsList(query, 1);
    // this.props.moveToPage(1);
  };

  renderCategoriesHeader = () => {
    return (
      <View style={styles.titleContent}>
        <Text style={styles.contentTitle}>CATEGORIES</Text>
        <View style={styles.divider} />
      </View>
    );
  };

  renderCategoriesContent = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => {
          const {label, icon} = category;
          return (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                marginHorizontal: 20,
                marginVertical: 8,
              }}>
              <FastImage
                style={{width: SCREEN_WIDTH / 10, height: SCREEN_WIDTH / 10}}
                source={{
                  uri: icon,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={styles.categoryLabel}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  renderSuggestedTopicsHeader = () => {
    return (
      <View style={styles.titleContent}>
        <Text style={styles.contentTitle}>SUGGESTED TOPICS</Text>
        <View style={styles.divider} />
      </View>
    );
  };

  renderSuggestedTopicsContent = () => {
    const {selectedIndex} = this.state;
    return (
      <View style={styles.menusContainer}>
        {this.props.trendingTopics.map((item, index) => {
          const {image_url, label} = item;
          return (
            <View style={styles.menuOuterWrapper}>
              <TouchableOpacity
                style={[
                  styles.menuInnerWrapper,
                  {
                    height: styles.menuOuterWrapper.height - 10,
                    position: 'relative',
                  },
                ]}
                onPress={() => this.handleMenuOnPress(item)}
                key={String(index)}>
                <FastImage
                  style={{flex: 1}}
                  source={{
                    uri: image_url,
                  }}
                  resizeMode={FastImage.resizeMode.stretch}
                />
                <Text style={styles.topicLabel}>{label}</Text>
                {selectedIndex === index ? (
                  <View
                    style={[
                      {flex: 1},
                      styles.absolute,
                      {backgroundColor: LIGHT_BLUE, opacity: 0.4},
                    ]}></View>
                ) : null}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  };

  renderCategories = () => {
    return (
      <React.Fragment>
        {this.renderCategoriesHeader()}
        {this.renderCategoriesContent()}
      </React.Fragment>
    );
  };

  renderSuggestedTopics = () => {
    return (
      <React.Fragment>
        {this.renderSuggestedTopicsHeader()}
        {this.renderSuggestedTopicsContent()}
      </React.Fragment>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {this.renderCategories()}
          {this.renderSuggestedTopics()}
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  menusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: MARGIN_HORIZONTAL,
  },
  menuOuterWrapper: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.3,
    paddingHorizontal: 5,
    marginVertical: 1,
  },
  menuInnerWrapper: {
    borderColor: LIGHT_BLUE + 'AA',
    borderWidth: 1.5,
    borderRadius: 4,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  titleContent: {
    marginHorizontal: MARGIN_HORIZONTAL + 4,
  },
  contentTitle: {
    marginTop: 30,
    fontSize: FONT_SIZE_LARGE,
    fontFamily: FONT_BLACK,
    color: DARKER_GRAY,
  },
  divider: {
    width: 25,
    height: 2,
    backgroundColor: DARKER_GRAY,
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 20,
  },
  topicLabel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    marginHorizontal: 6,
    marginVertical: 6,
    fontSize: FONT_SIZE_NORMAL,
    fontFamily: FONT_BOLD,
  },
  categoryLabel: {
    marginTop: 16,
    fontSize: FONT_SIZE_NORMAL,
    fontFamily: FONT_BOLD,
    color: GRAY,
  },
});

export default connect(
  state => ({
    query: state.news.query,
    trendingTopics: state.news.trendingTopics,
  }),
  dispatch => ({
    actions: bindActionCreators(
      {
        fetchNewsList,
        setQuery,
        fetchTrendingTopics,
      },
      dispatch,
    ),
  }),
)(MenuNavigationScreen);
