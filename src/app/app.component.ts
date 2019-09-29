import { Component } from '@angular/core';
import { CardService } from './card.service';
import { Observable } from 'rxjs';
import { Card } from './model/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public cards$: Observable<Card[]>;

  title = 'getting-started-ng5';

  constructor(private cardService: CardService) {
    this.cards$ = this.cardService.getCardList();
  }

  addCard(cardText: string) {
    this.cardService.createCard(new Card(cardText));
  }
}
