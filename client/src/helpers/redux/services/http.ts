import 'isomorphic-fetch';
import { store } from '../store/configure-store';
import { uuidv4Token } from '../../tokenHelper';

export default (url: string, opts?: RequestInit) => {
  const optsHeaders = opts ? opts.headers : {};
  const newOpts: RequestInit = {
    ...opts,
    headers: {
      Pragma: 'no-cache',
      'Cache-Control': 'no-cache',
      Expires: '-1',
      'If-Modified-Since': 'Sat, 01 Jan 2000 00:00:00 GMT',
      Accept: 'application/json;charset=UTF-8',
      'Content-Type': 'application/json',
      Requestid: uuidv4Token().replace(/-/g, ''),
      ...optsHeaders,
    },
  };
  const token = store.getState().user && store.getState().user.info && store.getState().user.info.accessToken;
  if(token) {
    newOpts.headers = {
      ...newOpts.headers,
      Authorization: `${token.accessToken}`,
    };
    newOpts.credentials = 'include';
  }
  return fetch(url, newOpts);
};