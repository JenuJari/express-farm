/* eslint-disable no-console */
import axios from 'axios'
import $ from 'jquery'

//import store from '../store'
//import { authLogout } from '../store/actions/auth'

//const version = 'v1'
//const API_URL = (process.env.NODE_ENV === 'test') ? process.env.BASE_URL || (`http://localhost:${process.env.PORT}/api/${version}/`) : `/api/${version}`;
const API_URL = $("#base_url").val();
//console.log(API_URL);

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common.Accept = 'application/json';
//axios.defaults.headers.common['X-CSRF-TOKEN'] = window.Laravel.csrfToken;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.response.use(
    response => response,
    (error) => {
        if (error.response.status === 401) {
            //store.dispatch(authLogout())
            console.log('log out here.');
        }
        return Promise.reject(error);
    });

export default axios
