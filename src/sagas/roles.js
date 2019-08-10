// import dayjs from 'dayjs';
// import nanoid from 'nanoid';
import {
  all,
  call,
  put,
  takeLatest
  // delay,
  // take,
  // takeEvery,
  // select
} from 'redux-saga/effects';

import request from 'utils/request';
import { actions, types } from 'reducers/roles';
import { actions as appActions } from 'reducers/application';

// snake_cased variables here come from RFC 6749
/* eslint-disable camelcase */
function* requestRolesWorker() {
  try {
    const endpoint = {
      url: '/roles',
      method: 'GET'
    };
    const result = yield call(request.execute, { endpoint });

    // update roles in state or throw an error
    if (result.success) {
      const {
        response: { data }
      } = result;

      yield put(actions.requestRolesSuccess(data));
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to get roles!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestRolesFailure(error));
    yield put(
      appActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* addRoleWorker({ name }) {
  try {
    const endpoint = {
      url: '/role',
      method: 'POST'
    };
    const data = {
      name
    };
    const result = yield call(request.execute, { endpoint, data });

    // update roles in state or throw an error
    if (result.success) {
      yield put(actions.requestRoles());
      yield put(
        appActions.popToast({
          title: 'Role Created',
          icon: 'times-circle',
          message: `${name} role successfully created!`
        })
      );
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to create role!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.addRoleFailure(error));
    yield put(
      appActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* requestRoleUsersWorker({ roleId }) {
  try {
    const endpoint = {
      url: '/users/role/' + roleId,
      method: 'GET'
    };
    const result = yield call(request.execute, { endpoint });

    // update role users in state or throw an error
    if (result.success) {
      const {
        response: { data }
      } = result;

      yield put(actions.requestRoleUsersSuccess(data));
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to get role users!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestRoleUsersFailure(error));
    yield put(
      appActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* addRoleUserWorker({ userId, roleId, active }) {
  try {
    const endpoint = {
      url: `/user/${userId}/role`,
      method: 'POST'
    };
    const data = {
      userId,
      roleId,
      active
    };
    const result = yield call(request.execute, { endpoint, data });

    // update roles in state or throw an error
    if (result.success) {
      yield put(actions.requestRoleUsers());
      yield put(
        appActions.popToast({
          title: 'User Role Added',
          icon: 'times-circle',
          message: `Role ${roleId} assigned to User ${userId}!`
        })
      );
    } else if (result.error) {
      throw result.error;
    } else {
      throw new Error('Failed to assign role to user!');
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.addRoleUserFailure(error));
    yield put(
      appActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* requestRolesWatcher() {
  yield takeLatest(types.REQUEST_ROLES, requestRolesWorker);
}

function* addRoleWatcher() {
  yield takeLatest(types.ADD_ROLE, addRoleWorker);
}

function* requestRoleUsersWatcher() {
  yield takeLatest(types.REQUEST_ROLE_USERS, requestRoleUsersWorker);
}

function* addRoleUserWatcher() {
  yield takeLatest(types.ADD_ROLE_USER, addRoleUserWorker);
}

export const workers = {
  requestRolesWorker,
  addRoleWorker,
  requestRoleUsersWorker,
  addRoleUserWorker
};

export const watchers = {
  requestRolesWatcher,
  addRoleWatcher,
  requestRoleUsersWatcher,
  addRoleUserWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
