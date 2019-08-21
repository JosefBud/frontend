import { all, put, call } from 'redux-saga/effects';

import request from 'utils/request';
import { actions } from 'reducers/dashboard';
import { actions as appActions } from 'reducers/application';
import saga, { watchers, workers } from './dashboard';

/* eslint-disable camelcase */
describe('dashboard sagas', () => {
  const migrations = { migration: 1 };
  const migrationsEndpoint = {
    url: '/data/version',
    method: 'GET'
  };
  const stats = { stats: true };
  const statsEndpoint = {
    url: '/stats/dashboard',
    method: 'GET'
  };

  it('handles success in requestMigrationsWorker', () => {
    const gen = workers.requestMigrationsWorker();

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: migrationsEndpoint })
    );

    result = gen.next({
      success: true,
      response: {
        data: migrations
      }
    });

    expect(result.value).toEqual(
      put(actions.requestMigrationsSuccess(migrations))
    );
  });

  it('handles request failure in requestMigrationsWorker', () => {
    const error = new Error('An error occurred.');
    const gen = workers.requestMigrationsWorker();

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: migrationsEndpoint })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestMigrationsFailure(error)));
  });

  it('handles unexpected error in requestMigrationsWorker', () => {
    const error = new Error('An error occurred.');
    const { message } = error;
    const gen = workers.requestMigrationsWorker();

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: migrationsEndpoint })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestMigrationsFailure(error)));

    result = gen.next();

    expect(result.value).toEqual(
      put(
        appActions.popToast({
          title: 'Error',
          icon: 'times-circle',
          message
        })
      )
    );
  });

  it('handles success in requestStatsWorker', () => {
    const gen = workers.requestStatsWorker();

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: statsEndpoint })
    );

    result = gen.next({
      success: true,
      response: {
        data: stats
      }
    });

    expect(result.value).toEqual(put(actions.requestStatsSuccess(stats)));
  });

  it('handles request failure in requestStatsWorker', () => {
    const error = new Error('An error occurred.');
    const gen = workers.requestStatsWorker();

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: statsEndpoint })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestStatsFailure(error)));
  });

  it('handles unexpected error in requestStatsWorker', () => {
    const error = new Error('An error occurred.');
    const { message } = error;
    const gen = workers.requestStatsWorker();

    let result = gen.next();

    expect(result.value).toEqual(
      call(request.execute, { endpoint: statsEndpoint })
    );

    result = gen.next({
      success: false,
      error
    });

    expect(result.value).toEqual(put(actions.requestStatsFailure(error)));

    result = gen.next();

    expect(result.value).toEqual(
      put(
        appActions.popToast({
          title: 'Error',
          icon: 'times-circle',
          message
        })
      )
    );
  });

  it('forks all watchers', () => {
    const gen = saga();
    const result = gen.next();

    expect(result.value).toEqual(
      all(Object.values(watchers).map(watcher => watcher()))
    );
  });
});
/* eslint-enable */
