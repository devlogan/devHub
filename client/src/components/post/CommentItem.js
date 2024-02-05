import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import deleteIcon from "../../assets/delete.png";

import { deleteCommentById } from "../../actions/post";

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteCommentById,
}) => {
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img class="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">{text}</p>
        <p class="post-date">Posted on {dateFormat(date, "dd-mmm-yy")}</p>
        {!auth.loading && user === auth.user._id && (
          <img
            src={deleteIcon}
            alt="delete"
            className="button-icon"
            onClick={() => deleteCommentById(postId, _id)}
          />
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  deleteCommentById: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deleteCommentById,
})(CommentItem);
