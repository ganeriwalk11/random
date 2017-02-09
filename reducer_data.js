import { FETCH_DATA } from '../actions/index';
import { FETCH_FUL } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_DATA:
      //console.log(action.payload.data,state);
      return state;
      break;


      case FETCH_FUL:
      return (action.payload);
      break;
  }

  return state;
}
