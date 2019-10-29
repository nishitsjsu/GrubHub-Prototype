const SectionDetailsReducer = (state = {}, action) => {
    let newState = { ...state };
    if (action.type === "succes_section_details_fetch") {
        let temp = JSON.stringify(action);
        temp = JSON.parse(temp);
        console.log("in reducer", action.payload.status);

        newState.authFlag = true;
        newState.items = temp.payload.data;
        console.log("SectionDetailsReducer in success", newState);

    } else {
        newState.authFlag = false;
    }
    return newState;
};

export default SectionDetailsReducer;
