import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { CheckboxModule } from 'primeng/checkbox'; 
import { ChipModule } from 'primeng/chip'; 
import { LoginComponent } from './components/login/login.component';
import {DialogModule} from 'primeng/dialog';
import { RegisterComponent } from '../register/components/register/register.component';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RegisterService } from '../register/services/register.service';
import {ToastModule} from 'primeng/toast';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    CheckboxModule,
    ChipModule,
    DialogModule,
    FormsModule,
    ToastModule,
    DynamicDialogModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers:[
    MessageService,
    RegisterService,
    DialogService
  ]
})
export class LoginModule { }