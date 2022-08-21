import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { CheckboxModule } from 'primeng/checkbox'; 
import { ChipModule } from 'primeng/chip'; 
import {DialogModule} from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import {DividerModule} from 'primeng/divider';
import {InputNumberModule} from 'primeng/inputnumber';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountsService } from './services/accounts.service';
import {TableModule} from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { NewAccountComponent } from './components/new-account/new-account.component';
import {DropdownModule} from 'primeng/dropdown';
import { AllAccountsComponent } from './components/all-accounts/all-accounts.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  imports: [
    AccountsRoutingModule,
    ButtonModule,
    CommonModule,
    InputTextModule,
    RippleModule,
    CheckboxModule,
    ChipModule,
    DialogModule,
    FormsModule,
    ToastModule,
    DynamicDialogModule,
    DividerModule,
    InputNumberModule,
    TableModule,
    TagModule,
    DropdownModule,
    ConfirmDialogModule
    
  ],
  declarations: [
    AccountsComponent,
    NewAccountComponent,
    AllAccountsComponent
  ],
  providers:[
    MessageService,
    AccountsService,
    DialogService
  ]
})
export class AccountsModule { }