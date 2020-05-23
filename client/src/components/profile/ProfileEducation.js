import React from "react";
import PropTypes from "prop-types";
import dateFormat from "dateformat";

const ProfileEducation = ({ education }) => {
  const {
    current,
    from,
    to,
    fieldofstudy,
    degree,
    description,
    school,
  } = education;
  return (
    <div>
      <h3>{school}</h3>
      <p>
        {dateFormat(from, "dd-mmm-yy")} -{" "}
        {current ? "Current" : dateFormat(to, "dd-mmm-yy")}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {};

export default ProfileEducation;
