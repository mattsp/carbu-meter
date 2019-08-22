import { applyMiddleware, combineReducers, createStore, Store  } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { localeReducer } from './locale/reducers';
import { modalReducer } from './modal/reducers';
import { notificationReducer } from './notification/reducers'
import { statsReducer } from './stats/reducers';
import { tripReducer } from './trip/reducers'

const rootReducer = combineReducers({
  locale: localeReducer,
  modal: modalReducer,
  notification: notificationReducer,
  stats: statsReducer,
  trip: tripReducer,
})

export type AppState = ReturnType<typeof rootReducer>
export const store: Store<AppState> = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));