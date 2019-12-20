import {createStore, applyMiddleware, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import loggerMiddleware from "redux-logger";
import rootReducer from "../reducers";

export default function configureStore() {
    if (process.env.NODE_ENV === "production") {
        return createStore(rootReducer, applyMiddleware(thunkMiddleware));
    } else {
        // Need for dev development.
        // View redux state in redux revTools and webpack hot dev
        // Webpack hot dev - Нужно что бы при изменении файлов не слетал state in redux и не очищалась коноль
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({serialize: true})
            : compose;

        const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware)));

        if (module.hot) {
            module.hot.accept(rootReducer, () => {
                store.replaceReducer(rootReducer);
            });
        }

        return store;
    }
}