package com.koios.api;

import com.koios.api.models.Wallet;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.stellar.sdk.AccountRequiresMemoException;

import javax.servlet.http.HttpServletResponse;


import java.io.IOException;
import java.util.List;


@RestController
public class WalletApi {
    WalletManager walletManager;

    public WalletApi() throws IOException {
        this.walletManager = new WalletManager();
    }

    // Immediately redirect to swagger UI. Generates swagger but ignoring for starters.
    // Find a better way to redirect, possibly define a config
    @GetMapping("/")
    void home(HttpServletResponse response) throws IOException {
        response.sendRedirect("/swagger-ui/");
    }

    @PostMapping("/wallet/add/{key}")
    @CrossOrigin(origins = "http://localhost:4200")
    @ResponseStatus(code = HttpStatus.OK, reason = "Wallet added successfully!")
    String addWallet(@PathVariable String key) {
        try {
            return walletManager.addWallet(key);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error! No logging yet :(\n");
        }
    }

    /**
     * Wallet manager's updateBalances() will throw an error in case a wallet is unfunded.
     * Need to find a better way of handling this error
     * @return - a list of wallets in any case, whether an error was thrown or not.
     * However, it does return the default balance - 0, which is ok.
     */
    @GetMapping("/wallets")
    @CrossOrigin(origins = "http://localhost:4200")
    List<Wallet> wallets() {
        try {
            walletManager.updateBalances();
            return walletManager.getWallets();
        } catch (RuntimeException | IOException e) {
            return walletManager.getWallets();
        }
    }


    @PostMapping("/fund-account/{id}")
    String fundAccount(@PathVariable String id) throws IOException {
        return walletManager.fundAccount(id);
    }

    @PutMapping("/transaction/{amount}")
    @CrossOrigin(origins = "http://localhost:4200")
    void sendFromTo(@RequestBody List<Wallet> walletsBody, @PathVariable String amount)
            throws AccountRequiresMemoException, IOException {
        this.walletManager.sendFromTo(
                walletsBody.get(0).address,
                walletsBody.get(1).address,
                amount);
    }
}
