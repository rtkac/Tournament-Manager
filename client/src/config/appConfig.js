import envConfig from 'envConfig';
import actionsProperties from './actionsProperties';

export default {
    ...envConfig,
    actionsProperties,
    HTTP_METHODS: {
        DELETE: 'DELETE',
        GET: 'GET',
        PATCH: 'PATCH',
        POST: 'POST',
        PUT: 'PUT',
    },
    LAYOUTS: {
        MAIN: 'mainLayout',
        AUTH: 'authLayout'
    }
}