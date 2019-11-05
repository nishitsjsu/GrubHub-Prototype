import axios from 'axios';
import rootURL from '../config';
import setAuthorizationToken from '../../utils/setAuthorizationToken'
export const SUCCESS_ADDTOCART = "succes_addtocart";
export const FAILURE_ADDTOCART = "failure_addtocart";
//traveler login action
function getSuccess(response) {
    return {
        type: SUCCESS_ADDTOCART,
        payload: response
    }
}
function getError(response) {
    return {
        type: FAILURE_ADDTOCART,
        payload: response
    }
}
function addtocart_function(data) {
    console.log("Data in actions " + data)
    setAuthorizationToken(localStorage.getItem('jwt'));
    return function (dispatch) {
        console.log("action data is", data);
        axios.defaults.withCredentials = true;
        axios.post(rootURL + "/addtocart", data).then(response => {
            dispatch(
                getSuccess(response)
            )
        }).catch(error => {
            dispatch(getError(error))
        })
    }
}
export default addtocart_function;