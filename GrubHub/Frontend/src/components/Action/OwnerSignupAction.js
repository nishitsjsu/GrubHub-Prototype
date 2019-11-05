import axios from 'axios';
import rootURL from '../config';
export const SUCCESS_OWNER_SIGNUP = "succes_owner_signup";
export const FAILURE_OWNER_SIGNUP = "failure_owner_signup";
//traveler login action
function getSuccess(response) {
    return {
        type: SUCCESS_OWNER_SIGNUP,
        payload: response
    }
}
function getError(response) {
    return {
        type: FAILURE_OWNER_SIGNUP,
        payload: response
    }
}
function ownerSignup_function(data) {
    console.log("Data in actions " + data)
    //middleware call
    //receive response from backend
    return function (dispatch) {
        console.log("action data is", data);

        axios.defaults.withCredentials = true;
        axios.post(rootURL + "/ownersignup", data).then(response => {
            dispatch(
                getSuccess(response)
            )
        }).catch(error => {
            dispatch(getError(error))
        })
    }
}
export default ownerSignup_function;




