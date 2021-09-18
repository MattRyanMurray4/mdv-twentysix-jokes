import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as JokesActions from './jokes.actions';
import { JokesEffects } from './jokes.effects';

describe('JokesEffects', () => {
  let actions: Observable<Action>;
  let effects: JokesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        JokesEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(JokesEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: JokesActions.init() });

      const expected = hot('-a-|', {
        a: JokesActions.loadJokesSuccess({ jokes: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
