import { GENDER, USER, TOKEN, SERVICES } from "../constants";
import axios from "axios";
import { apiUrl } from "../../utills/config";
import { MessageInfo, MessageError } from "../../utills/showAlerts";

export function getServicesAction(token, callback) {
  return async (dispatch) => {
    axios
      .get(`${apiUrl}/api/v1/user/service`, { headers: { token: `${token}` } })
      .then(
        (response) => {
          if (response.data.success) {
            dispatch({ type: SERVICES, data: response.data.services });
            callback(response.data.services)
            return;
          }
        },
        (error) => {
          console.log(error);
          callback(false)
          MessageError("Please, Ask Admin to Add Services");
        }
      );
  };
}

export function setCurrentGender(val) {
  return async (dispatch) => {
    dispatch({ type: GENDER, data: val });
  };
}
