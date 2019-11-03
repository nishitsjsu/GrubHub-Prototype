const LoginReducer = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "succes_login") {
        console.log("in reducer", action.payload.status);
        console.log("Inside reducer Token" + action.payload.data.token)

        if (action.payload.data.token) {
            console.log("Token received!")
            console.log("Inside reducer Token" + action.payload.data.token)
            window.localStorage.setItem("jwt", action.payload.data.token)
            window.localStorage.setItem("success", action.payload.data.success)
            window.localStorage.setItem("email", action.payload.data.email)
            window.localStorage.setItem("radio", action.payload.data.radio)
        }
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