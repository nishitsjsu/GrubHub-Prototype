import axios from 'axios';
import rootURL from '../config';
import setAuthorizationToken from '../../utils/setAuthorizationToken'
export const SUCCESS_VIEW_RESTAURANTS_FETCH = "succes_view_restaurants_fetch";
export const FAILURE_VIEW_RESTAURANTS_FETCH = "failure_view_restaurants_fetch";

//traveler login action
function getSuccess(response) {
    return {
        type: SUCCESS_VIEW_RESTAURANTS_FETCH,
        payload: response
    }
}
function getError(response) {
    return {
        type: FAILURE_VIEW_RESTAURANTS_FETCH,
        payload: response
    }
}
function viewrestaurantsFetch_function(itemname) {
    console.log("Data in data fecth function ")
    setAuthorizationToken(localStorage.getItem('jwt'));
    return function (dispatch) {
        console.log("action data is");
        axios.defaults.withCredentials = true;
        axios.get(rootURL + '/viewrestaurants', {
            params: {
                itemname: itemname
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
export default viewrestaurantsFetch_function;