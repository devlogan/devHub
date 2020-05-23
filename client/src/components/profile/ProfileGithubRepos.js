import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "../layout/Loader";
import { getGithubRepos } from "../../actions/profile";

const ProfileGithubRepos = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos]);

  console.log(repos);

  // const {}
  return (
    <div class="profile-github">
      <h2 class="text-primary my-1">
        <i class="fab fa-github"></i> Github Repos
      </h2>
      {repos === null ? (
        <Loader />
      ) : (
        repos.map((repo) => {
          const {
            id,
            name,
            html_url,
            description,
            stargazers_count,
            watchers_count,
            forks_count,
          } = repo;
          return (
            <div class="repo bg-white p-1 my-1" key={2}>
              <div>
                <h4>
                  <a href={html_url} target="_blank" rel="noopener noreferrer">
                    {name}
                  </a>
                </h4>
                <p>{description}</p>
              </div>
              <div>
                <ul>
                  <li class="badge badge-primary">Stars: {stargazers_count}</li>
                  <li class="badge badge-dark">Watchers: {watchers_count}</li>
                  <li class="badge badge-light">Forks: {forks_count}</li>
                </ul>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

ProfileGithubRepos.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithubRepos);
