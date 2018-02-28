import { combineReducers } from 'redux';
import CountryReducer from './country-reducer';

const allReducers = combineReducers({
  countries: CountryReducer
});

export default allReducers;
