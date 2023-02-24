import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistReducer } from 'redux-persist'
import rootReducer from './reducerMaster';
import rootSaga from './watcherMaster';
// import localForage from 'localforage'
import sessionStorage from 'redux-persist/es/storage/session';
const persistConfig = {
    key: 'root',
    storage:sessionStorage,
};

const reducer = persistReducer(persistConfig, rootReducer)
const saga = createSagaMiddleware();
const middleWares = [saga];
const store = createStore(
    reducer,
    applyMiddleware(...middleWares)
);

saga.run(rootSaga)

export default store;