import axios from 'axios';
import rootURL from '../config';
export const SUCCESS_OWNER_DATA_FETCH = "succes_owner_data_fetch";
export const FAILURE_OWNER_DATA_FETCH = "failure_owner_data_fetch";
//traveler login action
function getSuccess(response) {
    return {
        type: SUCCESS_OWNER_DATA_FETCH,
        payload: response
    }
}
function getError(response) {
    return {
        type: FAILURE_OWNER_DATA_FETCH,
        payload: response
    }
}
function ownerProfile_function(emailcookie) {
    console.log("Data in actions " + emailcookie)
    return function (dispatch) {
        console.log("action data is", emailcookie);

        axios.defaults.withCredentials = true;
        axios.get(rootURL + '/ownerprofile', {
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
export default ownerProfile_function;




