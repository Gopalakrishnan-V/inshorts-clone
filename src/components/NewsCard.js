import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  FONT_SIZE_EXTRA_LARGE,
  FONT_SIZE_NORMAL,
  FONT_SIZE_LARGE,
  FONT_SIZE_SMALL,
} from '../constants/Dimens';
import {GRAY, WHITE, DARK_GRAY} from '../constants/Colors';

export default class NewsCard extends Component {
  getStringTrimmed = str => {
    if (!str) {
      return str;
    }
    if (str.includes('…')) {
      str = str.split('…')[0];
    }
    str = str.replace('\n', ' ');
    return str.trim();
  };

  render() {
    const {source, title, description, urlToImage, content} = this.props;
    const footer = {
      title,
      subtitle: 'Read more from ' + source.name,
    };

    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <FastImage
            style={{flex: 1}}
            source={{
              uri: urlToImage,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

        <View style={[styles.middle, styles.contentPadding]}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>
            {this.getStringTrimmed(description) + '. ' + content
              ? this.getStringTrimmed(content) + '...'
              : ''}
          </Text>
        </View>

        <View style={[styles.footer, styles.contentPadding]}>
          <Text
            style={styles.footerTitle}
            numberOfLines={1}
            ellipsizeMode="tail">
            {footer.title}
          </Text>
          <Text
            style={styles.footerSubtitle}
            numberOfLines={1}
            ellipsizeMode="tail">
            {footer.subtitle}
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
    flex: 3,
  },
  middle: {
    backgroundColor: WHITE,
    flex: 5,
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
  title: {fontWeight: '600', fontSize: FONT_SIZE_EXTRA_LARGE, marginTop: 12},
  description: {
    fontSize: FONT_SIZE_LARGE,
    marginTop: 7,
    lineHeight: 25,
    color: GRAY,
  },
  footerTitle: {
    color: WHITE,
    fontSize: FONT_SIZE_NORMAL,
    fontWeight: '600',
  },
  footerSubtitle: {
    color: WHITE,
    fontSize: FONT_SIZE_SMALL,
    fontWeight: '400',
    marginTop: 2,
  },
});
