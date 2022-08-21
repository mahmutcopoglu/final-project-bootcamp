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
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeService } from './services/home.service';
import {DividerModule} from 'primeng/divider';

@NgModule({
  imports: [
    HomeRoutingModule,
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
    DividerModule
  ],
  declarations: [
    HomeComponent
  ],
  providers:[
    MessageService,
    HomeService,
    DialogService
  ]
})
export class HomeModule { }