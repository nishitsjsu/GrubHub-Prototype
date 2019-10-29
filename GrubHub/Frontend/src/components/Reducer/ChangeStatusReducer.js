const ChangeStatusReducer = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "success_change_status") {
        newState.authFlagCh = true;
        console.log("change status success in reducer :", newState);
    } else if (action.type === "failure_change_status") {
        newState.authFlagCh = false;
    }
    return newState;
};
export default ChangeStatusReducer;