import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactsComponent } from './contacts/contacts.component';
import { InqueryComponent } from './inquery/inquery.component';
import { BookDemoComponent } from './book-demo/book-demo.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'contacts',
    component: ContactsComponent,
  },
  {
    path: 'inquery',
    component: InqueryComponent
  },
  {
    path: 'book-demo',
    component: BookDemoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
