import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app";
import 'typeface-roboto';
import {Provider} from "react-redux";
import configureStore from "./redux/store";

const root = document.getElementById('root');
const store = configureStore();

const render = Component => (
    // eslint-disable-next-line react/no-render-return-value
    ReactDOM.render(
        <Provider store={store}>
            <Component />
        </Provider>,
        root)
);

render(App);

// Webpack hot dev
// Нужно что бы при изменении файлов не слетал state in redux и не очищалась коноль
if (module.hot) {
    module.hot.accept(App, () => render(App))
}
