import Axios from 'axios';
import {
  BASE_URL,
  PAGE_SIZE,
  DEFAULT_HEADERS,
  INSHORTS_BASE_URL,
} from '../constants/Constants';
const NAMESPACE = 'news';

const FETCH_NEWS_LOADING = 'FETCH_NEWS_LOADING';
const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
const FETCH_NEWS_FAILED = 'FETCH_NEWS_FAILED';

const SET_CURRENT_SLIDE_INDEX = 'SET_CURRENT_SLIDE_INDEX';
const SET_WEBVIEW_VISIBILITY = 'SET_WEBVIEW_VISIBILITY';
const SET_QUERY = 'SET_QUERY';

const FETCH_TRENDING_TOPICS_SUCCESS = 'FETCH_TRENDING_TOPICS_SUCCESS';

const initialState = {
  query: 'india',
  isLoading: false,
  currentPage: 1,
  newsList: [
    {
      hash_id: 'qagy8wqs-1',
      rank: 0,
      version: 0,
      type: 'NEWS',
      news_obj: {
        old_hash_id:
          'fan-invades-ground-takes-rohit-sharma-down-while-trying-to-kiss-his-feet-1570881683936',
        hash_id: 'qagy8wqs-1',
        author_name: 'Anmol Sharma',
        content:
          'During the third day of the second India-South Africa Test, a fan invaded the ground and ran towards Rohit Sharma. The fan took the cricketer down with him while trying to kiss his feet. He was later escorted out by the security. Criticising security over the incident, commentator Sunil Gavaskar said, "Security isn\'t there to watch the match for free."',
        source_url:
          'https://www.hindustantimes.com/cricket/india-vs-south-africa-security-not-there-to-watch-free-match-sunil-gavaskar-fumes-after-fan-invades-pitch-to-meet-rohit-sharma/story-JL70Lbv593u2UgLAJzUz1O.html?utm_campaign=fullarticle&utm_medium=referral&utm_source=inshorts',
        source_name: 'Hindustan Times',
        title:
          'Fan invades ground, takes Rohit Sharma down while trying to kiss his feet',
        image_url:
          'https://static.inshorts.com/inshorts/images/v1/variants/jpg/m/2019/10_oct/12_sat/img_1570877850516_734.jpg?',
        shortened_url: 'https://shrts.in/cMZi',
        created_at: 1570881683000,
        score: 1000,
        category_names: ['sports'],
        relevancy_tags: ['cricket'],
        tenant: 'ENGLISH',
        country_code: 'IN',
        targeted_city: [''],
        gallery_image_urls: [],
        full_gallery_urls: [],
        bottom_headline: "'Security people aren't watching the crowd'",
        bottom_text: 'Tap to read what more Gavaskar said',
        darker_fonts: true,
        bottom_panel_link:
          'https://www.hindustantimes.com/cricket/india-vs-south-africa-security-not-there-to-watch-free-match-sunil-gavaskar-fumes-after-fan-invades-pitch-to-meet-rohit-sharma/story-JL70Lbv593u2UgLAJzUz1O.html?utm_campaign=fullarticle&utm_medium=referral&utm_source=inshorts',
        bottom_type: 'DEFAULT',
        byline_1: [
          {
            type: 'TEXT',
            text: 'swipe left for more at Hindustan Times / ',
          },
          {
            type: 'TIME',
          },
        ],
        byline_2: [
          {
            type: 'TEXT',
            text: 'short by ',
          },
          {
            type: 'TEXT',
            text: 'Anmol Sharma',
          },
        ],
        version: 0,
        trackers: [],
        poll_tenant: 'ENGLISH',
        video_opinion_enabled: true,
        important: true,
        video_url: '',
        show_exact_image: false,
        background_color: '',
        custom_text: '',
        sponsored_by: '',
        native_source_url: '',
        show_video_as_image: false,
        impressive_score: 50.93,
        video_length: '',
        dont_show_time: false,
        thumbnail_image: '',
        thumbnail_link: '',
        opt_out_tags: [],
        raw_url: '',
        footer_image_background: '',
        image_hw_ratio: 0,
        cta_button_text: '',
        cta_button_link: '',
        footer_tag_id: '',
        footer_tag_label: '',
        footer_follow_id: '',
        bottom_font_color: '',
        bottom_text_color: '',
        ads_vendor_tag: '',
        next_custom_card: '',
        footer_btn_posttext: '',
        footer_headline: '',
        footer_body: '',
        footer_btn_text: '',
        footer_tag_type: '',
        cta_show_sponsored: false,
        symbolize_click: false,
        sponsored_text: false,
        embedded_gallery: false,
        autoplay_video: false,
        trending_label: '',
        trending_label_link: '',
        embedded_video: '',
        fixed_position: 0,
        position_expire_time: 1570964445307,
        position_expire_on_read: false,
      },
      card_obj: null,
    },
    {
      hash_id: 'vtwx6bzi-1',
      rank: 1,
      version: 0,
      type: 'NEWS',
      news_obj: {
        old_hash_id:
          'ashwins-4for-helps-india-dismiss-sa-for-275-take-326run-lead-1570880239813',
        hash_id: 'vtwx6bzi-1',
        author_name: 'Anmol Sharma',
        content:
          'India dismissed South Africa for 275 runs on the third day of the second Test on Saturday, taking a 326-run first-innings lead. Keshav Maharaj and Vernon Philander shared a 109-run partnership, the highest ninth-wicket stand in Test cricket for South Africa against India. Notably, India have never enforced follow-on on South Africa.',
        source_url:
          'https://www.icc-cricket.com/match/15297?utm_campaign=fullarticle&utm_medium=referral&utm_source=inshorts#scorecard',
        source_name: 'ICC',
        title:
          "Ashwin's 4-for helps India dismiss SA for 275, take 326-run lead",
        image_url:
          'https://static.inshorts.com/inshorts/images/v1/variants/jpg/m/2019/10_oct/12_sat/img_1570879138953_764.jpg?',
        shortened_url: 'https://shrts.in/8bUZ',
        created_at: 1570880239000,
        score: 800,
        category_names: ['sports'],
        relevancy_tags: [],
        tenant: 'ENGLISH',
        country_code: 'IN',
        targeted_city: [''],
        gallery_image_urls: [],
        full_gallery_urls: [],
        bottom_headline: 'No team has enforced follow-on on SA in 10 years',
        bottom_text: 'Tap to view the scorecard of 2nd India-SA Test',
        darker_fonts: true,
        bottom_panel_link:
          'https://www.icc-cricket.com/match/15297?utm_campaign=fullarticle&utm_medium=referral&utm_source=inshorts#scorecard',
        bottom_type: 'DEFAULT',
        byline_1: [
          {
            type: 'TEXT',
            text: 'swipe left for more at ICC / ',
          },
          {
            type: 'TIME',
          },
        ],
        byline_2: [
          {
            type: 'TEXT',
            text: 'short by ',
          },
          {
            type: 'TEXT',
            text: 'Anmol Sharma',
          },
        ],
        version: 0,
        trackers: [],
        poll_tenant: 'ENGLISH',
        video_opinion_enabled: true,
        important: false,
        video_url: '',
        show_exact_image: false,
        background_color: '',
        custom_text: '',
        sponsored_by: '',
        native_source_url: '',
        show_video_as_image: false,
        impressive_score: 12.93,
        video_length: '',
        dont_show_time: false,
        thumbnail_image: '',
        thumbnail_link: '',
        opt_out_tags: [],
        raw_url: '',
        footer_image_background: '',
        image_hw_ratio: 0,
        cta_button_text: '',
        cta_button_link: '',
        footer_tag_id: '',
        footer_tag_label: '',
        footer_follow_id: '',
        bottom_font_color: '',
        bottom_text_color: '',
        ads_vendor_tag: '',
        next_custom_card: '',
        footer_btn_posttext: '',
        footer_headline: '',
        footer_body: '',
        footer_btn_text: '',
        footer_tag_type: '',
        cta_show_sponsored: false,
        symbolize_click: false,
        sponsored_text: false,
        embedded_gallery: false,
        autoplay_video: false,
        trending_label: '',
        trending_label_link: '',
        embedded_video: '',
        fixed_position: 0,
        position_expire_time: 1570965593287,
        position_expire_on_read: false,
        question_id: '9a368ef6-f3e1-4d53-b250-acb13f49afff',
        question: 'Should India enforce follow-on on South Africa?',
        poll_image:
          'https://static.inshorts.com/inshorts/images/v1/variants/jpg/m/2019/10_oct/12_sat/img_1570879085375_462.jpg?',
        poll_header: 'Inshorts Poll',
        poll_options: [
          {
            tag: 'yes',
            label: 'Yes',
          },
          {
            tag: 'no',
            label: 'No',
          },
        ],
        poll_expiry: 1570937400000,
      },
      card_obj: null,
    },
  ],
  currentSlideIndex: 0,
  isWebViewVisible: false,
  trendingTopics: [],
};

