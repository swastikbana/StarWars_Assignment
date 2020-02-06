import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './Component/Login/Login';
import Search from './Component/Search/Search';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    };
  }

  setUser(currentUser) {
    this.setState({ user: currentUser });
  }

  render() {
    return (
      <Fragment>
        <Router>
          <Switch>
            <Route
              exact
              path="/search"
              render={props => <Search {...props} user={this.state.user} />}
            />
            <Route
              path="/"
              render={props => (
                <Login {...props} setUser={this.setUser.bind(this)} />
              )}
            />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
