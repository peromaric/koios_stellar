import { Component, OnInit, ╔ÁisPromise } from '@angular/core';

import { WalletService} from '../services/wallet.service'
import { Wallet } from '../interfaces/wallet';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css']
})
export class WalletsComponent implements OnInit {

  selectedWallet?: Wallet;

  wallets: Wallet[] = [];
  amount: FormControl = new FormControl(0);

  constructor(
    private walletService: WalletService
    ) { }

  ngOnInit(): void {
    this.getWallets();
  }

  onSelect(wallet: Wallet): void {
    this.selectedWallet = wallet;
  }

  sendTransaction(): void {
    if (this.amount.value > 0) {
      let walletTransfer: Wallet[] = [];
      if(this.selectedWallet != undefined) {
        walletTransfer.push(this.selectedWallet);
        this.wallets.forEach(wallet => {
          if(wallet.address != this.selectedWallet?.address) {
            walletTransfer.push(wallet);
          }
        })
        this.walletService.sendTransaction(walletTransfer, "1000").subscribe(() => this.getWallets());
    }
    }
    
  }

  getWallets(): void {
    this.walletService.getWallets().subscribe(wallets => this.wallets = wallets);
  }

  registerWallet(walletSecretKey: string | null): void {
      this.walletService.registerWallet(walletSecretKey)
        .subscribe(() => this.getWallets());
  }
}
