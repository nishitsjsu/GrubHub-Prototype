import axios from 'axios';
import rootURL from '../config';
export const SUCCESS_SEND_MESSAGE = "succes_send_message";
export const FAILURE_SEND_MESSAGE = "failure_send_message";
//traveler login action
function getSuccess(response) {
    return {
        type: SUCCESS_SEND_MESSAGE,
        payload: response
    }
}
function getError(response) {
    return {
        type: FAILURE_SEND_MESSAGE,
        payload: response
    }
}
function sendOwnerMessage_function(data) {
    console.log("Data in actions " + data)
    return function (dispatch) {
        console.log("action data is", data);
        axios.defaults.withCredentials = true;
        axios.post(rootURL + "/ownermessage", data).then(response => {
            dispatch(
                getSuccess(response)
            )
        }).catch(error => {
            dispatch(getError(error))
        })
    }
}
export default sendOwnerMessage_function;