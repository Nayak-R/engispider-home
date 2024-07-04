import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'engispider-home';

  constructor(private router: Router) {}

  isHomePageRoute(): boolean {
    return this.router.url === '/' //|| this.router.url === '/login'; 
  }

  isContactPageRoute(): boolean {
    return this.router.url === '/contacts' //|| this.router.url === '/login'; 
  }

  routeToContacts() {
    this.router.navigate(['/contacts']);
  }

  routeToHome(): Promise<boolean>  {
    return this.router.navigate(['/']);
  }

  scrollToSection(data:string) {
    if (!this.isHomePageRoute()) {
      this.routeToHome().then(() => {
        setTimeout(() => {
          this.scrollToSectionHelper(data);
        }, 100);
      });
    } else {
      this.scrollToSectionHelper(data);
    }
  }
  
  scrollToSectionHelper(data: string) {
    if(data==='services') {
      document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
    }

    if(data==='contact') {
      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  routeToDemo() {
    this.router.navigate(['/book-demo']);
  }

  routeToInquery() {
    this.router.navigate(['/inquery']);
  }

  isDemoPageRoute(): boolean {
    return this.router.url === '/book-demo' //|| this.router.url === '/login'; 
  }

  isInqueryPageRoute(): boolean {
    return this.router.url === '/inquery' //|| this.router.url === '/login'; 
  }

}
