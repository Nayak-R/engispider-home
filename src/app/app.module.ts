import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page/home-page.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({

  declarations: [
    AppComponent,
    HomePageComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
