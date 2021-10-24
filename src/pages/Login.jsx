import React from 'react';
import { Redirect } from 'react-router';
import Loading from '../Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      redirect: false,
      isLoginButtonDisabled: true,
      userName: '',
    };
  }

  onEnterName = ({ target }) => {
    const { value } = target;
    this.setState({ userName: value,
    }, this.enableLoginButton);
  };

  enableLoginButton = () => {
    const minimumNumberOfCharacters = 3;
    const { userName } = this.state;
    const enable = userName.length >= minimumNumberOfCharacters;
    this.setState({
      isLoginButtonDisabled: !enable,
    });
  };

  myCreateUser = async (name) => {
    this.setState({ loading: true });
    // const { userName } = this.state;
    await createUser({ name });
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { onEnterName, myCreateUser } = this;
    const {
      loading,
      redirect,
      isLoginButtonDisabled,
      userName,
    } = this.state;

    if (loading) {
      return (
        <div>
          <Loading />
          { redirect && <Redirect to="/search" /> }
        </div>
      );
    }
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form>
          <div>
            <label htmlFor="login-name-input">
              Nome:
              <input
                data-testid="login-name-input"
                type="text"
                onChange={ onEnterName }
              />
            </label>
          </div>
          <div>
            <button
              data-testid="login-submit-button"
              type="submit"
              disabled={ isLoginButtonDisabled }
              onClick={ () => myCreateUser(userName) }
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
