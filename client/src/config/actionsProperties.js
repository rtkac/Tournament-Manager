export default {
    // optional for HTTP ACTION NAME ROOT
    HTTP_ROOT_PROPERTIES: {
      DROWN_EXCEPTION: 7,
      IS_MONITORED: 5,
      HAS_GLOBAL_LOADER: 3,
      HAS_LOCAL_LOADER: 2,
    },
  
    // required for HTTP action types
    IS_TRIGGERED: 37, // automatically set for HTTP onRequest action type
    IS_SUCCESS: 41, // automatically set for HTTP onSuccess action type
    IS_FAILURE: 43, // automatically set for HTTP onFailure action type
  
    // optional for all of action types
    HAS_LOCAL_ERROR_MESSAGE: 7,
    HAS_LOCAL_SUCCESS_MESSAGE: 5,
    RESET_SUCCESS_MESSAGE: 3,
    HIDE_MODAL: 2
  };