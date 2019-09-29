import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CardService } from '../card.service';
import * as Cards from '../actions/cards';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardEffects {
  @Effect()
  loadCards$ = this.actions$.pipe(
    ofType(Cards.LOAD),
    mergeMap(action => {
      return this.cardService.getCardList().pipe(
        map(res => new Cards.LoadSuccess(res)),
        catchError(error => of(new Cards.ServerFailure(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  serverFailure$ = this.actions$.pipe(
    ofType(Cards.SERVER_FAILURE),
    map((action: Cards.ServerFailure) => action.payload),
    exhaustMap(errors => {
      console.log('Server error happened:', errors);
      return of(null);
    })
  );

  @Effect()
  addCards$ = this.actions$.pipe(
    ofType(Cards.ADD),
    map((action: Cards.Add) => action.payload),
    exhaustMap(payload => {
      const card = this.cardService.createCard(payload);
      return of(null);
    })
  );

  constructor(private actions$: Actions, private cardService: CardService) {}
}
