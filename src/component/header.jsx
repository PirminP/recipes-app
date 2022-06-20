import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Icon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import './header.css';

const Header = ({ title, search, callback }) => (
  <header className="l-header">
    <div className="l-header__logo">
      <Link to="/profile">
        <img
          src={ Icon }
          data-testid="profile-top-btn"
          alt="Profile Icon"
        />
      </Link>
    </div>
    <div
      className="l-header__title"
      data-testid="page-title"
    >
      <h1>{ title }</h1>
    </div>
    <div className="l-header__search">
      { search && (
        <button type="button" className="btn btn-link" onClick={ () => callback() }>
          <img
            src={ SearchIcon }
            alt="Search Icon"
            data-testid="search-top-btn"
          />
        </button>
      )}
    </div>
  </header>
);

Header.propTypes = {
  title: propTypes.string,
}.isRequired;

export default Header;
