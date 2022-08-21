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
import {DialogService} from 'primeng/dynamicdialog';
import { NavbarComponent } from './navbar/navbar.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { BadgeModule } from 'primeng/badge';
import { TabViewModule } from 'primeng/tabview';

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
    BadgeModule,
    StyleClassModule,
    TabViewModule,
    
  ],
  declarations: [
    
  ],
  providers:[
    MessageService,
    DialogService
  ],
})
export class SharedModule { }