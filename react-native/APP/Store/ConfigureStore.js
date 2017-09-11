
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { NavigationActions } from 'shimo-navigation';
import RootReducer from '../Reducers/rootReducers.js';
import constant from '../Utils/Constant'

const screenTracking = ({ getState }) => next => (action) => {
    if (
        action.type !== NavigationActions.NAVIGATE
        && action.type !== NavigationActions.BACK
    ) {
        return next(action);
    }

    const currentScreen = getCurrentRouteName(getState().Navigation);

    let result=null;

    if (action.routeName !== 'Launch') {

        result = next(action);
    }

    // const nextScreen = getCurrentRouteName(getState().Navigation);

    return result;
};

function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

const logger = store => next => action => {
	if(typeof action === 'function') console.log('dispatching a function');
	else console.log('dispatching', action);
	let result = next(action);
	console.log('next state', store.getState());
	return result;
}

const createStoreWithMiddleware = applyMiddleware(thunk,logger,screenTracking)(createStore);

export default function configureStore(initialState){
    return createStoreWithMiddleware(RootReducer,initialState);
}


