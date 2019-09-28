import { all, call, put, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import { actions, types } from 'reducers/flavors';
import { actions as toastActions } from 'reducers/toast';

function* requestFlavorsWorker() {
  try {
    const endpoint = {
      url: '/flavors',
      method: 'GET'
    };
    const result = yield call(request.execute, { endpoint });

    // update flavors in state or throw an error
    if (result.success) {
      const {
        response: { data }
      } = result;

      yield put(actions.requestFlavorsSuccess(data));
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to get flavors!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFlavorsFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* requestFlavorsWatcher() {
  yield takeLatest(types.REQUEST_FLAVORS, requestFlavorsWorker);
}

export const workers = {
  requestFlavorsWorker
};

export const watchers = {
  requestFlavorsWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
