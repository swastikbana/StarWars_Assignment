import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Search.css';
import Autocomplete from '../Autocomplete/Autocomplete';
class Search extends Component {
  render() {
    //if (this.props.user)
    return (
      <Fragment>
        <div className="logout">
          <Link to={'/'}> Logout </Link>
        </div>

        <Autocomplete />
      </Fragment>
    );
    //else return null;
  }
}

export default Search;
