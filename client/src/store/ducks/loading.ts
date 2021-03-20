import { IAction } from 'store/types';

const reducer = (state = {}, action: IAction) => {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  // ignore if action type is not *_REQUEST, *_SUCCESS or *_FAILURE
  if (!matches) return state;
  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === 'REQUEST',
  };
};
export default reducer;
