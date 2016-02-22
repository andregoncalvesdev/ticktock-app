import { STORE_LOGIN } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case STORE_LOGIN:
      return [ action.payload, ...state ];
  }

  return state;
}
