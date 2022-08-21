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
import {TableModule} from 'primeng/table';
import { TagModule } from 'primeng/tag';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { BanksRoutingModule } from './banks-routing.module';
import { BanksComponent } from './components/banks/banks.component';
import { NewBankComponent } from './components/new-bank/new-bank.component';
import { BankService } from './services/bank.service';

@NgModule({
  imports: [
    BanksRoutingModule,
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
    InputSwitchModule,
    ConfirmDialogModule
    
  ],
  declarations: [
    BanksComponent,
    NewBankComponent
  ],
  providers:[
    MessageService,
    ConfirmationService,
    BankService,
    DialogService
  ]
})
export class BanksModule { }