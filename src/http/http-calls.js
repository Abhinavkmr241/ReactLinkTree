import config  from '../config';
import { makePostRequest, makeGetRequest, makePutRequest } from './http-service';
const BASE_URL = config.BASE_URL; // create a config.js to maintain the BASE_URL

export const signUp = signupData => {
  console.log('BASE_URL :', BASE_URL);
  return new Promise((resolve, reject) => {
    makePostRequest(
      BASE_URL + "/signup",
      false,
      signupData
    )
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        console.log("API call error: ", e);
        reject(e);
      });
  });
};

export const checkUsername = userName => {
  console.log('BASE_URL :', BASE_URL);
  return new Promise((resolve, reject) => {
    makePostRequest(
      BASE_URL + "/check-userName",
      false,
      userName
    )
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        console.log("API call error: ", e);
        reject(e);
      });
  });
};

export const login = loginData => {
  return new Promise((resolve, reject) => {
    makePostRequest(
      BASE_URL + "/login",
      false,
      loginData
    )
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        console.log("API call error: ", e);
        reject(e);
      });
  });
};

export const forgotPassword = handleData => {
  return new Promise((resolve, reject) => {
    makePostRequest(
      BASE_URL + "/forgotPassword",
      false,
      handleData
    )
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        console.log("API call error: ", e);
        reject(e);
      });
  });
};


export const findPage = () => {
  return new Promise((resolve, reject) => {
    makeGetRequest(
      BASE_URL + "/page",
      true
    )
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        console.log("API call error: ", e);
        reject(e);
      });
  });
};

export const callEditContent = (contentData, id) => {
  return new Promise((resolve, reject) => {
    makePutRequest(
      BASE_URL + `/page/${id}`,
      true,
      contentData
    )
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        console.log("API call error: ", e);
        reject(e);
      });
  });
};

export const createFirstContent = (contentData) => {
  return new Promise((resolve, reject) => {
    makePostRequest(
      BASE_URL + "/page",
      true,
      contentData
    )
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        console.log("API call error: ", e);
        reject(e);
      });
  });
};