import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { deleteExperience } from "../../actions/profile";

const Experience = ({ experience, deleteExperience }) => {
  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experience.map((exp) => {
            const {
              title,
              company,
              location,
              from,
              to,
              description,
              _id,
            } = exp;
            return (
              <tr>
                <td>{company}</td>
                <td className="hide-sm">{title}</td>
                <td className="hide-sm">
                  {dateFormat(from, "dd-mmm-yy")} -{" "}
                  {dateFormat(to, "dd-mmm-yy")}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteExperience(_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.object.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  experience: state.profile.profile.experience,
});

export default connect(mapStateToProps, { deleteExperience })(Experience);
