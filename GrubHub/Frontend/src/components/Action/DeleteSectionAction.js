import axios from 'axios';
import rootURL from '../config';
import setAuthorizationToken from '../../utils/setAuthorizationToken'
export const SUCCESS_DELETE_ACTION = "success_delete_action";
export const FAILURE_DELETE_ACTION = "failure_delete_action";
function getSuccessUpdate(response) {
    return {
        type: SUCCESS_DELETE_ACTION,
        payload: response
    }
}
function getErrorUpdate(response) {
    return {
        type: FAILURE_DELETE_ACTION,
        payload: response
    }
}
function deleteSection_function(data) {

    console.log("Data in Delete section funtion")
    setAuthorizationToken(localStorage.getItem('jwt'));
    return function (dispatch) {
        console.log("action data is " + data)
        axios.defaults.withCredentials = true;
        axios.post(rootURL + "/deletesection", data).then(response => {
            dispatch(
                getSuccessUpdate(response)
            )
        }).catch(error => {
            dispatch(
                getErrorUpdate(error)
            )
        })
    }
}
export default deleteSection_function;