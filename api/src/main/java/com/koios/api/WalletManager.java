package com.koios.api;

import com.koios.api.models.Wallet;
import com.koios.api.models.WalletExtended;
import org.stellar.sdk.*;
import org.stellar.sdk.responses.AccountResponse;
import org.stellar.sdk.responses.SubmitTransactionResponse;

import java.net.*;
import java.io.*;
import java.util.*;


public class WalletManager {

    private final Server stellarServer;
    List<WalletExtended> wallets;

    public WalletManager() throws IOException {
        stellarServer = new Server("https://horizon-testnet.stellar.org");
        wallets = new ArrayList<>();
    }

    /**
     * this method is basically just used so that keypair
     * doesn't get forwarded to the restapi handling get method
     * @return just the object model we'd like to display on the frontend
     */
    public List<Wallet> getWallets() {
        return wallets.stream().map(WalletExtended::getWallet).toList();
    }

    public String addWallet(String key) throws RuntimeException {
        String walletName = String.format("Wallet %d", wallets.size() + 1);
        WalletExtended wallet = new WalletExtended(walletName);

        wallet.setKeyPair(key);
        wallets.add(wallet);
        return wallet.address;
    }
    public String fundAccount(String id) throws IOException {
        String friendbotUrl = String.format(
                "https://friendbot.stellar.org/?addr=%s",
                id);
        InputStream response = new URL(friendbotUrl).openStream();
        String body = new Scanner(response, "UTF-8").useDelimiter("\\A").next();
        this.updateBalances();
        return ("SUCCESS! You have a new account :)\n" + body);
    }


    public void updateBalances() throws IOException {
        for (WalletExtended wallet : wallets) {
            wallet.balance = this.getBalance(wallet.address);
        }
    }

    private Double getBalance(String id) throws IOException {
        try {
            AccountResponse account = this.stellarServer.accounts().account(id);
            return Double.parseDouble(account.getBalances()[0].getBalance());
        } catch (Exception e) {
            // in case AccountResponse returns an exception (account isn't created)
            // just log this error in the console and throw IOexception
            throw new IOException("Account isn't created or wallet isn't found");
        }
    }

    public void sendFromTo(String pubKey1, String pubKey2, String amount)
            throws RuntimeException, IOException, AccountRequiresMemoException {
        // check whether these wallets exist and return corresponding WalletExtended objects
        // for details see https://developers.stellar.org/docs/tutorials/send-and-receive-payments
        WalletExtended source = wallets.stream()
                .filter(walletExtended -> walletExtended.address.equals(pubKey1))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Sender wallet doesn't exist"));

        WalletExtended destination = wallets.stream()
                .filter(walletExtended -> walletExtended.address.equals(pubKey2))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Receiver wallet doesn't exist"));


        this.stellarServer.accounts().account(destination.address);

        // If there was no error, load up-to-date information on your account.
        AccountResponse sourceAccount = stellarServer.accounts().account(source.address);
        // Start building the transaction.
        Transaction transaction = new Transaction.Builder(sourceAccount, Network.TESTNET)
                .addOperation(new PaymentOperation.Builder(
                        destination.address,
                        new AssetTypeNative(),
                        amount).build())
                // A memo allows you to add your own metadata to a transaction. It's
                // optional and does not affect how Stellar treats the transaction.
                .addMemo(Memo.text("Test Transaction"))
                // Wait a maximum of three minutes for the transaction
                .setTimeout(180)
                // Set the amount of lumens you're willing to pay per operation to submit your transaction
                .setBaseFee(Transaction.MIN_BASE_FEE)
                .build();
        // Sign the transaction to prove you are actually the person sending it.
        transaction.sign(source.getKeyPair());

        // And finally, send it off to Stellar!
        SubmitTransactionResponse response = stellarServer.submitTransaction(transaction);
        System.out.println("Success!");
        System.out.println(response);

    }

}
