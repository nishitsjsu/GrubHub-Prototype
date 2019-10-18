const OwnerProfileUpdateReducer = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "success_owner_data_update") {
        newState.authFlag = true;
        console.log("owner profile status in success success_buyer_data_update :", newState);
    } else if (action.type === "failure_owner_data_update") {
        newState.authFlag = false;
    }
    return newState;
};
export default OwnerProfileUpdateReducer;