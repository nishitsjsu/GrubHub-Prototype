const BuyerSignupReducer = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "succes_buyer_signup") {
        console.log("in reducer", action.payload.status);
        newState.authFlag = true;
        console.log("buyer signup status in success", newState);

    } else if (action.type === "failure_buyer_signup") {

        newState.authFlag = false;
    }
    return newState;
};
export default BuyerSignupReducer;