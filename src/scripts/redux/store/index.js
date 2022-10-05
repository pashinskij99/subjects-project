import {createStore, applyMiddleware, compose} from 'redux';
import reducers from '../reducers'

const composeEnhancers = compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware()));

export default store;