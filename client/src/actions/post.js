import { setAlert } from "./alert";
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./types";

import {
  getAllPosts,
  updateLike,
  deletePost,
  addPost,
  getPostById,
  addComment,
  deleteComment,
} from "../services/postServices";

// Get Posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await getAllPosts();

    dispatch({
      type: GET_POSTS,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response.status },
    });
  }
};

// Get Posts
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await getPostById(id);

    dispatch({
      type: GET_POST,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response.status },
    });
  }
};

// Add like
export const addOrUpdateLike = (id) => async (dispatch) => {
  try {
    const res = await updateLike(id);
    dispatch({
      type: UPDATE_LIKES,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response.status },
    });
  }
};

// Delete Post
export const deletePostById = (id) => async (dispatch) => {
  try {
    const res = await deletePost(id);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(setAlert("Post Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.status },
    });
  }
};

// Add Post
export const addANewPost = (formData) => async (dispatch) => {
  try {
    const res = await addPost(formData);

    dispatch({
      type: ADD_POST,
      payload: res,
    });

    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.status },
    });
  }
};

// Add comment
export const addANewComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await addComment(postId, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res,
    });

    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.status },
    });
  }
};

// Delete comment
export const deleteCommentById = (postId, commentId) => async (dispatch) => {
  try {
    const res = await deleteComment(postId, commentId);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert("Comment Deleted", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.status },
    });
  }
};
