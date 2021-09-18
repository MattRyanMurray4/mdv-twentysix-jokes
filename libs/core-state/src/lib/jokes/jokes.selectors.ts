import { createFeatureSelector, createSelector } from '@ngrx/store';
import { emptyJoke, Joke } from '@yo-mom/api-interfaces';

import { JOKES_FEATURE_KEY, JokesState, jokesAdapter } from './jokes.reducer';

// Lookup the 'Jokes' feature state managed by NgRx
export const getJokesState =
  createFeatureSelector<JokesState>(JOKES_FEATURE_KEY);

const { selectAll, selectEntities } = jokesAdapter.getSelectors();

export const getJokesLoaded = createSelector(
  getJokesState,
  (state: JokesState) => state.loaded
);

export const getJokesError = createSelector(
  getJokesState,
  (state: JokesState) => state.error
);

export const getAllJokes = createSelector(getJokesState, (state: JokesState) =>
  selectAll(state)
);

export const getJokesEntities = createSelector(
  getJokesState,
  (state: JokesState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getJokesState,
  (state: JokesState) => state.selectedId
);

export const getSelected = createSelector(
  getJokesEntities,
  getSelectedId,
  (entities, selectedId) =>
    (selectedId ? entities[selectedId] : emptyJoke) as Joke
);
