import fetch from 'helpers/redux/services/http';
import {
    HTTP_GET_USER
} from 'actions/index.actionTypes';

export function test() {
    const {endpoint, method, types} = HTTP_GET_USER;
    const promise = fetch(endpoint, {
      method,
    });
    return {
      ...types,
      promise,
    };
};