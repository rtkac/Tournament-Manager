import {createActionType, createHttpFetchActionsTypes} from 'helpers/actions.helper';
import appConfig from 'appConfig';
const {actionsProperties, endpoints, HTTP_METHODS} = appConfig;

export const HTTP_GET_USER = createHttpFetchActionsTypes(
    createActionType('HTTP_GET_USER', [actionsProperties.HTTP_ROOT_PROPERTIES.IS_MONITORED, actionsProperties.HTTP_ROOT_PROPERTIES.HAS_LOCAL_LOADER]),
    // HTTP_METHODS.POST,
    'POST',
    // endpoints.CONTRACT_GET_ENDPOINT,
    // 'https://jsonplaceholder.typicode.com/todos/1',
    'http://nodetest.ddns.net:3002/api/users/login',
    [],
    [actionsProperties.HAS_LOCAL_SUCCESS_MESSAGE],
    [actionsProperties.HAS_LOCAL_ERROR_MESSAGE],
);