import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {getScreenHeight} from '../helpers/DimensionsHelper';
import Icon from 'react-native-vector-icons/Entypo';
import {FONT_BLACK} from '../constants/Constants';
import {FONT_SIZE_EXTRA_LARGE} from '../constants/Dimens';
import {LIGHT_BLUE} from '../constants/Colors';

export class ShortsLoader extends Component {
  render() {
    return (
      <View
        style={[
          styles.container,
          styles.center,
          {
            height: getScreenHeight(),
          },
        ]}>
        <Icon
          name="thunder-cloud"
          size={100}
          color={LIGHT_BLUE}
          style={styles.icon}
        />

        <Icon
          name="chevron-thin-down"
          color={LIGHT_BLUE}
          style={{opacity: 0.3}}
        />
        <Icon
          name="chevron-thin-down"
          color={LIGHT_BLUE}
          style={{opacity: 0.6}}
        />
        <Icon
          name="chevron-thin-down"
          color={LIGHT_BLUE}
          style={{opacity: 0.9}}
        />

        <Icon
          name="mobile"
          size={80}
          color={LIGHT_BLUE}
          style={[styles.icon, {marginTop: 10}]}
        />
        <Text style={styles.title}>Loading Shorts...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    opacity: 0.8,
  },
  title: {
    marginTop: 24,
    fontSize: 24,
    fontFamily: FONT_BLACK,
    fontWeight: '900',
  },
});

export default ShortsLoader;
