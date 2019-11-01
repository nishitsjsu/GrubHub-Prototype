const OwnerMessageReducer = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "succes_send_message") {
        console.log("in reducer", action.payload.status);
        newState.authFlag = true;


    } else if (action.type === "failure_send_message") {

        newState.authFlag = false;
    }
    return newState;
};
export default OwnerMessageReducer;