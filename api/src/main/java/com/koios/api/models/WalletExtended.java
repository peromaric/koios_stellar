package com.koios.api.models;


import org.stellar.sdk.KeyPair;

public class WalletExtended extends Wallet{
    private KeyPair keyPair;

    public WalletExtended(String name) {
        super(name);
    }

    public KeyPair getKeyPair() {
        return keyPair;
    }

    public void setKeyPair(String key) {
        this.keyPair = KeyPair.fromSecretSeed(key);
        super.address = keyPair.getAccountId();
    }

    public Wallet getWallet() {
        return new Wallet(this.name, this.address, this.balance);
    }
}
