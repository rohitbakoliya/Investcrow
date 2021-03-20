import { IAction } from 'store';

// ? idea: https://github.com/erikras/ducks-modular-redux

// Actions
const DEFAULT_STATE = {};

// Reducer - default export
export default function reducer(state = DEFAULT_STATE, action: IAction) {
  switch (action.type) {
    default:
      return state;
  }
}

// Action Creators - export

// Side-effects - export
