# crypto-prices-app
Simple app that displays ETH/BTC prices from Coinbase/Binance API.

## Dependencies
These are the dependencies needed for React.
### `npm install react react-redux redux-thunk axios react-bootstrap bootstrap@5.1.3`

## How to run app
The Spring Boot app was built with Maven.  To run the application, run this command in the app directory.
### `./mvnw spring-boot:run`

The pom.xml will automatically install all the React dependencies.  

If running locally, the app URL is [http://localhost:8080/index.html](http://localhost:8080/index.html) and is run on port 8080.


## Notes on development
1. One sub-optimal choice I made when developing this app is how I am storing API Urls for both React and Spring Boot.  Instead of storing the base URLs in a seperate file such as an env file in React, I explicitly define the URLs in the file in which I am using it and explicitly named my base URL as "localhost:8080".  This choice would be sub-optimal because if we were to change our port number or call the base URL from another file, we would not have access to it and would have to go into the original file that defined it.
2. One over-design choice I made was implementing React with Redux.  This is an over-design because this app's state is quite small, this app could have been easily done without using Redux.  But the reason why I chose to use Redux was to showcase my knowledge of a popular React dependency, and to also make this app scalable if need be.
3. If this app had 100 users/second, one change I would make is to host the React app and Spring Boot backend on two seperate servers.  Right now, Spring Boot is packaged with React and both are running on the same server.  This could be problematic if our server handles loads of requests, it may use up all of the server resources.  However, it seems more optimal to have both running on seperate servers to prevent this issue.
4. If I could add another enhancement to this app, one feature I would include would be wallet connection functionality.  I believe both exchanges I selected, Coinbase and Binance, offer user sign-in functionality for third party apps.  This feature would be extremely useful for users, as they can just sign into their wallets and either see their wallet balances or execute trades.
