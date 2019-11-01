const BuyerMessageReducer = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "succes_bsend_message") {
        console.log("in reducer", action.payload.status);
        newState.authFlag = true;


    } else if (action.type === "failure_bsend_message") {

        newState.authFlag = false;
    }
    return newState;
};
export default BuyerMessageReducer;