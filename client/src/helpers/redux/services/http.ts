import 'isomorphic-fetch';
import { store } from '../store/configure-store';
import { uuidv4Token } from '../../tokenHelper';

export default (url: string, opts?: RequestInit, inkognito = false) => {
  const optsHeaders = opts ? opts.headers : {};
  const newOpts: RequestInit = {
    ...opts,
    ...(!inkognito
      ? {
          headers: {
            Accept: 'application/json;charset=UTF-8',
            'Content-Type': 'application/json',
            Requestid: uuidv4Token().replace(/-/g, ''),
            ...optsHeaders,
          },
        }
      : {}),
  };
  const token = store.getState().user && store.getState().user.info && store.getState().user.info.accessToken;
  if (token && !inkognito) {
    newOpts.headers = {
      ...newOpts.headers,
      Authorization: `${token.accessToken}`,
    };
    newOpts.credentials = 'include';
  }
  return fetch(url, newOpts);
};
