import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "../layout/Loader";

import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithubRepos from "./ProfileGithubRepos";

import { getProfileById } from "../../actions/profile";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth: { isAuthenticated, loading: authLoading, user },
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to Profiles
          </Link>
          {isAuthenticated &&
            authLoading === false &&
            user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <div class="profile-exp bg-white p-2">
            <h2 class="text-primary">Experience</h2>
            {!!profile.experience.length ? (
              <Fragment>
                {profile.experience.map((experience) => (
                  <ProfileExperience
                    key={experience._id}
                    experience={experience}
                  />
                ))}
              </Fragment>
            ) : (
              <h4>No experience credentials</h4>
            )}
          </div>

          <div class="profile-edu bg-white p-2">
            <h2 class="text-primary">Education</h2>
            {!!profile.education.length ? (
              <Fragment>
                {profile.education.map((education) => (
                  <ProfileEducation key={education._id} education={education} />
                ))}
              </Fragment>
            ) : (
              <h4>No education credentials</h4>
            )}
          </div>
          {profile.githubusername && (
            <ProfileGithubRepos username={profile.githubusername} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
