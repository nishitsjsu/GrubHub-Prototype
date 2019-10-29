import axios from 'axios';
import rootURL from '../config';
export const SUCCESS_OWNER_SECTION_FETCH = "succes_owner_section_fetch";
export const FAILURE_OWNER_SECTION_FETCH = "failure_owner_section_fetch";

//traveler login action
function getSuccess(response) {
    return {
        type: SUCCESS_OWNER_SECTION_FETCH,
        payload: response
    }
}
function getError(response) {
    return {
        type: FAILURE_OWNER_SECTION_FETCH,
        payload: response
    }
}
function ownersectionFetch_function(emailcookie) {
    console.log("Data in data fecth function ")
    return function (dispatch) {
        console.log("action data is");
        axios.defaults.withCredentials = true;
        axios.get(rootURL + '/ownersection', {
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
export default ownersectionFetch_function;