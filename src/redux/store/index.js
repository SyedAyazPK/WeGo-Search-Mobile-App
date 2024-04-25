import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/rootReducers';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  export default () => {
    let store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
    let persistor = persistStore(store)
    return { store, persistor }
  }