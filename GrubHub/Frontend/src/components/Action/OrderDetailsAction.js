import axios from 'axios';
import rootURL from '../config';
import setAuthorizationToken from '../../utils/setAuthorizationToken'
export const SUCCESS_ORDER_DETAILS_FETCH = "succes_order_details_fetch";
export const FAILURE_ORDER_DETAILS_FETCH = "failure_order_details_fetch";

//traveler login action
function getSuccess(response) {
    return {
        type: SUCCESS_ORDER_DETAILS_FETCH,
        payload: response
    }
}
function getError(response) {
    return {
        type: FAILURE_ORDER_DETAILS_FETCH,
        payload: response
    }
}
function orderdetailsFetch_function(orderid) {
    console.log("Data in data fecth function ")
    setAuthorizationToken(localStorage.getItem('jwt'));
    return function (dispatch) {
        console.log("action data is");
        axios.defaults.withCredentials = true;
        axios.get(rootURL + '/orderitemdetails', {
            params: {

                orderid: orderid
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
export default orderdetailsFetch_function;