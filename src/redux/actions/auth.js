import { GENDER, USER, TOKEN, SERVICES } from "../constants";
import axios from "axios";
import { apiUrl } from "../../utills/config";
import { MessageInfo, MessageError } from "../../utills/showAlerts";

export function signInAction(data, fcmToken, callback, stopLoader) {
    return async (dispatch) => {
      axios.post(`${apiUrl}/api/v1/login`, data).then(
        (response) => {
          if (response.data.success) {
            dispatch({ type: USER, data: response.data });
            dispatch({ type: TOKEN, data: response.data.token });
            dispatch(
              updateFCMToken(response.data.token, response.data._id, fcmToken)
            );
            MessageInfo(`${response.data.name}, You Are Login Successfully`);
            callback();
            stopLoader()
            return;
          }
          if (response.data.success == false) {
            MessageError("Invalid Credentials!");
            stopLoader()
          }
        },
        (error) => {
          console.log(error);
          MessageError("Invalid Credentials");
          stopLoader()
        }
      );
    };
  }

  
  export function updateFCMToken(token, id, fcmToken) {
    return async (dispatch) => {
      // console.log("\n==> Token : ", token);
      // console.log("\n==> id : ", id);
      // console.log("\n==> FCM Token : ", fcmToken);
      // axios
      // .patch(`${apiUrl}/api/v1/token?userId=644a0389e43220721367d672&token=hh`, {
      //   headers: {  
      //     'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0NGEwMzg5ZTQzMjIwNzIxMzY3ZDY3MiIsIm5hbWUiOiJVc2VyNiIsImVtYWlsIjoidXNlcjZAZ21haWwuY29tIiwicm9sZSI6InVzZXIifSwiaWF0IjoxNjgyODc5NDg0LCJleHAiOjE3MTQ0MTU0ODR9.UR24H7H723Qj_HurWQAefTOnZGS54kZrNestKUp9Vdw' },
      // })
      // .then(
      //   (response) => {
      //     console.log(response.data.success);
      //   },
      //   (error) => {
      //     console.log(error);
      //     MessageError("Check Your Network!");
      //   }
      // );
  
      fetch(`${apiUrl}/api/v1/token?userId=${id}&token=${fcmToken}`,
      {
        method: 'PATCH',
        headers: {  
          // "Content-Type": "application/json",
              'token': token }
      }
      ).then(res=> 
        console.log(res.status)
      )
    };
  }


  export function signUpAction(data, fcmToken, callback, stopLoader) {
    return async (dispatch) => {
      axios.post(`${apiUrl}/api/v1/user`, data).then(
        (response) => {
          if (response.data.success) {
            dispatch({ type: USER, data: response.data.user });
            dispatch({ type: TOKEN, data: response.data.token });
            var data = {
              userId: response.data.user._id,
              token: fcmToken,
            };
            dispatch(storeFCMToken(response.data.token, data));
            MessageInfo(`${response.data.user.name}, Sign Up Successfully`);
            callback();
            stopLoader()
            return;
          }
          if (response.data.success == false) {
            MessageError(response.data.message);
            stopLoader()
          }
        },
        (error) => {
          console.log(error);
          MessageError("Please, Check your Data");
          stopLoader()
        }
      );
    };
  }
  
  export function storeFCMToken(token, data) {
    return async (dispatch) => {
      axios
        .post(`${apiUrl}/api/v1/token`, data, { headers: { token: `${token}` } })
        .then(
          (response) => {
            return;
          },
          (error) => {
            console.log(error);
            MessageError("Please, Check your Data");
          }
        );
    };
  }


export function updateUserAction(userId, token, data, callback) {
    return async (dispatch) => {
      axios
        .patch(`${apiUrl}/api/v1/user/${userId}`, data, {
          headers: { token: `${token}` },
        })
        .then(
          (response) => {
            if (response.data.success) {
              dispatch({ type: USER, data: response.data.user });
              return;
            }
            if (response.data.success == false) {
              MessageError("Check Your Network!");
            }
          },
          (error) => {
            console.log(error);
            MessageError("Check Your Network!");
          }
        );
    };
  }