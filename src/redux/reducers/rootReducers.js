import { combineReducers } from "redux";
import searches from "./searches";
import authentication from "./authentication";
import chat from "./chat";
import notification from "./notification";
import auth from "./auth";

const rootReducer = combineReducers({
    searches,
    authentication,
    chat,
    notification,
    auth,
});

export default rootReducer;