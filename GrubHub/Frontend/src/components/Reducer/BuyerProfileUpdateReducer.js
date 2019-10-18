const BuyerProfileUpdateReducer = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "success_buyer_data_update") {
        newState.authFlag = true;
        console.log("buyer profile status in success success_buyer_data_update :", newState);
    } else if (action.type === "failure_buyer_data_update") {
        newState.authFlag = false;
    }
    return newState;
};
export default BuyerProfileUpdateReducer;