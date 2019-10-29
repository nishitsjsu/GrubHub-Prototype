const OrderDetailsReducer = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "succes_order_details_fetch") {
        let temp = JSON.stringify(action);
        temp = JSON.parse(temp);
        console.log("in reducer", action.payload.status);

        newState.authFlag = true;
        newState.items = temp.payload.data;
        console.log("owner home reducer in success", newState);

    } else {
        newState.authFlag = false;
    }
    return newState;
};

export default OrderDetailsReducer;
