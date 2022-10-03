package com.koios.api.models;

public class Wallet {

    public String name;
    public String address;
    public Double balance;

    public Wallet(String name) {
        this.name = name;
        this.address = "";
        this.balance = 0.0;
    }

    public Wallet(String name, String address, Double balance) {
        this.name = name;
        this.address = address;
        this.balance = balance;
    }
}
