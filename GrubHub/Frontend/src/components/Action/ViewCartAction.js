import axios from 'axios';
import rootURL from '../config';
import setAuthorizationToken from '../../utils/setAuthorizationToken'
export const SUCCESS_VIEW_CART_FETCH = "succes_view_cart_fetch";
export const FAILURE_VIEW_CART_FETCH = "failure_view_cart_fetch";

//traveler login action
function getSuccess(response) {
    return {
        type: SUCCESS_VIEW_CART_FETCH,
        payload: response
    }
}
function getError(response) {
    return {
        type: FAILURE_VIEW_CART_FETCH,
        payload: response
    }
}
function viewcartFetch_function(emailcookie) {
    console.log("Data in data fecth function ")
    setAuthorizationToken(localStorage.getItem('jwt'));
    return function (dispatch) {
        console.log("action data is");
        axios.defaults.withCredentials = true;
        axios.get(rootURL + '/viewcart', {
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
export default viewcartFetch_function;