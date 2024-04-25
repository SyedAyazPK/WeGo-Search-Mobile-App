import {ALL_NOTIFICATION} from '../constants';

let initialState = {
  allNotification: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ALL_NOTIFICATION:
      return {
        ...state,
        allNotification: action.data,
      };
    default:
      return state;
  }
};
