import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import BuyerSignupReducer from "./BuyerSignupReducer";
import OwnerSignupReducer from "./OwnerSignupReducer"
import BuyerProfileReducer from "./BuyerProfileReducer";
import BuyerProfileUpdateReducer from "./BuyerProfileUpdateReducer";
// import BuyerProfileUploadReducer from "./buyerProfileUploadReducer";
import OwnerProfileReducer from "./OwnerProfileReducer";
import OwnerProfileUpdateReducer from "./OwnerProfileUpdateReducer";

const rootReducer = combineReducers({
    LoginReducer: LoginReducer,
    BuyerSignupReducer: BuyerSignupReducer,
    OwnerSignupReducer: OwnerSignupReducer,
    BuyerProfileReducer: BuyerProfileReducer,
    BuyerProfileUpdateReducer: BuyerProfileUpdateReducer,
    // BuyerProfileUploadReducer: BuyerProfileUploadReducer,
    OwnerProfileReducer: OwnerProfileReducer,
    OwnerProfileUpdateReducer: OwnerProfileUpdateReducer
})

export default rootReducer