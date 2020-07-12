import appConfig from 'appConfig';
import T from 'translations';
import {
    getActionSettings,
    hasSettingProperty,
    isHttpActionType
} from 'helpers/actions.helper';

const {actionsProperties, MODALS, HTTP_METHODS} = appConfig;

const initialState = {
    isFetching: {},
    isFetched: {},
};

export default function (state = initialState, action) {
    const { type, response, error } = action;
    const actionSettings = getActionSettings(type);

    const nextState = {...state};
    
    if(isHttpActionType(type)) {
        const httpActionRootSettings = getActionSettings(actionSettings.actionType);
        nextState.isFetching[`${httpActionRootSettings.actionType}`] = !!hasSettingProperty(
            actionSettings.properties,
            actionsProperties.IS_TRIGGERED,
        );
        nextState.isFetched[`${httpActionRootSettings.actionType}`] = hasSettingProperty(
            actionSettings.properties,
            actionsProperties.IS_SUCCESS,
        );
    }

    switch (type) {
        default: return nextState;
    }
}
