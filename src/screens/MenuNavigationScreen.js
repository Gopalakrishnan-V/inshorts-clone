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
import {LIGHT_BLUE, BLACK, DARKER_GRAY} from '../constants/Colors';
import {FONT_SIZE_LARGE} from '../constants/Dimens';

const SCREEN_WIDTH = getScreenWidth();
const SCREEN_HEIGHT = getScreenHeight();
const MARGIN_HORIZONTAL = 8;
const ITEM_WIDTH = (SCREEN_WIDTH - MARGIN_HORIZONTAL * 2) / 3;

const menus = [
  {iconUrl: 'https://i.ibb.co/SdnyXkW/1-article370.jpg', query: 'article 370'},
  {iconUrl: 'https://i.ibb.co/VL4rdbn/2-india.jpg', query: 'india'},
  {iconUrl: 'https://i.ibb.co/FVXGNHj/3-bussiness.jpg', query: 'bussiness'},
  {iconUrl: 'https://i.ibb.co/V3WDhSg/4-politics.jpg', query: 'politics'},
  {iconUrl: 'https://i.ibb.co/CWyMfLk/5-sports.jpg', query: 'sports'},
  {iconUrl: 'https://i.ibb.co/DVgHVVG/6-technology.jpg', query: 'technology'},
  {iconUrl: 'https://i.ibb.co/GvYMMVQ/7-startups.jpg', query: 'startups'},
  {
    iconUrl: 'https://i.ibb.co/ZYJp4GB/8-entertainment.jpg',
    query: 'entertainment',
  },
  {iconUrl: 'https://i.ibb.co/NFP1jJr/9-hatke.jpg', query: 'hatke'},
  {
    iconUrl: 'https://i.ibb.co/26dPV11/10-international.jpg',
    query: 'international',
  },
  {iconUrl: 'https://i.ibb.co/S03z56p/11-automobile.jpg', query: 'automobile'},
  {iconUrl: 'https://i.ibb.co/g9fgPrj/12-science.jpg', query: 'science'},
  {iconUrl: 'https://i.ibb.co/cJKhpDS/13-travel.jpg', query: 'travel'},
  {iconUrl: 'https://i.ibb.co/r0LN05Q/14-misc.jpg', query: 'miscellaneous'},
  {iconUrl: 'https://i.ibb.co/JBymr01/15-fashion.jpg', query: 'fashion'},
];

class MenuNavigationScreen extends Component {
  state = {
    selectedIndex: -1,
  };

  handleMenuOnPress = index => {
    this.setState({selectedIndex: index});
    const query = menus[index].query;
    this.props.actions.setQuery(query);
    this.props.actions.fetchNewsList(query, 1);
    this.props.moveToPage(1);
  };

  renderMenus = () => {
    const {selectedIndex} = this.state;
    return (
      <View style={styles.menusContainer}>
        {menus.map((item, index) => {
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
                onPress={() => this.handleMenuOnPress(index)}
                key={String(index)}>
                <FastImage
                  style={{flex: 1}}
                  source={{
                    uri: item.iconUrl,
                  }}
                  resizeMode={FastImage.resizeMode.stretch}
                />
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

  renderTitleContent = () => {
    return (
      <View style={styles.titleContent}>
        <Text style={styles.title}>SUGGESTED TOPICS</Text>
        <View style={styles.divider} />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {this.renderTitleContent()}
          {this.renderMenus()}
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
  title: {
    marginTop: 30,
    fontSize: FONT_SIZE_LARGE,
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
});

export default connect(
  state => ({
    query: state.news.query,
  }),
  dispatch => ({
    actions: bindActionCreators(
      {
        fetchNewsList,
        setQuery,
      },
      dispatch,
    ),
  }),
)(MenuNavigationScreen);
