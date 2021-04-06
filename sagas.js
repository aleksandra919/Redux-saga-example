import { put, call, takeEvery, all } from "redux-saga/effects";

export const delay = (ms) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });

function* helloSaga() {
  console.log("Hello saga");
}

export function* incrementAsync() {
  // Saga sleeps for 1 second via the call to delay(1000)
  yield call(delay, 1000);

  // then dispatches an INCREMENT action
  yield put({ type: "INCREMENT" });
}

function* watchIncrementAsync() {
  //We use takeEvery, a helper function provided by redux-saga, to listen for dispatched INCREMENT_ASYNC actions and run incrementAsync each time
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);
}
