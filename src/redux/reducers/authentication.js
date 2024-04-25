import { SERVICES, BID_SOCKET, CURRENT_SCREEN } from "../constants";

let initialState = {
  allServices: [],
  socket: null,
  currentScreen: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SERVICES:
      return {
        ...state,
        allServices: action.data,
      };
    case BID_SOCKET:
      return {
        ...state,
        socket: action.data,
      };
    case CURRENT_SCREEN:
      return {
        ...state,
        currentScreen: action.data,
      };
    default:
      return state;
  }
};
