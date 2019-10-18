import axios from 'axios';
export const SUCCESS_LOGIN = "succes_login";
export const FAILURE_LOGIN = "failure_login";
//traveler login action
function getSuccess(response) {
    return {
        type: SUCCESS_LOGIN,
        payload: response
    }
}
function getError(response) {
    return {
        type: FAILURE_LOGIN,
        payload: response
    }
}
function login_function(data) {
    console.log("Data in actions " + data)
    return function (dispatch) {
        console.log("action data is", data);
        axios.defaults.withCredentials = true;
        axios.post("http://localhost:3001/login", data).then(response => {
            dispatch(
                getSuccess(response)
            )
        }).catch(error => {
            dispatch(getError(error))
        })
    }
}
export default login_function;