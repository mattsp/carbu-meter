import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Persistor, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk'
import { localeReducer } from './locale/reducers'
import { modalReducer } from './modal/reducers'
import { notificationReducer } from './notification/reducers'
import { preferenceReducer } from './preference/reducers'
import { statsReducer } from './stats/reducers'
import { tripReducer } from './trip/reducers'
import { userReducer } from './user/reducers'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['preference'],
}

const rootReducer = combineReducers({
  locale: localeReducer,
  modal: modalReducer,
  notification: notificationReducer,
  preference: preferenceReducer,
  stats: statsReducer,
  trip: tripReducer,
  user: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export type AppState = ReturnType<typeof rootReducer>
const configureStore = (): { store: Store<AppState>; persistor: Persistor } => {
  const store: Store<AppState> = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
  )
  const persistor = persistStore(store)
  return { store, persistor }
}
export default configureStore()
