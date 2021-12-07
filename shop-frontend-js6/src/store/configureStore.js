import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import productsReducer from "./reducers/productsReducer";
import usersReducer from "./reducers/usersReducer";
import {createBrowserHistory} from 'history';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const history = createBrowserHistory();

const rootReducer = combineReducers({
    products: productsReducer,
    users: usersReducer,
    router: connectRouter(history)
});

const middleware = [
    thunkMiddleware,
    routerMiddleware(history)
];
const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();


export const store = createStore(rootReducer, persistedState,enhancers);

store.subscribe(()=> {
    saveToLocalStorage({
        users:{
            user: store.getState().users.user
        }
    });
});