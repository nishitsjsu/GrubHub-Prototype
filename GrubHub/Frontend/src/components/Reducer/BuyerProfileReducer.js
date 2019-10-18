const BuyerProfileReducer = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "succes_buyer_data_fetch") {
        let temp = JSON.stringify(action);
        temp = JSON.parse(temp);
        console.log("in reducer", action.payload.status);

        newState.authFlag = true;
        newState.username = temp.payload.data.username;
        newState.email = temp.payload.data.email;
        newState.phone = temp.payload.data.phone;
        newState.profileimage = temp.payload.data.profileimage;
        console.log("buyer profile status in success", newState);

    } else {
        newState.authFlag = false;
    }
    return newState;
};

export default BuyerProfileReducer;
