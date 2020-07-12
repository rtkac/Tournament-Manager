import appConfig from 'appConfig';
import _ from 'lodash';

const { actionsProperties } = appConfig;

export function createActionType(actionNameRoot, properties = []) {
    let setting = 1;
    properties.forEach(property => {setting *= property});
    return `${actionNameRoot}_${setting}`;
}

export function createHttpFetchActionsTypes(
    actionNameRoot,
    method,
    endpoint,
    triggeredProperties = [],
    successProperties = [],
    failureProperties = []
) {
    triggeredProperties.push(actionsProperties.IS_TRIGGERED);
    successProperties.push(actionsProperties.IS_SUCCESS);
    failureProperties.push(actionsProperties.IS_FAILURE);
    return {
        method,
        endpoint,
        types: {
            onRequest: createActionType(actionNameRoot, [
                ...new Set(triggeredProperties)
            ]),
            onSuccess: createActionType(actionNameRoot, [
                ...new Set(successProperties)
            ]),
            onFailure: createActionType(actionNameRoot, [
                ...new Set(failureProperties)
            ])
        }
    };
}

export function getActionSettings(action) {
  const properties = action.match(/\d+$/g);
    return {
        actionType:
            properties && properties.length
                ? action.replace(`_${properties[0]}`, "")
                : action,
        properties: properties && properties.length ? parseInt(properties[0], 10) : 1
    };
}

export function hasSettingProperty(setting, property) {
    return !_.isNaN(setting) && !_.isNaN(property) && !(setting % property);
}

export function hasActionProperty(action, property) {
    const setting = getActionSettings(action);
    return hasSettingProperty(setting.properties, property);
}

export function hasActionAnyProperty(action, properties) {
    const setting = getActionSettings(action);
    for (let i = 0; i < properties.length; i+=1) {
        if (hasSettingProperty(setting.properties, properties[i])) {
            return true;
        }
    }
    return false;
}

export function isHttpActionType(actionType) {
    return hasActionAnyProperty(actionType, [
        actionsProperties.IS_TRIGGERED,
        actionsProperties.IS_SUCCESS,
        actionsProperties.IS_FAILURE
    ]);
}

export function getActionSettingsRootType(action) {
    const act = typeof action === "object" ? action.types.onRequest : action;
    const actType = getActionSettings(act).actionType;
    return isHttpActionType(act) ? getActionSettingsRootType(actType) : actType;
}