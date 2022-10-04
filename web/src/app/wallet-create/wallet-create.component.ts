import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

import { WalletService} from '../services/wallet.service'

@Component({
  selector: 'app-wallet-create',
  templateUrl: './wallet-create.component.html',
  styleUrls: ['./wallet-create.component.css']
})
export class WalletCreateComponent implements OnInit {

  walletSecretKey = new FormControl('');
  @Output() registerWalletEvent = new EventEmitter<string | null>();

  constructor(
    private walletService: WalletService
  ) { }
  
  ngOnInit(): void {
  }

  registerWallet(): void {
    if(this.walletSecretKey) {
      this.registerWalletEvent.emit(this.walletSecretKey.value);
    }
    
  }
}
