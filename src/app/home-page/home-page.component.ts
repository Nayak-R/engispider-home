import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {


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

  currentIndex = 0;

  onTranslated(event: any) {
    this.currentIndex = event.startPosition;
  }

  isZooming(index: number) {
    return this.currentIndex === index;
  }

}
