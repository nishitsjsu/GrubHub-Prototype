import axios from 'axios';
import rootURL from '../config';
import setAuthorizationToken from '../../utils/setAuthorizationToken'
export const SUCCESS_CHANGE_STATUS = "success_change_status";
export const FAILURE_CHANGE_STATUS = "failure_change_status";
function getSuccessUpdate(response) {
    return {
        type: SUCCESS_CHANGE_STATUS,
        payload: response
    }
}
function getErrorUpdate(response) {
    return {
        type: FAILURE_CHANGE_STATUS,
        payload: response
    }
}
function changeStatus_function(data) {

    console.log("Data in Data update funtion")
    setAuthorizationToken(localStorage.getItem('jwt'));
    return function (dispatch) {
        console.log("action data is " + data)
        axios.defaults.withCredentials = true;
        axios.post(rootURL + "/changestatus", data).then(response => {
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
export default changeStatus_function;