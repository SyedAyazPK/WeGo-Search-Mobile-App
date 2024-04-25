import {ALL_FRIENDS} from '../constants';

let initialState = {
  allFriend: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ALL_FRIENDS:
      return {
        ...state,
        allFriend: action.data,
      };
    default:
      return state;
  }
};
