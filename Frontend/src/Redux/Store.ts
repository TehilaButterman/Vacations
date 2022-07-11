import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { modalReducer } from "./ModalState";
import { vacationReducer } from "./VacationState";

const reducers = combineReducers({
    vacationsState: vacationReducer,
    authState: authReducer,
    modalState: modalReducer
})
const store = createStore(reducers)
export default store;