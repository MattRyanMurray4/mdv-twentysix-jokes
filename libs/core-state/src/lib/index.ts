import { ActionReducerMap } from '@ngrx/store';
import {
  jokesReducer,
  JokesState,
  JOKES_FEATURE_KEY,
} from './jokes/jokes.reducer';

export interface AppState {
  [JOKES_FEATURE_KEY]: JokesState;
}

export const reducers: ActionReducerMap<AppState> = {
  [JOKES_FEATURE_KEY]: jokesReducer,
};
