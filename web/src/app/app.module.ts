import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WalletComponent } from './wallet/wallet.component';
import { ReactiveFormsModule} from '@angular/forms';
import { WalletsComponent } from './wallets/wallets.component';
import { WalletCreateComponent } from './wallet-create/wallet-create.component';

@NgModule({
  declarations: [
    AppComponent,
    WalletComponent,
    WalletsComponent,
    WalletCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
