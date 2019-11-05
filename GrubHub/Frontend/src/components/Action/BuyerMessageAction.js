import axios from 'axios';
import rootURL from '../config';
import setAuthorizationToken from '../../utils/setAuthorizationToken'
export const SUCCESS_BSEND_MESSAGE = "succes_bsend_message";
export const FAILURE_BSEND_MESSAGE = "failure_bsend_message";
//traveler login action
function getSuccess(response) {
    return {
        type: SUCCESS_BSEND_MESSAGE,
        payload: response
    }
}
function getError(response) {
    return {
        type: FAILURE_BSEND_MESSAGE,
        payload: response
    }
}
function sendBuyerMessage_function(data) {
    console.log("Data in actions " + data)
    setAuthorizationToken(localStorage.getItem('jwt'));
    return function (dispatch) {
        console.log("action data is", data);
        axios.defaults.withCredentials = true;
        axios.post(rootURL + "/buyermessage", data).then(response => {
            dispatch(
                getSuccess(response)
            )
        }).catch(error => {
            dispatch(getError(error))
        })
    }
}
export default sendBuyerMessage_function;