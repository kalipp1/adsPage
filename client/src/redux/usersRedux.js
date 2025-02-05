/* SELECTORS */
export const getLoggedInUser = ({ user }) => user.data;

/* ACTIONS */
const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;
const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');
const START_REQUEST = createActionName('START_REQUEST');

// Action name creator
export const logIn = payload => ({ type: LOG_IN, payload });
export const logOut = () => ({ type: LOG_OUT });
export const startRequest = () => ({ type: START_REQUEST });


//Reducer
const usersReducer = (statePart = {}, action) => {
    switch (action.type) {
      case LOG_IN:
        console.log("Payload in LOG_IN action: ", action.payload); 
        return {data: action.payload, loading: false};
      case LOG_OUT:
        return {data: null, loading: false};
      case START_REQUEST:
        return { ...statePart, loading: true }
      default:
        return statePart;
    };
  };
  
  export default usersReducer;