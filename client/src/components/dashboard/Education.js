import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { deleteEducation, deleteAccount } from "../../actions/profile";
import deleteIcon from "../../assets/delete.png";

const Education = ({ education, deleteEducation, deleteAccount }) => {
  return (
    <Fragment>
      {" "}
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th width="300px">School</th>
            <th width="300px" className="hide-sm">
              Degree
            </th>
            <th width="200px" className="hide-sm">
              Years
            </th>
            <th width="50px" />
          </tr>
        </thead>
        <tbody>
          {education.map((edu) => {
            const { school, degree, from, to, _id } = edu;
            return (
              <tr key={_id}>
                <td>{school}</td>
                <td className="hide-sm">{degree}</td>
                <td className="hide-sm">
                  {" "}
                  {dateFormat(from, "dd-mmm-yy")} -{" "}
                  {dateFormat(to, "dd-mmm-yy")}
                </td>
                <td>
                  <img
                    src={deleteIcon}
                    alt="delete"
                    className="button-icon"
                    onClick={() => deleteEducation(_id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="my-2">
        <button className="btn btn-danger" onClick={deleteAccount}>
          <i className="fas fa-user-minus"></i>
          Delete My Account
        </button>
      </div>{" "}
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.object.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  education: state.profile.profile.education,
});

export default connect(mapStateToProps, { deleteEducation, deleteAccount })(
  Education
);
