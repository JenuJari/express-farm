import { AUTH_CHECK, AUTH_LOGIN , AUTH_SET_USER, AUTH_LOGOUT } from "./../actiontypes/index";

export function authCheck() {return {type: AUTH_CHECK }; }

export const authLogout = () => { return { type: AUTH_LOGOUT }; }

export const authLogin = payload => { return { type: AUTH_LOGIN, payload };}

export const setUser = payload => {return {type : AUTH_SET_USER, payload}};
