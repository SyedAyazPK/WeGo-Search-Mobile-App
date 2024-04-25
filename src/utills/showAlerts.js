import { Toast } from "react-native-toast-message/lib/src/Toast";

export const MessageSuccess = (message) => {
    return (
        Toast.show({
            type: 'success',
            text1: 'Info',
            text2: message
        })
    )
}

export const MessageError = (message) => {
    return (
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: message
        })
    )
}

export const MessageInfo = (message) => {
    return (
        Toast.show({
            type: 'SocialMarketeplace',
            text1: message
        })
    )
}