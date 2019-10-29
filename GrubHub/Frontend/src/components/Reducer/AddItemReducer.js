const AddItemReducer = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "success_add_item") {
        newState.authFlag = true;
        console.log("AddItemReducer status in success DeleteSectionReducer :", newState);
    } else if (action.type === "failure_add_item") {
        newState.authFlag = false;
    }
    return newState;
};
export default AddItemReducer;