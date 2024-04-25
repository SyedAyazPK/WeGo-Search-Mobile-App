import {
  GENDER,
  RADIUS_HISTORY,
  SEARCH_FRIEND_HISTORY,
  ACTIV_SCREEN,
  ALL_SEARCH_HISTORY,
} from "../constants";

let initialState = {
  historyByRadius: null,
  historyFromFriend: null,
  activeScreen: "",
  allSearchHistory: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RADIUS_HISTORY:
      return {
        ...state,
        historyByRadius: action.data,
      };
    case SEARCH_FRIEND_HISTORY:
      return {
        ...state,
        historyFromFriend: action.data,
      };
    case ACTIV_SCREEN:
      return {
        ...state,
        activeScreen: action.data,
      };
    case ALL_SEARCH_HISTORY:
      return {
        ...state,
        allSearchHistory: action.data,
      };
    default:
      return state;
  }
};
