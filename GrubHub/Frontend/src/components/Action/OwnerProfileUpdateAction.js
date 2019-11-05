import axios from 'axios';
import rootURL from '../config';
import setAuthorizationToken from '../../utils/setAuthorizationToken'
export const SUCCESS_OWNER_DATA_UPDATE = "success_owner_data_update";
export const FAILURE_OWNER_DATA_UPDATE = "failure_owner_data_update";
function getSuccessUpdate(response) {
    return {
        type: SUCCESS_OWNER_DATA_UPDATE,
        payload: response
    }
}
function getErrorUpdate(response) {
    return {
        type: FAILURE_OWNER_DATA_UPDATE,
        payload: response
    }
}
function owner_dataUpdate_function(data) {

    console.log("Data in Data update funtion")
    setAuthorizationToken(localStorage.getItem('jwt'));
    return function (dispatch) {
        console.log("action data is " + data)
        axios.defaults.withCredentials = true;
        axios.post(rootURL + "/ownerprofile", data).then(response => {
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
export default owner_dataUpdate_function;