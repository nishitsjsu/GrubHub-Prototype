import cookie from "react-cookies"

const LoginReducer = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "succes_login") {
        console.log("in reducer", action.payload.status);
        console.log("Inside reducer Token" + action.payload.data.token)

        if (action.payload.data.token) {
            console.log("Token received!")
            if (action.payload.data.radio === "buyer") {
                cookie.save("email", action.payload.data.email)
                cookie.save("cookie", action.payload.data.radio)
                cookie.save("id", action.payload.data.id)
                cookie.save("name", action.payload.data.name)
            } else if (action.payload.data.radio === "owner") {
                cookie.save("email", action.payload.data.email)
                cookie.save("cookie", action.payload.data.radio)
                cookie.save("id", action.payload.data.id)
                cookie.save("name", action.payload.data.name)
                cookie.save("cuisine", action.payload.data.cuisine)
                cookie.save("restaurant", action.payload.data.restaurant)
            }

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