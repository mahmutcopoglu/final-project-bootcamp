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
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { AccountDetailRoutingModule } from './account-detail-routing.module';
import { AccountDetailService } from './services/account-detail.service';
import {InputNumberModule} from 'primeng/inputnumber';

@NgModule({
  imports: [
    AccountDetailRoutingModule,
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
    InputNumberModule
    
  ],
  declarations: [
    AccountDetailComponent
  ],
  providers:[
    MessageService,
    AccountDetailService,
    DialogService
  ]
})
export class AccountDetailModule { }