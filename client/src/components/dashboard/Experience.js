import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { deleteExperience } from "../../actions/profile";
import deleteIcon from "../../assets/delete.png";

const Experience = ({ experience, deleteExperience }) => {
  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th width="300px">Company</th>
            <th width="300px" className="hide-sm">
              Title
            </th>
            <th width="200px" className="hide-sm">
              Years
            </th>
            <th width="50px"></th>
          </tr>
        </thead>
        <tbody>
          {experience.map((exp) => {
            const { title, company, location, from, to, description, _id } =
              exp;
            return (
              <tr key={_id}>
                <td>{company}</td>
                <td className="hide-sm">{title}</td>
                <td className="hide-sm">
                  {dateFormat(from, "dd-mmm-yy")} -{" "}
                  {dateFormat(to, "dd-mmm-yy")}
                </td>
                <td>
                  <img
                    src={deleteIcon}
                    alt="delete"
                    className="button-icon"
                    onClick={() => deleteExperience(_id)}
                  />
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
