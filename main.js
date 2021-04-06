import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./sagas";

import Counter from "./Counter";
import reducer from "./reducers";

const action = (type) => store.dispatch({ type });

// 1. Create middleware
const sagaMiddleware = createSagaMiddleware();

// 2.  Connect middleware to store
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

//3. Start saga
sagaMiddleware.run(rootSaga);

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action("INCREMENT")}
      onDecrement={() => action("DECREMENT")}
      onIncrementAsync={() => action("INCREMENT_ASYNC")}
    />,
    document.getElementById("root")
  );
}

render();
store.subscribe(render);
