import axios from 'axios';
import setAuthorizationToken from '../../utils/setAuthorizationToken'
// import jwt from 'jsonwebtoken';
import rootURL from '../config';
export const SUCCESS_BUYER_DATA_FETCH = "succes_buyer_data_fetch";
export const FAILURE_BUYER_DATA_FETCH = "failure_buyer_data_fetch";

//traveler login action
function getSuccess(response) {
    return {
        type: SUCCESS_BUYER_DATA_FETCH,
        payload: response
    }
}
function getError(response) {
    return {
        type: FAILURE_BUYER_DATA_FETCH,
        payload: response
    }
}
function dataFetch_function(emailcookie) {
    console.log("Data in data fecth function ")
    console.log("token from localstoage " + localStorage.getItem("jwt"))
    setAuthorizationToken(localStorage.getItem('jwt'));

    return function (dispatch) {
        console.log("action data is");
        axios.defaults.withCredentials = true;
        axios.get(rootURL + '/buyerprofile', {
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
export default dataFetch_function;