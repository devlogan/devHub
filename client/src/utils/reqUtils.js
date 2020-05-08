import axios from "axios";
// import { isBrowser } from '@utils/genericUtils';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// const baseURL = isBrowser
// 	? process.env.BASE_URL_BROWSER
// 	: process.env.BASE_URL_NODE;

export const setAuthToken = () => {
  if (localStorage.token) {
    return { "x-auth-token": localStorage.token };
  }
  return {};
};

export const axiosInstance = axios.create({
  baseURL: "",
  headers: {
    "content-type": "application/json",
  },
  withCredentials: true,
});

export const getUrlFromNodeRequest = (req) => {
  const { protocol, hostname, path } = req;

  return `${protocol}://${hostname}${path}`;
};

export const getCookie = (name) => {
  if (!document.cookie) {
    return null;
  }
  const token = document.cookie
    .split(";")
    .map((c) => c.trim())
    .filter((c) => c.startsWith(name + "="));

  if (token.length === 0) {
    return null;
  }

  return decodeURIComponent(token[0].split("=")[1]);
};

export const generateCookieStringFromCookieMap = (cookieMap) => {
  let cookieString = "";

  Object.keys(cookieMap).forEach(
    (key) => (cookieString += `${key}=${cookieMap[key]};`)
  );

  return cookieString;
};

// export const getCsrfToken = () => getCookie("csrftoken");

export const makeGetRequest = (endpoint, params = {}) => {
  const options = {
    method: "GET",
    params: params,
    url: endpoint,
    headers: { ...setAuthToken() },
  };

  return axiosInstance(options)
    .then((resp) => resp.data)
    .catch((e) => {
      console.log(e);
      // do something with this blanket error handler
      throw e;
    });
};

export const makePostRequest = (endpoint, params = {}) => {
  const options = {
    method: "POST",
    data: params,
    url: endpoint,
    headers: { ...setAuthToken() },
  };

  return axiosInstance(options)
    .then((resp) => resp.data)
    .catch((e) => {
      // do something with this blanket error handler
      const errorObj = { status: e.response.status, ...e.response.data };
      throw errorObj;
    });
};

export const makePutRequest = (endpoint, params = {}) => {
  const options = {
    method: "PUT",
    data: params,
    url: endpoint,
    headers: { ...setAuthToken() },
  };

  return axiosInstance(options)
    .then((resp) => resp.data)
    .catch((e) => {
      // do something with this blanket error handler
      throw e.response.data;
    });
};

export const makeDeleteRequest = (endpoint, params = {}) => {
  const options = {
    method: "DELETE",
    data: params,
    url: endpoint,
    headers: { ...setAuthToken() },
  };

  return axiosInstance(options)
    .then((resp) => resp.data)
    .catch((e) => {
      // do something with this blanket error handler
      throw e.response.data;
    });
};

// export const makeFileUploadRequest = (endpoint, params = {}, headers) => {
//   const options = {
//     method: "PUT",
//     data: params,
//     url: endpoint,
//   };

//   return axiosInstance(options)
//     .then((resp) => resp.data)
//     .catch((e) => {
//       // do something with this blanket error handler
//       throw e.response.data;
//     });
// };
