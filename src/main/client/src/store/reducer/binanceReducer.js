const reducer = ( state = { 
    "btc": { 
        "buy": "", 
        "sell": "" 
    }, 
    "eth": { 
        "buy": "", 
        "sell": "" 
    }}, action ) => {
    switch(action.type) {
        case "fetchBinance":
            return action.payload;
        default:
            return state;
    }
};

export default reducer;