import { GENDER, RADIUS_HISTORY,SERVICES, SEARCH_FRIEND_HISTORY, ALL_SEARCH_HISTORY } from "../constants";
import axios from "axios";
import { apiUrl } from "../../utills/config";
import { MessageError, MessageInfo } from "../../utills/showAlerts";

export function searchByLongLatAction(token, text, lat, long, callback) {
  return async (dispatch) => {
    axios
      .get(
        `${apiUrl}/api/v1/search/radius?searchedText=${text}&lat=${lat}&long=${long}&radius=10`,
        { headers: { token: `${token}` } }
      )
      .then(
        (response) => {
          if (response.status == "200") {
            var totalMembers = response.data;
            for (let i = 0; i < totalMembers.length; i++) {
              totalMembers[i].isAddedToGroup = false;
            }
            dispatch({ type: RADIUS_HISTORY, data: totalMembers });
            callback();
            return;
          }
          if (response.data.success == false) {
            MessageError(response.data.message);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };
}

export function searchInYourFriends(token, id, text, callback) {
  return async (dispatch) => {
    axios
      .get(`${apiUrl}/api/v1/search/group?searchedText=${text}`, {
        headers: { token: `${token}` },
      })
      .then(
        (response) => {
          if (response.data.success == true) {
            dispatch({
              type: SEARCH_FRIEND_HISTORY,
              data: response.data.search,
            });
            callback(response.data.search);
            return;
          }
          if (response.data.success == false) {
            MessageError(response.data.message);
          }
        },
        (error) => {
          console.log(error);
          // MessageError('Please, Check your Data');
        }
      );
  };
}

export function addToGroupAction(data, token, callback) {
  return async (dispatch) => {
    axios
      .post(`${apiUrl}/api/v1/user/friend/`, data, {
        headers: { token: `${token}` },
      })
      .then(
        (response) => {
          callback()
        },
        (error) => {
          console.log(error);
          MessageError("Invalid Credentials");
        }
      );
  };
}

export function getSearchHistory(token, callback) {
  return async (dispatch) => {
    axios
      .get(
        `${apiUrl}/api/v1/user/search`,
        { headers: { token: `${token}` } }
      )
      .then(
        (response) => {
          if(response.data.success){
            dispatch({ type: ALL_SEARCH_HISTORY, data: response.data.data });
          }
        },
        (error) => {
          console.log(error);
          dispatch({ type: ALL_SEARCH_HISTORY, data: [] });
        }
      );
  };
}

export function deleteHistoryById(token, id, callback) {
  return async (dispatch) => {
    axios
      .delete(
        `${apiUrl}/api/v1/user/search/${id}`,
        { headers: { token: `${token}` } }
      )
      .then(
        (response) => {
          if(response.data.success){
            callback()
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };
}

