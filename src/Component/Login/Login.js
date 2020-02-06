import React, { Component, Fragment } from 'react';
import './Login.css';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      user: '',
      errroMessage: '',
      displayError: 'none'
    };
  }

  handleSubmit(e) {
    const baseUrl = 'https://swapi.co/api/';

    e.preventDefault();

    fetch(`${baseUrl}people/?search=${this.state.userName}`)
      .then(res => res.json())
      .then(data => {
        if (
          data.results.length === 0 ||
          data.results[0].name !== this.state.userName
        ) {
          this.setState({
            errroMessage: 'Invalid Userid',
            displayError: 'block'
          });
        } else if (this.state.password !== data.results[0].birth_year) {
          this.setState({
            errroMessage: 'Invalid password',
            displayError: 'block'
          });
        } else {
          this.setState(
            {
              user: data.results[0],
              userName: '',
              password: ''
            },
            () => {
              this.props.setUser(this.state.user);
              this.props.history.push('/search');
            }
          );
        }
      })
      .catch(error => this.setState({ error }));
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      errroMessage: '',
      displayError: 'none'
    });
  }

  render() {
    return (
      <Fragment>
        <div className="loginForm">
          <h3>Login </h3>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text"
              placeholder="Username"
              required
              name="userName"
              onChange={this.handleChange.bind(this)}
              value={this.state.userName}
            />
            <input
              type="text"
              placeholder="Password"
              required
              name="password"
              onChange={this.handleChange.bind(this)}
              value={this.state.password}
            />
            <h4 style={{ display: this.state.displayError, color: 'red' }}>
              {this.state.errroMessage}
            </h4>
            <button type="submit">Login </button>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default Login;
