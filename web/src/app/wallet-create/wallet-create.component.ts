import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { WalletService} from '../services/wallet.service'



@Component({
  selector: 'app-wallet-create',
  templateUrl: './wallet-create.component.html',
  styleUrls: ['./wallet-create.component.css']
})
export class WalletCreateComponent implements OnInit {
  walletSecretKey = new FormControl('');

  constructor(
    private walletService: WalletService
  ) { }
  
  ngOnInit(): void {
  }

  onSubmit(): void {
    this.walletService.registerWallet(this.walletSecretKey.value)
      .subscribe(() => this.walletService.getWallets());
  }
}
