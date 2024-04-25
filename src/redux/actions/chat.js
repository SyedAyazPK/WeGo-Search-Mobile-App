import {ALL_FRIENDS} from '../constants';
import axios from 'axios';
import {apiUrl} from '../../utills/config';
import {MessageError, MessageInfo} from '../../utills/showAlerts';


export function getAllFriendsAction(token, id, callback) {
  return async dispatch => {
    axios
      .get(`${apiUrl}/api/v1/user/friend/${id}`, {headers: {token: `${token}`}})
      .then(
        response => {
          if (response.status == '200') {
            dispatch({type: ALL_FRIENDS, data: response.data.user.friendId});
            callback();
            return;
          }
          if (response.data.success == false) {
            MessageError(response.data.message);
          }
        },
        error => {
          console.log(error);
        },
      );
  };
}

export function sendMessageAction(token, data, callback) {
  return async dispatch => {
    axios
      .post(`${apiUrl}/api/v1/chat/addmsg`, data, {
        headers: {token: `${token}`},
      })
      .then(
        response => {
          if (response.status == '200') {
            callback();
            return;
          }
          if (response.data.success == false) {
            MessageError(response.data.message);
          }
        },
        error => {
          console.log(error);
        },
      );
  };
}

export function getMessageAction(token, data, callback) {
  return async dispatch => {
    axios
      .post(`${apiUrl}/api/v1/chat/getmsg`, data, {
        headers: {token: `${token}`},
      })
      .then(
        response => {
          if (response.status == '200') {
            callback(response.data);
            return;
          }
          if (response.data.success == false) {
            MessageError(response.data.message);
          }
        },
        error => {
          console.log(error);
        },
      );
  };
}