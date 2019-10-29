import axios from 'axios';
import rootURL from '../config';
export const SUCCESS_ADD_ITEM = "success_add_item";
export const FAILURE_ADD_ITEM = "failure_add_item";
function getSuccessUpdate(response) {
    return {
        type: SUCCESS_ADD_ITEM,
        payload: response
    }
}
function getErrorUpdate(response) {
    return {
        type: FAILURE_ADD_ITEM,
        payload: response
    }
}
function addItem_function(data) {

    console.log("Data in addItem_function")

    return function (dispatch) {
        console.log("action data is " + data)
        axios.defaults.withCredentials = true;
        axios.post(rootURL + "/additem", data).then(response => {
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
export default addItem_function;