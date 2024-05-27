//import {createStore} from 'redux';
const redux = require('redux');
const createStore = redux.createStore;


// initial state
const initState = {
    count: 10,
    message: 'Hello Redux',
    location: "Hyderabad"
}
// reducer
const reducer = (currentState=initState, action) => {

    //return the update state
    if(action.type === 'INC_CTR') {

        return{
            ...currentState,
            count: currentState.count + 1
        }
    }
    if(action.type === 'ADD_TO_CTR') {

        return {
            ...currentState,
            count: currentState.count + action.value
        }
    }
    //store.dispatch({type: 'UPDATE_LOC_MSG', payload: {location: 'Bangalore', message: 'Hello Bangalore'}});
    if(action.type === 'UPDATE_LOC_MSG'){
        return {
            ...currentState,
            location: action.payload.location,
            message: action.payload.message
        }
    }

    return currentState;
}

// store
const store = createStore(reducer);
console.log("Store: ", store.getState());

// subscribe

store.subscribe(() => {

    console.log("Subscribe: ", store.getState());
});

// dispatch an action

store.dispatch({type: 'INC_CTR'});
//console.log("Store: ", store.getState());
store.dispatch({type: 'ADD_TO_CTR', value: 10});
//console.log("Store: ", store.getState());
store.dispatch({type: 'UPDATE_LOC_MSG', payload: {location: 'Bangalore', message: 'Hello Bangalore'}});