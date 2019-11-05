import axios from 'axios';
import rootURL from '../config';
export const SUCCESS_FUTURE_ORDERS_FETCH = "succes_future_orders_fetch";
export const FAILURE_FUTURE_ORDERS_FETCH = "failure_future_orders_fetch";

//traveler login action
function getSuccess(response) {
    return {
        type: SUCCESS_FUTURE_ORDERS_FETCH,
        payload: response
    }
}
function getError(response) {
    return {
        type: FAILURE_FUTURE_ORDERS_FETCH,
        payload: response
    }
}
function buyerfutureordersFetch_function(emailcookie) {
    console.log("Data in data fecth function ")
    return function (dispatch) {
        console.log("action data is");
        axios.defaults.withCredentials = true;
        axios.get(rootURL + '/buyerfutureorders', {
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
export default buyerfutureordersFetch_function;