import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PublicationsComponent {
   toggle(): void {
    const popup = document.getElementById('popup') as HTMLElement;
    popup.classList.toggle('active');
  }
}
