import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ImageCropperModule } from 'ngx-image-cropper';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';

import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { ApplicationComponent } from './application/application.component';
import { HttpClientModule } from '@angular/common/http';
  

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    TermsAndConditionsComponent,
    ApplicationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ImageCropperModule,
    FormsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    NgxCaptchaModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
