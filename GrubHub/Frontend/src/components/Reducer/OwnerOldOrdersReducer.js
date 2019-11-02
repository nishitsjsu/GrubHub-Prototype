const OwnerOldOrdersReducer = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "succes_owner_oldorders_fetch") {
        let temp = JSON.stringify(action);
        temp = JSON.parse(temp);
        console.log("in reducer", action.payload.status);

        newState.authFlag = true;
        newState.orders = temp.payload.data;
        console.log("owner home reducer in success", newState);

    } else {
        newState.authFlag = false;
    }
    return newState;
};

export default OwnerOldOrdersReducer;
