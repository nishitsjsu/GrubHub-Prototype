const LoginReducer = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "succes_login") {
        console.log("in reducer", action.payload.status);
        newState.authFlag = true;
        console.log("login status in success", newState);
    } else if (action.type === "failure_login") {
        newState.authFlag = false;
        newState.invalidFlag = true;
    }
    // console.log("state in reducer", state);
    return newState;
};

export default LoginReducer;