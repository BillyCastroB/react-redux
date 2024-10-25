import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk'; // Importación corregida
import reducers from './src/reducers';

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
  devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV !== 'production',
});

export default store;
