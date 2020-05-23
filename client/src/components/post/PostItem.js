import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { connect } from "react-redux";

import { addOrUpdateLike, deletePostById } from "../../actions/post";

const PostItem = ({
  addOrUpdateLike,
  auth,
  deletePostById,
  post: { _id, name, avatar, user, likes, comments, date, text },
  showActions,
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">Posted on {dateFormat(date, "dd-mmm-yy")}</p>
      {showActions && (
        <Fragment>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => addOrUpdateLike(_id)}
          >
            <i className="fas fa-thumbs-up"></i>
            {!!likes.length && <span>{likes.length}</span>}
          </button>
          {/* <button type="button" className="btn btn-light">
        <i className="fas fa-thumbs-down"></i>
      </button> */}
          <Link to={`/post/${_id}`} className="btn btn-primary">
            Discussion{" "}
            {!!comments.length && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deletePostById(_id)}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  addOrUpdateLike: PropTypes.func.isRequired,
  deletePostById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addOrUpdateLike, deletePostById })(
  PostItem
);
