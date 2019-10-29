import axios from 'axios';
import rootURL from '../config';
export const SUCCESS_OWNER_HOME_FETCH = "succes_owner_home_fetch";
export const FAILURE_OWNER_HOME_FETCH = "failure_owner_home_fetch";

//traveler login action
function getSuccess(response) {
    return {
        type: SUCCESS_OWNER_HOME_FETCH,
        payload: response
    }
}
function getError(response) {
    return {
        type: FAILURE_OWNER_HOME_FETCH,
        payload: response
    }
}
function ownerhomeFetch_function(emailcookie) {
    console.log("Data in data fecth function ")
    return function (dispatch) {
        console.log("action data is");
        axios.defaults.withCredentials = true;
        axios.get(rootURL + '/ownerhome', {
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
export default ownerhomeFetch_function;