import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { environment } from 'src/environments/environment';

export interface State {
}

export const reducers: ActionReducerMap<State> = {};

export function logger(reducer: ActionReducer<State>): any {
  return storeLogger()(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production
? [logger]
: [];
