package com.example.chainalysis.CryptoPrices;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.*;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PriceController {

    private final String binanceUrl = "https://api.binance.com";
    private final String coinbaseUrl = "https://api.coinbase.com";
    private final HashMap<String, String> coins = new HashMap<String, String>() {{
        put("BTC", "Bitcoin");
        put("ETH", "Ethereum");
    }};
    private final HashMap<String, String> currencies = new HashMap<String, String>() {{
        put("USD", "$");
    }};
    
    // API 1: Binance
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/binance/{symbol}/{currency}")
    public Price binance(@PathVariable String symbol, @PathVariable String currency) throws IOException, InterruptedException{
        // Check for wrong/empty cases
        if(symbol.isEmpty() || !this.coins.containsKey(symbol) || !this.currencies.containsKey(currency)) return null;

        // Binance only shows trading rate for USD in USDC or USDT
        HashMap<String, String> currencyToSymbol = new HashMap<String, String>() {{
            put("USD", "USDC");
        }};

        // Url request endpoints
        String exchange = new StringBuilder(symbol).append(currencyToSymbol.getOrDefault(currency, currency)).toString();
        String endpoint = new StringBuilder(this.binanceUrl).append("/api/v3/ticker/bookTicker?symbol=").append(exchange).toString();
        
        // Get buy and sell price
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(endpoint))
            .header("Accept", "application/json")
            .method("GET", HttpRequest.BodyPublishers.noBody())
            .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        JSONObject responseJSON = new JSONObject(response.body());

        double buy = Double.valueOf(responseJSON.getString("bidPrice"));
        double sell = Double.valueOf(responseJSON.getString("askPrice"));

        return new Price(this.coins.get(symbol), symbol, currency, this.currencies.get(currency), buy, sell, "binance");
    }

    // API 2: Coinbase
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/coinbase/{symbol}/{currency}")
    public Price coinbase(@PathVariable String symbol, @PathVariable String currency) throws IOException, InterruptedException{
        // Check for wrong/empty cases
        if(symbol.isEmpty() || !this.coins.containsKey(symbol) || !this.currencies.containsKey(currency)) return null;

        // Url request endpoints
        String exchange = new StringBuilder(symbol).append("-").append(currency).toString();
        String endpoint = new StringBuilder(this.coinbaseUrl).append("/v2/prices/" ).append(exchange).toString();
        String buyEndpoint = new StringBuilder(endpoint).append("/buy").toString();
        String sellEndpoint = new StringBuilder(endpoint).append("/sell").toString();
        
        // Get buy price
        HttpRequest buyRequest = HttpRequest.newBuilder()
            .uri(URI.create(buyEndpoint))
            .header("Accept", "application/json")
            .method("GET", HttpRequest.BodyPublishers.noBody())
            .build();
        HttpResponse<String> buyResponse = HttpClient.newHttpClient().send(buyRequest, HttpResponse.BodyHandlers.ofString());
        double buy = Double.valueOf(new JSONObject(buyResponse.body()).getJSONObject("data").getString("amount"));

        // Get sell price
        HttpRequest sellRequest = HttpRequest.newBuilder()
            .uri(URI.create(sellEndpoint))
            .header("Accept", "application/json")
            .method("GET", HttpRequest.BodyPublishers.noBody())
            .build();
        HttpResponse<String> sellResponse = HttpClient.newHttpClient().send(sellRequest, HttpResponse.BodyHandlers.ofString());
        double sell = Double.valueOf(new JSONObject(sellResponse.body()).getJSONObject("data").getString("amount"));

        return new Price(this.coins.get(symbol), symbol, currency, this.currencies.get(currency), buy, sell, "coinbase");
    }
    
}
