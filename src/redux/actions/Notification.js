import {ALL_NOTIFICATION} from '../constants';
import axios from 'axios';
import {apiUrl} from '../../utills/config';
import {MessageError, MessageInfo} from '../../utills/showAlerts';
import { notificationFormater } from '../../utills/helper';


export function getAllNotification(token, id, callback) {
  return async dispatch => {
    axios
      .get(`${apiUrl}/api/v1/notifications?to=${id}`, {headers: {token: `${token}`}})
      .then(
        response => {
          if (response.status == '200') {
            dispatch({type: ALL_NOTIFICATION, data: response.data});
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
