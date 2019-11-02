import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import BuyerSignupReducer from "./BuyerSignupReducer";
import OwnerSignupReducer from "./OwnerSignupReducer"
import BuyerProfileReducer from "./BuyerProfileReducer";
import BuyerProfileUpdateReducer from "./BuyerProfileUpdateReducer";
// import BuyerProfileUploadReducer from "./buyerProfileUploadReducer";
import OwnerProfileReducer from "./OwnerProfileReducer";
import OwnerProfileUpdateReducer from "./OwnerProfileUpdateReducer";
import OwnerHomeReducer from "./OwnerHomeReducer";
import OrderDetailsReducer from "./OrderDetailsReducer";
import ChangeStatusReducer from "./ChangeStatusReducer";
import OwnerSectionReducer from "./OwnerSectionReducer";
import SectionDetailsReducer from "./SectionDetailsReducer";
import DeleteSectionReducer from "./DeleteSectionReducer";
import AddItemReducer from "./AddItemReducer";
import OwnerMessageReducer from "./OwnerMessageReducer";
import BuyerMessageViewReducer from "./BuyerMessageViewReducer";
import BuyerMessageReducer from "./BuyerMessageReducer";
import OwnerMessageViewReducer from "./OwnerMessageViewReducer";
import OwnerOldOrdersReducer from "./OwnerOldOrdersReducer";

const rootReducer = combineReducers({
    LoginReducer: LoginReducer,
    BuyerSignupReducer: BuyerSignupReducer,
    OwnerSignupReducer: OwnerSignupReducer,
    BuyerProfileReducer: BuyerProfileReducer,
    BuyerProfileUpdateReducer: BuyerProfileUpdateReducer,
    // BuyerProfileUploadReducer: BuyerProfileUploadReducer,
    OwnerProfileReducer: OwnerProfileReducer,
    OwnerProfileUpdateReducer: OwnerProfileUpdateReducer,
    OwnerHomeReducer: OwnerHomeReducer,
    OrderDetailsReducer: OrderDetailsReducer,
    ChangeStatusReducer: ChangeStatusReducer,
    OwnerSectionReducer: OwnerSectionReducer,
    SectionDetailsReducer: SectionDetailsReducer,
    DeleteSectionReducer: DeleteSectionReducer,
    AddItemReducer: AddItemReducer,
    OwnerMessageReducer: OwnerMessageReducer,
    BuyerMessageViewReducer: BuyerMessageViewReducer,
    BuyerMessageReducer: BuyerMessageReducer,
    OwnerMessageViewReducer: OwnerMessageViewReducer,
    OwnerOldOrdersReducer: OwnerOldOrdersReducer,
})

export default rootReducer