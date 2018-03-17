import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createDebounce from 'redux-debounced';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

  
const middleware = [ createDebounce(), thunk ];
if (process.env.REACT_APP_LOGGING === 'true') {
    middleware.push(createLogger());
}

// const enhancers = compose(
//     applyMiddleware(...middleware),
//     DevTools.instrument(),
//     persistState(window.location.href.match(/[?&]debug_session=([^&#]+)\b/))
// );

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(
    applyMiddleware(...middleware)
);

export default function configureStore () {
    let store = createStore(rootReducer, enhancers);
    if (module.hot) {
        module.hot.accept('./reducers', () =>
            store.replaceReducer(require('./reducers').default)
        );
    }
    
    return { store };
}