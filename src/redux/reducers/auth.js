import { USER, TOKEN,} from "../constants";

let initialState = {
  user: null,
  token: null,
  socket: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER:
      return {
        ...state,
        user: action.data,
      };
    case TOKEN:
      return {
        ...state,
        token: action.data,
      };
    default:
      return state;
  }
};
