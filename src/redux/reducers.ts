import {GET_HEADLINES, GET_NEWS_FEED, RESET_SEARCH_RESULTS, SEARCH_NEWS} from './actions';

const initialState = {
  topHeadlines:[],
  newsFeed: [],
  searchResults: [],
};

const feedReducer = (
  state = initialState,
  action:any,
) => {
  switch (action.type) {
    case GET_HEADLINES:
      return {
        ...state,
        topHeadlines: [...state.topHeadlines, ...action.payload], // Append new data to existing state
      };
    case GET_NEWS_FEED:
      return {
        ...state,
        newsFeed: [...state.topHeadlines, ...action.payload], // Append new data to existing state
      };
    case SEARCH_NEWS:
      return {...state, searchResults: action.payload};
    case RESET_SEARCH_RESULTS:
      return {...state, searchResults: []};
    default:
      return state;
  }
};

export default feedReducer;
