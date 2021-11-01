import { combineReducers } from "redux";
import coinbaseReducer from "./coinbaseReducer";
import binanceReducer from "./binanceReducer";


const reducers = combineReducers({
    coinbase: coinbaseReducer,
    binance: binanceReducer
});

export default reducers;