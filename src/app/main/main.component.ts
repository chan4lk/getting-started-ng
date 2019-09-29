import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../model/card';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as cards from '../actions/cards';

@Component({
  selector: 'app-main',
  template: `
    <div class="container-fluid text-center pb-5">
      <div class="row justify-content-end">
        <app-new-card-input (cardAdd)="addCard($event)"></app-new-card-input>
      </div>
    </div>
    <app-card-list [cards]="cards$ | async"></app-card-list>
  `,
  styles: []
})
export class MainComponent implements OnInit {
  public cards$: Observable<Card[]>;
  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.store.dispatch(new cards.Load());
    this.cards$ = this.store.select(fromRoot.getCards);
  }

  addCard(card: Card) {
    this.store.dispatch(new cards.Add(card));
  }

}
