/*

In fact, neither put nor call performs any dispatch or asynchronous call by themselves, they return plain JavaScript objects.

If the Effect type is a PUT then it will dispatch an action to the Store. If the Effect is a CALL then it'll call the given function.

This separation between Effect creation and Effect execution makes it possible to test our Generator

 */
import test from "tape";

import { put, call } from "redux-saga/effects";
import { incrementAsync, delay } from "./sagas";

test("incrementAsync Saga test", (assert) => {
  const gen = incrementAsync();

  assert.deepEqual(
    gen.next().value,
    call(delay, 1000),
    "incrementAsync Saga must call delay(1000)"
  );

  assert.deepEqual(
    gen.next().value,
    put({ type: "INCREMENT" }),
    "incrementAsync Saga must dispatch an INCREMENT action"
  );

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
    "incrementAsync Saga must be done"
  );

  assert.end();
});
