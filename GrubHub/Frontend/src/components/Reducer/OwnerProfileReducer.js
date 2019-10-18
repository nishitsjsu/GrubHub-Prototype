const OwnerProfileReducer = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "succes_owner_data_fetch") {
        let temp = JSON.stringify(action);
        temp = JSON.parse(temp);
        console.log("in reducer", action.payload.status);

        newState.authFlag = true;
        newState.username = temp.payload.data.username;
        newState.email = temp.payload.data.email;
        newState.phone = temp.payload.data.phone;
        newState.restaurant = temp.payload.data.restaurant;
        newState.cuisine = temp.payload.data.cuisine;
        newState.imagePath = temp.payload.data.profileimage;
        newState.imagePath1 = temp.payload.data.restaurantimage;
        console.log("owner profile status in success", newState);

    } else {
        newState.authFlag = false;
    }
    return newState;
};

export default OwnerProfileReducer;