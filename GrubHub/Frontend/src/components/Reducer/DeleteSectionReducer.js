const DeleteSectionReducer = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "success_delete_action") {
        newState.delFlag = true;
        console.log("DeleteSectionReducer status in success DeleteSectionReducer :", newState);
    } else if (action.type === "failure_delete_action") {
        newState.delFlag = false;
    }
    return newState;
};
export default DeleteSectionReducer;