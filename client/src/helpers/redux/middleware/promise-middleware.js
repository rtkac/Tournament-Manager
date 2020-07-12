import { SubmissionError } from 'redux-form';
import _ from 'lodash';

const parseResponse = response => {
    switch (response.status) {
        case 204: {
            return {};
        }
        default: {
            const contentType = response.headers.get('Content-Type');
            return contentType && contentType.indexOf('json') > -1 ? response.json() : response.text();
        }
    }
};

const processSubmissionErrors = ({ errors }) => {
    const errorObject = _.reduce(
        errors,
        (initValue, error) => {
            const newValue = initValue;
            const reduxError = { translated: true, text: error.message };
            if (!_.isEmpty(error.property)) newValue[error.property] = reduxError;
            // The only way to correctly display general form values for redux-form
            // eslint-disable-next-line no-underscore-dangle
            else newValue._error = reduxError;
            return newValue;
        },
        {},
    );
    const error = new SubmissionError(errorObject);
    error.type = 'FormError';
    throw error;
};

const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    if (response.status === 401) {
        console.error('401');
    }

    // if (response.status === 400) {
    //     console.log('Error: ', response);
    //     return response.json().then(processSubmissionErrors).then((e) => console.log(e));
    // }
    //
    const contentType = response.headers.get('Content-Type');
    if(!contentType || contentType.indexOf('json') > -1) {
        // When not 2xx, it will end up here...
        return response.json().then(data => {
            const error = new Error(response.statusText);
            error.response = {
                statusCode: response.status,
                data,
            };
            throw error;
        });
    }

        return response.text().then(textResponse => {
            // get first row of csv error
            const csvArray = textResponse.split('\n')[1].split(',');
            const message = csvArray[1].replace(/"/gi,'');
            const property = csvArray[3].replace(/"/gi,'');
            processSubmissionErrors({ errors: [{ message, property }] });
        });

};

export default function promiseMiddleware({ dispatch, getState }) {
    return next => action => {
        const { promise, onRequest, onSuccess, onFailure, statusHandler, ...rest } = action;
        if (!promise) {
            // if action dispatched is not a promise, just send it to the next processor
            return next(action);
        }

        if (onRequest) {
            if (typeof onRequest === 'function') {
                onRequest(dispatch, getState, ...rest);
            } else {
                dispatch({ type: onRequest, ...rest });
            }
        }

        return promise
            .then(checkStatus)
            .then(parseResponse)
            .then(response => {
                try {
                    if (typeof onSuccess === 'function') {
                        return onSuccess(response, dispatch, getState, ...rest);
                    }
                    return dispatch({ type: onSuccess, response, ...rest });
                } catch (e) {
                    e.message = `Action success error: ${e.message}`;
                    e.type = 'ActionError';
                    throw e;
                }
            })
            .catch(error => {
                console.log(error);
                if ((error.type !== 'FormError' || error.type === 'Unauthorized') && onFailure) {
                    if (typeof onFailure === 'function') {
                        return onFailure(error.response, dispatch, getState, ...rest);
                    }
                    return dispatch({ type: onFailure, error: error.response, ...rest });
                }
                throw error;
            });
    };
}