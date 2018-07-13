import Transformer from './Transformer';


export const HttpErrorReject = (err,reject) => {
    const statusCode = err.response.status;
    const data = { error: null, statusCode };

    if (statusCode === 422) {
      const resetErrors = { errors: err.response.data, replace: false, searchStr: "", replaceStr: "" };
      data.error = Transformer.resetValidationFields(resetErrors);
    } else if (statusCode === 401) {
      data.error = err.response.data.message;
    }
    return reject(data);
}
