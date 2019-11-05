import axios from 'axios';
import rootURL from '../config';
import setAuthorizationToken from '../../utils/setAuthorizationToken'
export const SUCCESS_OWNER_OLDORDERS_FETCH = "succes_owner_oldorders_fetch";
export const FAILURE_OWNER_OLDORDERS_FETCH = "failure_owner_oldorders_fetch";

//traveler login action
function getSuccess(response) {
    return {
        type: SUCCESS_OWNER_OLDORDERS_FETCH,
        payload: response
    }
}
function getError(response) {
    return {
        type: FAILURE_OWNER_OLDORDERS_FETCH,
        payload: response
    }
}
function owneroldordersFetch_function(emailcookie) {
    console.log("Data in data fecth function ")
    setAuthorizationToken(localStorage.getItem('jwt'));
    return function (dispatch) {
        console.log("action data is");
        axios.defaults.withCredentials = true;
        axios.get(rootURL + '/owneroldorders', {
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
export default owneroldordersFetch_function;