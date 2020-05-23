import React from "react";
import PropTypes from "prop-types";
import dateFormat from "dateformat";

const ProfileExperience = ({ experience }) => {
  console.log(experience);
  const { company, current, from, to, title, description } = experience;
  return (
    <div>
      <h3 class="text-dark">{company}</h3>
      <p>
        {dateFormat(from, "dd-mmm-yy")} -{" "}
        {current ? "Current" : dateFormat(to, "dd-mmm-yy")}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {};

export default ProfileExperience;
