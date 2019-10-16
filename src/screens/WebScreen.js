import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {BLACK, WHITE} from '../constants/Colors';
import {FONT_SIZE_SMALL} from '../constants/Dimens';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {getScreenHeight} from '../helpers/DimensionsHelper';
import {bindActionCreators} from 'redux';

const SCREEN_HEIGHT = getScreenHeight();
const STATUS_BAR_HEIGHT = getStatusBarHeight();

class WebScreen extends Component {
  render() {
    const {isWebViewVisible, currentSlideData} = this.props;
    if (!isWebViewVisible || !currentSlideData) {
      return (
        <View style={styles.container}>
          <Text>WebScreen</Text>
        </View>
      );
    }

    const {news_obj} = currentSlideData;
    const {source_name, source_url} = news_obj;

    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Icon
            name="chevron-left"
            color={WHITE}
            size={STATUS_BAR_HEIGHT * 0.8}
          />
          <Text style={styles.title}>{source_name}</Text>
          <Icon name="more-vert" color={WHITE} size={STATUS_BAR_HEIGHT * 0.7} />
        </View>

        <View style={styles.webViewContainer}>
          <WebView
            source={{
              uri: source_url,
            }}
            // style={styles.webView}
            startInLoadingState
            scrollEnabled
            scalesPageToFit
            javaScriptEnabled={false}
            zoomable={false}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  top: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: BLACK,
    color: WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  title: {
    color: WHITE,
    fontSize: FONT_SIZE_SMALL,
  },
  webViewContainer: {
    minHeight: SCREEN_HEIGHT + 30,
  },
});

export default connect(
  state => ({
    currentNewsSlideIndex: state.news.currentNewsSlideIndex,
    isWebViewVisible: state.news.isWebViewVisible,
    currentSlideData: state.news.newsList[state.news.currentNewsSlideIndex]
      ? state.news.newsList[state.news.currentNewsSlideIndex]
      : null,
  }),
  dispatch => ({
    actions: bindActionCreators({}, dispatch),
  }),
)(WebScreen);
