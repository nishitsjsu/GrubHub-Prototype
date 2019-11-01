import axios from 'axios';
import rootURL from '../config';
export const SUCCESS_BUYER_MESSAGE_FETCH = "succes_buyer_message_fetch";
export const FAILURE_BUYER_MESSAGE_FETCH = "failure_buyer_message_fetch";

//traveler login action
function getSuccess(response) {
    return {
        type: SUCCESS_BUYER_MESSAGE_FETCH,
        payload: response
    }
}
function getError(response) {
    return {
        type: FAILURE_BUYER_MESSAGE_FETCH,
        payload: response
    }
}
function buyermessageFetch_function(emailcookie) {
    console.log("Data in data fecth function ")
    return function (dispatch) {
        console.log("action data is");
        axios.defaults.withCredentials = true;
        axios.get(rootURL + '/buyerviewmessage', {
            params: {
                emailcookie: emailcookie
            }
        }).then(response => {
            dispatch(
                getSuccess(response)
            )
        }).catch(error => {
            dispatch(getError(error))
        })
    }
}
export default buyermessageFetch_function;