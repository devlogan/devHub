import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({ profile }) => {
  const {
    user: { _id, name, avatar },
    location,
    company,
    skills,
    status,
  } = profile;
  return (
    <div class="profile bg-light">
      <img class="round-img" src={avatar} alt="profile" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span>at {company}</span>}
        </p>
        <p>{location && location}</p>
        <Link to={`/profile/${_id}`} class="btn btn-primary">
          View Profile
        </Link>
      </div>

      {!!skills.length && (
        <ul>
          {skills.map((skill) => (
            <li class="text-primary" key={skill}>
              <i class="fas fa-check"></i> {skill}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

ProfileItem.propTypes = {};

export default ProfileItem;
