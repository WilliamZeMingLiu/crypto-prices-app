import './App.css';
import { useSelector, useDispatch } from "react-redux";

import { useEffect } from 'react';

import binanceLogo from './assets/logo-binance.png';
import coinbaseLogo from './assets/logo-coinbase.png';
import btc from './assets/btc.png';
import eth from './assets/eth.png';

import TableRow from './containers/TableRow';
import PriceDisplay from './containers/PriceDisplay';
import CoinDisplay from './containers/CoinDisplay';
import { fetchCoinbase, fetchBinance } from './store/actions/priceAction';


const App = () => {
  const coinbase = useSelector((state) => state.coinbase);
  const binance = useSelector((state) => state.binance);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoinbase());
    dispatch(fetchBinance());
    const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
      dispatch(fetchCoinbase());
      dispatch(fetchBinance());
    }, 12000)
  
    return () => clearInterval(intervalId);

  }, [dispatch]);


  return (
    <div className="app">
      <div className="container">
        <div className="grid">

          <TableRow 
            cell1={ <img src={ binanceLogo } className="exchange-img"></img> }
            cell2={ <><p>Prices are updated every 12 seconds </p><p>Highlighted prices indicate best price for user</p></> }
            cell3={ <img src={ coinbaseLogo } className="exchange-img"></img> }
          />

          <TableRow 
            cell1={ <PriceDisplay 
              label1={ "Buy" } 
              value1={ binance.btc.buy }
              label2={ "Sell" } 
              value2={ binance.btc.sell } 
              recommended1={ binance.btc.buy <= coinbase.btc.buy ? true : false }
              recommended2={ binance.btc.sell >= coinbase.btc.sell ? true : false }
            /> }
            cell2={ <CoinDisplay 
              name={ <h3>Bitcoin</h3> } 
              img={ <img src={ btc } className="coin-img"></img> } 
            /> }
            cell3={ <PriceDisplay 
              label1={ "Buy" } 
              value1={ coinbase.btc.buy }
              label2={ "Sell" } 
              value2={ coinbase.btc.sell } 
              recommended1={ coinbase.btc.buy <= binance.btc.buy ? true : false }
              recommended2={ coinbase.btc.sell >= binance.btc.sell ? true : false }
            /> }
          />

          <TableRow 
            cell1={ <PriceDisplay 
              label1={ "Buy" } 
              value1={ binance.eth.buy }
              label2={ "Sell" } 
              value2={ binance.eth.sell } 
              recommended1={ binance.eth.buy <= coinbase.eth.buy ? true : false }
              recommended2={ binance.eth.sell >= coinbase.eth.sell ? true : false }
            /> }
            cell2={ <CoinDisplay 
              name={ <h3>Ethereum</h3> } 
              img={ <img src={ eth } className="coin-img"></img> } 
            /> }
            cell3={ <PriceDisplay 
              label1={ "Buy" } 
              value1={ coinbase.eth.buy }
              label2={ "Sell" } 
              value2={ coinbase.eth.sell } 
              recommended1={ coinbase.eth.buy <= binance.eth.buy ? true : false }
              recommended2={ coinbase.eth.sell >= binance.eth.sell ? true : false }
            /> }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
