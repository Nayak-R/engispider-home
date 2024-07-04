import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {

  iconClass1: string = 'bx bxs-copy-alt';
  iconClass2: string = 'bx bxs-copy-alt';
  iconClass3: string = 'bx bxs-copy-alt';
  iconClass4: string = 'bx bxs-copy-alt';
  iconClass5: string = 'bx bxs-copy-alt';
  iconClass6: string = 'bx bxs-copy-alt';

  copyText(text: string, number: string) {
    const input = document.createElement('input');
    input.style.position = 'absolute';
    input.style.left = '-9999px';
    input.value = text;
    document.body.appendChild(input);

    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);

    if (number === 'cl-1') {
      this.iconClass1 = 'bx bx-check-circle bx-tada bx-rotate-180 text-success';

      setTimeout(() => {
        this.iconClass1 = 'bx bxs-copy-alt';
      }, 2000);
    }

    if (number === 'cl-2') {
      this.iconClass2 = 'bx bx-check-circle bx-tada bx-rotate-180 text-success';

      setTimeout(() => {
        this.iconClass2 = 'bx bxs-copy-alt';
      }, 2000);
    }


    if (number === 'cl-3') {
      this.iconClass3 = 'bx bx-check-circle bx-tada bx-rotate-180 text-success';

      setTimeout(() => {
        this.iconClass3 = 'bx bxs-copy-alt';
      }, 2000);
    }


    if (number === 'cl-4') {
      this.iconClass4 = 'bx bx-check-circle bx-tada bx-rotate-180 text-success';

      setTimeout(() => {
        this.iconClass4 = 'bx bxs-copy-alt';
      }, 2000);
    }

    if (number === 'cl-5') {
      this.iconClass5 = 'bx bx-check-circle bx-tada bx-rotate-180 text-success';

      setTimeout(() => {
        this.iconClass5 = 'bx bxs-copy-alt';
      }, 2000);
    }

    if (number === 'cl-6') {
      this.iconClass6 = 'bx bx-check-circle bx-tada bx-rotate-180 text-success';

      setTimeout(() => {
        this.iconClass6 = 'bx bxs-copy-alt';
      }, 2000);
    }

  }

}
