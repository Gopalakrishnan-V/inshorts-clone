export const BASE_URL = 'https://newsapi.org/v2/everything';
export const INSHORTS_BASE_URL = 'https://inshorts.com/api/en';
export const PAGE_SIZE = 10;

export const FONT_THIN = 'Roboto-Thin';
export const FONT_LIGHT = 'Roboto-Light';
export const FONT_REGULAR = 'Roboto-Regular';
export const FONT_MEDIUM = 'Roboto-Medium';
export const FONT_BOLD = 'Roboto-Bold';
export const FONT_BLACK = 'Roboto-Black';

export const DEFAULT_HEADERS = {
  headers: {'x-api-key': '1b54bb7b253c46e4ad6d3d85c4bf1576'},
};

export const NEWS_CATEGORIES = [
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
