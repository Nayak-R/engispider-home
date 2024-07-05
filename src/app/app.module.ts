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
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContactsComponent } from './contacts/contacts.component';
import { BookDemoComponent } from './book-demo/book-demo.component';
import { InqueryComponent } from './inquery/inquery.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InquiryService } from './inquiry.service';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { DiologComponent } from './diolog/diolog.component';


@NgModule({

  declarations: [
    AppComponent,
    HomePageComponent,
    ContactsComponent,
    BookDemoComponent,
    InqueryComponent,
    DiologComponent
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
    MatTooltipModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule
  ],

  providers: [InquiryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
