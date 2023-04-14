import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListArticleComponent {
   toggle(): void {
    const popup = document.getElementById('popup') as HTMLElement;
    popup.classList.toggle('active');
  }
}
