import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Card } from './model/card';
import { map } from 'rxjs/operators';

@Injectable()
export class CardService {
  private basePath = 'cards';

  cardsRef: AngularFireList<Card>;
  cardRef: AngularFireObject<Card>;

  constructor(private db: AngularFireDatabase) {
    this.cardsRef = db.list('cards');
  }

  getCardList(): Observable<Card[]> {
    return this.cardsRef.snapshotChanges().pipe(
      map(arr => {
        return arr.map(snap =>
          Object.assign(snap.payload.val(), { $key: snap.key })
        );
      })
    );
  }

  getCard(key: string): Observable<Card | null> {
    const cardPath = `${this.basePath}/${key}`;
    const card = this.db.object(cardPath).valueChanges() as Observable<Card | null>;
    return card;
  }

  createCard(card: Card): Card {
    const result = this.cardsRef.push(card);
    card.$key = result.key;
    return card;
  }

  updateCard(key: string, value: any): void {
    this.cardsRef.update(key, value);
  }

  deleteCard(key: string) {
    this.cardsRef.remove(key);
  }

  deleteAll(): void {
    this.cardsRef.remove();
  }

  private handleError(error: Error) {
    console.error(error);
  }
}