const reducer = (state = initialState, action) => {
  if (action.namespace !== NAMESPACE) {
    return {...state};
  }

  switch (action.type) {
    case FETCH_NEWS_LOADING: {
      return {...state, isLoading: true};
    }
    case FETCH_NEWS_SUCCESS: {
      const {result, page} = action;
      const {newsList} = state;
      const updatedNewsList =
        page === 1 ? [...result] : [...newsList, ...result];
      return {
        ...state,
        isLoading: false,
        newsList: updatedNewsList,
        currentPage: page,
      };
    }
    case SET_CURRENT_SLIDE_INDEX: {
      const {index} = action;
      return {...state, currentSlideIndex: index};
    }
    case SET_WEBVIEW_VISIBILITY: {
      const {isWebViewVisible} = action;
      return {...state, isWebViewVisible};
    }
    case SET_QUERY: {
      const {query} = action;
      return {...state, query};
    }
    case FETCH_TRENDING_TOPICS_SUCCESS: {
      const {result} = action;
      return {
        ...state,
        trendingTopics: result.trending_tags,
      };
    }
    default: {
      return {...state};
    }
  }
};

export default reducer;

export const fetchNewsList = (query, page) => {
  return dispatch => {
    dispatch({type: FETCH_NEWS_LOADING, namespace: NAMESPACE});
    let URL = `${BASE_URL}?q=${query}&pageSize=${PAGE_SIZE}&page=${page}`;

    Axios.get(URL, DEFAULT_HEADERS)
      .then(res => {
        dispatch({
          type: FETCH_NEWS_SUCCESS,
          namespace: NAMESPACE,
          result: res.data.articles,
          page,
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_NEWS_FAILED,
          namespace: NAMESPACE,
        });
      });
  };
};

export const setCurrentSlideIndex = index => {
  return {
    type: SET_CURRENT_SLIDE_INDEX,
    namespace: NAMESPACE,
    index,
  };
};

export const setWebViewVisiblity = flag => {
  return {
    type: SET_WEBVIEW_VISIBILITY,
    namespace: NAMESPACE,
    isWebViewVisible: flag,
  };
};

export const setQuery = query => {
  return {
    type: SET_QUERY,
    namespace: NAMESPACE,
    query,
  };
};

export const fetchTrendingTopics = () => {
  console.log('fetchTrendingTopics');
  return dispatch => {
    let URL = `${INSHORTS_BASE_URL}/search/trending_topics`;

    Axios.get(URL)
      .then(res => {
        dispatch({
          type: FETCH_TRENDING_TOPICS_SUCCESS,
          namespace: NAMESPACE,
          result: res.data.data,
        });
      })
      .catch(err => {
        console.log('__err', err);
      });
  };
};
