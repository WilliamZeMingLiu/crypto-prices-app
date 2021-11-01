import axios from "axios";

const baseUrl = window.location.origin;
console.log(baseUrl);

const getCoinbase = async (endpoint) => {
    const data = {
        "buy": "",
        "sell": ""
    }
    await axios.get(baseUrl + '/coinbase' + endpoint, {headers: {'Access-Control-Allow-Origin': true,}})
        .then(function (response) {
            data['buy'] = response.data['buy'];
            data['sell'] = response.data['sell'];
        })
        .catch(function (error) {
            console.log(error);
        });
    
    return data;
}

const getBinance = async (endpoint) => {
    const data = {
        "buy": "",
        "sell": ""
    }
    await axios.get(baseUrl + '/binance' + endpoint, {headers: {'Access-Control-Allow-Origin': true,}})
        .then(function (response) {
            data['buy'] = response.data['buy'];
            data['sell'] = response.data['sell'];
        })
        .catch(function (error) {
            console.log(error);
        });
        
    return data;
}

const priceApi = {
    getCoinbase,
    getBinance
}

export default priceApi;