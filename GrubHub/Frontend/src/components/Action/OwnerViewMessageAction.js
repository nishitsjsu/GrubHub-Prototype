import axios from 'axios';
import rootURL from '../config';
import setAuthorizationToken from '../../utils/setAuthorizationToken'
export const SUCCESS_OWNER_MESSAGE_FETCH = "succes_owner_message_fetch";
export const FAILURE_OWNER_MESSAGE_FETCH = "failure_owner_message_fetch";

//traveler login action
function getSuccess(response) {
    return {
        type: SUCCESS_OWNER_MESSAGE_FETCH,
        payload: response
    }
}
function getError(response) {
    return {
        type: FAILURE_OWNER_MESSAGE_FETCH,
        payload: response
    }
}
function ownermessageFetch_function(emailcookie) {
    console.log("Data in data fecth function ")
    setAuthorizationToken(localStorage.getItem('jwt'));
    return function (dispatch) {
        console.log("action data is");
        axios.defaults.withCredentials = true;
        axios.get(rootURL + '/ownerviewmessage', {
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
export default ownermessageFetch_function;