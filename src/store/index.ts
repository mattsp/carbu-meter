import { applyMiddleware, combineReducers, createStore, Store  } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { tripReducer } from './trip/reducers'
const rootReducer = combineReducers({
  trip: tripReducer,
})

export type AppState = ReturnType<typeof rootReducer>
export const store: Store<AppState> = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));