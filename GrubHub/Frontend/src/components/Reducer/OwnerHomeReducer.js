const OwnerHomeReducer = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "succes_owner_home_fetch") {
        let temp = JSON.stringify(action);
        temp = JSON.parse(temp);
        console.log("in reducer", action.payload.status);

        newState.authFlag = true;
        newState.books = temp.payload.data;
        console.log("owner home reducer in success", newState);

    } else {
        newState.authFlag = false;
    }
    return newState;
};

export default OwnerHomeReducer;
