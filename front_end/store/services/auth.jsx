import Http from "./../../utils/Http";
import { authActions } from "./../actions/index";
import Transformer from "./../../utils/Transformer";
import { HttpErrorReject } from './../../utils/HelperFunc';


export const register = (cred) => {
    return dispatch => new Promise((resolve, reject) => {
        Http.post("/api/auth/register", cred)
          .then(res => {
            const data = Transformer.fetch(res.data);
            dispatch(authActions.authLogin(data.accessToken));
            return resolve();
          })
          .catch(err => { return HttpErrorReject(err,reject); });
    });
};

export const login = (cred) => {
    return dispatch => new Promise((resolve, reject) => {
        Http.post("/api/auth/login", cred)
          .then(res => {
            const data = Transformer.fetch(res.data);
            dispatch(authActions.authLogin(data.accessToken));
            return resolve();
          })
          .catch(err => { return HttpErrorReject(err,reject); });
    });
};

export const setUser = () => {
    return dispatch => new Promise((resolve, reject) => {
        Http.get("/api/user")
          .then(res => {
            const data = Transformer.fetch(res.data);
            dispatch(authActions.setUser(data));
            return resolve();
          })
          .catch(err => { return HttpErrorReject(err,reject); });
    });
}


export const logout = () => {
    return dispatch => {
      return Http.delete('/api/auth/logout')
        .then(() => {
          dispatch(authActions.authLogout())
        });
        // .catch(err => {
        //   console.log(err)
        // });
    }
  }
