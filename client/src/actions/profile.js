import { setAlert } from "./alert";
import {
  getUserProfile,
  createOrUpdateProfile,
  addNewExperience,
  addNewEducation,
  deleteEducation as deleteCurrentEducation,
  deleteExperience as deleteCurrentExperience,
  deleteAccount as deleteCurrentAccount,
  getProfiles as getAllProfiles,
  getProfileByID as getSelectedUserProfile,
  getUsersGithubRepos,
} from "../services/dashboardService";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
  GET_REPOS,
} from "./types";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await getUserProfile();

    dispatch({
      type: GET_PROFILE,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response, status: err.response.status },
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  try {
    const res = await getAllProfiles();

    dispatch({
      type: GET_PROFILES,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.message },
    });
  }
};

// Get all profile by Id
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await getSelectedUserProfile(userId);

    dispatch({
      type: GET_PROFILE,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response, status: err.response.status },
    });
  }
};

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await getUsersGithubRepos(username);

    dispatch({
      type: GET_REPOS,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response, status: err.response.status },
    });
  }
};

// Create or Update profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const res = await createOrUpdateProfile(formData);

    dispatch({
      type: GET_PROFILE,
      payload: res,
    });

    dispatch(
      setAlert(edit ? "Profile Updated" : "Profile Created", "success", 5000)
    );

    history.push("./dashboard");
  } catch (err) {
    const { errors } = err;

    // console.log(errors);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response, status: err.response.status },
    });
  }
};

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const res = await addNewExperience(formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res,
    });

    dispatch(setAlert("Experience Added!", "success", 5000));

    history.push("./dashboard");
  } catch (err) {
    const { errors } = err;

    // console.log(errors);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response },
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const res = await addNewEducation(formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res,
    });

    dispatch(setAlert("Education Added!", "success", 5000));

    history.push("./dashboard");
  } catch (err) {
    const { errors } = err;

    // console.log(errors);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response },
    });
  }
};

// Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await deleteCurrentExperience(id);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res,
    });

    dispatch(setAlert("Experience Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response },
    });
  }
};

// Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await deleteCurrentEducation(id);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res,
    });

    dispatch(setAlert("Education Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response },
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      const res = await deleteCurrentAccount();
      dispatch({
        type: CLEAR_PROFILE,
      });

      dispatch({
        type: DELETE_ACCOUNT,
      });

      dispatch(setAlert("Your Account Successfully Deleted", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response },
      });
    }
  }
};
