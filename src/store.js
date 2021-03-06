import {createStore, combineReducers, applyMiddleware} from 'redux';
import {subspace, namespaced} from 'redux-subspace';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import main from './StaticReducer';

const logger = createLogger();

const createReducerManager = (initialReducers) => {
  // Create an object which maps keys to reducers
  const reducers = { ...initialReducers }

  // Create the initial combinedReducer
  let combinedReducer = combineReducers(reducers)

  // An array which is used to delete state keys when reducers are removed
  let keysToRemove = []

  return {
    getReducerMap: () => reducers,

    // The root reducer function exposed by this object
    // This will be passed to the store
    reduce: (state, action) => {
      // If any reducers have been removed, clean up their state first
      if (keysToRemove.length > 0) {
        state = { ...state }
        for (let key of keysToRemove) {
          delete state[key]
        }
        keysToRemove = []
      }

      // Delegate to the combined reducer
      return combinedReducer(state, action)
    },

    // Adds a new reducer with the specified key
    add: (key, reducer) => {
      if (!key || reducers[key]) {
        return
      }

      // Add the reducer to the reducer mapping and namespace it
      reducers[key] = namespaced(key)(reducer);

      // subspace reducer
      store.dynamicReducers[key] = subspace((state) => state[key], key)(store);

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
      store.dispatch({type: '@@redux/ADD_REDUCER'});
    },

    // Removes a reducer with the specified key
    remove: key => {
      if (!key || !reducers[key]) {
        return
      }

      // Remove it from the reducer mapping
      delete reducers[key]

      // Add the key to the list of keys to clean up
      keysToRemove.push(key)

      // remove subspaced link
      delete store.dynamicReducers[key];

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers)
      store.dispatch({type: '@@redux/DELETE_REDUCER'});
    }
  }
}

const staticReducers = {
  main
}

export const reducerManager = createReducerManager(staticReducers);

export const dynamicReducers = {};

  // Create a store with the root reducer function being the one exposed by the manager.
const store = createStore(reducerManager.reduce, applyMiddleware(thunk, logger));

  // Optional: Put the reducer manager on the store so it is easily accessible
store.reducerManager = reducerManager;

  // subspaced dynamic reducers will be accessible here
store.dynamicReducers = dynamicReducers;

export default store;