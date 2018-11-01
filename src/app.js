import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import AppRouter from './routers/AppRouter';
import './styles/styles.scss';
// import { Provider } from 'react-redux';
// import configureStore from './store/configureStore';

// const store = configureStore();

// const App = (
//   <Provider store={store}>
//     <AppRouter />
//   </Provider>
// );

const App = (
  <AppRouter />
);

ReactDOM.render(App, document.getElementById('app'));
