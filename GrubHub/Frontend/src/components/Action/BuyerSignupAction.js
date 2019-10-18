import axios from 'axios';
export const SUCCESS_BUYER_SIGNUP = "succes_buyer_signup";
export const FAILURE_BUYER_SIGNUP = "failure_buyer_signup";
//traveler login action
function getSuccess(response) {
    return {
        type: SUCCESS_BUYER_SIGNUP,
        payload: response
    }
}
function getError(response) {
    return {
        type: FAILURE_BUYER_SIGNUP,
        payload: response
    }
}
function buyerSignup_function(data) {
    console.log("Data in actions " + data)
    //middleware call
    //receive response from backend
    return function (dispatch) {
        console.log("action data is", data);
        axios.defaults.withCredentials = true;
        axios.post("http://localhost:3001/buyersignup", data).then(response => {
            dispatch(
                getSuccess(response)
            )
        }).catch(error => {
            dispatch(getError(error))
        })
    }
}
export default buyerSignup_function;


