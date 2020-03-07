import React, { Component } from "react";
import LoginForm from "./Components/LoginForm";
import { authenticate, register } from "./modules/auth";
import RegistrationForm from "./Components/RegistrationForm";

class App extends Component {
  state = {
    renderRegistrationForm: false,
    renderLoginForm: false,
    authenticated: false,
    registered: false,
    message: ""
  };

  onLogin = async e => {
    e.preventDefault();
    const response = await authenticate(
      e.target.email.value,
      e.target.password.value
    );
    if (response.authenticated) {
      this.setState({ authenticated: true });
    } else {
      this.setState({
        message: response.message,
        renderLoginForm: false,
        renderRegistrationForm: false
      });
    }
  };

  onRegistration = async e => {
    e.preventDefault();
    const response = await register(
      e.target.name.value,
      e.target.email.value,
      e.target.password.value,
    );
    if (response.authenticated) {
      this.setState({ authenticated: true });
    } else {
      this.setState({
        message: response.message,
        renderLoginForm: false,
        renderRegistrationForm: false
      });
    }
  };

  render() {
    const {
      renderLoginForm,
      renderRegistrationForm,
      authenticated,
      message
    } = this.state;
    let renderLogin;
    let renderRegistration;

    switch (true) {
      case renderLoginForm && !authenticated:
        renderLogin = <LoginForm submitFormHandler={this.onLogin} />;
        break;
      case renderRegistrationForm && !authenticated:
        renderRegistration = (
          <RegistrationForm submitFormHandler={this.onRegistration} />
        );
        break;

      case !renderLoginForm && !authenticated:
        renderLogin = (
          <>
            <button
              id="login"
              onClick={() => this.setState({ renderLoginForm: true })}
            >
              Login
            </button>

            <button
              id="register"
              onClick={() => this.setState({ renderRegistrationForm: true })}
            >
              Create Account
            </button>
            <p id="message">{message}</p>
          </>
        );
        break;
      case authenticated:
        renderLogin = <p id="message">Welcome back</p>;

        break;
    }

    return (
      <>
        {renderLogin}
        {renderRegistration}
      </>
    );
  }
}

export default App;
