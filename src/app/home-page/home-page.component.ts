import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor(private router: Router) { }

  // Card scroll animation start
  customOptionsDisplayImage: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 4000, // Set the time between slides in milliseconds
    autoplayHoverPause: true, // Pause autoplay when hovering over the carousel
    items: 1,
    navSpeed: 900,
    navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      710: {
        items: 1
      },
      940: {
        items: 1
      },
      1400: {
        items: 1
      }
    },
    nav: false,
    animateOut: 'fadeOut'
  }

  customOptionsTestimonial: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000, // Set the time between slides in milliseconds
    autoplayHoverPause: true, // Pause autoplay when hovering over the carousel
    items: 1,
    center: true,
    navSpeed: 700,
    navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  currentIndex = 0;

  onTranslated(event: any) {
    this.currentIndex = event.startPosition;
  }

  isZooming(index: number) {
    return this.currentIndex === index;
  }

  scrollToSection(data:string) {
    if(data==='services') {
      document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
    }

    if(data==='contact') {
      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  isVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isVisible = window.scrollY > 500;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  routeToContacts() {
    this.router.navigate(['/contacts']);
  }


  
}
