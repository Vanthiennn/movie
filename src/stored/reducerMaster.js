import { combineReducers } from "redux";
import mainReducer from "../movie/main/model/mainReducer";
import BaseReducer from "../movie/base/modal/BaseReducer";
import AccountReducer from "../movie/account/modal/AccountReducer"
const rootReducer = combineReducers({
    mainReducer,
    BaseReducer,
    AccountReducer
    
});

export default rootReducer