import appConfig from 'appConfig';
import T from 'translations';

const initialState = {};

export default function (state = initialState, action) {
    const { type, response, error } = action;

    const nextState = {
        ...state
    };

    switch (type) {
        default: return nextState;
    }
}
