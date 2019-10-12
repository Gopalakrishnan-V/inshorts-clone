import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  FONT_SIZE_EXTRA_LARGE,
  FONT_SIZE_NORMAL,
  FONT_SIZE_LARGE,
  FONT_SIZE_SMALL,
} from '../constants/Dimens';
import {GRAY, WHITE, DARK_GRAY, NEWS_TITLE} from '../constants/Colors';
import {
  FONT_REGULAR,
  FONT_BOLD,
  FONT_MEDIUM,
  FONT_LIGHT,
} from '../constants/Constants';

export default class NewsCard extends Component {
  render() {
    const {
      source_name,
      title,
      image_url,
      content,
      bottom_headline,
      bottom_text,
    } = this.props.data.news_obj;

    console.log(
      source_name,
      title,
      image_url,
      content,
      bottom_headline,
      bottom_text,
    );

    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <FastImage
            style={{flex: 1}}
            source={{
              uri: image_url,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

        <View style={[styles.middle, styles.contentPadding]}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{content}</Text>
        </View>

        <View style={[styles.footer, styles.contentPadding]}>
          <Text
            style={styles.footerTitle}
            numberOfLines={1}
            ellipsizeMode="tail">
            {bottom_headline}
          </Text>
          <Text
            style={styles.footerSubtitle}
            numberOfLines={1}
            ellipsizeMode="tail">
            {bottom_text}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: WHITE,
  },
  top: {
    backgroundColor: WHITE,
    flex: 3.8,
  },
  middle: {
    backgroundColor: WHITE,
    flex: 4.2,
  },
  footer: {
    flex: 0.9,
    backgroundColor: '#e5e5e5',
    justifyContent: 'center',
    backgroundColor: DARK_GRAY,
  },
  contentPadding: {
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: FONT_REGULAR,
    fontSize: FONT_SIZE_EXTRA_LARGE,
    marginTop: 12,
  },
  description: {
    fontFamily: FONT_REGULAR,
    fontSize: FONT_SIZE_LARGE,
    marginTop: 7,
    lineHeight: 25,
    color: GRAY,
  },
  footerTitle: {
    fontFamily: FONT_REGULAR,
    color: WHITE,
    fontSize: FONT_SIZE_NORMAL,
    fontWeight: '600',
  },
  footerSubtitle: {
    color: WHITE,
    fontFamily: FONT_LIGHT,
    fontSize: FONT_SIZE_SMALL,
    fontWeight: '400',
    marginTop: 2,
  },
});
