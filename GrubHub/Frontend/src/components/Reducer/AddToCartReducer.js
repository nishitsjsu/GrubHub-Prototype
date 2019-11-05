const AddToCartReducer = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "succes_addtocart") {
        console.log("in reducer", action.payload.status);
        newState.authFlag = true;
    } else if (action.type === "failure_addtocart") {
        newState.authFlag = false;
    }
    return newState;
};
export default AddToCartReducer;