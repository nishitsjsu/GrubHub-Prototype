import axios from 'axios';
import rootURL from '../config';
export const SUCCESS_BUYERMENU_FETCH = "succes_buyermenu_fetch";
export const FAILURE_BUYERMENU_FETCH = "failure_buyermenu_fetch";

//traveler login action
function getSuccess(response) {
    return {
        type: SUCCESS_BUYERMENU_FETCH,
        payload: response
    }
}
function getError(response) {
    return {
        type: FAILURE_BUYERMENU_FETCH,
        payload: response
    }
}
function buyermenuFetch_function(restaurantid) {
    console.log("Data in data fecth function ")
    return function (dispatch) {
        console.log("action data is");
        axios.defaults.withCredentials = true;
        axios.get(rootURL + '/buyersection', {
            params: {
                restaurantid: restaurantid
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
export default buyermenuFetch_function;