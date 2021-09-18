import { Action } from '@ngrx/store';

import * as JokesActions from './jokes.actions';
import { JokesEntity } from './jokes.models';
import { State, initialState, reducer } from './jokes.reducer';

describe('Jokes Reducer', () => {
  const createJokesEntity = (id: string, name = ''): JokesEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Jokes actions', () => {
    it('loadJokesSuccess should return the list of known Jokes', () => {
      const jokes = [
        createJokesEntity('PRODUCT-AAA'),
        createJokesEntity('PRODUCT-zzz'),
      ];
      const action = JokesActions.loadJokesSuccess({ jokes });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
