import priceApi from "../../apis/priceApi";

export const fetchCoinbase = () => {
    const data = {
        "btc": {
            "buy": "",
            "sell": ""
        },
        "eth": {
            "buy": "",
            "sell": ""
        }
    }

    return async (dispatch) => {
        await priceApi.getCoinbase('/BTC/USD')
            .then((response) => {
                data['btc']['buy'] = response['buy'];
                data['btc']['sell'] = response['sell'];
            });
        await priceApi.getCoinbase('/ETH/USD')
            .then((response) => {
                data['eth']['buy'] = response['buy'];
                data['eth']['sell'] = response['sell'];
            });
        dispatch({
            type: "fetchCoinbase",
            payload: data
        });
    }
}

export const fetchBinance = () => {
    const data = {
        "btc": {
            "buy": null,
            "sell": null
        },
        "eth": {
            "buy": null,
            "sell": null
        }
    }

    return async (dispatch) => {
        await priceApi.getBinance('/BTC/USD')
            .then((response) => {
                data['btc']['buy'] = response['buy'];
                data['btc']['sell'] = response['sell'];
            });
        await priceApi.getBinance('/ETH/USD')
            .then((response) => {
                data['eth']['buy'] = response['buy'];
                data['eth']['sell'] = response['sell'];
            });
        dispatch({
            type: "fetchBinance",
            payload: data
        });
    }
}