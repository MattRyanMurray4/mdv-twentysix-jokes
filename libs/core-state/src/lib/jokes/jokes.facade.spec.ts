import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as JokesActions from './jokes.actions';
import { JokesEffects } from './jokes.effects';
import { JokesFacade } from './jokes.facade';
import { JokesEntity } from './jokes.models';
import {
  JOKES_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './jokes.reducer';
import * as JokesSelectors from './jokes.selectors';

interface TestSchema {
  jokes: State;
}

describe('JokesFacade', () => {
  let facade: JokesFacade;
  let store: Store<TestSchema>;
  const createJokesEntity = (id: string, name = ''): JokesEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(JOKES_FEATURE_KEY, reducer),
          EffectsModule.forFeature([JokesEffects]),
        ],
        providers: [JokesFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(JokesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allJokes$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allJokes$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadJokesSuccess` to manually update list
     */
    it('allJokes$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allJokes$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        JokesActions.loadJokesSuccess({
          jokes: [createJokesEntity('AAA'), createJokesEntity('BBB')],
        })
      );

      list = await readFirst(facade.allJokes$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
