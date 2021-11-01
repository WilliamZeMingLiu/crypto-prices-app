package com.example.chainalysis.CryptoPrices;

public class Price {

    private final String name;
    private final String symbol;
    private final String currency;
    private final String currencySymbol;
    private final double buy;
    private final double sell;
    private final String api;

    public Price(String name, String symbol, String currency, String currencySymbol, double buy, double sell, String api) {
        this.name = name;
        this.symbol = symbol;
        this.currency = currency;
        this.currencySymbol = currencySymbol;
        this.buy = buy;
        this.sell = sell;
        this.api = api;
    }

    public String getName() {
        return this.name;
    }

    public String getSymbol() {
        return this.symbol;
    }

    public String getCurrency() {
        return this.currency;
    }

    public String getCurrencySymbol() {
        return this.currencySymbol;
    }

    public double getBuy() {
        return this.buy;
    }

    public double getSell() {
        return this.sell;
    }

    public String getApi() {
        return this.api;
    }
    
}
