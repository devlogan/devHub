import {
  makePostRequest,
  makePutRequest,
  makeDeleteRequest,
  makeGetRequest,
} from "../utils/reqUtils";

export const getAllPosts = () => makeGetRequest("/api/post");

export const updateLike = (postId) =>
  makePutRequest(`/api/post/like/${postId}`);

export const deletePost = (postId) => makeDeleteRequest(`/api/post/${postId}`);

export const deleteComment = (postId, commentId) =>
  makeDeleteRequest(`/api/post/${postId}/comment/${commentId}`);

export const addPost = (formData) => makePostRequest("/api/post/", formData);

export const addComment = (postId, formData) =>
  makePostRequest(`/api/post/${postId}/comment`, formData);

export const getPostById = (postId) => makeGetRequest(`/api/post/${postId}`);
