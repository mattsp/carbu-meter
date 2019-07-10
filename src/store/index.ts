import { combineReducers } from 'redux';
import { tripReducer } from './trip/reducers'
const rootReducer = combineReducers({
  trip: tripReducer,
})

export type AppState = ReturnType<typeof rootReducer>