import { Component, OnInit } from '@angular/core';

import { WalletComponent } from '../wallet/wallet.component'
import { WalletService} from '../services/wallet.service'
import { Wallet } from '../interfaces/wallet';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css']
})
export class WalletsComponent implements OnInit {

  selectedWallet?: Wallet;

  wallets: Wallet[] = [];

  constructor(
    private walletService: WalletService, 
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getWallets();
  }

  onSelect(wallet: Wallet): void {
    this.selectedWallet = wallet;
    this.messageService.add(`Selected ${wallet.address}`)
  }

  sendTransaction() {
    let walletTransfer: Wallet[] = [];
    if(this.selectedWallet != undefined) {
      walletTransfer.push(this.selectedWallet);
      this.wallets.forEach(wallet => {
      if(wallet.address != this.selectedWallet?.address) {
        walletTransfer.push(wallet);
      }
    });

    this.walletService.sendTransaction(walletTransfer, "1000").subscribe(() => this.getWallets());
    }
    
  }

  getWallets() {
    this.walletService.getWallets()
      .subscribe(wallets => this.wallets = wallets);
  }

}
