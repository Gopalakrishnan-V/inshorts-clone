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
const SELECT_CATEGORY = 'SELECT_CATEGORY';
const SELECT_TOPIC = 'SELECT_TOPIC';

const FETCH_TRENDING_TOPICS_SUCCESS = 'FETCH_TRENDING_TOPICS_SUCCESS';

const FETCH_CATEGORY_NEWS_LOADING = 'FETCH_CATEGORY_NEWS_LOADING';
const FETCH_CATEGORY_NEWS_SUCCESS = 'FETCH_CATEGORY_NEWS_SUCCESS';

const FETCH_TOPIC_NEWS_LOADING = 'FETCH_TOPIC_NEWS_LOADING';
const FETCH_TOPIC_NEWS_SUCCESS = 'FETCH_TOPIC_NEWS_SUCCESS';

const initialState = {
  isLoading: false,
  newsList: [],
  currentNewsSlideIndex: 0,
  isWebViewVisible: false,
  trendingTopics: [],
  selectedCategory: 'top_stories',
  newsOffset: null,
  currentTopic: null,
  selectedTopicId: null,
  page: 1,
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
      return {...state, currentNewsSlideIndex: index};
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
    case FETCH_CATEGORY_NEWS_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FETCH_CATEGORY_NEWS_SUCCESS: {
      const {result, category, newsOffset} = action;
      const hashIdsSet = new Set(state.newsList.map(item => item.hash_id));
      return {
        ...state,
        newsList: !newsOffset
          ? result.news_list
          : [
              ...state.newsList,
              ...result.news_list.filter(item => {
                return !hashIdsSet.has(item.hash_id);
              }),
            ],
        selectedCategory: category,
        newsOffset: result.min_news_id,
        isLoading: false,
      };
    }
    case SELECT_CATEGORY: {
      return {
        ...state,
        selectedCategory: action.category,
        selectedTopicId: null,
        newsList: [],
      };
    }
    case SELECT_TOPIC: {
      return {
        ...state,
        selectedTopicId: action.topicId,
        selectedCategory: null,
        newsList: [],
      };
    }
    case FETCH_TOPIC_NEWS_SUCCESS: {
      const {result, topicId, page} = action;
      return {
        ...state,
        newsList:
          page === 1
            ? result.news_list
            : [...state.newsList, ...result.news_list],
        selectedTopicId: topicId,
        page,
        isLoading: false,
      };
    }
    case FETCH_TOPIC_NEWS_LOADING: {
      return {
        ...state,
        isLoading: true,
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

export const setCurrentNewsSlideIndex = index => {
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
  return dispatch => {
    let URL = `${INSHORTS_BASE_URL}/search/trending_topics`;

    Axios.get(URL)
      .then(res => {
        console.log("__res", res);
        dispatch({
          type: FETCH_TRENDING_TOPICS_SUCCESS,
          namespace: NAMESPACE,
          result: res.data.data,
        });
      })
      .catch(err => {
        console.log("_err", err);
      });
  };
};

export const fetchCategoryNews = (category, newsOffset = null) => {
  return dispatch => {
    dispatch({type: FETCH_CATEGORY_NEWS_LOADING, namespace: NAMESPACE});
    let URL = `${INSHORTS_BASE_URL}/news?category=${category}&max_limit=10&include_card_data=true`;
    if (newsOffset) {
      URL += `&news_offset=${newsOffset}`;
    }

    Axios.get(URL)
      .then(res => {
        const result = res.data.data;
        if (!newsOffset && result.news_list.length) {
          // Clearing news carousel active index
          // dispatch({
          //   type: FETCH_CATEGORY_NEWS_SUCCESS,
          //   namespace: NAMESPACE,
          //   result: {...result, news_list: [result.news_list[0]]},
          //   category,
          //   newsOffset,
          // });
        }

        // setTimeout(() => {
          dispatch({
            type: FETCH_CATEGORY_NEWS_SUCCESS,
            namespace: NAMESPACE,
            result: result,
            category,
            newsOffset,
          });
        // }, 5);
      })
      .catch(err => {});
  };
};

export const selectCategory = category => {
  return {
    type: SELECT_CATEGORY,
    namespace: NAMESPACE,
    category,
  };
};

export const selectTopic = topicId => {
  return {
    type: SELECT_TOPIC,
    namespace: NAMESPACE,
    topicId,
  };
};

export const fetchTopicNews = (topicId, page = 1) => {
  return dispatch => {
    dispatch({type: FETCH_TOPIC_NEWS_LOADING, namespace: NAMESPACE});
    let URL = `${INSHORTS_BASE_URL}/search/trending_topics/${topicId}?page=${page}&type=NEWS_CATEGORY`;

    Axios.get(URL)
      .then(res => {
        const result = res.data.data;
        if (page === 1 && result.news_list.length) {
          // Clearing news carousel active index
          // dispatch({
          //   type: FETCH_TOPIC_NEWS_SUCCESS,
          //   namespace: NAMESPACE,
          //   result: {...result, news_list: [result.news_list[0]]},
          //   topicId,
          //   page,
          // });
        }
        // setTimeout(() => {
          dispatch({
            type: FETCH_TOPIC_NEWS_SUCCESS,
            namespace: NAMESPACE,
            result,
            topicId,
            page,
          });
        // }, 5);
      })
      .catch(err => {
        console.log('__Err', err);
      });
  };
};
