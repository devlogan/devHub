import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { connect } from "react-redux";
import likeIcon from "../../assets/like.png";
import deleteIcon from "../../assets/delete.png";

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
        <div style={{ display: "flex" }}>
          <Link to={`/post/${_id}`} className="btn btn-primary">
            Discussion{" "}
            {!!comments.length && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
          <img
            src={likeIcon}
            alt="like"
            className="button-icon"
            onClick={() => addOrUpdateLike(_id)}
          />
          {/* {!!likes.length && <span>{likes.length}</span>} */}
          {!auth.loading && user === auth.user._id && (
            <img
              src={deleteIcon}
              alt="delete"
              className="button-icon"
              onClick={() => deletePostById(_id)}
            />
          )}
        </div>
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
