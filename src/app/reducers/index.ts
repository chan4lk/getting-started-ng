import * as fromCards from './cards';
import { ActionReducerMap, ActionReducer, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { environment } from 'src/environments/environment.prod';

export interface State {
  cards: fromCards.State;
}

export const reducers: ActionReducerMap<State> = {
  cards: fromCards.reducer
};

export function logger(reducer: ActionReducer<State>): any {
  return storeLogger()(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production
? [logger]
: [];

export const getCardsState = createFeatureSelector<fromCards.State>('cards');
export const getCards = createSelector(
  getCardsState,
  state => state.cards
);


