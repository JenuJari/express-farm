import HTTP from './../../utils/Http';
import store from './../index';
import * as services from  './../services';
import {
    AUTH_CHECK,
    AUTH_LOGIN,
    AUTH_SET_USER,
    AUTH_LOGOUT,
    // AUTH_REFRESH_TOKEN,
    // AUTH_RESET_PASSWORD,
} from './../actiontypes';

const user = {
    id: null,
    name: null,
    email: null,
    createdAt: null,
    updatedAt: null,
}

const initialState = {
    isAuthenticated: false,
};



const reducer = (state = initialState, { type, payload = null }) => {
    switch (type) {
        // case AUTH_REFRESH_TOKEN:
        case AUTH_LOGIN:
             return login(state, payload);
        case AUTH_CHECK:
            return checkAuth(state);
        case AUTH_SET_USER : return setUser(state, payload);
        case AUTH_LOGOUT:
            return logout(state);
        // case AUTH_RESET_PASSWORD:
        //     return resetPassword(state);
        default:
            return state;
    }
};


function logout(state) {
    localStorage.removeItem('access_token')
    
    state = Object.assign({}, state, {
      isAuthenticated: false,
      user,
    });
    
    return state;
}

const login =  (state, payload) => {
  localStorage.setItem("access_token", payload);
  HTTP.defaults.headers.common["Authorization"] = `Bearer ${payload}`;

  state = Object.assign({}, state, { isAuthenticated: true });

  store.dispatch(services.authService.setUser());

  return state;
}

function checkAuth(state) {
    state = Object.assign({}, state, {
        isAuthenticated: !!localStorage.getItem('access_token')
    })

    if (state.isAuthenticated) {
        HTTP.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
        store.dispatch(services.authService.setUser());
    }

    return state;
}

export const setUser = (state, payload) => {
    state = Object.assign({}, state, { user  : payload })
    return state;
};

export default reducer;
