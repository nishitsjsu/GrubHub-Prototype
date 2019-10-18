const OwnerSignupReducer = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "succes_owner_signup") {
        console.log("in reducer", action.payload.status);
        newState.authFlag = true;
        console.log("owner signup status in success", newState);
    } else if (action.type === "failure_owner_signup") {
        newState.authFlag = false;
    }
    return newState;
};
export default OwnerSignupReducer;