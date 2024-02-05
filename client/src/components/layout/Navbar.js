import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import logo from "../../assets/logo.png";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className="navbar-list">
      <li>
        <Link to="/profiles">
          {/* <i className="fas fa-user" /> */}
          Developers
        </Link>
      </li>
      <li>
        <Link to="/posts">
          {/* <i className="fas fa-user" /> */}
          Posts
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-list">
      <li>
        <Link to="/profiles">
          {/* <i className="fas fa-user" /> */}
          Developers
        </Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <Link to="/">
        <img
          src={logo}
          className="logo"
          alt="devhub"
          style={{ width: "200px" }}
        />
      </Link>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
