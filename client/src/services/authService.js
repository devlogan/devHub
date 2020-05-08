import {
  makePostRequest,
  makePutRequest,
  makeDeleteRequest,
  makeGetRequest,
} from "../utils/reqUtils";

export const registerUser = (payload) => makePostRequest("/api/users", payload);

export const loginUser = (payload) => makePostRequest("/api/auth", payload);

export const verifyAuth = () => makeGetRequest("/api/auth");
