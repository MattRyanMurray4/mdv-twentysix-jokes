import { JokesEntity } from './jokes.models';
import { jokesAdapter, JokesPartialState, initialState } from './jokes.reducer';
import * as JokesSelectors from './jokes.selectors';

describe('Jokes Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getJokesId = (it: JokesEntity) => it.id;
  const createJokesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as JokesEntity);

  let state: JokesPartialState;

  beforeEach(() => {
    state = {
      jokes: jokesAdapter.setAll(
        [
          createJokesEntity('PRODUCT-AAA'),
          createJokesEntity('PRODUCT-BBB'),
          createJokesEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Jokes Selectors', () => {
    it('getAllJokes() should return the list of Jokes', () => {
      const results = JokesSelectors.getAllJokes(state);
      const selId = getJokesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = JokesSelectors.getSelected(state) as JokesEntity;
      const selId = getJokesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getJokesLoaded() should return the current "loaded" status', () => {
      const result = JokesSelectors.getJokesLoaded(state);

      expect(result).toBe(true);
    });

    it('getJokesError() should return the current "error" state', () => {
      const result = JokesSelectors.getJokesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
