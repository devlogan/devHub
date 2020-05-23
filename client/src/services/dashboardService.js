import {
  makePostRequest,
  makePutRequest,
  makeDeleteRequest,
  makeGetRequest,
} from "../utils/reqUtils";

export const getUserProfile = () => makeGetRequest("/api/profile/me");

export const createOrUpdateProfile = (formData) =>
  makePostRequest("/api/profile/", formData);

export const addNewExperience = (formData) =>
  makePutRequest("/api/profile/experience", formData);

export const addNewEducation = (formData) =>
  makePutRequest("/api/profile/education", formData);

export const deleteExperience = (id) =>
  makeDeleteRequest(`/api/profile/experience/${id}`);

export const deleteEducation = (id) =>
  makeDeleteRequest(`/api/profile/education/${id}`);

export const deleteAccount = () => makeDeleteRequest(`/api/profile/`);

export const getProfiles = () => makeGetRequest("/api/profile");

export const getProfileByID = (userId) =>
  makeGetRequest(`/api/profile/user/${userId}`);

export const getUsersGithubRepos = (username) =>
  makeGetRequest(`/api/profile/github/${username}`);
